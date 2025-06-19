export default function LoanStatus() {
    // Simulated loan status data
    const status = {
        loanId: "LN-12456",
        amount: 50000,
        status: "Approved",
        approvedDate: "2025-06-10",
        dueDate: "2025-12-10",
    };

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Current Loan Status</h3>
            <ul className="space-y-2 text-gray-700">
                <li><strong>Loan ID:</strong> {status.loanId}</li>
                <li><strong>Amount:</strong> KES {status.amount.toLocaleString()}</li>
                <li><strong>Status:</strong> {status.status}</li>
                <li><strong>Approved Date:</strong> {status.approvedDate}</li>
                <li><strong>Due Date:</strong> {status.dueDate}</li>
            </ul>
        </div>
    );
}
