import React, { createContext, useContext, useEffect, useState } from "react";
import { getUserNotifications, getUnreadNotifications, markNotificationsAsRead } from "../service/Service"
import { useAuth } from "../components/AuthContext";

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
    refetchNotifications: () => Promise<void>;
};

const NotificationContext = createContext<NotificationContextType | undefined>(
    undefined
);

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuth();
    const userId = user?.id;

    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);

    const fetchNotifications = async () => {
        if (!userId) return;

        try {
            const res = await getUserNotifications(userId, 0, 10);
            const unread = await getUnreadNotifications(userId);

            setNotifications(res.notifications);
            setUnreadCount(unread.length);
        } catch (err) {
            console.error("Failed to fetch notifications", err);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, [userId]);

    const markAllAsRead = async () => {
        const unreadIds = notifications.filter(n => !n.read).map(n => n.id);
        if (unreadIds.length > 0) {
            await markNotificationsAsRead(unreadIds);
            await fetchNotifications();
        }
    };

    return (
        <NotificationContext.Provider
            value={{
                notifications,
                unreadCount,
                markAllAsRead,
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
