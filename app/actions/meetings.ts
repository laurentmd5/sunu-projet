"use server";

import { randomBytes } from "crypto";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { ActionError, getCurrentDbUser } from "@/lib/permissions";
import {
  assertCanAddMeetingRecording,
  assertCanCreateMeetingInTeam,
  assertCanManageMeeting,
  assertCanReadMeeting,
  getMeetingAccessContext,
} from "@/lib/meeting-access";
import { revalidatePath } from "next/cache";
import { createNotifications } from "./notifications";

const createMeetingSchema = z.object({
    title: z
        .string()
        .trim()
        .min(2, "Le titre doit contenir au moins 2 caractères.")
        .max(120, "Le titre est trop long."),
    description: z
        .string()
        .trim()
        .max(2000, "La description est trop longue.")
        .optional()
        .or(z.literal("")),
    notes: z
        .string()
        .trim()
        .max(10000, "Le compte-rendu est trop long.")
        .optional()
        .or(z.literal("")),
    scheduledAt: z.coerce.date(),
    durationMinutes: z
        .number()
        .int()
        .positive("La durée doit être positive.")
        .max(1440, "La durée est invalide.")
        .nullable()
        .optional(),
    teamId: z.string().trim().min(1, "Équipe invalide."),
    projectId: z.string().trim().nullable().optional(),
    externalUrl: z
        .string()
        .trim()
        .url("Lien externe invalide.")
        .nullable()
        .optional()
        .or(z.literal("")),
    participantUserIds: z
        .array(z.string().trim().min(1, "Participant invalide."))
        .max(100, "Trop de participants.")
        .optional()
        .default([]),
});

const updateMeetingNotesSchema = z.object({
    meetingId: z.string().trim().min(1, "Réunion invalide."),
    notes: z
        .string()
        .trim()
        .max(10000, "Le compte-rendu est trop long."),
});

const updateMeetingStatusSchema = z.object({
    meetingId: z.string().trim().min(1, "Réunion invalide."),
    status: z.enum(["SCHEDULED", "COMPLETED", "CANCELLED"]),
});

const addMeetingRecordingSchema = z.object({
    meetingId: z.string().trim().min(1, "Réunion invalide."),
    title: z
        .string()
        .trim()
        .min(2, "Le titre doit contenir au moins 2 caractères.")
        .max(120, "Le titre est trop long."),
    url: z
        .string()
        .trim()
        .url("Lien d'enregistrement invalide."),
    description: z
        .string()
        .trim()
        .max(2000, "La description est trop longue.")
        .optional()
        .or(z.literal("")),
});

function normalizeOptionalString(value?: string | null) {
    if (!value) return null;
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : null;
}

function slugify(value: string) {
    return value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 40);
}

function buildJitsiRoomName(meetingTitle: string, meetingId: string) {
  const base = slugify(meetingTitle) || "meeting";
  const suffix = randomBytes(3).toString("hex");
  const shortId = meetingId.replace(/-/g, "").slice(0, 8);
  return `sunu-projets-${base}-${shortId}-${suffix}`;
}

function revalidateMeetingPaths(meetingId: string, teamId: string) {
  revalidatePath("/meetings");
  revalidatePath(`/meetings/${meetingId}`);
  revalidatePath(`/teams/${teamId}`);
}

async function assertParticipantsEligibleForMeeting(
    teamId: string,
    projectId: string,
    participantUserIds: string[]
) {
    if (!participantUserIds.length) {
        return [];
    }

    const memberships = await prisma.projectUser.findMany({
        where: {
            projectId,
            userId: {
                in: participantUserIds,
            },
        },
        select: {
            userId: true,
        },
    });

    const allowedUserIds = new Set(memberships.map((membership) => membership.userId));

    const invalidUserIds = participantUserIds.filter(
        (userId) => !allowedUserIds.has(userId)
    );

    if (invalidUserIds.length > 0) {
        throw new ActionError(
            "Tous les participants doivent appartenir au projet de la réunion.",
            400
        );
    }

    return Array.from(new Set(participantUserIds));
}

