import { useState } from "react";
import { toast } from "react-toastify";
import { applyForTill } from "../../service/Service";
import Spinner from "../../components/Spinner";

const steps = [
    { id: 1, label: "Till Name" },
    { id: 2, label: "PIN" },
    { id: 3, label: "Confirm PIN" },
];

export default function TillApplication() {
    const [step, setStep] = useState(1);
    const [tillName, setTillName] = useState("");
    const [pin, setPin] = useState("");
    const [confirmPin, setConfirmPin] = useState("");
    const [loading, setLoading] = useState(false);

    const handleNextStep = () => {
        if (step === 1 && !tillName.trim()) {
            toast.info("Please enter a valid Till name");
            return;
        }
        if (step === 2 && pin.length !== 4) {
            toast.info("Please enter a 4-digit PIN");
            return;
        }
        setStep(step + 1);
    };

    const handleBackStep = () => step > 1 && setStep(step - 1);

    const handleSubmit = async (e?: React.FormEvent) => {
        e?.preventDefault();

        if (confirmPin !== pin) {
            toast.error("PINs do not match");
            return;
        }

        setLoading(true);
        try {
            const response = await applyForTill({
                tillName,
                pin,
                confirmPin,
            });

            if (response.responseCode === "200") {
                toast.success(response.responseMessage);
                setTillName("");
                setPin("");
                setConfirmPin("");
                setStep(1);
            } else {
                toast.error(response.responseMessage);
            }
        } catch {
            toast.error("Submission failed");
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
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold
                  ${isCompleted ? "bg-green-500 text-white" : isActive ? "bg-blue-500 text-white" : "border border-gray-300 text-gray-500"}`}>
                                    {isCompleted ? "✓" : id}
                                </div>
                                <div className={`mt-2 text-xs text-center ${isActive ? "text-blue-600 font-semibold" : "text-gray-500"}`}>
                                    {label}
                                </div>
                                {id !== steps.length && <div className={`absolute top-4 right-[-50%] w-full h-1 ${isCompleted ? "bg-green-500" : "bg-gray-300"}`} style={{ zIndex: -1 }} />}
                            </div>
                        );
                    })}
                </div>

                {step === 1 && (
                    <>
                        <label htmlFor="tillName" className="block font-medium text-gray-700">Till Name</label>
                        <input
                            id="tillName"
                            type="text"
                            value={tillName}
                            onChange={(e) => setTillName(e.target.value)}
                            className="border outline-none focus:border-primary p-2 w-full"
                        />
                        <div className="flex justify-end">
                            <button type="button" onClick={handleNextStep} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Next</button>
                        </div>
                    </>
                )}

                {step === 2 && (
                    <>
                        <label htmlFor="pin" className="block font-medium text-gray-700">PIN</label>
                        <input
                            id="pin"
                            type="password"
                            maxLength={4}
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            className="border outline-none focus:border-primary p-2 w-full"
                        />
                        <div className="flex justify-between">
                            <button type="button" onClick={handleBackStep} className="text-gray-600">Back</button>
                            <button type="button" onClick={handleNextStep} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Next</button>
                        </div>
                    </>
                )}

                {step === 3 && (
                    <>
                        <label htmlFor="confirmPin" className="block font-medium text-gray-700">Confirm PIN</label>
                        <input
                            id="confirmPin"
                            type="password"
                            maxLength={4}
                            value={confirmPin}
                            onChange={(e) => setConfirmPin(e.target.value)}
                            className="border outline-none focus:border-primary p-2 w-full"
                        />
                        <div className="flex justify-between">
                            <button type="button" onClick={handleBackStep} className="text-gray-600">Back</button>
                            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Submit</button>
                        </div>
                    </>
                )}
            </form>
        </div>
    );
}
