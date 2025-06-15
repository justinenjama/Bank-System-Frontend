import { useEffect, useState } from 'react';
import { Check, X, Clock, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../components/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
    rejectTransaction,
    getPendingTransactions,
    approveTransaction
} from '../../service/Service';
import Spinner from '../../components/Spinner';
import { toast } from 'react-toastify';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import Footer from '../../components/layout/Footer';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

interface Transaction {
    id: number;
    accountNumber: string;
    transactionType: string;
    transactionAmount: number;
    merchant?: string;
    status: string;
    isAnomaly?: boolean;
    transactionDate: string;
}

const PendingTransactions = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [actionLoadingId, setActionLoadingId] = useState<number | string>();
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const pageSize = 5;

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const closeSidebar = () => setSidebarOpen(false);

    useEffect(() => {
        const role = localStorage.getItem('role');
        if (!user || role !== 'ADMIN') {
            navigate('/unauthorized');
            return;
        }

        const fetchPage = async () => {
            try {
                setLoading(true);
                const response = await getPendingTransactions(page, pageSize);
                setTransactions(response.content || []);
                setTotalPages(response.totalPages || 0);
            } catch (error: any) {
                toast.error(error.message || 'Failed to fetch transactions');
            } finally {
                setLoading(false);
            }
        };

        fetchPage();
    }, [user, navigate, page]);

    const handleApprove = async (id: number) => {
        setActionLoadingId(id);
        try {
            await approveTransaction(id);
            setTransactions((prev) => prev.filter((t) => t.id !== id));
            toast.success('Transaction approved!');
        } catch (error: any) {
            toast.error(error.message || 'Approval failed');
        } finally {
            setActionLoadingId(0);
        }
    };

    const handleReject = async (id: number) => {
        setActionLoadingId(id);
        try {
            await rejectTransaction(id);
            setTransactions((prev) => prev.filter((t) => t.id !== id));
            toast.info('Transaction rejected!');
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
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Pending Transactions</h1>
                        <button
                            onClick={refreshPage}
                            title="Refresh transactions"
                            className="rounded p-1 hover:bg-gray-100 hover:cursor-pointer"
                            aria-label="Refresh notifications"
                            disabled={loading}
                        >
                            <ArrowPathIcon className={`h-5 w-5 text-gray-600 ${loading ? 'animate-spin' : ''}`} />
                        </button>
                    </div>

                    {loading ? (
                        <Spinner />
                    ) : transactions.length === 0 ? (
                        <p className="text-gray-600 mt-4 dark:text-gray-300">No pending transactions found.</p>
                    ) : (
                        <>
                            <div className="space-y-4 overflow-y-auto max-h-[400px]">
                                {transactions.map((txn) => (
                                    <div
                                        key={txn.id}
                                        className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex justify-between items-center"
                                    >
                                        <div>
                                            <p className="text-gray-700 dark:text-gray-200">
                                                <span className="font-bold">ID:</span> {txn.id}
                                            </p>
                                            <p className="text-gray-700 dark:text-gray-200">
                                                <span className="font-bold">Transaction ID:</span> {txn.id}
                                            </p>
                                            <p className="text-gray-700 dark:text-gray-200">
                                                <span className="font-bold">Account:</span> {txn.accountNumber}
                                            </p>
                                            <p className="text-gray-600 dark:text-gray-400">
                                                <span className="font-bold">Type:</span> {txn.transactionType}
                                            </p>
                                            <p className="text-gray-600 dark:text-gray-400">
                                                <span className="font-bold">Amount:</span> {txn.transactionAmount} KES
                                            </p>
                                            <p className="text-gray-600 dark:text-gray-400">
                                                <span className="font-bold">Merchant:</span> {txn.merchant || 'N/A'}
                                            </p>
                                            <p className="text-sm text-yellow-500 flex items-center gap-1">
                                                <Clock className="w-4 h-4" /> {txn.status}
                                            </p>
                                            {txn.isAnomaly && (
                                                <p className="text-sm text-red-500 flex items-center gap-1 mt-1">
                                                    <AlertTriangle className="w-4 h-4" /> Marked as Anomaly
                                                </p>
                                            )}
                                            <p className="text-xs text-gray-500 mt-1">
                                                Date: {new Date(txn.transactionDate).toLocaleString()}
                                            </p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                disabled={actionLoadingId === txn.id}
                                                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                                onClick={() => handleApprove(txn.id)}
                                                aria-label={`Approve transaction ${txn.id}`}
                                            >
                                                {actionLoadingId === txn.id ? <Spinner size="small" /> : <><Check className="w-4 h-4" /> Approve</>}
                                            </button>
                                            <button
                                                disabled={actionLoadingId === txn.id}
                                                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                                onClick={() => handleReject(txn.id)}
                                                aria-label={`Reject transaction ${txn.id}`}
                                            >
                                                {actionLoadingId === txn.id ? <Spinner size="small" /> : <><X className="w-4 h-4" /> Reject</>}
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

export default PendingTransactions;
