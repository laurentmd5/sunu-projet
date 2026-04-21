"use server";

import prisma from "@/lib/prisma";
import { ActionError } from "@/lib/permissions-core";
import {
  assertCanCreateMeeting,
  assertCanJoinMeetings,
  assertCanReadMeetings,
} from "@/lib/permission-helpers";
import { assertProjectCapability } from "@/lib/project-capabilities";
import { getCurrentDbUser } from "@/lib/project-access";

export async function getMeetingAccessContext(meetingId: string) {
  const user = await getCurrentDbUser();

  const meeting = await prisma.teamMeeting.findUnique({
    where: { id: meetingId },
    select: {
      id: true,
      title: true,
      teamId: true,
      projectId: true,
      status: true,
      provider: true,
      externalUrl: true,
      createdById: true,
      team: {
        select: {
          id: true,
          name: true,
          projectId: true,
        },
      },
      participants: {
        select: {
          userId: true,
        },
      },
    },
  });

  if (!meeting) {
    throw new ActionError("Réunion introuvable.", 404);
  }

  const resolvedProjectId = meeting.projectId ?? meeting.team?.projectId ?? null;
  const participantUserIds = new Set(meeting.participants.map((p) => p.userId));
  const isStandalone = !resolvedProjectId;
  const isCreator = meeting.createdById === user.id;
  const isParticipant = participantUserIds.has(user.id);

  return {
    user,
    meeting,
    teamId: meeting.teamId ?? null,
    projectId: resolvedProjectId,
    isStandalone,
    isCreator,
    isParticipant,
  };
}

export async function assertCanReadMeeting(meetingId: string) {
  const ctx = await getMeetingAccessContext(meetingId);

  if (ctx.projectId) {
    await assertCanReadMeetings(ctx.projectId);
    return ctx;
  }

  if (!ctx.isCreator && !ctx.isParticipant) {
    throw new ActionError("Accès refusé à cette réunion.", 403);
  }

  return ctx;
}

export async function assertCanJoinMeeting(meetingId: string) {
  const ctx = await getMeetingAccessContext(meetingId);

  if (ctx.projectId) {
    await assertCanJoinMeetings(ctx.projectId);
    return ctx;
  }

  if (!ctx.isCreator && !ctx.isParticipant) {
    throw new ActionError("Vous ne pouvez pas rejoindre cette réunion.", 403);
  }

  return ctx;
}

export async function assertCanManageMeeting(meetingId: string) {
  const ctx = await getMeetingAccessContext(meetingId);

  if (ctx.projectId) {
    await assertProjectCapability(ctx.projectId, "UPDATE_MEETING");
    return ctx;
  }

  if (!ctx.isCreator) {
    throw new ActionError("Vous ne pouvez pas modifier cette réunion.", 403);
  }

  return ctx;
}

export async function assertCanAddMeetingRecording(meetingId: string) {
  const ctx = await getMeetingAccessContext(meetingId);

  if (ctx.projectId) {
    await assertProjectCapability(ctx.projectId, "ADD_MEETING_RECORDING");
    return ctx;
  }

  if (!ctx.isCreator) {
    throw new ActionError(
      "Vous ne pouvez pas ajouter d'enregistrement à cette réunion.",
      403
    );
  }

  return ctx;
}

export async function assertCanCreateMeetingInTeam(teamId: string) {
  const user = await getCurrentDbUser();

  const team = await prisma.team.findUnique({
    where: { id: teamId },
    select: {
      id: true,
      name: true,
      projectId: true,
    },
  });

  if (!team) {
    throw new ActionError("Équipe introuvable.", 404);
  }

  await assertCanCreateMeeting(team.projectId);

  return {
    user,
    team,
    projectId: team.projectId,
  };
}

export async function assertCanCreateMeetingInProject(projectId: string) {
  const user = await getCurrentDbUser();

  const project = await prisma.project.findUnique({
    where: { id: projectId },
    select: {
      id: true,
      name: true,
      createdById: true,
    },
  });

  if (!project) {
    throw new ActionError("Projet introuvable.", 404);
  }

  await assertCanCreateMeeting(projectId);

  return {
    user,
    project,
    projectId: project.id,
  };
}