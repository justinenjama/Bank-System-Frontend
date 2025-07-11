import React, { useEffect, useState } from 'react';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import Footer from '../../components/layout/Footer';
import Spinner from '../../components/Spinner';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { fetchAllAgents, fetchWeeklyTransactions } from '../../service/Service';

interface Agent {
  id: number;
  agentName: string;
  agentNumber: string;
  agentBalance: number;
}

interface DailyTransactionSummary {
  day: string;
  deposits: number;
  withdrawals: number;
}

const AgentAccountPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [chartData, setChartData] = useState<DailyTransactionSummary[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAgentData = async () => {
    try {
    const [agentRes, chartRes] = await Promise.all([
      fetchAllAgents(),
      fetchWeeklyTransactions(),
    ]);
    setAgents(agentRes);
    setChartData(chartRes);
  } catch (error) {
    console.error('Failed to fetch data', error);
  } finally {
    setLoading(false);
  }
  };

  useEffect(() => {
    fetchAgentData();
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-50 h-[64px]">
        <Header sidebarOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      </div>
      <div className="flex flex-1 pt-[64px] pb-[60px] overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />
        <main className="flex-1 overflow-y-auto bg-gray-200 p-6 custom-scrollbar">
          <h2 className="text-2xl font-semibold mb-4">Agent Account Overview</h2>

          {loading ? (
            <Spinner />
          ) : (
            <>
              {/* Chart */}
              <div className="bg-white rounded shadow p-4 mb-6">
                <h3 className="text-lg font-semibold mb-2">Weekly Transactions</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="deposits" fill="#4ade80" />
                    <Bar dataKey="withdrawals" fill="#f87171" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Table */}
              <div className="bg-white rounded shadow">
                <table className="min-w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="text-left p-3">Name</th>
                      <th className="text-left p-3">Agent Number</th>
                      <th className="text-left p-3">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {agents.map(agent => (
                      <tr key={agent.id} className="border-t">
                        <td className="p-3">{agent.agentName}</td>
                        <td className="p-3">{agent.agentNumber}</td>
                        <td className="p-3">KES {agent.agentBalance.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </main>
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-50 h-[60px]">
        <Footer />
      </div>
    </div>
  );
};

export default AgentAccountPage;
