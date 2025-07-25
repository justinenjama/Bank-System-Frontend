import { useEffect, useState } from 'react';
import { AlertTriangle, MapPin } from 'lucide-react';
import { useAuth } from '../../components/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getAIFlaggedTransactions, clearAnomalyFlag } from '../../service/Service';
import Spinner from '../../components/Spinner';
import { toast } from 'react-toastify';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import Footer from '../../components/layout/Footer';

interface FlaggedTransaction {
  id: number;
  transactionId: string;
  accountNumber: string;
  transactionType: string;
  transactionAmount: number;
  status: string;
  transactionDate: string;
  userLatitude: number;
  userLongitude: number;
  mapLink?: string;
}

const FlaggedTransactions = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [transactions, setTransactions] = useState<FlaggedTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 5;

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  useEffect(() => {
    if (!user || user.role?.toUpperCase() !== 'ADMIN') {
            navigate('/unauthorized');
            return;
        }
    fetchFlagged(page);
  }, [user, navigate, page]);

  const fetchFlagged = async (pg: number) => {
    try {
      setLoading(true);
      const res = await getAIFlaggedTransactions(pg, pageSize);
      const withLinks = res.content.map((t: FlaggedTransaction) => ({
        ...t,
        mapLink: `https://www.google.com/maps?q=${t.userLatitude},${t.userLongitude}`,
      }));
      setTransactions(withLinks);
      setTotalPages(res.totalPages);
    } catch (err: any) {
      toast.error(err.message || 'Failed to load anomalies');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkSafe = async (id: number) => {
    try {
      await clearAnomalyFlag(id);
      toast.success('Marked as safe.');
      setTransactions(prev => prev.filter(t => t.id !== id));
    } catch (err: any) {
      toast.error(err.message || 'Failed to update transaction.');
    }
  };

  const handlePageClick = (pg: number) => {
    if (pg >= 0 && pg < totalPages) setPage(pg);
  };

  // ✅ Extracted content inside component, after states are defined
  let content;

  if (loading) {
    content = <Spinner />;
  } else if (transactions.length === 0) {
    content = (
      <p className="text-gray-600 dark:text-gray-300">
        No flagged anomalies found.
      </p>
    );
  } else {
    content = (
      <>
        <div className="space-y-4">
          {transactions.map((txn) => (
            <div
              key={txn.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4"
            >
              <p className="text-gray-700 dark:text-gray-200">
                <span className="font-bold">Transaction ID:</span>{' '}
                {txn.transactionId}
              </p>
              <p className="text-gray-700 dark:text-gray-200">
                <span className="font-bold">Account:</span> {txn.accountNumber}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                <span className="font-bold">Type:</span> {txn.transactionType}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                <span className="font-bold">Amount:</span>{' '}
                {txn.transactionAmount} KES
              </p>
              <p className="text-sm text-yellow-500 flex items-center gap-1">
                <AlertTriangle className="w-4 h-4" /> Flagged as Anomaly
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Date: {new Date(txn.transactionDate).toLocaleString()}
              </p>
              <a
                href={txn.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 flex items-center gap-1 mt-2 text-sm hover:underline"
              >
                <MapPin className="w-4 h-4" /> View on Map
              </a>
              <button
                onClick={() => handleMarkSafe(txn.id)}
                className="mt-3 bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
              >
                Mark as Not Anomaly
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageClick(i)}
              className={`px-3 py-1 rounded-full text-sm ${
                i === page
                  ? 'bg-blue-600 text-white font-bold'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex flex-1">
        <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
        <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-900 overflow-y-auto max-h-[calc(100vh-4rem)]">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Flagged Transactions
          </h1>
          {content}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default FlaggedTransactions;
