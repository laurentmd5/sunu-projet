"use client";

import {
    getMyNotifications,
    getUnreadNotificationsCount,
    markAllNotificationsAsRead,
    markNotificationAsRead,
} from "@/app/actions";
import { NotificationItem } from "@/type";
import { Bell, CheckCheck } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

function formatNotificationDate(value: Date | string) {
    const date = new Date(value);
    return new Intl.DateTimeFormat("fr-FR", {
        dateStyle: "short",
        timeStyle: "short",
    }).format(date);
}

const NotificationBell = () => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [markingAll, setMarkingAll] = useState(false);
    const [notifications, setNotifications] = useState<NotificationItem[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);

    const containerRef = useRef<HTMLDivElement | null>(null);

    const loadNotifications = async () => {
        try {
            setLoading(true);

            const [items, count] = await Promise.all([
                getMyNotifications(20),
                getUnreadNotificationsCount(),
            ]);

            setNotifications(items as NotificationItem[]);
            setUnreadCount(count);
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Erreur lors du chargement des notifications."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadNotifications();
    }, []);

    useEffect(() => {
        if (!open) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);

    const handleToggle = async () => {
        const nextOpen = !open;
        setOpen(nextOpen);

        if (nextOpen) {
            await loadNotifications();
        }
    };

    const handleMarkOneAsRead = async (notificationId: string) => {
        try {
            await markNotificationAsRead(notificationId);

            setNotifications((prev) =>
                prev.map((notification) =>
                    notification.id === notificationId
                        ? { ...notification, readAt: new Date().toISOString() }
                        : notification
                )
            );

            setUnreadCount((prev) => Math.max(0, prev - 1));
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Impossible de marquer la notification comme lue."
            );
        }
    };

    const handleMarkAllAsRead = async () => {
        try {
            setMarkingAll(true);
            const result = await markAllNotificationsAsRead();

            setNotifications((prev) =>
                prev.map((notification) => ({
                    ...notification,
                    readAt: notification.readAt ?? new Date().toISOString(),
                }))
            );
            setUnreadCount(0);

            if (result.updatedCount > 0) {
                toast.success("Toutes les notifications ont été marquées comme lues.");
            }
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Impossible de tout marquer comme lu."
            );
        } finally {
            setMarkingAll(false);
        }
    };

    return (
        <div className="relative" ref={containerRef}>
            <button
                type="button"
                className="btn btn-sm btn-ghost relative"
                onClick={handleToggle}
                aria-label="Ouvrir les notifications"
            >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-primary text-primary-content text-[10px] flex items-center justify-center font-bold">
                        {unreadCount > 99 ? "99+" : unreadCount}
                    </span>
                )}
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-[22rem] max-w-[calc(100vw-2rem)] rounded-2xl border border-base-300 bg-base-100 shadow-xl z-50">
                    <div className="flex items-center justify-between p-4 border-b border-base-300">
                        <div>
                            <h3 className="font-semibold">Notifications</h3>
                            <p className="text-xs opacity-70">
                                {unreadCount} non lue{unreadCount > 1 ? "s" : ""}
                            </p>
                        </div>

                        <button
                            type="button"
                            className="btn btn-ghost btn-xs"
                            onClick={handleMarkAllAsRead}
                            disabled={markingAll || unreadCount === 0}
                        >
                            <CheckCheck className="w-3 h-3" />
                            Tout lire
                        </button>
                    </div>

                    <div className="max-h-[28rem] overflow-y-auto">
                        {loading ? (
                            <div className="p-4 text-sm opacity-70">Chargement...</div>
                        ) : notifications.length === 0 ? (
                            <div className="p-4 text-sm opacity-70">
                                Aucune notification pour le moment.
                            </div>
                        ) : (
                            <div className="flex flex-col">
                                {notifications.map((notification) => {
                                    const isUnread = !notification.readAt;

                                    const content = (
                                        <div
                                            className={`p-4 border-b border-base-300 last:border-b-0 transition-colors ${
                                                isUnread ? "bg-base-200/60" : "bg-base-100"
                                            } hover:bg-base-200`}
                                        >
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="min-w-0">
                                                    <div className="flex items-center gap-2">
                                                        <p className="font-medium text-sm truncate">
                                                            {notification.title}
                                                        </p>
                                                        {isUnread && (
                                                            <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                                                        )}
                                                    </div>

                                                    {notification.message && (
                                                        <p className="text-sm opacity-80 mt-1 line-clamp-2">
                                                            {notification.message}
                                                        </p>
                                                    )}

                                                    <p className="text-xs opacity-60 mt-2">
                                                        {formatNotificationDate(notification.createdAt)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );

                                    if (notification.link) {
                                        return (
                                            <Link
                                                key={notification.id}
                                                href={notification.link}
                                                onClick={() => {
                                                    if (isUnread) {
                                                        void handleMarkOneAsRead(notification.id);
                                                    }
                                                    setOpen(false);
                                                }}
                                            >
                                                {content}
                                            </Link>
                                        );
                                    }

                                    return (
                                        <button
                                            key={notification.id}
                                            type="button"
                                            className="text-left w-full"
                                            onClick={() => {
                                                if (isUnread) {
                                                    void handleMarkOneAsRead(notification.id);
                                                }
                                            }}
                                        >
                                            {content}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationBell;
