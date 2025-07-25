import { useEffect, useState } from 'react';
import { Check, Clock } from 'lucide-react';
import { useAuth } from '../../components/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getPendingSignups, approveSignup } from '../../service/Service';
import Spinner from '../../components/Spinner';
import { toast } from 'react-toastify';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import Footer from '../../components/layout/Footer';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

interface PendingUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    accountNumber: string;
    role: string;
    status: string;
    createdAt: string;
}

const PendingSignups = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [users, setUsers] = useState<PendingUser[]>([]);
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

        const fetchPendingSignups = async () => {
            try {
                setLoading(true);
                const response = await getPendingSignups(page, pageSize);
                console.log(response);
                setUsers(response.content || []);
                setTotalPages(response.totalPages || 0);
            } catch (error: any) {
                toast.error(error.message || 'Failed to fetch signups');
            } finally {
                setLoading(false);
            }
        };

        fetchPendingSignups();
    }, [user, navigate, page]);

    const handleApprove = async (id: number) => {
        setActionLoadingId(id);
        try {
            await approveSignup(id);
            setUsers(prev => prev.filter(u => u.id !== id));
            toast.success('Signup approved!');
        } catch (error: any) {
            toast.error(error.message || 'Approval failed');
        } finally {
            setActionLoadingId(0);
        }
    };

    const refreshPage = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setPage(prev => prev);
        }, 500);
    };

    return (
        <div className="flex min-h-screen flex-col">
            <Header sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            <div className="flex flex-1">
                <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
                <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-900">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Pending Signups</h1>
                        <button
                            onClick={refreshPage}
                            title="Refresh signups"
                            className="rounded p-1 hover:bg-gray-100 hover:cursor-pointer"
                            aria-label="Refresh signups"
                            disabled={loading}
                        >
                            <ArrowPathIcon className={`h-5 w-5 text-gray-600 ${loading ? 'animate-spin' : ''}`} />
                        </button>
                    </div>

                    {loading ? (
                        <Spinner />
                    ) : users.length === 0 ? (
                        <p className="text-gray-600 mt-4 dark:text-gray-300">No pending signups found.</p>
                    ) : (
                        <>
                            <div className="space-y-4 overflow-y-auto max-h-[400px]">
                                {users.map(user => (
                                    <div
                                        key={user.id}
                                        className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex justify-between items-center"
                                    >
                                        <div>
                                            <p className="text-gray-700 dark:text-gray-200"><span className="font-bold">ID:</span> {user.id}</p>
                                            <p className="text-gray-700 dark:text-gray-200"><span className="font-bold">Name:</span> {user.firstName} {user.lastName}</p>
                                            <p className="text-gray-600 dark:text-gray-400"><span className="font-bold">Email:</span> {user.email}</p>
                                            <p className="text-gray-600 dark:text-gray-400"><span className="font-bold">Phone:</span> {user.phoneNumber}</p>
                                            <p className="text-gray-600 dark:text-gray-400"><span className="font-bold">Account Number:</span> {user.accountNumber}</p>
                                            <p className="text-gray-600 dark:text-gray-400"><span className="font-bold">Role:</span> {user.role}</p>
                                            <p className="text-gray-600 dark:text-gray-400"><span className="font-bold">Created At:</span> {user.createdAt}</p>
                                            <p className="text-sm text-yellow-500 flex items-center gap-1">
                                                <Clock className="w-4 h-4" /> {user.status}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                Created: {new Date(user.createdAt).toLocaleString()}
                                            </p>
                                        </div>
                                        <div>
                                            <button
                                                disabled={actionLoadingId === user.id}
                                                onClick={() => handleApprove(user.id)}
                                                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {actionLoadingId === user.id ? (
                                                    <Spinner size="small" />
                                                ) : (
                                                    <>
                                                        <Check className="w-4 h-4" /> Approve
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 flex justify-center space-x-2">
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setPage(i)}
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

export default PendingSignups;
