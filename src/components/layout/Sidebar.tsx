import {
    HomeIcon,
    BanknotesIcon,
    ClockIcon,
    Cog6ToothIcon,
    ArrowTrendingUpIcon,
    Squares2X2Icon,
    ChatBubbleLeftIcon,
    ShieldCheckIcon,
    DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import { useAuth } from "../AuthContext";

interface SidebarProps {
    sidebarOpen: boolean;
    closeSidebar: () => void;
    notificationCount?: number;
}

export default function Sidebar({
    sidebarOpen,
    closeSidebar,
}: SidebarProps) {
    const { user } = useAuth();

    return (
        <>
            <div
                className={`fixed inset-0 w-64 bg-white bg-opacity-40 z-10 md:hidden transition-opacity duration-300 ${sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                onClick={closeSidebar}
            ></div>

            <aside
                className={`w-64 p-4 h-full shadow-md transition-transform duration-300 ease-in-out fixed md:static top-16 md:top-0 left-0 z-30 ${sidebarOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
                    } md:translate-x-0 md:opacity-100`}
            >
                <h2 className="text-xl font-bold m-4 text-blue-600">Navigation</h2>
                <nav className="flex flex-col space-y-2">
                    <NavLink
                        to="/"
                        onClick={closeSidebar}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-100 transition-colors duration-300 ${isActive ? "text-blue-600 font-semibold" : "text-gray-700"
                            }`
                        }
                    >
                        <HomeIcon className="h-5 w-5" />
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/notifications"
                        onClick={closeSidebar}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-100 transition-colors duration-300 relative ${isActive ? "text-blue-600 font-semibold" : "text-gray-700"
                            }`
                        }
                    >
                        <ChatBubbleLeftIcon className="h-5 w-5" />
                        Messages
                    </NavLink>

                    <NavLink
                        to="/account"
                        onClick={closeSidebar}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-100 transition-colors duration-300 ${isActive ? "text-blue-600 font-semibold" : "text-gray-700"
                            }`
                        }
                    >
                        <BanknotesIcon className="h-5 w-5" />
                        Account
                    </NavLink>

                    <NavLink
                        to="/history"
                        onClick={closeSidebar}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-100 transition-colors duration-300 ${isActive ? "text-blue-600 font-semibold" : "text-gray-700"
                            }`
                        }
                    >
                        <ClockIcon className="h-5 w-5" />
                        History
                    </NavLink>
                    <NavLink
                        to="/applications"
                        onClick={closeSidebar}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-100 transition-colors duration-300 ${isActive ? "text-blue-600 font-semibold" : "text-gray-700"
                            }`
                        }
                    >
                        <DocumentDuplicateIcon className="h-5 w-5" />
                        Applications
                    </NavLink>

                    <NavLink
                        to="/loan"
                        onClick={closeSidebar}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-100 transition-colors duration-300 ${
                                isActive ? "text-blue-600 font-semibold" : "text-gray-700"
                            }`
                        }
                    >
                        <BanknotesIcon className="h-5 w-5" />
                        Loan Services
                    </NavLink>
                    
                    <NavLink
                        to="/analytics"
                        onClick={closeSidebar}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-100 transition-colors duration-300 ${isActive ? "text-blue-600 font-semibold" : "text-gray-700"
                            }`
                        }
                    >
                        <ArrowTrendingUpIcon className="h-5 w-5" />
                        Analytics
                    </NavLink>

                    {user?.role === "ADMIN" && (
                        <NavLink
                            to="/admin"
                            onClick={closeSidebar}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-100 transition-colors duration-300 text-red-600 font-semibold ${isActive ? "underline" : ""
                                }`
                            }
                        >
                            <ShieldCheckIcon className="h-5 w-5" />
                            Admin Dashboard
                        </NavLink>
                    )}
                </nav>
            </aside>
        </>
    );
}
