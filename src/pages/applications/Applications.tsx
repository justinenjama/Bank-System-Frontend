import { useState } from "react";
import { Toaster } from "react-hot-toast";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import Sidebar from "../../components/layout/Sidebar";
import LoanApplication from "../loan/LoanApplication";
import PayBillApplication from "../applications/PayBillApplication";
import TillApplication from "../applications/TillApplication";
import AgentApplication from "../applications/AgentApplication";

export default function Applications() {
    const [activeTab, setActiveTab] = useState<"paybill" | "till" | "agent">("paybill");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex flex-col h-screen">
            <Toaster position="top-right" />
            <div className="fixed top-0 left-0 right-0 z-50 h-[64px]">
                <Header sidebarOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
            </div>
            <div className="flex flex-1 pt-[64px] pb-[60px] overflow-hidden">
                <Sidebar sidebarOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />

                <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
                    <div className="max-w-5xl mx-auto space-y-8">
                        <h2 className="text-3xl font-bold text-gray-800">Bank Service Applications</h2>
                        <div className="flex flex-wrap gap-4">
                            <TabButton label="PayBill Application" active={activeTab === "paybill"} onClick={() => setActiveTab("paybill")} />
                            <TabButton label="Till Number" active={activeTab === "till"} onClick={() => setActiveTab("till")} />
                            <TabButton label="Agent Number" active={activeTab === "agent"} onClick={() => setActiveTab("agent")} />
                        </div>
                        <div>
                            {activeTab === "paybill" && <PayBillApplication />}
                            {activeTab === "till" && <TillApplication />}
                            {activeTab === "agent" && <AgentApplication />}
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
function TabButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
    return (
        <button
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${active ? "bg-blue-600 text-white shadow" : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"}`}
            onClick={onClick}
        >
            {label}
        </button>
    );
}
