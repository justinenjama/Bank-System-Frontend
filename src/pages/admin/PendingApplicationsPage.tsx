import { useEffect, useState } from 'react';
import { Check, X, Clock } from 'lucide-react';
import { useAuth } from '../../components/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
    getPendingApplications,
    approveApplication,
    rejectApplication
} from '../../service/Service';
import Spinner from '../../components/Spinner';
import { toast } from 'react-toastify';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import Footer from '../../components/layout/Footer';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

interface Application {
    id: number;
    applicationType: string;
    businessName: string;
    businessNumber: string;
    accountNumber: string;
    status: string;
    createdAt: string;
}

const PendingApplications = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);
    const [actionLoadingId, setActionLoadingId] = useState<number | string>();
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const pageSize = 5;

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const closeSidebar = () => setSidebarOpen(false);

    useEffect(() => {
        
        if (!user || user.role?.toUpperCase() !== 'ADMIN') {
            navigate('/unauthorized');
            return;
        }

        const fetchApplications = async () => {
            try {
                setLoading(true);
                const response = await getPendingApplications(page, pageSize);
                setApplications(response.content || []);
                setTotalPages(response.totalPages || 0);
            } catch (error: any) {
                toast.error(error.message || 'Failed to fetch applications');
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, [user, navigate, page]);

    const handleApprove = async (id: number) => {
        setActionLoadingId(id);
        try {
            await approveApplication(id);
            setApplications((prev) => prev.filter((a) => a.id !== id));
            toast.success('Application approved!');
        } catch (error: any) {
            toast.error(error.message || 'Approval failed');
        } finally {
            setActionLoadingId(0);
        }
    };

    const handleReject = async (id: number) => {
        setActionLoadingId(id);
        try {
            await rejectApplication(id);
            setApplications((prev) => prev.filter((a) => a.id !== id));
            toast.info('Application rejected!');
        } catch (error: any) {
            toast.error(error.message || 'Rejection failed');
        } finally {
            setActionLoadingId(0);
        }
    };

    const handlePageClick = (pageIndex: number) => {
        if (pageIndex >= 0 && pageIndex < totalPages) {
            setPage(pageIndex);
        }
    };

    const refreshPage = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setPage((prev) => prev);
        }, 500);
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Header sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            <div className="flex flex-1">
                <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
                <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-900">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Pending Applications</h1>
                        <button
                            onClick={refreshPage}
                            title="Refresh applications"
                            className="rounded p-1 hover:bg-gray-100 hover:cursor-pointer"
                            aria-label="Refresh"
                            disabled={loading}
                        >
                            <ArrowPathIcon className={`h-5 w-5 text-gray-600 ${loading ? 'animate-spin' : ''}`} />
                        </button>
                    </div>

                    {loading ? (
                        <Spinner />
                    ) : applications.length === 0 ? (
                        <p className="text-gray-600 mt-4 dark:text-gray-300">No pending applications found.</p>
                    ) : (
                        <>
                            <div className="space-y-4 overflow-y-auto max-h-[400px]">
                                {applications.map((app) => (
                                    <div
                                        key={app.id}
                                        className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex justify-between items-center"
                                    >
                                        <div>
                                            <p className="text-gray-700 dark:text-gray-200"><span className="font-bold">ID:</span> {app.id}</p>
                                            <p className="text-gray-700 dark:text-gray-200"><span className="font-bold">Business Name:</span> {app.businessName}</p>
                                            <p className="text-gray-600 dark:text-gray-400"><span className="font-bold">Business Number:</span> {app.businessNumber}</p>
                                            <p className="text-gray-600 dark:text-gray-400"><span className="font-bold">Account Number:</span> {app.accountNumber}</p>
                                            <p className="text-gray-600 dark:text-gray-400"><span className="font-bold">Application Type:</span> {app.applicationType}</p>
                                            <p className="text-sm text-yellow-500 flex items-center gap-1">
                                                <Clock className="w-4 h-4" /> {app.status}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                Date: {new Date(app.createdAt).toLocaleString()}
                                            </p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                disabled={actionLoadingId === app.id}
                                                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                                onClick={() => handleApprove(app.id)}
                                                aria-label={`Approve application ${app.id}`}
                                            >
                                                {actionLoadingId === app.id ? <Spinner size="small" /> : <><Check className="w-4 h-4" /> Approve</>}
                                            </button>
                                            <button
                                                disabled={actionLoadingId === app.id}
                                                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                                onClick={() => handleReject(app.id)}
                                                aria-label={`Reject application ${app.id}`}
                                            >
                                                {actionLoadingId === app.id ? <Spinner size="small" /> : <><X className="w-4 h-4" /> Reject</>}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 flex justify-center space-x-2">
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handlePageClick(i)}
                                        aria-current={i === page ? 'page' : undefined}
                                        className={`px-3 py-1 rounded-full text-sm ${i === page
                                            ? 'bg-blue-600 text-white font-bold'
                                            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                                            }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default PendingApplications;
