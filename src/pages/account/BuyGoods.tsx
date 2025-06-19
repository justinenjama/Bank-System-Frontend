import { useState } from "react";
import { toast } from "react-toastify";
import { buyGoods, validateTillNumber } from "../../service/Service";
import RecentTransactions from "../../components/shared/RecentTransactions";
import Spinner from "../../components/Spinner";

interface AccountInfo {
    accountName: string;
    accountNumber: string;
    accountBalance: number;
}

interface BuyGoodsResponse {
    responseCode: string;
    responseMessage: string;
    accountInfo?: AccountInfo;
}

export default function BuyGoodsComponent() {
    const [step, setStep] = useState(1);
    const [tillNumber, setTillNumber] = useState("");
    const [amount, setAmount] = useState<number>(0);
    const [pin, setPin] = useState("");
    const [showPin, setShowPin] = useState(false);
    const [loading, setLoading] = useState(false);
    const [accountInfo, setAccountInfo] = useState<AccountInfo | null>(null);

    const steps = [
        { id: 1, label: "Till Number" },
        { id: 2, label: "Amount" },
        { id: 3, label: "Your PIN" },
    ];

    const handleNextStep = async () => {
        if (step === 1 && !tillNumber.trim()) {
            if(tillNumber.trim() === ""){
                toast.info("Please enter Till number");
            return;
            }
            setLoading(true);
            try {
                const result = await validateTillNumber(tillNumber);
                if (!result.exists) {
                    toast.error("Till number does not exist");
                    return;
                }
                setStep(2);
                } catch (err) {
                    toast.error("Failed to validate Till. Try again.");
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

    const handleSubmit = async (e?: React.FormEvent) => {
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
            const response: BuyGoodsResponse = await buyGoods({
                tillNumber,
                amount,
                pin: pinNumber,
            });

            if (response.responseCode === "200") {
                toast.success(response.responseMessage);
                setAccountInfo(response.accountInfo ?? null);
                setTillNumber("");
                setAmount(0);
                setPin("");
                setStep(1);
            } else {
                toast.info(response.responseMessage);
            }
        } catch {
            toast.error("Transaction failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {loading && <Spinner />}
            <form
                onSubmit={handleSubmit}
                className="space-y-4 bg-white shadow-xl rounded-lg p-4 max-w-md mx-auto"
                style={{ pointerEvents: loading ? "none" : "auto", opacity: loading ? 0.7 : 1 }}
            >
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
                        <label className="block font-medium text-gray-700">Till Number</label>
                        <input
                            type="text"
                            value={tillNumber}
                            onChange={(e) => setTillNumber(e.target.value)}
                            className="border outline-none focus:border-primary p-2 w-full"
                            required
                        />
                        <div className="flex justify-end">
                            <button type="button" onClick={handleNextStep} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                Next
                            </button>
                        </div>
                    </>
                )}
                {step === 2 && (
                    <>
                        <label className="block font-medium text-gray-700">Amount</label>
                        <input
                            type="number"
                            value={amount > 0 ? amount : ""}
                            onChange={(e) => setAmount(parseFloat(e.target.value))}
                            className="border outline-none focus:border-primary p-2 w-full"
                            min={0}
                            required
                        />
                        <div className="flex justify-between">
                            <button type="button" onClick={handleBackStep} className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">
                                Back
                            </button>
                            <button type="button" onClick={handleNextStep} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                Next
                            </button>
                        </div>
                    </>
                )}
                {step === 3 && (
                    <>
                        <label className="block font-medium text-gray-700">Your PIN</label>
                        <div className="relative">
                            <input
                                type={showPin ? "text" : "password"}
                                value={pin}
                                onChange={(e) => setPin(e.target.value)}
                                className="border outline-none focus:border-primary p-2 w-full pr-10"
                                required
                            />
                            <button type="button" onClick={() => setShowPin(!showPin)} className="absolute right-2 top-2 text-sm text-gray-500">
                                {showPin ? "Hide" : "Show"}
                            </button>
                        </div>

                        <div className="flex justify-between mt-2">
                            <button type="button" onClick={handleBackStep} className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">
                                Back
                            </button>
                            <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
                                Buy
                            </button>
                        </div>
                    </>
                )}

                {accountInfo && (
                    <div className="bg-green-50 text-green-700 border border-green-300 p-4 rounded mt-4">
                        <p><strong>Account Name:</strong> {accountInfo.accountName}</p>
                        <p><strong>Account Number:</strong> {accountInfo.accountNumber}</p>
                        <p><strong>New Balance:</strong> KSH {accountInfo.accountBalance}</p>
                    </div>
                )}
            </form>
            <RecentTransactions />
        </div>
    );
}
