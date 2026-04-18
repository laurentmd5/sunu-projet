"use server";

import prisma from "@/lib/prisma";
import { NotificationType } from "@prisma/client";
import { getCurrentDbUser, ActionError } from "@/lib/permissions";

type NotificationRoutingType = "USER" | "SUBTEAM";

export type NotificationPayload = {
    projectId?: string;
    taskId?: string;
    meetingId?: string;
    teamId?: string;
    subteamId?: string;
    commentId?: string;
    actorUserId?: string;
    routingType?: NotificationRoutingType;
};

type CreateNotificationInput = {
    userId: string;
    type: NotificationType;
    title: string;
    message?: string | null;
    link?: string | null;
    metadata?: NotificationPayload | null;
};

function buildTaskLink(metadata?: NotificationPayload | null) {
    if (metadata?.taskId) {
        return `/task-details/${metadata.taskId}`;
    }

    if (metadata?.projectId) {
        return `/project/${metadata.projectId}`;
    }

    return null;
}

function buildMeetingLink(metadata?: NotificationPayload | null) {
    if (metadata?.meetingId) {
        return `/meetings/${metadata.meetingId}`;
    }

    if (metadata?.projectId) {
        return `/project/${metadata.projectId}`;
    }

    return null;
}

function buildNotificationLink(
    type: NotificationType,
    metadata?: NotificationPayload | null
) {
    switch (type) {
        case "TASK_ASSIGNED":
        case "TASK_REVIEW_REQUESTED":
        case "TASK_ROUTED_TO_USER":
        case "TASK_ROUTED_TO_SUBTEAM":
        case "TASK_ROUTING_CLEARED":
        case "TASK_COMMENT_ADDED":
            return buildTaskLink(metadata);

        case "MEETING_INVITED":
        case "MEETING_UPDATED":
            return buildMeetingLink(metadata);

        case "MANAGER_ASSIGNED":
        case "VIEWER_INVITED":
        case "VIEWER_PERMISSIONS_UPDATED":
            return metadata?.projectId ? `/project/${metadata.projectId}` : null;

        default:
            return metadata?.projectId ? `/project/${metadata.projectId}` : null;
    }
}

export async function createNotification(input: CreateNotificationInput) {
    const resolvedLink =
        input.link !== undefined
            ? input.link
            : buildNotificationLink(input.type, input.metadata);

    return prisma.notification.create({
        data: {
            userId: input.userId,
            type: input.type,
            title: input.title,
            message: input.message ?? null,
            link: resolvedLink,
            metadata: input.metadata ?? undefined,
        },
    });
}

export async function createNotifications(inputs: CreateNotificationInput[]) {
    if (!inputs.length) {
        return [];
    }

    return prisma.$transaction(
        inputs.map((input) => {
            const resolvedLink =
                input.link !== undefined
                    ? input.link
                    : buildNotificationLink(input.type, input.metadata);

            return prisma.notification.create({
                data: {
                    userId: input.userId,
                    type: input.type,
                    title: input.title,
                    message: input.message ?? null,
                    link: resolvedLink,
                    metadata: input.metadata ?? undefined,
                },
            });
        })
    );
}

export async function getMyNotifications(limit = 20) {
    const user = await getCurrentDbUser();

    const safeLimit = Math.min(Math.max(limit, 1), 50);

    return prisma.notification.findMany({
        where: {
            userId: user.id,
        },
        orderBy: {
            createdAt: "desc",
        },
        take: safeLimit,
    });
}

export async function getUnreadNotificationsCount() {
    const user = await getCurrentDbUser();

    return prisma.notification.count({
        where: {
            userId: user.id,
            readAt: null,
        },
    });
}

export async function markNotificationAsRead(notificationId: string) {
    const user = await getCurrentDbUser();

    if (!notificationId?.trim()) {
        throw new ActionError("Notification invalide.", 400);
    }

    const notification = await prisma.notification.findUnique({
        where: { id: notificationId },
        select: {
            id: true,
            userId: true,
            readAt: true,
        },
    });

    if (!notification || notification.userId !== user.id) {
        throw new ActionError("Notification introuvable.", 404);
    }

    if (notification.readAt) {
        return {
            success: true,
            message: "Notification déjà marquée comme lue.",
        };
    }

    await prisma.notification.update({
        where: { id: notificationId },
        data: {
            readAt: new Date(),
        },
    });

    return {
        success: true,
        message: "Notification marquée comme lue.",
    };
}

export async function markNotificationAsUnread(notificationId: string) {
    const user = await getCurrentDbUser();

    if (!notificationId?.trim()) {
        throw new ActionError("Notification invalide.", 400);
    }

    const notification = await prisma.notification.findUnique({
        where: { id: notificationId },
        select: {
            id: true,
            userId: true,
            readAt: true,
        },
    });

    if (!notification || notification.userId !== user.id) {
        throw new ActionError("Notification introuvable.", 404);
    }

    if (!notification.readAt) {
        return {
            success: true,
            message: "Notification déjà non lue.",
        };
    }

    await prisma.notification.update({
        where: { id: notificationId },
        data: {
            readAt: null,
        },
    });

    return {
        success: true,
        message: "Notification marquée comme non lue.",
    };
}

export async function markAllNotificationsAsRead() {
    const user = await getCurrentDbUser();

    const result = await prisma.notification.updateMany({
        where: {
            userId: user.id,
            readAt: null,
        },
        data: {
            readAt: new Date(),
        },
    });

    return {
        success: true,
        message: "Toutes les notifications ont été marquées comme lues.",
        updatedCount: result.count,
    };
}
