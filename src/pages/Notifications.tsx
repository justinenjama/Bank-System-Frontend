import React, { useState, useEffect, useRef, useCallback } from 'react';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Footer from '../components/layout/Footer';
import { ArrowPathIcon, FunnelIcon } from '@heroicons/react/24/outline';
import Spinner from '../components/Spinner';
import { useAuth } from '../components/AuthContext';
import { getUserNotifications, markNotificationsAsRead } from '../service/Service';
import { Client, type IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

import toast, { Toaster } from 'react-hot-toast';

interface Notification {
    id: number;
    message: string;
    createdAt: string;
    category: string;
    status: 'READ' | 'UNREAD';
}

type FilterType = 'ALL' | 'UNREAD' | 'READ';

const PAGE_SIZE = 20;

const Notifications: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const closeSidebar = () => setSidebarOpen(false);

    const { user } = useAuth();
    const userId = user?.id;

    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<FilterType>('ALL');
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const containerRef = useRef<HTMLDivElement>(null);
    const seenIds = useRef<Set<number>>(new Set());
    const stompClient = useRef<Client | null>(null);

    const formatDate = (dateStr: string) =>
        new Intl.DateTimeFormat('en-KE', {
            dateStyle: 'medium',
            timeStyle: 'short',
        }).format(new Date(dateStr));

    useEffect(() => {
        if ('Notification' in window && Notification.permission !== 'granted') {
            Notification.requestPermission();
        }
    }, []);

    const fetchNotifications = useCallback(
        async (pageNum: number) => {
            if (!userId) return;

            setLoading(true);
            setError(null);
            try {
                const data = await getUserNotifications(userId, pageNum, PAGE_SIZE);
                const notificationsPage: Notification[] = data.notifications || [];
                console.log(data.notifications);
                if (pageNum + 1 >= data.totalPages) setHasMore(false);
                else setHasMore(true);

                const newNotifications = notificationsPage.filter((n) => !seenIds.current.has(n.id));
                newNotifications.forEach((n) => seenIds.current.add(n.id));

                if (pageNum === 0) {
                    setNotifications(newNotifications);
                } else {
                    setNotifications((prev) => [...prev, ...newNotifications]);
                }
            } catch (err: any) {
                setError(err.message || 'Failed to load notifications');
            } finally {
                setLoading(false);
            }
        },
        [userId]
    );

    useEffect(() => {
        if (userId) {
            seenIds.current.clear();
            setPage(0);
            setHasMore(true);
            fetchNotifications(0);
        } else {
            setNotifications([]);
            setHasMore(false);
        }
    }, [userId, fetchNotifications]);

    useEffect(() => {
        const onScroll = () => {
            if (!containerRef.current || loading || !hasMore) return;

            const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
            if (scrollHeight - scrollTop <= clientHeight + 50) {
                setPage((prev) => prev + 1);
            }
        };

        const container = containerRef.current;
        container?.addEventListener('scroll', onScroll);
        return () => container?.removeEventListener('scroll', onScroll);
    }, [loading, hasMore]);

    useEffect(() => {
        if (page === 0) return;
        fetchNotifications(page);
    }, [page, fetchNotifications]);

    useEffect(() => {
        if (!userId) return;

        const socket = new SockJS('http://localhost:8080/ws');
        const client = new Client({
            webSocketFactory: () => socket as any,
            debug: () => { },
            reconnectDelay: 5000,
            onConnect: () => {
                client.subscribe(`/topic/notification/${userId}`, (msg: IMessage) => {
                    const newNotification: Notification = JSON.parse(msg.body);
                    if (!seenIds.current.has(newNotification.id)) {
                        seenIds.current.add(newNotification.id);

                        toast.success(`New ${newNotification.category} notification: ${newNotification.message}`);

                        if ('Notification' in window && Notification.permission === 'granted') {
                            new Notification('New Notification', {
                                body: newNotification.message,
                            });
                        }

                        setNotifications((prev) => [newNotification, ...prev]);
                    }
                });
            },
        });

        client.activate();
        stompClient.current = client;

        return () => {
            client.deactivate();
        };
    }, [userId]);

    useEffect(() => {
        if (filter === 'UNREAD') {
            const unreadIds = notifications.filter((n) => n.status === 'UNREAD').map((n) => n.id);
            if (unreadIds.length === 0) return;

            const markUnreadRead = async () => {
                try {
                    await markNotificationsAsRead(unreadIds);
                    setNotifications((prev) =>
                        prev.map((n) => (unreadIds.includes(n.id) ? { ...n, status: 'READ' } : n))
                    );
                } catch (err) {
                    console.error('Failed to mark unread notifications as read:', err);
                }
            };

            markUnreadRead();
        }
    }, [filter, notifications]);

    const filteredNotifications = notifications.filter((n) => {
        if (filter === 'ALL') return true;
        if (filter === 'UNREAD') return n.status === 'UNREAD';
        if (filter === 'READ') return n.status === 'READ';
        return true;
    });

    const unreadCount = notifications.filter((n) => n.status === 'UNREAD').length;
    localStorage.setItem('unreadCount', unreadCount.toString());

    const markAllAsRead = async () => {
        const unreadIds = notifications.filter((n) => n.status === 'UNREAD').map((n) => n.id);
        if (unreadIds.length === 0) return;

        setLoading(true);
        try {
            await markNotificationsAsRead(unreadIds);
            setNotifications((prev) =>
                prev.map((n) => (unreadIds.includes(n.id) ? { ...n, status: 'READ' } : n))
            );
        } catch (err: any) {
            setError(err.message || 'Failed to mark notifications as read');
        } finally {
            setLoading(false);
        }
    };

    const refreshNotifications = () => {
        seenIds.current.clear();
        setPage(0);
        setHasMore(true);
        fetchNotifications(0);
    };

    return (
        <div className="h-screen flex flex-col">
            <Toaster position="top-right" />

            <div className="fixed top-0 left-0 right-0 z-50 h-[64px]">
                <Header sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            </div>

            <div className="flex flex-1 pt-[64px] pb-[60px] overflow-hidden">
                <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />

                <main
                    ref={containerRef}
                    className="flex-1 overflow-y-auto bg-gray-200 p-6 space-y-6 custom-scrollbar"
                    role="main"
                    aria-label="Notifications page"
                >
                    <h2 className="text-3xl font-bold">Notifications</h2>

                    <div className="mb-4 flex items-center space-x-3 text-gray-700 text-sm font-semibold">
                        <FunnelIcon className="h-5 w-5 text-gray-600" aria-hidden="true" />
                        <label htmlFor="filter-select" className="sr-only">
                            Select notification filter
                        </label>
                        <select
                            id="filter-select"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value as FilterType)}
                            className="rounded border border-gray-300 bg-white py-1.5 px-3 shadow-sm focus:border-primary focus:ring-primary focus:outline-none"
                            aria-label="Notification filter"
                        >
                            <option value="ALL">All</option>
                            <option value="UNREAD">Unread ({unreadCount})</option>
                            <option value="READ">Read</option>
                        </select>

                        <button
                            onClick={markAllAsRead}
                            disabled={unreadCount === 0 || loading}
                            title="Mark all as read"
                            className="ml-auto rounded px-3 py-1 hover:bg-gray-100 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Mark All As Read
                        </button>

                        <button
                            onClick={refreshNotifications}
                            title="Refresh notifications"
                            className="rounded p-1 hover:bg-gray-100"
                            aria-label="Refresh notifications"
                            disabled={loading}
                        >
                            <ArrowPathIcon className={`h-5 w-5 text-gray-600 ${loading ? 'animate-spin' : ''}`} />
                        </button>
                    </div>

                    <div role="list" aria-label="Notification list" tabIndex={0}>
                        {filteredNotifications.length === 0 && !loading && (
                            <p className="text-center text-gray-500">No notifications</p>
                        )}

                        {filteredNotifications.map(({ id, category, message, createdAt, status }) => (
                            <div
                                key={id}
                                role="listitem"
                                className={`mb-4 rounded-2xl bg-white p-6 shadow-md hover:shadow-lg transition dark:bg-gray-900 ${status === 'UNREAD' ? 'bg-gray-100 font-semibold' : ''
                                    }`}
                            >
                                <p className="text-xl font-bold text-green-600">{category}</p>
                                <p className="mb-3">{message}</p>
                                <p className="text-xs text-gray-400">{formatDate(createdAt)}</p>

                            </div>
                        ))}

                        {loading && (
                            <div className="mt-2 flex justify-center">
                                <Spinner />
                            </div>
                        )}

                        {error && (
                            <p className="mt-2 text-center text-red-600" role="alert">
                                {error}
                            </p>
                        )}
                    </div>
                </main>
            </div>

            <div className="fixed bottom-0 left-0 right-0 z-50 h-[60px]">
                <Footer />
            </div>
        </div>
    );
};

export default Notifications;
