import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import Sidebar from "../../components/layout/Sidebar";
import PayBillApplication from "../applications/PayBillApplication";
import TillApplication from "../applications/TillApplication";
import AgentApplication from "../applications/AgentApplication";

type TabType = "paybill" | "till" | "agent";

export default function Applications({ tab }: { tab?: "paybill" | "till" | "agent" }) {

    const location = useLocation();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<TabType>(tab || "paybill");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Extract tab name from URL path
    useEffect(() => {
        const path = location.pathname;
        if (path.includes("/paybill")) setActiveTab("paybill");
        else if (path.includes("/till")) setActiveTab("till");
        else if (path.includes("/agent")) setActiveTab("agent");
    }, [location.pathname]);

    const handleTabClick = (tab: TabType) => {
        setActiveTab(tab);
        navigate(`/applications/${tab}`);
    };

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
                            <TabButton label="PayBill Application" active={activeTab === "paybill"} onClick={() => handleTabClick("paybill")} />
                            <TabButton label="Till Number" active={activeTab === "till"} onClick={() => handleTabClick("till")} />
                            <TabButton label="Agent Number" active={activeTab === "agent"} onClick={() => handleTabClick("agent")} />
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
