import { useState } from "react";
import { getLoanDetails } from "../../service/Service";
import { Toaster, toast } from "react-hot-toast";
import Spinner from "../../components/Spinner";

const LoanDetails = () => {
    const [loanId, setLoanId] = useState("");
    const [loanData, setLoanData] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setLoanData(null);

        try {
            const res = await getLoanDetails(Number(loanId));
            setLoanData(res);
            toast.success("Loan details retrieved!");
        } catch (err: any) {
            toast.error(err?.response?.data?.message || "Failed to get details");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 relative">
            {loading && <Spinner />}
            <Toaster position="top-right" />

            <div className="w-full max-w-2xl p-6 bg-white rounded-xl shadow-xl z-10">
                <h2 className="text-2xl font-bold text-center mb-4">Loan Details</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="loanId" className="block text-sm font-medium text-gray-700 mb-1">
                            Enter Loan ID
                        </label>
                        <input
                            type="number"
                            id="loanId"
                            name="loanId"
                            value={loanId}
                            onChange={(e) => setLoanId(e.target.value)}
                            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Get Details
                    </button>
                </form>

                {loanData && (
                    <div className="mt-6 border-t pt-4 space-y-2 text-sm text-gray-800">
                        <p><strong>Loan ID:</strong> {loanData.id}</p>
                        <p><strong>Status:</strong> {loanData.status}</p>
                        <p><strong>Amount:</strong> {loanData.amount}</p>
                        <p><strong>Applicant:</strong> {loanData.user?.fullName}</p>
                        <p><strong>Start Date:</strong> {loanData.startDate || "N/A"}</p>
                        <p><strong>End Date:</strong> {loanData.endDate || "N/A"}</p>
                        {/* Add more fields if needed */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoanDetails;
