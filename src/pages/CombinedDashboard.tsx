import React, { useEffect, useState } from 'react';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Footer from '../components/layout/Footer';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend
} from 'recharts';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import debounce from 'lodash.debounce';

const CombinedDashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [accountData, setAccountData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [filter, setFilter] = useState({ status: '', minAmount: 0, maxAmount: 100000, fromDate: '', toDate: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    axios.get('/api/accounts/summary').then(res => {
      setAccountData(res.data);
      setFilteredData(res.data);
    });
  }, []);

  const applyFilter = debounce(() => {
    let data = [...accountData];
    if (filter.status) data = data.filter(d => d.status === filter.status);
    if (filter.minAmount) data = data.filter(d => d.amount >= filter.minAmount);
    if (filter.maxAmount) data = data.filter(d => d.amount <= filter.maxAmount);
    if (filter.fromDate) data = data.filter(d => new Date(d.date) >= new Date(filter.fromDate));
    if (filter.toDate) data = data.filter(d => new Date(d.date) <= new Date(filter.toDate));
    setFilteredData(data);
    setCurrentPage(1);
  }, 500);

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('Account Dashboard', 14, 16);
    autoTable(doc, {
      startY: 20,
      head: [['Date', 'Account Type', 'Amount', 'Status']],
      body: filteredData.map(d => [d.date, d.type, `KES ${d.amount.toLocaleString()}`, d.status]),
    });
    doc.save('account_dashboard.pdf');
  };

  const exportCSV = () => {
    const csvContent = 'data:text/csv;charset=utf-8,' +
      ['Date,Account Type,Amount,Status', ...filteredData.map(d => `${d.date},${d.type},${d.amount},${d.status}`)].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'account_dashboard.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];

  return (
    <div className="h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-50 h-[64px]">
        <Header sidebarOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      </div>
      <div className="flex flex-1 pt-[64px] pb-[60px] overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />
        <main className="flex-1 overflow-y-auto bg-gray-200 p-6">
          <h2 className="text-2xl font-semibold mb-4">Account Dashboard</h2>

          {/* Filters */}
          <div className="bg-white p-4 rounded shadow mb-6">
            <h3 className="font-semibold mb-2">Filters</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <input type="date" className="border p-2 rounded" onChange={e => setFilter(f => ({ ...f, fromDate: e.target.value }))} />
              <input type="date" className="border p-2 rounded" onChange={e => setFilter(f => ({ ...f, toDate: e.target.value }))} />
              <input type="number" placeholder="Min Amount" className="border p-2 rounded" onChange={e => setFilter(f => ({ ...f, minAmount: +e.target.value }))} />
              <input type="number" placeholder="Max Amount" className="border p-2 rounded" onChange={e => setFilter(f => ({ ...f, maxAmount: +e.target.value }))} />
              <select className="border p-2 rounded" onChange={e => setFilter(f => ({ ...f, status: e.target.value }))}>
                <option value="">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Cleared">Cleared</option>
              </select>
              <button onClick={applyFilter} className="bg-blue-600 text-white rounded px-4 py-2">Apply</button>
              <button onClick={exportCSV} className="bg-green-600 text-white rounded px-4 py-2">Export CSV</button>
              <button onClick={exportPDF} className="bg-red-600 text-white rounded px-4 py-2">Export PDF</button>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded p-4 shadow">
              <h3 className="text-lg font-semibold mb-2">Amount Over Time</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={filteredData}>
                  <CartesianGrid stroke="#ccc" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white rounded p-4 shadow">
              <h3 className="text-lg font-semibold mb-2">Account Type Distribution</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    dataKey="amount"
                    isAnimationActive={true}
                    data={Object.values(filteredData.reduce((acc: any, item) => {
                      acc[item.type] = acc[item.type] || { type: item.type, amount: 0 };
                      acc[item.type].amount += item.amount;
                      return acc;
                    }, {}))}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {filteredData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded p-4 shadow">
            <h3 className="text-lg font-semibold mb-2">Account Transactions</h3>
            <table className="min-w-full text-left">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2">Date</th>
                  <th className="p-2">Account Type</th>
                  <th className="p-2">Amount</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((d, i) => (
                  <tr key={i} className="border-t">
                    <td className="p-2">{d.date}</td>
                    <td className="p-2">{d.type}</td>
                    <td className="p-2">KES {d.amount.toLocaleString()}</td>
                    <td className="p-2">{d.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-between mt-4">
              <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50">Previous</button>
              <span className="self-center">Page {currentPage}</span>
              <button disabled={currentPage * itemsPerPage >= filteredData.length} onClick={() => setCurrentPage(prev => prev + 1)} className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50">Next</button>
            </div>
          </div>
        </main>
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-50 h-[60px]">
        <Footer />
      </div>
    </div>
  );
};

export default CombinedDashboard;