async function notifyMeetingParticipants(params: {
    participantUserIds: string[];
    actorUserId: string;
    type: "MEETING_INVITED" | "MEETING_UPDATED";
    title: string;
    message: string;
    projectId?: string | null;
    meetingId: string;
    teamId: string;
}) {
    const recipientIds = Array.from(
        new Set(
            params.participantUserIds.filter(
                (userId) => userId && userId !== params.actorUserId
            )
        )
    );

    if (!recipientIds.length) {
        return;
    }

    try {
        await createNotifications(
            recipientIds.map((userId) => ({
                userId,
                type: params.type,
                title: params.title,
                message: params.message,
                metadata: {
                    projectId: params.projectId ?? undefined,
                    meetingId: params.meetingId,
                    teamId: params.teamId,
                    actorUserId: params.actorUserId,
                },
            }))
        );
    } catch (error) {
        console.error("Erreur lors de la création des notifications réunion :", error);
    }
}

export async function createMeeting(input: {
    title: string;
    description?: string;
    notes?: string;
    scheduledAt: Date | string;
    durationMinutes?: number | null;
    teamId: string;
    projectId?: string | null;
    externalUrl?: string | null;
    participantUserIds?: string[];
}) {
    const parsed = createMeetingSchema.parse({
        ...input,
        durationMinutes: input.durationMinutes ?? null,
        projectId: input.projectId ?? null,
        externalUrl: input.externalUrl ?? null,
        participantUserIds: input.participantUserIds ?? [],
    });

    const { user, team, projectId: teamProjectId } =
        await assertCanCreateMeetingInTeam(parsed.teamId);

    if (parsed.projectId && parsed.projectId !== teamProjectId) {
        throw new ActionError(
            "Le projet sélectionné ne correspond pas au projet de l'équipe.",
            400
        );
    }

    const resolvedProjectId = parsed.projectId ?? null;

    const uniqueParticipantUserIds = await assertParticipantsEligibleForMeeting(
        parsed.teamId,
        teamProjectId,
        parsed.participantUserIds
    );

    const meeting = await prisma.teamMeeting.create({
        data: {
            title: parsed.title,
            description: normalizeOptionalString(parsed.description),
            notes: normalizeOptionalString(parsed.notes),
            scheduledAt: parsed.scheduledAt,
            durationMinutes: parsed.durationMinutes ?? null,
            teamId: parsed.teamId,
            projectId: resolvedProjectId,
            externalUrl: normalizeOptionalString(parsed.externalUrl),
            createdById: user.id,
            participants: {
                create: uniqueParticipantUserIds.map((participantUserId) => ({
                    userId: participantUserId,
                })),
            },
        },
        include: {
            team: true,
            project: true,
            createdBy: true,
            participants: {
                select: {
                    userId: true,
                },
            },
        },
    });

    await notifyMeetingParticipants({
        participantUserIds: uniqueParticipantUserIds,
        actorUserId: user.id,
        type: "MEETING_INVITED",
        title: "Invitation à une réunion",
        message: `${user.name} vous a invité à la réunion "${meeting.title}".`,
        projectId: meeting.projectId ?? teamProjectId,
        meetingId: meeting.id,
        teamId: meeting.teamId,
    });

    revalidatePath("/meetings");
    revalidatePath(`/teams/${parsed.teamId}`);
    revalidatePath(`/project/${teamProjectId}`);

    return meeting;
}

