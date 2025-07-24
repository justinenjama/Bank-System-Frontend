import { useState } from "react";
import { toast } from "react-toastify";
import { transfer, validateAccountNumber } from "../../service/Service";
import RecentTransactions from "../../components/shared/RecentTransactions";
import Spinner from "../../components/Spinner";

interface TransferResponse {
    responseCode: string;
    responseMessage: string;
}

const steps = [
    { id: 1, label: "Destination Account" },
    { id: 2, label: "Amount" },
    { id: 3, label: "Your PIN" },
];

export default function Transfer() {
    const [step, setStep] = useState(1);

    const [destinationAccount, setDestinationAccount] = useState("");
    const [amount, setAmount] = useState<number>(0);
    const [pin, setPin] = useState("");
    const [showPin, setShowPin] = useState(false);

    const [loading, setLoading] = useState(false);

    const handleNextStep = async () => {
        if (step === 1) {
            if (!destinationAccount.trim()) {
                toast.info("Please enter destination account number");
                return;
            }
            setLoading(true);
            try {
                const result = await validateAccountNumber(destinationAccount);
                if (!result.exists) {
                    toast.error("Destination Account number not found");
                    return;
                }
                setStep(2);
            } catch (err) {
                toast.error("Failed to validate account. Try again.");
            } finally {
                setLoading(false);
            }
        } else if (step === 2) {
            if (amount <= 0) {
                toast.info("Please enter a valid amount");
                return;
            }
            setStep(3);
        }
    };

    const handleBackStep = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleTransfer = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        if (!pin.trim()) {
            toast.info("Please enter your PIN");
            return;
        }

        const pinNumber = parseInt(pin, 10);
        if (isNaN(pinNumber)) {
            toast.error("PIN must be numeric");
            return;
        }

        setLoading(true);
        try {
            const response: TransferResponse = await transfer({
                destinationAccount,
                amount,
                pin: pinNumber,
            });

            if (response.responseCode === "200") {
                toast.success(response.responseMessage);
                setDestinationAccount("");
                setAmount(0);
                setPin("");
                setStep(1);
            } else if (["400", "404", "202", "222"].includes(response.responseCode)) {
                toast.warn(response.responseMessage);
            } else {
                toast.error("Unexpected server response");
            }
        } catch (err) {
            toast.error("Transfer failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {loading && <Spinner />}
            <form
                onSubmit={handleTransfer}
                className="space-y-4 bg-white shadow-xl rounded-lg p-4 max-w-md mx-auto"
                style={{ pointerEvents: loading ? "none" : "auto", opacity: loading ? 0.7 : 1 }}
            >
                <h2 className="text-2xl font-semibold mb-4 text-center">Transfer Funds</h2>
                <div className="flex justify-between mb-6">
                    {steps.map(({ id, label }) => {
                        const isActive = id === step;
                        const isCompleted = id < step;

                        return (
                            <div key={id} className="flex-1 flex flex-col items-center relative">
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold
                  ${isCompleted ? "bg-green-500 text-white"
                                            : isActive ? "bg-blue-500 text-white"
                                                : "border border-gray-300 text-gray-500"}`}
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
                        <label htmlFor="destinationAccount" className="block font-medium text-gray-700">
                            Destination Account
                        </label>
                        <input
                            id="destinationAccount"
                            type="text"
                            placeholder="Account Number"
                            value={destinationAccount}
                            onChange={(e) => setDestinationAccount(e.target.value)}
                            className="border outline-none focus:border-primary p-2 w-full"
                            disabled={loading}
                        />
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
                        <label htmlFor="amount" className="block font-medium text-gray-700">Amount</label>
                        <input
                            id="amount"
                            type="number"
                            placeholder="Amount"
                            value={amount > 0 ? amount : ""}
                            onChange={(e) => setAmount(parseFloat(e.target.value))}
                            className="border outline-none focus:border-primary p-2 w-full"
                            disabled={loading}
                            min={0}
                            step="0.01"
                        />
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
                        <label htmlFor="pin" className="block font-medium text-gray-700">Your PIN</label>
                        <div className="relative">
                            <input
                                id="pin"
                                type={showPin ? "text" : "password"}
                                placeholder="Enter your PIN"
                                value={pin}
                                onChange={(e) => setPin(e.target.value)}
                                className="border outline-none focus:border-primary p-2 w-full pr-10"
                                disabled={loading}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPin((prev) => !prev)}
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
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            >
                                Transfer
                            </button>
                        </div>
                    </>
                )}
            </form>
            <RecentTransactions />
        </div>
    );
}
