import { useState } from "react";
import Credit from "../account/Credit";
import Debit from "../account/Debit";
import Transfer from "../account/Transfer";
import Savings from "../account/Saving";
import PayBills from "../account/PayBills";
import BuyGoods from "../account/BuyGoods";
import { Toaster } from "react-hot-toast";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import Sidebar from "../../components/layout/Sidebar";

export default function Account() {
    const [activeTab, setActiveTab] = useState<
        "credit" | "debit" | "transfer" | "savings" | "paybills" | "buygoods"
    >("credit");

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const closeSidebar = () => setSidebarOpen(false);

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
                        <h2 className="text-3xl font-bold text-gray-800">Account Operations</h2>

                        <div className="flex flex-wrap gap-4">
                            <TabButton label="Credit" active={activeTab === "credit"} onClick={() => setActiveTab("credit")} />
                            <TabButton label="Debit" active={activeTab === "debit"} onClick={() => setActiveTab("debit")} />
                            <TabButton label="Transfer" active={activeTab === "transfer"} onClick={() => setActiveTab("transfer")} />
                            <TabButton label="Savings" active={activeTab === "savings"} onClick={() => setActiveTab("savings")} />
                            <TabButton label="Pay Bills" active={activeTab === "paybills"} onClick={() => setActiveTab("paybills")} />
                            <TabButton label="Buy Goods" active={activeTab === "buygoods"} onClick={() => setActiveTab("buygoods")} />
                        </div>

                        <div>
                            {activeTab === "credit" && <Credit />}
                            {activeTab === "debit" && <Debit />}
                            {activeTab === "transfer" && <Transfer />}
                            {activeTab === "savings" && <Savings />}
                            {activeTab === "paybills" && <PayBills />}
                            {activeTab === "buygoods" && <BuyGoods />}
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

// TabButton component
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
