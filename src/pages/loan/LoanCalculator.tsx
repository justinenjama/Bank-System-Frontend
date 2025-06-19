import { useState } from "react";

export default function LoanCalculator() {
    const [amount, setAmount] = useState(10000);
    const [rate, setRate] = useState(10); // annual interest rate %
    const [duration, setDuration] = useState(12); // months

    const monthlyRate = rate / 12 / 100;
    const monthlyPayment = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -duration));
    const totalPayable = monthlyPayment * duration;

    return (
        <div className="bg-white shadow rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-semibold">Loan Calculator</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-600">Amount (KES)</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="mt-1 w-full border border-gray-300 rounded-md p-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600">Interest Rate (%)</label>
                    <input
                        type="number"
                        value={rate}
                        onChange={(e) => setRate(Number(e.target.value))}
                        className="mt-1 w-full border border-gray-300 rounded-md p-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600">Duration (Months)</label>
                    <input
                        type="number"
                        value={duration}
                        onChange={(e) => setDuration(Number(e.target.value))}
                        className="mt-1 w-full border border-gray-300 rounded-md p-2"
                    />
                </div>
            </div>

            <div className="mt-4 text-gray-800">
                <p><strong>Monthly Payment:</strong> KES {monthlyPayment.toFixed(2)}</p>
                <p><strong>Total Payable:</strong> KES {totalPayable.toFixed(2)}</p>
            </div>
        </div>
    );
}
