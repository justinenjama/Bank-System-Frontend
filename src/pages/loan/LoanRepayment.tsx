import { useState } from "react";
import { repayLoan } from "../../service/Service";
import Spinner from "../../components/Spinner";
import { Toaster, toast } from "react-hot-toast";

const LoanRepayment = () => {
    const [formData, setFormData] = useState({
        amount: "",
        pin: ""
    });
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMessage("");
        setError("");

        try {
            const payload = {
                amount: Number(formData.amount),
                pin: Number(formData.pin)
            };

            const res = await repayLoan(payload);
            toast.success(res.message || "Loan repaid successfully!");
            setSuccessMessage("Loan repayment successful!");
            setFormData({ amount: "", pin: "" });
        } catch (err: any) {
            toast.error(err?.response?.data?.message || "Loan repayment failed.");
            setError("Failed to repay loan.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 relative">
            {loading && <Spinner />}
            <Toaster position="top-right" />

            <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-xl z-10">
                <h2 className="text-2xl font-bold text-center mb-4">Loan Repayment</h2>

                {error && <p className="text-red-600 text-sm text-center mb-2">{error}</p>}
                {successMessage && <p className="text-green-600 text-sm text-center mb-2">{successMessage}</p>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                            Repayment Amount
                        </label>
                        <input
                            type="number"
                            id="amount"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="pin" className="block text-sm font-medium text-gray-700 mb-1">
                            PIN
                        </label>
                        <input
                            type="password"
                            id="pin"
                            name="pin"
                            value={formData.pin}
                            onChange={handleChange}
                            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                        Submit Payment
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoanRepayment;
