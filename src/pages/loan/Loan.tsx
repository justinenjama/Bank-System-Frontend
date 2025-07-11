import { useState, useEffect } from "react";
import ApplyLoan from "../loan/LoanApplication";
import LoanStatus from "../loan/LoanStatus";
import RepayLoan from "../loan/LoanRepayment";
import LoanHistory from "../loan/LoanHistory";
import LoanCalculator from "../loan/LoanCalculator";
import ActivateLoan from "../loan/ActivateLoan";
import ActiveLoans from "../loan/ActiveLoans";

import { Toaster } from "react-hot-toast";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import Sidebar from "../../components/layout/Sidebar";

export default function Loan() {
    const [activeTab, setActiveTab] = useState<
        "apply" | "status" | "repay" | "history" | "calculator" | "activate" | "activeLoans"
    >("apply");

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const closeSidebar = () => setSidebarOpen(false);

    useEffect(() => {
        const role = localStorage.getItem("role");
        setIsAdmin(role === "ADMIN");
    }, []);

    return (
        <div className="flex flex-col h-screen">
            <Toaster position="top-right" />
            <div className="fixed top-0 left-0 right-0 z-50 h-[64px]">
                <Header sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            </div>

            <div className="flex flex-1 pt-[64px] pb-[60px] overflow-hidden">
                <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
                <main className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-gray-200">
                    <div className="max-w-5xl mx-auto space-y-8">
                        <h2 className="text-3xl font-bold text-gray-800">Loan Services</h2>

                        <div className="flex flex-wrap gap-4">
                            <TabButton label="Apply Loan" active={activeTab === "apply"} onClick={() => setActiveTab("apply")} />
                            <TabButton label="Loan Status" active={activeTab === "status"} onClick={() => setActiveTab("status")} />
                            <TabButton label="Repay Loan" active={activeTab === "repay"} onClick={() => setActiveTab("repay")} />
                            <TabButton label="Loan History" active={activeTab === "history"} onClick={() => setActiveTab("history")} />
                            <TabButton label="Calculator" active={activeTab === "calculator"} onClick={() => setActiveTab("calculator")} />

                            {isAdmin && (
                                <>
                                    <TabButton label="Activate Loan" active={activeTab === "activate"} onClick={() => setActiveTab("activate")} />
                                    <TabButton label="Active Loans" active={activeTab === "activeLoans"} onClick={() => setActiveTab("activeLoans")} />
                                </>
                            )}
                        </div>

                        {activeTab === "activeLoans" && isAdmin && (
                            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mt-4">
                                <input
                                    type="text"
                                    placeholder="Search by Loan ID or Applicant Name"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full sm:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        )}

                        <div>
                            {activeTab === "apply" && <ApplyLoan />}
                            {activeTab === "status" && <LoanStatus />}
                            {activeTab === "repay" && <RepayLoan />}
                            {activeTab === "history" && <LoanHistory />}
                            {activeTab === "calculator" && <LoanCalculator />}
                            {activeTab === "activate" && isAdmin && <ActivateLoan />}
                            {activeTab === "activeLoans" && isAdmin && <ActiveLoans search={searchQuery} />}
                        </div>
                    </div>
                </main>
            </div>

            <div className="fixed bottom-0 left-0 right-0 z-50 h-[60px]">
                <Footer />
            </div>
        </div>
    );
}

function TabButton({
    label,
    active,
    onClick,
}: {
    label: string;
    active: boolean;
    onClick: () => void;
}) {
    return (
        <button
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                active
                    ? "bg-blue-600 text-white shadow"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
            onClick={onClick}
        >
            {label}
        </button>
    );
}
