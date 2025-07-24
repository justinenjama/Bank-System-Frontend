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
import { getMonthlySavings, getSavingsTransactions } from '../../service/Service';

interface MonthlySavingsDTO {
  month: string;
  balance: number;
}

interface SavingsTransactionDTO {
  id: number;
  date: string;
  amount: number;
  type: string;
}

const SavingsAccountPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [savingsData, setSavingsData] = useState<MonthlySavingsDTO[]>([]);
  const [savingsHistory, setSavingsHistory] = useState<SavingsTransactionDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const accountNumber = '1234567890'; // TODO: Replace with dynamic account from auth/user context

  useEffect(() => {
    const fetchSavingsData = async () => {
      try {
        const [monthlyBalances, transactions] = await Promise.all([
          getMonthlySavings(accountNumber),
          getSavingsTransactions(accountNumber),
        ]);
        setSavingsData(monthlyBalances);
        setSavingsHistory(transactions);
      } catch (error) {
        console.error('Error fetching savings data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavingsData();
  }, [accountNumber]);

  return (
    <div className="h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-50 h-[64px]">
        <Header sidebarOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      </div>
      <div className="flex flex-1 pt-[64px] pb-[60px] overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />
        <main className="flex-1 overflow-y-auto bg-gray-200 p-6">
          <h2 className="text-2xl font-semibold mb-4">Savings Account</h2>

          {/* Chart */}
          <div className="bg-white rounded p-4 shadow mb-6">
            <h3 className="text-lg font-semibold mb-2">Balance Over Time</h3>
            {loading ? (
              <p>Loading chart...</p>
            ) : (
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={savingsData}>
                  <CartesianGrid stroke="#ccc" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="balance" stroke="#4f46e5" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Table */}
          <div className="bg-white rounded shadow p-4">
            <h3 className="text-lg font-semibold mb-2">Transaction History</h3>
            {loading ? (
              <p>Loading transactions...</p>
            ) : (
              <table className="min-w-full text-left">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2">Date</th>
                    <th className="p-2">Amount</th>
                    <th className="p-2">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {savingsHistory.map((tx) => (
                    <tr key={tx.id} className="border-t">
                      <td className="p-2">{tx.date}</td>
                      <td className="p-2">KES {tx.amount.toLocaleString()}</td>
                      <td className="p-2">{tx.type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-50 h-[60px]">
        <Footer />
      </div>
    </div>
  );
};

export default SavingsAccountPage;
