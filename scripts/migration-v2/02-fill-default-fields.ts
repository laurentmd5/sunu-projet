import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Summary = {
  tasksPriorityFilled: number;
  projectsStatusFilled: number;
  teamsParentReset: number;
  tasksMilestoneCleared: number;
  tasksTeamCleared: number;
  projectUsersInviteTokenCleared: number;
  activityLogsMetadataCleared: number;
};

async function main() {
  console.log("=== V2 backfill: fill default fields ===");

  const summary: Summary = {
    tasksPriorityFilled: 0,
    projectsStatusFilled: 0,
    teamsParentReset: 0,
    tasksMilestoneCleared: 0,
    tasksTeamCleared: 0,
    projectUsersInviteTokenCleared: 0,
    activityLogsMetadataCleared: 0,
  };

  await prisma.$transaction(async (tx) => {
    // 1) Task.priority -> MEDIUM si NULL
    const tasksWithoutPriority = await tx.$queryRaw<Array<{ count: bigint }>>`
      SELECT COUNT(*) as count
      FROM Task
      WHERE priority IS NULL
    `;
    summary.tasksPriorityFilled = Number(tasksWithoutPriority[0]?.count ?? 0);

    await tx.$executeRawUnsafe(`
      UPDATE Task
      SET priority = 'MEDIUM'
      WHERE priority IS NULL
    `);

    // 2) Project.status -> ACTIVE si NULL
    const projectsWithoutStatus = await tx.$queryRaw<Array<{ count: bigint }>>`
      SELECT COUNT(*) as count
      FROM Project
      WHERE status IS NULL
    `;
    summary.projectsStatusFilled = Number(projectsWithoutStatus[0]?.count ?? 0);

    await tx.$executeRawUnsafe(`
      UPDATE Project
      SET status = 'ACTIVE'
      WHERE status IS NULL
    `);

    // 3) Team.parentId -> NULL pour repartir sur une hiérarchie propre
    const teamsWithParentBefore = await tx.team.count({
      where: {
        parentId: {
          not: null,
        },
      },
    });

    await tx.team.updateMany({
      data: {
        parentId: null,
      },
    });

    summary.teamsParentReset = teamsWithParentBefore;

    // 4) Task.milestoneId -> NULL
    const milestoneLinkedTasksBefore = await tx.task.count({
      where: {
        milestoneId: {
          not: null,
        },
      },
    });

    await tx.task.updateMany({
      where: {
        milestoneId: {
          not: null,
        },
      },
      data: {
        milestoneId: null,
      },
    });

    summary.tasksMilestoneCleared = milestoneLinkedTasksBefore;

    // 5) Task.teamId -> NULL
    const teamLinkedTasksBefore = await tx.task.count({
      where: {
        teamId: {
          not: null,
        },
      },
    });

    await tx.task.updateMany({
      where: {
        teamId: {
          not: null,
        },
      },
      data: {
        teamId: null,
      },
    });

    summary.tasksTeamCleared = teamLinkedTasksBefore;

    // 6) ProjectUser.inviteToken -> NULL
    const inviteTokensBefore = await tx.projectUser.count({
      where: {
        inviteToken: {
          not: null,
        },
      },
    });

    await tx.projectUser.updateMany({
      where: {
        inviteToken: {
          not: null,
        },
      },
      data: {
        inviteToken: null,
      },
    });

    summary.projectUsersInviteTokenCleared = inviteTokensBefore;

    // 7) ActivityLog.metadata -> NULL
    // Prisma peut être un peu sensible avec JSON null selon la version,
    // donc on passe par une requête SQL brute pour être robuste.
    const logsWithMetadata = await tx.$queryRaw<Array<{ count: bigint }>>`
      SELECT COUNT(*) as count
      FROM ActivityLog
      WHERE metadata IS NOT NULL
    `;
    summary.activityLogsMetadataCleared = Number(logsWithMetadata[0]?.count ?? 0);

    await tx.$executeRawUnsafe(`
      UPDATE ActivityLog
      SET metadata = NULL
      WHERE metadata IS NOT NULL
    `);
  });

  console.log("Backfill terminé.");
  console.log(JSON.stringify(summary, null, 2));

  // Vérifications finales simples
  const [
    tasksWithoutPriorityRaw,
    projectsWithoutStatusRaw,
    teamsWithParent,
    tasksWithMilestone,
    tasksWithTeam,
  ] = await Promise.all([
    prisma.$queryRaw<Array<{ count: bigint }>>`
      SELECT COUNT(*) as count
      FROM Task
      WHERE priority IS NULL
    `,
    prisma.$queryRaw<Array<{ count: bigint }>>`
      SELECT COUNT(*) as count
      FROM Project
      WHERE status IS NULL
    `,
    prisma.team.count({ where: { parentId: { not: null } } }),
    prisma.task.count({ where: { milestoneId: { not: null } } }),
    prisma.task.count({ where: { teamId: { not: null } } }),
  ]);

  const tasksWithoutPriority = Number(tasksWithoutPriorityRaw[0]?.count ?? 0);
  const projectsWithoutStatus = Number(projectsWithoutStatusRaw[0]?.count ?? 0);

  const remainingInviteTokens = await prisma.projectUser.count({
    where: {
      inviteToken: {
        not: null,
      },
    },
  });

  const remainingMetadata = await prisma.$queryRaw<Array<{ count: bigint }>>`
    SELECT COUNT(*) as count
    FROM ActivityLog
    WHERE metadata IS NOT NULL
  `;

  console.log("Vérifications finales:");
  console.log(
    JSON.stringify(
      {
        tasksWithoutPriority,
        projectsWithoutStatus,
        teamsWithParent,
        tasksWithMilestone,
        tasksWithTeam,
        remainingInviteTokens,
        activityLogsWithMetadata: Number(remainingMetadata[0]?.count ?? 0),
      },
      null,
      2
    )
  );
}

main()
  .catch((error) => {
    console.error("Erreur pendant le backfill:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
