import {
    Bars3Icon,
    XMarkIcon,
    BellIcon,
    UserCircleIcon,
    ArrowRightStartOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useNotifications } from '../../common/NotificationProvider';

interface HeaderProps {
    sidebarOpen: boolean;
    toggleSidebar: () => void;
}

export default function Header({ sidebarOpen, toggleSidebar }: HeaderProps) {
    const { user, setUser } = useAuth();
    const { unreadCount } = useNotifications();

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('role');
        setUser(null);
        window.location.href = '/login';
    };

    const username =
        user && ('firstName' in user && 'otherName' in user)
            ? `${(user as any).firstName} ${(user as any).otherName}`
            : localStorage.getItem('username') || 'Guest';

    return (
        <header className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md z-20">
            <div className="flex items-center gap-4">
                <button className="md:hidden" onClick={toggleSidebar} aria-label="Toggle sidebar">
                    {sidebarOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                </button>
                <div className="text-lg font-bold tracking-wide">Justine Bank</div>
            </div>
            <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-6 text-white">
                    {user ? (
                        <>
                            <Link to="/notifications" title="Notifications" className="relative">
                                <BellIcon className="h-6 w-6" />
                                {unreadCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                        {unreadCount > 99 ? '99+' : unreadCount}
                                    </span>
                                )}
                            </Link>
                            <Link to="/profile" title="Profile">
                                <UserCircleIcon className="h-6 w-6 cursor-pointer" />
                            </Link>
                            <button
                                onClick={logout}
                                className="hover:bg-red-700 bg-red-500 p-1 rounded transition duration-200"
                                title="Logout"
                            >
                                <ArrowRightStartOnRectangleIcon className="h-6 w-6 text-white" />
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="hover:underline text-white font-semibold">Login</Link>
                            <Link to="/signup" className="hover:underline text-white font-semibold">Signup</Link>
                        </>
                    )}
                </div>
                {user && (
                    <div className="text-sm font-semibold text-white select-none">
                        <span>Welcome, {username}</span>
                    </div>
                )}
            </div>
        </header>
    );
}
