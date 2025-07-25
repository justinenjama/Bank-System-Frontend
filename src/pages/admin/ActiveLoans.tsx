import { useEffect, useState } from 'react';
import { Eye, RefreshCw } from 'lucide-react';
import { useAuth } from '../../components/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
    fetchActiveLoans
} from '../../service/Service';
import Spinner from '../../components/Spinner';
import { toast } from 'react-toastify';

// Layout components
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import Footer from '../../components/layout/Footer';

interface Loan {
    id: number;
    loanId: string;
    borrower: string;
    amount: number;
    dueDate: string;
    status: string;
    isOverdue: boolean;
}

const ActiveLoans = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [loans, setLoans] = useState<Loan[]>([]);
    const [loading, setLoading] = useState(true);
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

        const loadLoans = async () => {
            try {
                setLoading(true);
                const response = await fetchActiveLoans(page, pageSize);
                setLoans(response.content || []);
                setTotalPages(response.totalPages || 0);
            } catch (err: any) {
                toast.error(err.message || 'Failed to load active loans');
            } finally {
                setLoading(false);
            }
        };

        loadLoans();
    }, [user, navigate, page]);

    const refreshPage = () => setPage(prev => prev);

    const handlePageClick = (pageIndex: number) => {
        if (pageIndex >= 0 && pageIndex < totalPages) {
            setPage(pageIndex);
        }
    };

    return (
        <div className="flex min-h-screen flex-col">
            <Header sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            <div className="flex flex-1">
                <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
                <main className="flex-1 p-6 bg-gray-200 dark:bg-gray-900">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Active Loans</h1>
                        <button
                            onClick={refreshPage}
                            className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
                        >
                            <RefreshCw className="w-5 h-5" />
                            Refresh
                        </button>
                    </div>

                    {loading ? (
                        <Spinner />
                    ) : loans.length === 0 ? (
                        <p className="text-gray-600 mt-4 dark:text-gray-300">No active loans found.</p>
                    ) : (
                        <>
                            <div className="space-y-4 overflow-y-auto max-h-[400px]">
                                {loans.map((loan) => (
                                    <div
                                        key={loan.loanId}
                                        className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex justify-between items-start"
                                    >
                                        <div>
                                            <p className="text-gray-700 dark:text-gray-200"><strong>ID:</strong> {loan.id}</p>
                                            <p className="text-gray-700 dark:text-gray-200"><strong>Loan ID:</strong> {loan.loanId}</p>
                                            <p className="text-gray-700 dark:text-gray-200"><strong>Borrower:</strong> {loan.borrower}</p>
                                            <p className="text-gray-700 dark:text-gray-200"><strong>Amount:</strong> {loan.amount} KES</p>
                                            <p className="text-gray-700 dark:text-gray-200"><strong>Due Date:</strong> {new Date(loan.dueDate).toLocaleDateString()}</p>
                                            <p className={`text-sm ${loan.isOverdue ? 'text-red-500' : 'text-green-600'} mt-1`}>
                                                {loan.isOverdue ? 'Overdue' : 'On Track'}
                                            </p>
                                        </div>
                                        <div className="flex flex-col gap-2">

                                            <button
                                                className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600"
                                                onClick={() => navigate(`/loan-details/${loan.loanId}`)}
                                            >
                                                <Eye className="inline w-4 h-4 mr-1" /> View
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

export default ActiveLoans;
