import { useEffect, useState } from "react";
import { getActiveLoans } from "../../service/Service";
import { Toaster, toast } from "react-hot-toast";
import Spinner from "../../components/Spinner";

// ✅ Add this prop definition
interface ActiveLoansProps {
    search: string;
}

const ActiveLoans: React.FC<ActiveLoansProps> = ({ search }) => {
    const [loans, setLoans] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    const pageSize = 5;

    const fetchLoans = async () => {
        setLoading(true);
        try {
            const response = await getActiveLoans(page, pageSize);
            const filtered = response.content.filter((loan: any) => {
                const loanIdMatch = loan.id.toString().includes(search.toLowerCase());
                const nameMatch = loan.user?.fullName?.toLowerCase().includes(search.toLowerCase());
                return loanIdMatch || nameMatch;
            });
            setLoans(filtered);
            setTotalPages(response.totalPages);
        } catch (err: any) {
            toast.error(err?.response?.data?.message || "Failed to load active loans");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLoans();
    }, [page, search]); // re-fetch when `search` changes

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 relative">
            {loading && <Spinner />}
            <Toaster position="top-right" />

            <div className="w-full max-w-5xl p-6 bg-white rounded-xl shadow-xl z-10">
                <h2 className="text-2xl font-bold text-center mb-4">Active Loans</h2>

                {loans.length === 0 ? (
                    <p className="text-center text-gray-600">No active loans found.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto border-collapse border border-gray-300">
                            <thead className="bg-blue-100">
                                <tr>
                                    <th className="p-2 border text-left">Loan ID</th>
                                    <th className="p-2 border text-left">Applicant</th>
                                    <th className="p-2 border text-left">Amount</th>
                                    <th className="p-2 border text-left">Status</th>
                                    <th className="p-2 border text-left">Start Date</th>
                                    <th className="p-2 border text-left">End Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loans.map((loan) => (
                                    <tr key={loan.id} className="hover:bg-gray-100">
                                        <td className="p-2 border">{loan.id}</td>
                                        <td className="p-2 border">{loan.user?.fullName || "N/A"}</td>
                                        <td className="p-2 border">Ksh {loan.amount?.toLocaleString()}</td>
                                        <td className="p-2 border">{loan.status}</td>
                                        <td className="p-2 border">{loan.startDate || "N/A"}</td>
                                        <td className="p-2 border">{loan.endDate || "N/A"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="flex justify-between items-center mt-6">
                            <button
                                onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                                disabled={page === 0}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
                            >
                                Previous
                            </button>
                            <span className="text-sm text-gray-600">
                                Page {page + 1} of {totalPages}
                            </span>
                            <button
                                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
                                disabled={page >= totalPages - 1}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ActiveLoans;