export async function getMeetingsForCurrentUser() {
  const user = await getCurrentDbUser();

  const memberships = await prisma.projectUser.findMany({
    where: { userId: user.id },
    select: {
      projectId: true,
      role: true,
      viewerPermissionGrants: {
        select: {
          permission: true,
        },
      },
    },
  });

  const readableProjectIds = memberships
    .filter((membership) => {
      if (membership.role !== "VIEWER") {
        return true;
      }

      return membership.viewerPermissionGrants.some(
        (grant) => grant.permission === "VIEW_MEETINGS"
      );
    })
    .map((membership) => membership.projectId);

  if (!readableProjectIds.length) {
    return [];
  }

  const meetings = await prisma.teamMeeting.findMany({
    where: {
      OR: [
        {
          projectId: {
            in: readableProjectIds,
          },
        },
        {
          projectId: null,
          team: {
            projectId: {
              in: readableProjectIds,
            },
          },
        },
      ],
    },
    include: {
      team: {
        select: {
          id: true,
          name: true,
        },
      },
      project: {
        select: {
          id: true,
          name: true,
        },
      },
      createdBy: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      meetingRecordings: {
        select: {
          id: true,
        },
      },
    },
    orderBy: {
      scheduledAt: "desc",
    },
  });

  return meetings;
}

