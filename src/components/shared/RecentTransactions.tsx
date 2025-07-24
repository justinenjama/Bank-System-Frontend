import { useEffect, useState } from "react";
import { getRecentTransactions } from "../../service/Service";
import { toast } from "react-toastify";
import Spinner from "../Spinner";

type TransactionHistoryDTO = {
    id: number;
    accountNumber: string;
    transactionType: string;
    transactionAmount: number;
    status: string;
    transactionDate: string;
    isAnomaly?: boolean;
};
function isTransaction(txn: any): txn is TransactionHistoryDTO {
    return txn &&
        typeof txn.id === "number" &&
        typeof txn.accountNumber === "string" &&
        typeof txn.transactionType === "string" &&
        typeof txn.transactionAmount === "number" &&
        typeof txn.status === "string" &&
        typeof txn.transactionDate === "string";
}

export default function RecentTransactions() {
    const [transactions, setTransactions] = useState<TransactionHistoryDTO[]>([]);
    const [loading, setLoading] = useState(true);

    // Group transactions by date
    const groupByDate = (txns: TransactionHistoryDTO[]) => {
        return txns.reduce((groups: Record<string, TransactionHistoryDTO[]>, txn) => {
            const date = new Date(txn.transactionDate).toISOString().split("T")[0];
            if (!groups[date]) groups[date] = [];
            groups[date].push(txn);
            return groups;
        }, {});
    };

    useEffect(() => {
        async function fetchTransactions() {
            try {
                const response = await getRecentTransactions();
                if (response && response.data) {
                    const allTxnsUnknown = Object.values(response.data).flat();
                    const allTxns = allTxnsUnknown.filter(isTransaction);
                    setTransactions(allTxns);
                } else {
                    setTransactions([]);
                }
            } catch (error) {
                toast.error("Failed to load recent transactions");
                setTransactions([]);
            } finally {
                setLoading(false);
            }
        }
        fetchTransactions();
    }, []);

    if (loading) return <Spinner />;
    if (!transactions || transactions.length === 0) return <p>No recent transactions found.</p>;

    const groupedTransactions = groupByDate(transactions);
    const getAmountColor = (type: string, amount: number) => {
        const t = type.toUpperCase();

        if (amount < 0) return "text-red-600";

        if (t === "DEBIT" || t === "PAYBILL" || t === "TILL") return "text-red-600";
        if (t === "CREDIT") return "text-green-600";
        if (t === "TRANSFER") return amount >= 0 ? "text-green-600" : "text-red-600";

        return "text-gray-900";
    };
    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "completed":
            case "success":
                return "text-green-600 font-semibold";
            case "pending":
            case "processing":
                return "text-yellow-600 font-semibold";
            case "failed":
            case "error":
                return "text-red-600 font-semibold";
            default:
                return "text-gray-600 font-semibold";
        }
    };
    const maskAccountNumber = (accNum: string) => {
        if (accNum.length < 12) return accNum;
        return (
            "***" +
            accNum.charAt(11) +
            accNum.charAt(10) +
            accNum.charAt(11) +
            accNum.charAt(9)
        );
    };

    return (
        <div className="p-4 mt-8 max-w-5xl mx-auto">
            <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>
            <div className="hidden md:block bg-white p-4 rounded shadow-lg space-y-8">
                {Object.entries(groupedTransactions).map(([date, txns]) => (
                    <div key={date}>
                        <h4 className="text-lg font-bold mb-2">{date}</h4>
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-blue-500 text-white">
                                    <th className="border-b p-2">Type</th>
                                    <th className="border-b p-2">Account</th>
                                    <th className="border-b p-2">Amount</th>
                                    <th className="border-b p-2">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {txns.map((txn) => (
                                    <tr
                                        key={txn.id}
                                        className="hover:bg-blue-600 hover:text-white transition-colors"
                                    >
                                        <td className="border-b p-2">{txn.transactionType}</td>
                                        <td className="border-b p-2">{maskAccountNumber(txn.accountNumber)}</td>
                                        <td
                                            className={`border-b p-2 font-semibold ${getAmountColor(
                                                txn.transactionType,
                                                txn.transactionAmount
                                            )}`}
                                        >
                                            {Math.abs(txn.transactionAmount).toFixed(2)}
                                        </td>
                                        <td className={`border-b p-2 ${getStatusColor(txn.status)}`}>
                                            {txn.status}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>

            {/* CARD LIST FOR SMALL SCREENS */}
            <div className="md:hidden space-y-6">
                {Object.entries(groupedTransactions).map(([date, txns]) => (
                    <div key={date}>
                        <h4 className="text-lg font-bold mb-2">{date}</h4>
                        <div className="space-y-4">
                            {txns.map((txn) => (
                                <div
                                    key={txn.id}
                                    className="bg-white p-4 rounded shadow hover:shadow-md transition-shadow"
                                >
                                    <div className="flex justify-between mb-2">
                                        <span className="font-semibold">Type:</span>
                                        <span>{txn.transactionType}</span>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <span className="font-semibold">Account:</span>
                                        <span>{maskAccountNumber(txn.accountNumber)}</span>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <span className="font-semibold">Amount:</span>
                                        <span className={getAmountColor(txn.transactionType, txn.transactionAmount)}>
                                            {Math.abs(txn.transactionAmount).toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-semibold">Status:</span>
                                        <span className={getStatusColor(txn.status)}>{txn.status}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
