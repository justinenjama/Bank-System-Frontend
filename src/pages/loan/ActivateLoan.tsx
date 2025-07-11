import { useState, useEffect } from "react";
import { activateLoan } from "../../service/Service";
import { Toaster, toast } from "react-hot-toast";
import Spinner from "../../components/Spinner";

const ActivateLoan = () => {
    const [loanId, setLoanId] = useState("");
    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const role = localStorage.getItem("role");
        setIsAdmin(role === "ADMIN");
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!loanId) return;

        setLoading(true);
        setResponseMessage("");

        try {
            const res = await activateLoan(Number(loanId));
            toast.success(res.message || "Loan activated successfully!");
            setResponseMessage(res.message || "Loan activated successfully!");
        } catch (err: any) {
            toast.error(err?.response?.data?.message || "Activation failed");
            setResponseMessage("Failed to activate loan.");
        } finally {
            setLoading(false);
        }
    };

    if (!isAdmin) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-red-100">
                <p className="text-red-600 font-semibold text-lg">Access Denied. Admins only.</p>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 relative">
            {loading && <Spinner />}
            <Toaster position="top-right" />

            <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-xl z-10">
                <h2 className="text-2xl font-bold text-center mb-4">Activate Loan</h2>

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
                        Activate Loan
                    </button>

                    {responseMessage && (
                        <p className="text-center mt-4 text-gray-700">{responseMessage}</p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default ActivateLoan;
