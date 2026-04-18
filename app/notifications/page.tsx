"use client";

import {
    getMyNotifications,
    getUnreadNotificationsCount,
    markAllNotificationsAsRead,
    markNotificationAsRead,
} from "@/app/actions";
import EmptyState from "@/app/components/EmptyState";
import Wrapper from "@/app/components/Wrapper";
import { NotificationItem, NotificationType } from "@/type";
import {
    Bell,
    CheckCheck,
    ClipboardCheck,
    Eye,
    FolderKanban,
    MessageSquare,
    Route,
    ShieldCheck,
    Users,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

type NotificationFilter = "ALL" | "UNREAD";

function formatNotificationDate(value: Date | string) {
    const date = new Date(value);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();

    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;

    if (diffMs < minute) {
        return "À l'instant";
    }

    if (diffMs < hour) {
        const minutes = Math.floor(diffMs / minute);
        return `Il y a ${minutes} min`;
    }

    if (diffMs < day) {
        const hours = Math.floor(diffMs / hour);
        return `Il y a ${hours} h`;
    }

    if (diffMs < 7 * day) {
        const days = Math.floor(diffMs / day);
        return `Il y a ${days} j`;
    }

    return new Intl.DateTimeFormat("fr-FR", {
        dateStyle: "short",
        timeStyle: "short",
    }).format(date);
}

function getNotificationTypeLabel(type: NotificationType) {
    switch (type) {
        case "TASK_ASSIGNED":
            return "Tâche assignée";
        case "TASK_REVIEW_REQUESTED":
            return "Revue demandée";
        case "TASK_ROUTED_TO_USER":
            return "Redistribution vers membre";
        case "TASK_ROUTED_TO_SUBTEAM":
            return "Redistribution vers sous-équipe";
        case "TASK_ROUTING_CLEARED":
            return "Redistribution retirée";
        case "TASK_COMMENT_ADDED":
            return "Commentaire";
        case "MANAGER_ASSIGNED":
            return "Nomination manager";
        case "VIEWER_INVITED":
            return "Accès observateur";
        case "VIEWER_PERMISSIONS_UPDATED":
            return "Permissions observateur";
        case "MEETING_INVITED":
            return "Invitation réunion";
        case "MEETING_UPDATED":
            return "Réunion mise à jour";
        default:
            return "Notification";
    }
}

function getNotificationTypeIcon(type: NotificationType) {
    switch (type) {
        case "TASK_ASSIGNED":
            return <ClipboardCheck className="w-5 h-5" />;
        case "TASK_REVIEW_REQUESTED":
            return <Eye className="w-5 h-5" />;
        case "TASK_ROUTED_TO_USER":
        case "TASK_ROUTED_TO_SUBTEAM":
        case "TASK_ROUTING_CLEARED":
            return <Route className="w-5 h-5" />;
        case "TASK_COMMENT_ADDED":
            return <MessageSquare className="w-5 h-5" />;
        case "MANAGER_ASSIGNED":
            return <ShieldCheck className="w-5 h-5" />;
        case "VIEWER_INVITED":
        case "VIEWER_PERMISSIONS_UPDATED":
            return <Users className="w-5 h-5" />;
        case "MEETING_INVITED":
        case "MEETING_UPDATED":
            return <FolderKanban className="w-5 h-5" />;
        default:
            return <Bell className="w-5 h-5" />;
    }
}

export default function NotificationsPage() {
    const [loading, setLoading] = useState(true);
    const [markingAll, setMarkingAll] = useState(false);
    const [notifications, setNotifications] = useState<NotificationItem[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [filter, setFilter] = useState<NotificationFilter>("ALL");

    const loadNotifications = async () => {
        try {
            setLoading(true);

            const [items, count] = await Promise.all([
                getMyNotifications(50),
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
        void loadNotifications();
    }, []);

    const filteredNotifications = useMemo(() => {
        const sorted = [...notifications].sort(
            (a, b) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        if (filter === "UNREAD") {
            return sorted.filter((notification) => !notification.readAt);
        }

        return sorted;
    }, [notifications, filter]);

    const handleMarkOneAsRead = async (notificationId: string) => {
        try {
            const targetNotification = notifications.find(
                (notification) => notification.id === notificationId
            );

            if (!targetNotification || targetNotification.readAt) {
                return;
            }

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
        <Wrapper>
            <div className="space-y-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Notifications</h1>
                        <p className="text-sm opacity-70 mt-1">
                            {unreadCount} notification{unreadCount > 1 ? "s" : ""} non lue
                            {unreadCount > 1 ? "s" : ""}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <button
                            type="button"
                            className={`btn btn-sm ${
                                filter === "ALL" ? "btn-primary" : "btn-ghost"
                            }`}
                            onClick={() => setFilter("ALL")}
                        >
                            Toutes
                        </button>

                        <button
                            type="button"
                            className={`btn btn-sm ${
                                filter === "UNREAD" ? "btn-primary" : "btn-ghost"
                            }`}
                            onClick={() => setFilter("UNREAD")}
                        >
                            Non lues
                        </button>

                        <button
                            type="button"
                            className="btn btn-sm btn-ghost"
                            onClick={() => void handleMarkAllAsRead()}
                            disabled={markingAll || unreadCount === 0}
                        >
                            <CheckCheck className="w-4 h-4" />
                            Tout marquer comme lu
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="p-6 border border-base-300 rounded-2xl">
                        <p className="text-sm opacity-70">Chargement...</p>
                    </div>
                ) : filteredNotifications.length === 0 ? (
                    <EmptyState
                        imageSrc="/empty-task.png"
                        imageAlt="Aucune notification"
                        message={
                            filter === "UNREAD"
                                ? "Aucune notification non lue"
                                : "Aucune notification pour le moment"
                        }
                    />
                ) : (
                    <div className="flex flex-col gap-4">
                        {filteredNotifications.map((notification) => {
                            const isUnread = !notification.readAt;

                            const cardContent = (
                                <div
                                    className={`border rounded-2xl p-4 transition-colors ${
                                        isUnread
                                            ? "border-primary/30 bg-base-200/50"
                                            : "border-base-300 bg-base-100"
                                    } hover:bg-base-200`}
                                >
                                    <div className="flex gap-4">
                                        <div
                                            className={`shrink-0 rounded-full p-3 ${
                                                isUnread
                                                    ? "bg-primary/15 text-primary"
                                                    : "bg-base-200 text-base-content/70"
                                            }`}
                                        >
                                            {getNotificationTypeIcon(notification.type)}
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h2 className="font-semibold">
                                                    {notification.title}
                                                </h2>
                                                {isUnread && (
                                                    <span className="badge badge-primary badge-sm">
                                                        Non lue
                                                    </span>
                                                )}
                                            </div>

                                            <p className="text-xs uppercase tracking-wide opacity-60 mt-1">
                                                {getNotificationTypeLabel(notification.type)}
                                            </p>

                                            {notification.message && (
                                                <p className="text-sm opacity-80 mt-3 whitespace-pre-wrap">
                                                    {notification.message}
                                                </p>
                                            )}

                                            <div className="flex flex-wrap items-center gap-3 mt-4">
                                                <span className="text-xs opacity-60">
                                                    {formatNotificationDate(notification.createdAt)}
                                                </span>

                                                {notification.link && (
                                                    <span className="text-xs opacity-60">
                                                        Lien disponible
                                                    </span>
                                                )}
                                            </div>

                                            <div className="flex flex-wrap gap-2 mt-4">
                                                {notification.link ? (
                                                    <Link
                                                        href={notification.link}
                                                        className="btn btn-sm btn-primary"
                                                        onClick={() => {
                                                            if (isUnread) {
                                                                void handleMarkOneAsRead(notification.id);
                                                            }
                                                        }}
                                                    >
                                                        Ouvrir
                                                    </Link>
                                                ) : null}

                                                {isUnread && (
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-ghost"
                                                        onClick={() =>
                                                            void handleMarkOneAsRead(notification.id)
                                                        }
                                                    >
                                                        Marquer comme lue
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );

                            return (
                                <div key={notification.id}>
                                    {cardContent}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </Wrapper>
    );
}
