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
    },
  });

  if (!meeting) {
    throw new ActionError("Réunion introuvable.", 404);
  }

  const resolvedProjectId = meeting.projectId ?? meeting.team.projectId;

  if (!resolvedProjectId) {
    throw new ActionError(
      "Réunion invalide : aucun projet de référence n'a pu être résolu.",
      400
    );
  }

  return {
    user,
    meeting,
    teamId: meeting.teamId,
    projectId: resolvedProjectId,
  };
}

export async function assertCanReadMeeting(meetingId: string) {
  const ctx = await getMeetingAccessContext(meetingId);
  await assertCanReadMeetings(ctx.projectId);
  return ctx;
}

export async function assertCanJoinMeeting(meetingId: string) {
  const ctx = await getMeetingAccessContext(meetingId);
  await assertCanJoinMeetings(ctx.projectId);
  return ctx;
}

export async function assertCanManageMeeting(meetingId: string) {
  const ctx = await getMeetingAccessContext(meetingId);
  await assertProjectCapability(ctx.projectId, "UPDATE_MEETING");
  return ctx;
}

export async function assertCanAddMeetingRecording(meetingId: string) {
  const ctx = await getMeetingAccessContext(meetingId);
  await assertProjectCapability(ctx.projectId, "ADD_MEETING_RECORDING");
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
