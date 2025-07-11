import React, { useState } from 'react';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import Footer from '../../components/layout/Footer';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CheckAccountPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const checkChartData = [
    { month: 'Jan', cleared: 10 },
    { month: 'Feb', cleared: 14 },
    { month: 'Mar', cleared: 9 },
    { month: 'Apr', cleared: 18 },
    { month: 'May', cleared: 12 },
  ];

  const checkRecords = [
    { id: 1, number: 'CH001', amount: 2000, date: '2025-06-02', status: 'Cleared' },
    { id: 2, number: 'CH002', amount: 1500, date: '2025-06-10', status: 'Pending' },
  ];

  return (
    <div className="h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-50 h-[64px]">
        <Header sidebarOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      </div>
      <div className="flex flex-1 pt-[64px] pb-[60px] overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />
        <main className="flex-1 overflow-y-auto bg-gray-200 p-6">
          <h2 className="text-2xl font-semibold mb-4">Check Account</h2>

          <div className="bg-white rounded p-4 shadow mb-6">
            <h3 className="text-lg font-semibold mb-2">Checks Cleared Over Time</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={checkChartData}>
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="cleared" stroke="#f59e0b" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded shadow p-4">
            <h3 className="text-lg font-semibold mb-2">Check History</h3>
            <table className="min-w-full text-left">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2">Check No</th>
                  <th className="p-2">Date</th>
                  <th className="p-2">Amount</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {checkRecords.map((c) => (
                  <tr key={c.id} className="border-t">
                    <td className="p-2">{c.number}</td>
                    <td className="p-2">{c.date}</td>
                    <td className="p-2">KES {c.amount}</td>
                    <td className="p-2">{c.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-50 h-[60px]">
        <Footer />
      </div>
    </div>
  );
};

export default CheckAccountPage;
