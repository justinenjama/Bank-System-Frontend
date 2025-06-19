import { useEffect, useState } from 'react';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import Footer from '../../components/layout/Footer';
import { getPendingTransactions, getPendingApplications, getPendingSignups } from '../../service/Service';
import { useNavigate } from 'react-router-dom';

import { Bell, Clock, Settings, ArrowRight } from 'lucide-react';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState<'home' | 'alerts'>('home');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [pendingTransactionCount, setPendingTransactionCount] = useState(0);
    const [pendingApplicationCount, setPendingApplicationCount] = useState(0);
    const [PendingSignupsCount, setPendingSignupsCount] = useState(0);

    const navigate = useNavigate();

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const closeSidebar = () => setSidebarOpen(false);

    useEffect(() => {
        async function loadPending() {
            try {
                const transactionData = await getPendingTransactions();
                const transactions = transactionData.content || [];
                const pendingTransactions = transactions.filter((tx: any) => tx.status === 'PENDING');
                setPendingTransactionCount(pendingTransactions.length);
            } catch (err) {
                console.error('Error fetching pending transactions:', err);
            }

            try {
                const applicationData = await getPendingApplications();
                const applications = applicationData.content || [];
                const pendingApplications = applications.filter((app: any) => app.status === 'PENDING');
                setPendingApplicationCount(pendingApplications.length);
            } catch (err) {
                console.error('Error fetching pending applications:', err);
            }
            try {
                const signUpData = await getPendingSignups();
                const signups = signUpData.content || [];
                const pendingSignups = signups.filter((s: any) => s.status === "PENDING_APPROVAL");
                setPendingSignupsCount(pendingSignups.length);
            } catch (error) {
                console.error('Error fetching pending signup requests: ', error);
            }
        }

        loadPending();
    }, []);

    return (
        <div className="min-h-screen flex flex-col dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <Header sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

            <div className="flex flex-1">
                <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />

                <main className="flex-1 p-6 mt-16 md:mt-0 bg-gray-200 dark:bg-gray-900">
                    <div className="mb-6 flex gap-4">
                        <button
                            className={`px-4 py-2 rounded-md text-white font-semibold ${activeTab === 'home' ? 'bg-blue-700' : 'bg-gray-600 hover:bg-gray-700'
                                }`}
                            onClick={() => setActiveTab('home')}
                        >
                            Home
                        </button>
                        <button
                            className={`px-4 py-2 rounded-md text-white font-semibold ${activeTab === 'alerts' ? 'bg-blue-700' : 'bg-gray-600 hover:bg-gray-700'
                                }`}
                            onClick={() => setActiveTab('alerts')}
                        >
                            Alerts
                        </button>
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
                                        <Clock className="text-yellow-500 w-8 h-8" />
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">Pending Signups</p>
                                            <p className="text-xl font-bold">{PendingSignupsCount}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => navigate('/admin/pending-signups')}
                                        className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                                    >
                                        View <ArrowRight className="w-4 h-4 ml-1" />
                                    </button>
                                </div>
                                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-4 flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <Clock className="text-yellow-500 w-8 h-8" />
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">Pending Transactions</p>
                                            <p className="text-xl font-bold">{pendingTransactionCount}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => navigate('/admin/pending-transactions')}
                                        className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                                    >
                                        View <ArrowRight className="w-4 h-4 ml-1" />
                                    </button>
                                </div>
                                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-4 flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <Clock className="text-orange-500 w-8 h-8" />
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">Pending Applications</p>
                                            <p className="text-xl font-bold">{pendingApplicationCount}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => navigate('/admin/pending-applications')}
                                        className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                                    >
                                        View <ArrowRight className="w-4 h-4 ml-1" />
                                    </button>
                                </div>

                                {/* Admin Processes */}
                                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-4 flex items-center gap-4">
                                    <Settings className="text-purple-500 w-8 h-8" />
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">Admin Processes</p>
                                        <p className="text-xl font-bold">3 Running</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-10">
                                <h3 className="text-xl font-semibold mb-2">Admin Processes</h3>
                                <ul className="space-y-2">
                                    <li className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">🔄 System Backup in Progress</li>
                                    <li className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">⚙️ Account Auditing Scheduled</li>
                                    <li className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">🗂️ Report Generation Ongoing</li>
                                </ul>
                            </div>
                        </div>
                    )}
                    {/* {activeTab === 'alerts' && <AlertsPage />} */}
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default AdminDashboard;
