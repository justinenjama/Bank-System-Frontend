import React, { useEffect, useState } from 'react';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import Footer from '../../components/layout/Footer';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { getPaybillMonthlyUsage, getPaybillTransactions } from '../../service/Service';
import { useAuth } from '../../components/AuthContext';

const PayBillAccountPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [usageData, setUsageData] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();
  const accountNumber = user?.accountNumber;

  useEffect(() => {
    if (!accountNumber) return;

    const fetchData = async () => {
      try {
        const [usage, txs] = await Promise.all([
          getPaybillMonthlyUsage(accountNumber),
          getPaybillTransactions(accountNumber),
        ]);
        setUsageData(usage);
        setTransactions(txs);
      } catch (error) {
        console.error('Failed to fetch Paybill data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [accountNumber]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading PayBill data...</p>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-50 h-[64px]">
        <Header sidebarOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      </div>
      <div className="flex flex-1 pt-[64px] pb-[60px] overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />
        <main className="flex-1 overflow-y-auto bg-gray-200 p-6">
          <h2 className="text-2xl font-semibold mb-4">PayBill Account</h2>

          {/* Monthly Usage Chart */}
          <div className="bg-white rounded p-4 shadow mb-6">
            <h3 className="text-lg font-semibold mb-2">Monthly Usage</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={usageData}>
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="usage" stroke="#16a34a" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Transaction Table */}
          <div className="bg-white rounded shadow p-4">
            <h3 className="text-lg font-semibold mb-2">Recent PayBill Transactions</h3>
            <table className="min-w-full text-left">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2">Date</th>
                  <th className="p-2">Amount</th>
                  <th className="p-2">Biller</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx: any) => (
                  <tr key={tx.id} className="border-t">
                    <td className="p-2">{tx.date}</td>
                    <td className="p-2">KES {tx.amount}</td>
                    <td className="p-2">{tx.biller}</td>
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

export default PayBillAccountPage;
