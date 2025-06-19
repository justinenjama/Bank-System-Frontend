import { useState } from "react";
import { toast } from "react-toastify";
import { creditAccount, validateAccountNumber } from "../../service/Service";
import RecentTransactions from "../../components/shared/RecentTransactions";
import Spinner from "../../components/Spinner";

interface AccountInfo {
    accountName: string;
    accountNumber: string;
    accountBalance: number;
}

interface CreditResponse {
    responseCode: string;
    responseMessage: string;
    accountInfo?: AccountInfo;
}

const steps = [
    { id: 1, label: "Account Number" },
    { id: 2, label: "Amount" },
    { id: 3, label: "Agent PIN" },
];

export default function Credit() {
    const [step, setStep] = useState(1);

    const [accountNumber, setAccountNumber] = useState("");
    const [amount, setAmount] = useState<number>(0);
    const [pin, setPin] = useState("");

    const [loading, setLoading] = useState(false);
    const [accountInfo, setAccountInfo] = useState<AccountInfo | null>(null);

    const handleNextStep = async () => {
        if (step === 1) {
            if (accountNumber.trim() === "") {
                toast.info("Please enter account number");
                return;
            }
            setLoading(true);
            try {
                const result = await validateAccountNumber(accountNumber);
                if (!result.exists) {
                    toast.error("Account number does not exist");
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

    const handleCredit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        if (pin.trim().length === 0) {
            toast.info("Please enter your agent PIN");
            return;
        }

        const pinNumber = parseInt(pin, 10);
        if (isNaN(pinNumber)) {
            toast.error("PIN must be numeric");
            return;
        }

        setLoading(true);
        try {
            const response: CreditResponse = await creditAccount({
                accountNumber,
                amount,
                pin: pinNumber,
            });
            console.log(response);
            if (response.responseCode === "200") {
                toast.success(response.responseMessage);
                setAccountInfo(response.accountInfo ?? null);
                setAccountNumber("");
                setAmount(0);
                setPin("");
                setStep(1);
            } else if (response.responseCode === "400") {
                toast.warn(response.responseMessage);
            } else if (response.responseCode === "404") {
                toast.error(response.responseMessage);
            } else {
                toast.error("Unexpected server response");
            }
        } catch (err) {
            toast.error("Credit failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {loading && <Spinner />}
            <form
                onSubmit={handleCredit}
                className="space-y-4 bg-white shadow-xl rounded-lg p-4 max-w-md mx-auto"
                style={{ pointerEvents: loading ? "none" : "auto", opacity: loading ? 0.7 : 1 }}
            >
                {/* Step Indicator */}
                <div className="flex justify-between mb-6">
                    {steps.map(({ id, label }) => {
                        const isActive = id === step;
                        const isCompleted = id < step;

                        return (
                            <div key={id} className="flex-1 flex flex-col items-center relative">
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold
                    ${isCompleted
                                            ? "bg-green-500 text-white"
                                            : isActive
                                                ? "bg-blue-500 text-white"
                                                : "border border-gray-300 text-gray-500"
                                        }
                  `}
                                >
                                    {isCompleted ? "✓" : id}
                                </div>
                                <div
                                    className={`mt-2 text-xs text-center
                    ${isActive ? "text-blue-600 font-semibold" : "text-gray-500"}
                  `}
                                >
                                    {label}
                                </div>

                                {/* Connector line except for last */}
                                {id !== steps.length && (
                                    <div
                                        className={`absolute top-4 right-[-50%] w-full h-1
                      ${isCompleted ? "bg-green-500" : "bg-gray-300"}
                    `}
                                        style={{ zIndex: -1 }}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Step 1: Account Number */}
                {step === 1 && (
                    <>
                        <label htmlFor="accountNumber" className="block font-medium text-gray-700">
                            Account Number
                        </label>
                        <input
                            id="accountNumber"
                            type="text"
                            placeholder="Account Number"
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                            className="border outline-none focus:border-primary p-2 w-full"
                            disabled={loading}
                            aria-required="true"
                        />
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={handleNextStep}
                                disabled={loading}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}

                {/* Step 2: Amount */}
                {step === 2 && (
                    <>
                        <label htmlFor="amount" className="block font-medium text-gray-700">
                            Amount
                        </label>
                        <input
                            id="amount"
                            type="number"
                            placeholder="Amount"
                            value={amount > 0 ? amount : ""}
                            onChange={(e) => {
                                const val = parseFloat(e.target.value);
                                setAmount(val > 0 ? val : 0);
                            }}
                            className="border outline-none focus:border-primary p-2 w-full"
                            disabled={loading}
                            min={0}
                            step="0.01"
                            aria-required="true"
                        />
                        <div className="flex justify-between">
                            <button
                                type="button"
                                onClick={handleBackStep}
                                disabled={loading}
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Back
                            </button>
                            <button
                                type="button"
                                onClick={handleNextStep}
                                disabled={loading}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}

                {/* Step 3: Agent PIN */}
                {step === 3 && (
                    <>
                        <label htmlFor="pin" className="block font-medium text-gray-700">
                            Agent PIN
                        </label>
                        <input
                            id="pin"
                            type="password"
                            placeholder="Enter your PIN"
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            className="border outline-none focus:border-primary p-2 w-full"
                            disabled={loading}
                            aria-required="true"
                        />
                        <div className="flex justify-between">
                            <button
                                type="button"
                                onClick={handleBackStep}
                                disabled={loading}
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Back
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Credit
                            </button>
                        </div>
                    </>
                )}

                {accountInfo && (
                    <div className="bg-green-50 text-green-700 border border-green-300 p-4 rounded mt-4">
                        <p>
                            <strong>Account Name:</strong> {accountInfo.accountName}
                        </p>
                        <p>
                            <strong>Account Number:</strong> {accountInfo.accountNumber}
                        </p>
                        <p>
                            <strong>New Balance:</strong> KSH {accountInfo.accountBalance}
                        </p>
                    </div>
                )}
            </form>

            <RecentTransactions />
        </div>
    );
}
