import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
    addSavings,
    viewSavingsBalance,
    withdrawSavings,
} from "../../service/Service";
import Spinner from "../../components/Spinner";
import RecentTransactions from "../../components/shared/RecentTransactions";

const steps = [
    { id: 1, label: "Action" },
    { id: 2, label: "Details" },
    { id: 3, label: "Your PIN" },
];

export default function Savings() {
    const [step, setStep] = useState(1);
    const [action, setAction] = useState<"add" | "withdraw" | "">("");
    const [amount, setAmount] = useState(0);
    const [lockPeriodDays, setLockPeriodDays] = useState(0);
    const [pin, setPin] = useState("");
    const [showPin, setShowPin] = useState(false);

    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchBalance();
    }, []);

    const fetchBalance = async () => {
        setLoading(true);
        try {
            const res = await viewSavingsBalance();
            setBalance(res.accountInfo?.accountBalance || 0);
        } catch {
            toast.error("Failed to fetch savings balance");
        } finally {
            setLoading(false);
        }
    };

    const handleNextStep = () => {
        if (step === 1) {
            if (!action) {
                toast.info("Please select an action");
                return;
            }
            setStep(2);
        } else if (step === 2) {
            if (amount <= 0) {
                toast.info("Please enter a valid amount");
                return;
            }
            if (action === "add" && lockPeriodDays < 0) {
                toast.info("Lock period cannot be negative");
                return;
            }
            setStep(3);
        }
    };

    const handleBackStep = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        if (!pin || !/^\d+$/.test(pin)) {
            toast.error("Please enter a valid numeric PIN");
            return;
        }
        const pinParsed = parseInt(pin, 10);

        setLoading(true);
        try {
            
            const response =
                action === "add"
                    ? await addSavings({ amount, lockPeriodDays, pin: pinParsed }) // pin is sent as string
                    : await withdrawSavings(amount, pinParsed);

            if (response.responseCode === "200") {
                toast.success(response.responseMessage || "Transaction successful");
                fetchBalance();
                resetForm();
            } else {
                toast.warn(response.responseMessage || "Something went wrong");
            }
        } catch {
            toast.error("Request failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setStep(1);
        setAction("");
        setAmount(0);
        setLockPeriodDays(0);
        setPin("");
        setShowPin(false);
    };

    return (
        <div>
            {loading && <Spinner />}
            <form
                onSubmit={handleSubmit}
                className="space-y-4 bg-white shadow-xl rounded-lg p-4 max-w-md mx-auto"
                style={{ pointerEvents: loading ? "none" : "auto", opacity: loading ? 0.7 : 1 }}
            >
                <h2 className="text-2xl font-semibold text-center mb-4">Savings</h2>
                <p className="text-center text-gray-600 mb-2">
                    Current Balance: <strong>KSH {balance}</strong>
                </p>
                <div className="flex justify-between mb-6">
                    {steps.map(({ id, label }) => {
                        const isActive = id === step;
                        const isCompleted = id < step;
                        return (
                            <div key={id} className="flex-1 flex flex-col items-center relative">
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${isCompleted
                                        ? "bg-green-500 text-white"
                                        : isActive
                                            ? "bg-blue-500 text-white"
                                            : "border border-gray-300 text-gray-500"
                                        }`}
                                >
                                    {isCompleted ? "✓" : id}
                                </div>
                                <div className={`mt-2 text-xs text-center ${isActive ? "text-blue-600 font-semibold" : "text-gray-500"}`}>
                                    {label}
                                </div>
                                {id !== steps.length && (
                                    <div
                                        className={`absolute top-4 right-[-50%] w-full h-1 ${isCompleted ? "bg-green-500" : "bg-gray-300"}`}
                                        style={{ zIndex: -1 }}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
                {step === 1 && (
                    <>
                        <label className="block">
                            <span className="text-gray-700 font-medium">Choose Action</span>
                            <select
                                value={action}
                                onChange={(e) => setAction(e.target.value as "add" | "withdraw")}
                                className="border p-2 rounded w-full outline-none focus:border-primary"
                            >
                                <option value="">-- Select --</option>
                                <option value="add">Add to Savings</option>
                                <option value="withdraw">Withdraw from Savings</option>
                            </select>
                        </label>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={handleNextStep}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}
                {step === 2 && (
                    <>
                        <label htmlFor="amount" className="block font-medium text-gray-700">
                            Amount (KSH)
                        </label>
                        <input
                            id="amount"
                            type="number"
                            value={amount > 0 ? amount : ""}
                            onChange={(e) => setAmount(parseFloat(e.target.value))}
                            placeholder="Enter amount"
                            className="border p-2 w-full outline-none rounded focus:border-primary"
                            min={0}
                            step="0.01"
                        />

                        {action === "add" && (
                            <>
                                <label htmlFor="lockPeriod" className="block font-medium text-gray-700">
                                    Lock Period (Days)
                                </label>
                                <input
                                    id="lockPeriod"
                                    type="number"
                                    value={lockPeriodDays}
                                    onChange={(e) => setLockPeriodDays(parseInt(e.target.value, 10))}
                                    placeholder="E.g. 30"
                                    className="border p-2 w-full outline-none rounded focus:border-primary"
                                    min={0}
                                />
                            </>
                        )}

                        <div className="flex justify-between">
                            <button
                                type="button"
                                onClick={handleBackStep}
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                            >
                                Back
                            </button>
                            <button
                                type="button"
                                onClick={handleNextStep}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}
                {step === 3 && (
                    <>
                        <label htmlFor="pin" className="block font-medium text-gray-700">
                            Your PIN
                        </label>
                        <div className="relative">
                            <input
                                id="pin"
                                type={showPin ? "text" : "password"}
                                value={pin}
                                onChange={(e) => setPin(e.target.value)}
                                placeholder="Enter your PIN"
                                className="border p-2 w-full outline-none rounded pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPin(!showPin)}
                                className="absolute right-2 top-2 text-sm text-gray-500"
                            >
                                {showPin ? "Hide" : "Show"}
                            </button>
                        </div>

                        <div className="flex justify-between mt-2">
                            <button
                                type="button"
                                onClick={handleBackStep}
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                            >
                                Back
                            </button>
                            <button
                                type="submit"
                                className={`px-4 py-2 rounded text-white font-semibold ${action === "add"
                                    ? "bg-green-500 hover:bg-green-600"
                                    : "bg-red-500 hover:bg-red-600"
                                    }`}
                            >
                                {action === "add" ? "Add to Savings" : "Withdraw"}
                            </button>
                        </div>
                    </>
                )}
            </form>
            <RecentTransactions />
        </div>
    );
}
