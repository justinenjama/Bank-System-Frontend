export default function LoanHistory() {
    const loans = [
        {
            loanId: "LN-101",
            amount: 30000,
            status: "Paid",
            date: "2024-05-01",
        },
        {
            loanId: "LN-102",
            amount: 45000,
            status: "Paid",
            date: "2024-12-15",
        },
        {
            loanId: "LN-12456",
            amount: 50000,
            status: "Active",
            date: "2025-06-10",
        },
    ];

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Loan History</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="text-left px-4 py-2">Loan ID</th>
                            <th className="text-left px-4 py-2">Amount (KES)</th>
                            <th className="text-left px-4 py-2">Status</th>
                            <th className="text-left px-4 py-2">Date</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {loans.map((loan) => (
                            <tr key={loan.loanId}>
                                <td className="px-4 py-2">{loan.loanId}</td>
                                <td className="px-4 py-2">{loan.amount.toLocaleString()}</td>
                                <td className="px-4 py-2">{loan.status}</td>
                                <td className="px-4 py-2">{loan.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