export async function getTeamProjectsForMeeting(teamId: string) {
  const team = await prisma.team.findUnique({
    where: { id: teamId },
    select: {
      id: true,
      projectId: true,
    },
  });

  if (!team) {
    throw new ActionError("Équipe introuvable.", 404);
  }

  await getCurrentDbUser();
  const { assertCanReadProject } = await import("@/lib/permission-helpers");
  await assertCanReadProject(team.projectId);

  const projects = await prisma.project.findMany({
    where: {
      id: team.projectId,
    },
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  return projects;
}

export async function getMeetingDetails(meetingId: string) {
  await assertCanReadMeeting(meetingId);

  const meeting = await prisma.teamMeeting.findUnique({
    where: { id: meetingId },
    include: {
      team: {
        select: {
          id: true,
          name: true,
        },
      },
      project: {
        select: {
          id: true,
          name: true,
        },
      },
      createdBy: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      participants: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        orderBy: {
          createdAt: "asc",
        },
      },
      meetingRecordings: {
        include: {
          addedBy: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!meeting) {
    throw new ActionError("Réunion introuvable.", 404);
  }

  return meeting;
}

export async function updateMeetingNotes(meetingId: string, notes: string) {
  const parsed = updateMeetingNotesSchema.parse({ meetingId, notes });

  const user = await getCurrentDbUser();
  const ctx = await assertCanManageMeeting(parsed.meetingId);

  const updatedMeeting = await prisma.teamMeeting.update({
    where: { id: parsed.meetingId },
    data: {
      notes: parsed.notes,
    },
    include: {
      team: true,
      project: true,
      createdBy: true,
    },
  });

  const participantUserIds = await prisma.meetingParticipant.findMany({
    where: { meetingId: parsed.meetingId },
    select: { userId: true },
  });

  await notifyMeetingParticipants({
    participantUserIds: participantUserIds.map((participant) => participant.userId),
    actorUserId: user.id,
    type: "MEETING_UPDATED",
    title: "Réunion mise à jour",
    message: `Le compte-rendu de la réunion "${updatedMeeting.title}" a été mis à jour.`,
    projectId: updatedMeeting.projectId ?? ctx.projectId,
    meetingId: updatedMeeting.id,
    teamId: updatedMeeting.teamId,
  });

  revalidateMeetingPaths(parsed.meetingId, ctx.teamId);
  revalidatePath(`/project/${ctx.projectId}`);

  return updatedMeeting;
}

export async function updateMeetingStatus(
  meetingId: string,
  status: "SCHEDULED" | "COMPLETED" | "CANCELLED"
) {
  const parsed = updateMeetingStatusSchema.parse({ meetingId, status });

  const user = await getCurrentDbUser();
  const ctx = await assertCanManageMeeting(parsed.meetingId);

  const updatedMeeting = await prisma.teamMeeting.update({
    where: { id: parsed.meetingId },
    data: {
      status: parsed.status,
    },
    include: {
      team: true,
      project: true,
      createdBy: true,
    },
  });

  const participantUserIds = await prisma.meetingParticipant.findMany({
    where: { meetingId: parsed.meetingId },
    select: { userId: true },
  });

  await notifyMeetingParticipants({
    participantUserIds: participantUserIds.map((participant) => participant.userId),
    actorUserId: user.id,
    type: "MEETING_UPDATED",
    title: "Réunion mise à jour",
    message: `Le statut de la réunion "${updatedMeeting.title}" est maintenant "${updatedMeeting.status}".`,
    projectId: updatedMeeting.projectId ?? ctx.projectId,
    meetingId: updatedMeeting.id,
    teamId: updatedMeeting.teamId,
  });

  revalidateMeetingPaths(parsed.meetingId, ctx.teamId);
  revalidatePath(`/project/${ctx.projectId}`);

  return updatedMeeting;
}

export async function generateJitsiMeetingLink(meetingId: string) {
  const ctx = await assertCanManageMeeting(meetingId);
  const meeting = ctx.meeting;

  if (meeting.status === "CANCELLED") {
    throw new ActionError(
      "Impossible de générer un lien Jitsi pour une réunion annulée.",
      400
    );
  }

  if (meeting.externalUrl && meeting.provider === "JITSI") {
    return {
      success: true,
      message: "Un lien Jitsi existe déjà pour cette réunion.",
      externalUrl: meeting.externalUrl,
    };
  }

  const roomName = buildJitsiRoomName(meeting.title, meeting.id);
  const externalUrl = `https://meet.jit.si/${roomName}`;

  const updatedMeeting = await prisma.teamMeeting.update({
    where: { id: meeting.id },
    data: {
      provider: "JITSI",
      externalUrl,
    },
    include: {
      team: true,
      project: true,
      createdBy: true,
    },
  });

  const user = await getCurrentDbUser();

  const participantUserIds = await prisma.meetingParticipant.findMany({
    where: { meetingId: meeting.id },
    select: { userId: true },
  });

  await notifyMeetingParticipants({
    participantUserIds: participantUserIds.map((participant) => participant.userId),
    actorUserId: user.id,
    type: "MEETING_UPDATED",
    title: "Lien de réunion disponible",
    message: `Le lien de visioconférence de la réunion "${updatedMeeting.title}" est désormais disponible.`,
    projectId: updatedMeeting.projectId ?? ctx.projectId,
    meetingId: updatedMeeting.id,
    teamId: updatedMeeting.teamId,
  });

  revalidateMeetingPaths(meeting.id, meeting.teamId);
  revalidatePath(`/project/${ctx.projectId}`);

  return {
    success: true,
    message: "Lien Jitsi généré avec succès.",
    meeting: updatedMeeting,
    externalUrl,
  };
}

export async function regenerateJitsiMeetingLink(meetingId: string) {
  const ctx = await assertCanManageMeeting(meetingId);
  const meeting = ctx.meeting;

  if (meeting.status === "CANCELLED") {
    throw new ActionError(
      "Impossible de régénérer un lien Jitsi pour une réunion annulée.",
      400
    );
  }

  const roomName = buildJitsiRoomName(meeting.title, meeting.id);
  const externalUrl = `https://meet.jit.si/${roomName}`;

  const updatedMeeting = await prisma.teamMeeting.update({
    where: { id: meeting.id },
    data: {
      provider: "JITSI",
      externalUrl,
    },
    include: {
      team: true,
      project: true,
      createdBy: true,
    },
  });

  const user = await getCurrentDbUser();

  const participantUserIds = await prisma.meetingParticipant.findMany({
    where: { meetingId: meeting.id },
    select: { userId: true },
  });

  await notifyMeetingParticipants({
    participantUserIds: participantUserIds.map((participant) => participant.userId),
    actorUserId: user.id,
    type: "MEETING_UPDATED",
    title: "Lien de réunion mis à jour",
    message: `Le lien de visioconférence de la réunion "${updatedMeeting.title}" a été régénéré.`,
    projectId: updatedMeeting.projectId ?? ctx.projectId,
    meetingId: updatedMeeting.id,
    teamId: updatedMeeting.teamId,
  });

  revalidateMeetingPaths(meeting.id, meeting.teamId);
  revalidatePath(`/project/${ctx.projectId}`);

  return {
    success: true,
    message: "Lien Jitsi régénéré avec succès.",
    meeting: updatedMeeting,
    externalUrl,
  };
}

export async function removeMeetingVideoLink(meetingId: string) {
  const ctx = await assertCanManageMeeting(meetingId);
  const meeting = ctx.meeting;

  const updatedMeeting = await prisma.teamMeeting.update({
    where: { id: meeting.id },
    data: {
      provider: "NONE",
      externalUrl: null,
    },
    include: {
      team: true,
      project: true,
      createdBy: true,
    },
  });

  const user = await getCurrentDbUser();

  const participantUserIds = await prisma.meetingParticipant.findMany({
    where: { meetingId: meeting.id },
    select: { userId: true },
  });

  await notifyMeetingParticipants({
    participantUserIds: participantUserIds.map((participant) => participant.userId),
    actorUserId: user.id,
    type: "MEETING_UPDATED",
    title: "Lien de réunion retiré",
    message: `Le lien de visioconférence de la réunion "${updatedMeeting.title}" a été retiré.`,
    projectId: updatedMeeting.projectId ?? ctx.projectId,
    meetingId: updatedMeeting.id,
    teamId: updatedMeeting.teamId,
  });

  revalidateMeetingPaths(meeting.id, meeting.teamId);
  revalidatePath(`/project/${ctx.projectId}`);

  return {
    success: true,
    message: "Lien de visioconférence supprimé avec succès.",
    meeting: updatedMeeting,
  };
}

export async function getMeetingRecordings(meetingId: string) {
  await assertCanReadMeeting(meetingId);

  return prisma.meetingRecording.findMany({
    where: { meetingId },
    include: {
      addedBy: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function addMeetingRecording(input: {
  meetingId: string;
  title: string;
  url: string;
  description?: string;
}) {
  const parsed = addMeetingRecordingSchema.parse(input);
  const user = await getCurrentDbUser();
  const ctx = await assertCanAddMeetingRecording(parsed.meetingId);

  const recording = await prisma.meetingRecording.create({
    data: {
      meetingId: parsed.meetingId,
      title: parsed.title,
      url: parsed.url,
      description: normalizeOptionalString(parsed.description),
      addedById: user.id,
    },
    include: {
      addedBy: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  revalidateMeetingPaths(parsed.meetingId, ctx.teamId);
  revalidatePath(`/project/${ctx.projectId}`);

  return {
    success: true,
    message: "Enregistrement ajouté avec succès.",
    recording,
  };
}

export async function removeMeetingRecording(recordingId: string) {
  if (!recordingId?.trim()) {
    throw new ActionError("Enregistrement invalide.", 400);
  }

  const recording = await prisma.meetingRecording.findUnique({
    where: { id: recordingId },
    include: {
      meeting: {
        select: {
          id: true,
          teamId: true,
        },
      },
    },
  });

  if (!recording) {
    throw new ActionError("Enregistrement introuvable.", 404);
  }

  const ctx = await assertCanAddMeetingRecording(recording.meeting.id);

  await prisma.meetingRecording.delete({
    where: { id: recordingId },
  });

  revalidateMeetingPaths(recording.meeting.id, recording.meeting.teamId);
  revalidatePath(`/project/${ctx.projectId}`);

  return {
    success: true,
    message: "Enregistrement supprimé avec succès.",
  };
}