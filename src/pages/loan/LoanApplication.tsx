import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import Spinner from "../../components/Spinner";
import { applyForLoan } from "../../service/Service";

const LoanApplication = () => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const [formData, setFormData] = useState({
        gender: "",
        married: "",
        education: "",
        selfEmployed: "",
        applicantIncome: "",
        coapplicantIncome: "",
        loanAmount: "",
        loanAmountTerm: "",
        creditHistory: "",
        propertyArea: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNext = () => {
        setError("");
        if (step < 3) setStep(step + 1);
    };

    const handleBack = () => {
        setError("");
        if (step > 1) setStep(step - 1);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccessMessage("");
        try {
            await applyForLoan(formData);
            setSuccessMessage("Loan application submitted successfully!");
            toast.success("Application submitted!");
            console.log(await applyForLoan(formData));
        } catch (err: any) {
            setError("Failed to submit loan application.");
            toast.error(err?.response?.data?.message || "Submission failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 relative">
            {loading && <Spinner />}
            <Toaster position="top-right" />
            <div className="w-full max-w-2xl p-6 bg-white rounded-xl shadow-xl z-10 relative">
                <h2 className="text-2xl font-bold text-center mb-4">Loan Application - Step {step} of 3</h2>

                {error && <p className="text-red-600 text-sm text-center mb-2">{error}</p>}
                {successMessage && <p className="text-green-600 text-sm text-center mb-2">{successMessage}</p>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {step === 1 && (
                        <fieldset className="border border-gray-300 rounded-xl p-6 shadow-sm space-y-4">
                            <legend className="text-xl font-semibold text-gray-700 px-2">Personal Information</legend>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className={`w-full border p-2 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 ${!formData.gender && error ? 'border-red-600' : 'border-gray-300'}`}
                                    required
                                >
                                    <option value="">Select</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Marital Status</label>
                                <select
                                    name="married"
                                    value={formData.married}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded-lg bg-white focus:ring-2 focus:ring-blue-500"
                                    required
                                >
                                    <option value="">Select</option>
                                    <option value="Yes">Married</option>
                                    <option value="No">Single</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Education</label>
                                <select
                                    name="education"
                                    value={formData.education}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded-lg bg-white focus:ring-2 focus:ring-blue-500"
                                    required
                                >
                                    <option value="">Select</option>
                                    <option value="Graduate">Graduate</option>
                                    <option value="Not Graduate">Not Graduate</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Self Employed</label>
                                <select
                                    name="selfEmployed"
                                    value={formData.selfEmployed}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded-lg bg-white focus:ring-2 focus:ring-blue-500"
                                    required
                                >
                                    <option value="">Select</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>

                            <div className="flex justify-end pt-2">
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Next
                                </button>
                            </div>
                        </fieldset>
                    )}

                    {step === 2 && (
                        <fieldset className="border border-gray-300 rounded-xl p-6 shadow-sm space-y-4">
                            <legend className="text-xl font-semibold text-gray-700 px-2">Income & Loan Details</legend>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Applicant Income</label>
                                    <input
                                        type="number"
                                        name="applicantIncome"
                                        value={formData.applicantIncome}
                                        onChange={handleChange}
                                        className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Co-applicant Income</label>
                                    <input
                                        type="number"
                                        name="coapplicantIncome"
                                        value={formData.coapplicantIncome}
                                        onChange={handleChange}
                                        className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Loan Amount</label>
                                    <input
                                        type="number"
                                        name="loanAmount"
                                        value={formData.loanAmount}
                                        onChange={handleChange}
                                        className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Loan Term (Months)</label>
                                    <input
                                        type="number"
                                        name="loanAmountTerm"
                                        value={formData.loanAmountTerm}
                                        onChange={handleChange}
                                        className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between pt-4">
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="px-5 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                                >
                                    Back
                                </button>
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Next
                                </button>
                            </div>
                        </fieldset>
                    )}

                    {step === 3 && (
                        <fieldset className="border border-gray-300 rounded-xl p-6 shadow-sm space-y-4">
                            <legend className="text-xl font-semibold text-gray-700 px-2">Credit & Property</legend>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Credit History (0 to 1)</label>
                                <input
                                    type="number"
                                    name="creditHistory"
                                    value={formData.creditHistory}
                                    onChange={handleChange}
                                    step="0.1"
                                    min={0}
                                    max={1}
                                    className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Property Area</label>
                                <select
                                    name="propertyArea"
                                    value={formData.propertyArea}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded-lg bg-white focus:ring-2 focus:ring-blue-500"
                                    required
                                >
                                    <option value="">Select</option>
                                    <option value="Urban">Urban</option>
                                    <option value="Semiurban">Semiurban</option>
                                    <option value="Rural">Rural</option>
                                </select>
                            </div>

                            <div className="flex justify-between pt-4">
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="px-5 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                                >
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                >
                                    Submit Application
                                </button>
                            </div>
                        </fieldset>
                    )}
                </form>
            </div>
        </div>
    );
};

export default LoanApplication;
