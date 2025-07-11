import { useEffect, useState } from 'react';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import Footer from '../../components/layout/Footer';
import {
  getPendingTransactions,
  getPendingApplications,
  getPendingSignups,
  getAIFlaggedTransactions,
  getAnomalyStats,
  getLatestAnomaly,
  adminTrustedDeviceCount
} from '../../service/Service';


import { useNavigate } from 'react-router-dom';
import {
  Bell,
  Clock,
  ArrowRight,
  AlertTriangle
} from 'lucide-react';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'alerts'>('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [pendingTransactionCount, setPendingTransactionCount] = useState(0);
  const [pendingApplicationCount, setPendingApplicationCount] = useState(0);
  const [PendingSignupsCount, setPendingSignupsCount] = useState(0);
  const [flaggedAnomaliesCount, setFlaggedAnomaliesCount] = useState(0);
  const [anomalyStats, setAnomalyStats] = useState<any[]>([]);
  const [latestAnomaly, setLatestAnomaly] = useState<any>(null);
  const [filters, setFilters] = useState({
    fromDate: '',
    toDate: '',
    minAmount: '',
    status: ''
  });
  const [filteredChartData, setFilteredChartData] = useState<any[]>([]);

  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  const [trustedDeviceCount, setTrustedDeviceCount] = useState(0);

  const loadDashboardData = async () => {
    try {
      const response = await adminTrustedDeviceCount();
    setTrustedDeviceCount(response);
      const txRes = await getPendingTransactions();
      const txs = txRes.content || [];
      setPendingTransactionCount(txs.filter((tx: any) => tx.status === 'PENDING').length);

      const appRes = await getPendingApplications();
      const apps = appRes.content || [];
      setPendingApplicationCount(apps.filter((app: any) => app.status === 'PENDING').length);

      const signRes = await getPendingSignups();
      const signups = signRes.content || [];
      setPendingSignupsCount(signups.filter((s: any) => s.status === 'PENDING_APPROVAL').length);

      const anomalyRes = await getAIFlaggedTransactions(0, 1);

      setFlaggedAnomaliesCount(anomalyRes.totalElements || 0);

      const stats = await getAnomalyStats();
      const statsArray = Object.entries(stats).map(([date, count]) => ({ date, count })).reverse();
      setAnomalyStats(statsArray);
      setFilteredChartData(statsArray);

      const latest = await getLatestAnomaly();
      setLatestAnomaly(latest);
    } catch (err) {
      console.error('Error loading dashboard data:', err);
    }
  };

  const applyFilters = async () => {
    try {
      const { fromDate, toDate, minAmount, status } = filters;
      const res = await getAIFlaggedTransactions(0, 100);

      const items = res.content || [];

      const filtered = items.filter((txn: any) => {
        const txnDate = new Date(txn.transactionDate);
        const from = fromDate ? new Date(fromDate) : null;
        const to = toDate ? new Date(toDate) : null;
        const matchDate = (!from || txnDate >= from) && (!to || txnDate <= to);
        const matchAmount = !minAmount || txn.transactionAmount >= Number(minAmount);
        const matchStatus = !status || txn.status === status;
        return matchDate && matchAmount && matchStatus;
      });

      const grouped = filtered.reduce((acc: any, txn: any) => {
        const date = new Date(txn.transactionDate).toISOString().split('T')[0];
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {});

      const chartData = Object.entries(grouped).map(([date, count]) => ({ date, count })).reverse();
      setFilteredChartData(chartData);
      setFlaggedAnomaliesCount(filtered.length);
    } catch (err) {
      console.error('Error applying filters:', err);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  return (
    <div className="h-screen flex flex-col dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
        <main className="flex-1 p-6 mt-16 md:mt-0 bg-gray-200 dark:bg-gray-900 overflow-y-auto">
          <div className="mb-6 flex gap-4">
            <button className={`px-4 py-2 rounded-md text-white font-semibold ${activeTab === 'home' ? 'bg-blue-700' : 'bg-gray-600 hover:bg-gray-700'}`} onClick={() => setActiveTab('home')}>Home</button>
            <button className={`px-4 py-2 rounded-md text-white font-semibold ${activeTab === 'alerts' ? 'bg-blue-700' : 'bg-gray-600 hover:bg-gray-700'}`} onClick={() => setActiveTab('alerts')}>Alerts</button>
          </div>

          {activeTab === 'home' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Welcome to the Admin Dashboard</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-4 flex items-center gap-4">
                  <Bell className="text-blue-500 w-8 h-8" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Unread Alerts</p>
                    <p className="text-xl font-bold">4</p>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                      <Clock className="text-indigo-500 w-8 h-8" />
                      <div>
                          <p className="text-sm text-gray-600 dark:text-gray-300">Trusted Devices</p>
                          <p className="text-xl font-bold">{trustedDeviceCount}</p>
                      </div>
                  </div>
                  <button onClick={() => navigate('/admin/trusted-devices')} className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center">
                      View <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
              </div>
              <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Clock className="text-indigo-500 w-8 h-8" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Trusted Devices</p>
                    <p className="text-xl font-bold">{trustedDeviceCount}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate('/admin/trusted-devices')}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                  >
                    View <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                  <button
                    onClick={() => window.open('/admin/trusted-devices/export', '_blank')}
                    className="text-sm text-green-600 dark:text-green-400 hover:underline"
                  >
                    Export CSV
                  </button>
                </div>
              </div>

                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <Clock className="text-yellow-500 w-8 h-8" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Pending Signups</p>
                      <p className="text-xl font-bold">{PendingSignupsCount}</p>
                    </div>
                  </div>
                  <button onClick={() => navigate('/admin/pending-signups')} className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center">View <ArrowRight className="w-4 h-4 ml-1" /></button>
                </div>
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <Clock className="text-yellow-500 w-8 h-8" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Pending Transactions</p>
                      <p className="text-xl font-bold">{pendingTransactionCount}</p>
                    </div>
                  </div>
                  <button onClick={() => navigate('/admin/pending-transactions')} className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center">View <ArrowRight className="w-4 h-4 ml-1" /></button>
                </div>
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <Clock className="text-orange-500 w-8 h-8" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Pending Applications</p>
                      <p className="text-xl font-bold">{pendingApplicationCount}</p>
                    </div>
                  </div>
                  <button onClick={() => navigate('/admin/pending-applications')} className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center">View <ArrowRight className="w-4 h-4 ml-1" /></button>
                </div>
              </div>

              {/* Filter UI */}
              <div className="bg-white dark:bg-gray-800 p-4 mt-6 rounded-xl shadow-md grid md:grid-cols-4 gap-4">
                <input type="date" className="p-2 rounded bg-gray-100 dark:bg-gray-700 text-sm" value={filters.fromDate} onChange={e => setFilters({ ...filters, fromDate: e.target.value })} />
                <input type="date" className="p-2 rounded bg-gray-100 dark:bg-gray-700 text-sm" value={filters.toDate} onChange={e => setFilters({ ...filters, toDate: e.target.value })} />
                <input type="number" placeholder="Min Amount" className="p-2 rounded bg-gray-100 dark:bg-gray-700 text-sm" value={filters.minAmount} onChange={e => setFilters({ ...filters, minAmount: e.target.value })} />
                <select className="p-2 rounded bg-gray-100 dark:bg-gray-700 text-sm" value={filters.status} onChange={e => setFilters({ ...filters, status: e.target.value })}>
                  <option value="">All Status</option>
                  <option value="PENDING">Pending</option>
                  <option value="SUCCESS">Success</option>
                  <option value="FAILED">Failed</option>
                </select>
                <button className="col-span-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm" onClick={applyFilters}>Apply Filters</button>
                <button className="col-span-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded text-sm" onClick={() => { setFilters({ fromDate: '', toDate: '', minAmount: '', status: '' }); loadDashboardData(); }}>Reset</button>
              </div>

              {/* Flagged Transactions Count */}
              <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-4 mt-6 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <AlertTriangle className="text-red-500 w-8 h-8" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Flagged Transactions</p>
                    <p className="text-xl font-bold">{flaggedAnomaliesCount}</p>
                  </div>
                </div>
                <button onClick={() => navigate('/admin/flagged-transactions')} className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center">View <ArrowRight className="w-4 h-4 ml-1" /></button>
              </div>

              {/* Chart */}
              <div className="bg-white dark:bg-gray-800 p-4 mt-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Filtered Anomaly Trend</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={filteredChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Line type="monotone" dataKey="count" stroke="#f97316" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Latest Anomaly */}
              {latestAnomaly && (
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow mt-6">
                  <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Latest Flagged Transaction</h3>
                  <p><strong>ID:</strong> {latestAnomaly.transactionId}</p>
                  <p><strong>Amount:</strong> {latestAnomaly.transactionAmount} KES</p>
                  <p><strong>Status:</strong> {latestAnomaly.status}</p>
                  <p><strong>Date:</strong> {new Date(latestAnomaly.transactionDate).toLocaleString()}</p>
                  <a href={`https://www.google.com/maps?q=${latestAnomaly.userLatitude},${latestAnomaly.userLongitude}`} target="_blank" rel="noreferrer" className="text-blue-600 dark:text-blue-400 text-sm mt-2 inline-block hover:underline">View Location on Map</a>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;