import React, { useEffect, useState } from 'react';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import Footer from '../../components/layout/Footer';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { getAllTills, getWeeklyTillSales } from '../../service/Service';
import Spinner from '../../components/Spinner';

const TillAccountPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tills, setTills] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTillData = async () => {
      try {
        const [tillRes, salesRes] = await Promise.all([
          getAllTills(),
          getWeeklyTillSales(),
        ]);
        setTills(tillRes.data);
        setChartData(salesRes.data);
      } catch (err) {
        console.error('Failed to fetch till data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTillData();
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-50 h-[64px]">
        <Header sidebarOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      </div>
      <div className="flex flex-1 pt-[64px] pb-[60px] overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />
        <main className="flex-1 overflow-y-auto bg-gray-200 p-6 custom-scrollbar">
          <h2 className="text-2xl font-semibold mb-4">Till Account Overview</h2>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Spinner />
            </div>
          ) : (
            <>
              {/* Chart */}
              <div className="bg-white rounded shadow p-4 mb-6">
                <h3 className="text-lg font-semibold mb-2">Weekly Sales</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="sales" fill="#60a5fa" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Table */}
              <div className="bg-white rounded shadow">
                <table className="min-w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="text-left p-3">Name</th>
                      <th className="text-left p-3">Till Number</th>
                      <th className="text-left p-3">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tills.map((till) => (
                      <tr key={till.id} className="border-t">
                        <td className="p-3">{till.tillName}</td>
                        <td className="p-3">{till.tillNumber}</td>
                        <td className="p-3">KES {Number(till.tillBalance).toLocaleString()}</td>
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

export default TillAccountPage;
