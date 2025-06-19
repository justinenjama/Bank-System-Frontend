import {
    Bars3Icon,
    XMarkIcon,
    BellIcon,
    UserCircleIcon,
    ArrowRightStartOnRectangleIcon,
    CheckIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useNotifications } from '../../common/NotificationProvider';
import { Popover } from '@headlessui/react';
import { useState } from 'react';

interface HeaderProps {
    sidebarOpen: boolean;
    toggleSidebar: () => void;
}

const getRelativeTime = (timestamp: string): string => {
    const now = new Date();
    const date = new Date(timestamp);
    const diffMs = now.getTime() - date.getTime();
    const seconds = Math.floor(diffMs / 1000);

    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

    if (seconds < 60) return rtf.format(-seconds, 'second');
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return rtf.format(-minutes, 'minute');
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return rtf.format(-hours, 'hour');
    const days = Math.floor(hours / 24);
    return rtf.format(-days, 'day');
};

export default function Header({ sidebarOpen, toggleSidebar }: HeaderProps) {
    const { user, setUser } = useAuth();
    const { unreadCount, notifications, markAllAsRead, markAsRead } = useNotifications();
    const [open, setOpen] = useState(false);

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
                            <Popover className="relative">
                                <Popover.Button
                                    onClick={() => setOpen(!open)}
                                    className="relative focus:outline-none"
                                    title="Notifications"
                                >
                                    <BellIcon className="h-6 w-6" />
                                    {unreadCount > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                            {unreadCount > 99 ? '99+' : unreadCount}
                                        </span>
                                    )}
                                </Popover.Button>

                                <Popover.Panel className="absolute right-0 z-30 mt-2 w-80 bg-white text-black rounded-lg shadow-lg border border-gray-200">
                                    <div className="p-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-medium text-gray-800">Notifications</span>
                                            <button
                                                onClick={async () => {
                                                    await markAllAsRead();
                                                    setOpen(false);
                                                }}
                                                className="text-xs text-blue-600 hover:underline"
                                            >
                                                Mark all as read
                                            </button>
                                        </div>
                                        <ul className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
                                            {notifications.length === 0 ? (
                                                <li className="text-gray-500 text-sm">No notifications</li>
                                            ) : (
                                                notifications.slice(0, 5).map((n) => (
                                                    <li
                                                        key={`${n.id}-${n.createdAt}`}
                                                        className={`p-3 rounded flex justify-between items-start gap-2 ${
                                                            !n.read ? 'bg-yellow-100' : 'bg-gray-100'
                                                        }`}
                                                    >
                                                        <div>
                                                            <div className="text-sm text-gray-800">{n.message}</div>
                                                            <div className="text-xs text-gray-500">{getRelativeTime(n.createdAt)}</div>
                                                        </div>
                                                        {!n.read && (
                                                            <button
                                                                title="Mark as read"
                                                                onClick={() => markAsRead(n.id)}
                                                                className="text-blue-500 hover:text-green-600"
                                                            >
                                                                <CheckIcon className="h-4 w-4" />
                                                            </button>
                                                        )}
                                                    </li>
                                                ))
                                            )}
                                        </ul>
                                        <div className="mt-3 text-center">
                                            <Link
                                                to="/notifications"
                                                className="text-blue-600 text-sm hover:underline"
                                                onClick={() => setOpen(false)}
                                            >
                                                View all
                                            </Link>
                                        </div>
                                    </div>
                                </Popover.Panel>
                            </Popover>

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
