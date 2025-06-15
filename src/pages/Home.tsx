import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Footer from '../components/layout/Footer';
import BannerImg from '../assets/img/banner_2.png';
import AccountsOverview from '../components/AccountsOverview/AccountsOverview';
import RecentTransactions from '../components/shared/RecentTransactions';

const Home: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const closeSidebar = () => setSidebarOpen(false);

    return (
        <div className="h-screen flex flex-col">
            <div className="fixed top-0 left-0 right-0 z-50 h-[64px]">
                <Header sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            </div>

            <div className="flex flex-1 pt-[64px] pb-[60px] overflow-hidden">
                <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
                <main className="flex-1 overflow-y-auto bg-gray-200 p-6 custom-scrollbar">
                    <div className="relative w-full h-48 md:h-56 mb-8 mt-8 rounded-lg overflow-hidden text-left">
                        <img src={BannerImg} alt="Bank Offer" className="absolute inset-0 w-full h-full object-cover" />
                    </div>
                    <AccountsOverview />
                    <RecentTransactions />
                </main>
            </div>
            <div className="fixed bottom-0 left-0 right-0 z-50 h-[60px]">
                <Footer />
            </div>
        </div>
    );
};

export default Home;
