import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Footer from '../components/layout/Footer';
import BannerImg from '../assets/img/banner_2.png';
import AccountsOverview from '../components/AccountsOverview/AccountsOverview';
import RecentTransactions from '../components/shared/RecentTransactions';
import StatementDrawer from '../components/overlays/StatementDrawer'; // ✅ Import drawer
import {
    CreditCard,
    FileText,
    LayoutDashboard,
    PiggyBank,
    Receipt,
    Users,
    Wallet,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showStatementDrawer, setShowStatementDrawer] = useState(false); // ✅ drawer state

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const closeSidebar = () => setSidebarOpen(false);

    const cardData = [
        {
            title: 'Statement',
            icon: <FileText className="w-6 h-6 text-blue-600" />,
            onClick: () => setShowStatementDrawer(true), // ✅ open drawer
        },
        {
            title: 'Agent Account',
            icon: <Users className="w-6 h-6 text-green-600" />,
            link: '/agent-account',
        },
        {
            title: 'Till Account',
            icon: <Wallet className="w-6 h-6 text-purple-600" />,
            link: '/till-account',
        },
        {
            title: 'Saving Account',
            icon: <PiggyBank className="w-6 h-6 text-yellow-600" />,
            link: '/saving-account',
        },
        {
            title: 'Paybill Account',
            icon: <Receipt className="w-6 h-6 text-pink-600" />,
            link: '/paybill-account',
        },
        {
            title: 'Check Account',
            icon: <CreditCard className="w-6 h-6 text-red-600" />,
            link: '/check-account',
        },
        {
            title: 'All Accounts Dashboard',
            icon: <LayoutDashboard className="w-6 h-6 text-indigo-600" />,
            link: '/dashboard',
        },
    ];

    return (
        <div className="h-screen flex flex-col">
            <div className="fixed top-0 left-0 right-0 z-50 h-[64px]">
                <Header sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            </div>

            <div className="flex flex-1 pt-[64px] pb-[60px] overflow-hidden">
                <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
                <main className="flex-1 overflow-y-auto bg-gray-200 p-4 md:p-6 custom-scrollbar">

                    {/* Banner */}
                    <div className="relative w-full h-48 md:h-56 mb-6 rounded-lg overflow-hidden">
                        <img src={BannerImg} alt="Bank Offer" className="absolute inset-0 w-full h-full object-cover" />
                    </div>

                    {/* Cards */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                        {cardData.map((card, index) =>
                            card.link ? (
                                <Link to={card.link} key={index}>
                                    <div className="flex flex-col items-start justify-start gap-2 bg-white dark:bg-gray-800 p-4 rounded-xl shadow hover:shadow-md transition-all duration-300">
                                        <div>{card.icon}</div>
                                        <h3 className="text-base font-semibold text-gray-800 dark:text-white">{card.title}</h3>
                                    </div>
                                </Link>
                            ) : (
                                <div
                                    key={index}
                                    onClick={card.onClick}
                                    className="cursor-pointer flex flex-col items-start justify-start gap-2 bg-white dark:bg-gray-800 p-4 rounded-xl shadow hover:shadow-md transition-all duration-300"
                                >
                                    <div>{card.icon}</div>
                                    <h3 className="text-base font-semibold text-gray-800 dark:text-white">{card.title}</h3>
                                </div>
                            )
                        )}
                    </div>

                    {/* Overview + Transactions */}
                    <AccountsOverview />
                    <RecentTransactions />
                </main>
            </div>

            <div className="fixed bottom-0 left-0 right-0 z-50 h-[60px]">
                <Footer />
            </div>

            {/* ✅ Statement Drawer Mount */}
            <StatementDrawer isOpen={showStatementDrawer} onClose={() => setShowStatementDrawer(false)} />
        </div>
    );
};

export default Home;
