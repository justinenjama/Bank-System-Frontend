import { useEffect, useState } from 'react';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Footer from '../components/layout/Footer';
import { fetchLoginHistory } from '../service/Service';

const UserHistoryPage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loginHistory, setLoginHistory] = useState<any[]>([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        loadLoginHistory();
    }, [page]);

    const loadLoginHistory = async () => {
        const res = await fetchLoginHistory(page);
        setLoginHistory(res.content);
        setTotalPages(res.totalPages);
    };

    return (
        <div className="h-screen flex flex-col bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white">
            <Header sidebarOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar sidebarOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />
                <main className="flex-1 p-6 mt-16 md:mt-0 overflow-y-auto">

                    <h2 className="text-2xl font-bold mb-6">User History</h2>

                    <div className="mb-6">
                        <a
                            href="/trusted-devices"
                            className="inline-block text-blue-600 hover:underline text-sm font-medium"
                        >
                            → View Trusted Devices
                        </a>
                    </div>

                    <h2 className="text-2xl font-bold mb-6">User History</h2>

                    <section className="mb-10">
                        <h3 className="text-xl font-semibold mb-3">Login History</h3>
                        <div className="overflow-auto max-h-60 rounded shadow bg-white dark:bg-gray-800">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-gray-200 dark:bg-gray-700">
                                        <th className="p-2">IP Address</th>
                                        <th>Location</th>
                                        <th>Time</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loginHistory.map((log, i) => (
                                        <tr key={i} className="border-b border-gray-100 dark:border-gray-700">
                                            <td className="p-2">{log.ipAddress}</td>
                                            <td>{log.location}</td>
                                            <td>{new Date(log.loginTime).toLocaleString()}</td>
                                            <td className={`font-semibold ${log.successful ? 'text-green-600' : 'text-red-600'}`}>
                                                {log.successful ? 'Success' : 'Failed'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section className="mb-10">
                        <h3 className="text-xl font-semibold mb-3">Recent Activities</h3>
                        <div className="overflow-auto max-h-60 rounded shadow bg-white dark:bg-gray-800">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-gray-200 dark:bg-gray-700">
                                        <th className="p-2">Activity Type</th>
                                        <th>Description</th>
                                        <th>Time</th>
                                    </tr>
                                </thead>

                            </table>
                        </div>
                    </section>

                    <div className="flex justify-between mt-6">
                        <button
                            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
                            onClick={() => setPage((p) => Math.max(p - 1, 0))}
                            disabled={page === 0}
                        >
                            Previous
                        </button>
                        <span className="text-sm mt-2">Page {page + 1} of {totalPages}</span>
                        <button
                            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
                            onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
                            disabled={page >= totalPages - 1}
                        >
                            Next
                        </button>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default UserHistoryPage;
