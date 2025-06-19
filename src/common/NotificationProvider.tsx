import React, {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
    useCallback,
} from "react";
import {
    getUserNotifications,
    getUnreadNotifications,
    markNotificationsAsRead,
} from "../service/Service";
import { useAuth } from "../components/AuthContext";
import { toast } from "react-toastify";
import { BellAlertIcon } from "@heroicons/react/24/outline";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

type Notification = {
    id: number;
    message: string;
    read: boolean;
    createdAt: string;
};

type NotificationContextType = {
    notifications: Notification[];
    unreadCount: number;
    markAllAsRead: () => Promise<void>;
    markAsRead: (id: number) => Promise<void>;
    refetchNotifications: () => Promise<void>;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);
const notificationSound = new Audio("/sounds/notification.mp3");

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuth();
    const userId = user?.id;

    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState<number>(0);
    const stompClientRef = useRef<Client | null>(null);

    const fetchNotifications = useCallback(async () => {
        if (!userId) return;
        try {
            const res = await getUserNotifications(userId, 0, 10);
            const unread = await getUnreadNotifications(userId);
            setNotifications(res.notifications.content ?? []);
            setUnreadCount(unread.length ?? 0);
        } catch (err) {
            toast.error("Failed to fetch notifications.");
            console.error("Fetch error:", err);
        }
    }, [userId]);

    const playAlert = (message: string) => {
        toast.info(
            <div className="flex items-start gap-2">
                <BellAlertIcon className="h-5 w-5 text-blue-600 mt-1" />
                <span className="text-sm">{message}</span>
            </div>,
            {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            }
        );

        notificationSound.play().catch(err =>
            console.warn("⚠️ Notification sound failed", err)
        );

        if (navigator.vibrate) {
            navigator.vibrate([200, 100, 200]);
        }
    };

    useEffect(() => {
        if (!userId) return;

        fetchNotifications();

        const client = new Client({
            webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
            reconnectDelay: 5000,
            onConnect: () => {
                console.log("🔌 STOMP connected");
                client.subscribe(`/topic/notifications/${userId}`, (message) => {
                    try {
                        const notification: Notification = JSON.parse(message.body);
                        setNotifications((prev) => [notification, ...prev]);
                        setUnreadCount((prev) => prev + 1);
                        playAlert(notification.message);
                    } catch (e) {
                        console.error("Invalid STOMP message", e);
                    }
                });
            },
            onStompError: (frame) => {
                console.error("STOMP error:", frame);
            },
        });

        stompClientRef.current = client;
        client.activate();

        return () => {
            client.deactivate();
        };
    }, [userId, fetchNotifications]);

    const markAllAsRead = useCallback(async () => {
        const unreadIds = notifications.filter(n => !n.read).map(n => n.id);
        if (unreadIds.length === 0) return;
        try {
            await markNotificationsAsRead(unreadIds);
            await fetchNotifications();
        } catch (err) {
            toast.error("Failed to mark all as read.");
            console.error("Mark all as read error:", err);
        }
    }, [notifications, fetchNotifications]);

    const markAsRead = useCallback(async (id: number) => {
        try {
            await markNotificationsAsRead([id]);
            await fetchNotifications();
        } catch (err) {
            toast.error("Failed to mark notification as read.");
            console.error("Mark as read error:", err);
        }
    }, [fetchNotifications]);

    return (
        <NotificationContext.Provider
            value={{
                notifications,
                unreadCount,
                markAllAsRead,
                markAsRead,
                refetchNotifications: fetchNotifications,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotifications = () => {
    const ctx = useContext(NotificationContext);
    if (!ctx) throw new Error("useNotifications must be used within NotificationProvider");
    return ctx;
};
