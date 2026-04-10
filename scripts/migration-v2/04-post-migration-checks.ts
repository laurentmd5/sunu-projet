import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type CheckReport = {
  ok: boolean;
  checks: {
    projectsWithoutStatus: number;
    tasksWithoutPriority: number;
    teamsWithoutProject: number;
    teamsWithParent: number;
    tasksWithLegacyStatus: number;
    teamMembersWithLegacyManagerRole: number;
    tasksWithMissingProject: number;
    teamsWithMissingProjectReference: number;
    taskMilestonesDangling: number;
    taskTeamsDangling: number;
  };
  distributions: {
    projectStatus: Array<{ status: string | null; count: number }>;
    taskStatus: Array<{ status: string | null; count: number }>;
    taskPriority: Array<{ priority: string | null; count: number }>;
    teamMemberRole: Array<{ role: string | null; count: number }>;
  };
  warnings: string[];
};

async function main() {
  console.log("=== V2 checks: post-migration validation ===");

  const [
    projectsWithoutStatus,
    tasksWithoutPriority,
    teamsWithoutProject,
    teamsWithParent,
    tasksWithLegacyStatus,
    teamMembersWithLegacyManagerRole,
    tasksWithMissingProject,
    teamsWithMissingProjectReference,
    taskMilestonesDangling,
    taskTeamsDangling,
    projectStatusRows,
    taskStatusRows,
    taskPriorityRows,
    teamMemberRoleRows,
  ] = await Promise.all([
    prisma.project.count({
      where: { status: null },
    }),

    prisma.task.count({
      where: { priority: null },
    }),

    prisma.team.count({
      where: { projectId: null },
    }),

    prisma.team.count({
      where: { parentId: { not: null } },
    }),

    prisma.task.count({
      where: {
        status: {
          in: ["To Do", "In Progress", "Done"] as any,
        },
      },
    }),

    prisma.teamMember.count({
      where: {
        role: "MANAGER" as any,
      },
    }),

    prisma.$queryRaw<Array<{ count: bigint }>>`
      SELECT COUNT(*) as count
      FROM Task t
      LEFT JOIN Project p ON p.id = t.projectId
      WHERE p.id IS NULL
    `.then((rows) => Number(rows[0]?.count ?? 0)),

    prisma.$queryRaw<Array<{ count: bigint }>>`
      SELECT COUNT(*) as count
      FROM Team t
      LEFT JOIN Project p ON p.id = t.projectId
      WHERE t.projectId IS NOT NULL
        AND p.id IS NULL
    `.then((rows) => Number(rows[0]?.count ?? 0)),

    prisma.$queryRaw<Array<{ count: bigint }>>`
      SELECT COUNT(*) as count
      FROM Task t
      LEFT JOIN Milestone m ON m.id = t.milestoneId
      WHERE t.milestoneId IS NOT NULL
        AND m.id IS NULL
    `.then((rows) => Number(rows[0]?.count ?? 0)),

    prisma.$queryRaw<Array<{ count: bigint }>>`
      SELECT COUNT(*) as count
      FROM Task t
      LEFT JOIN Team tm ON tm.id = t.teamId
      WHERE t.teamId IS NOT NULL
        AND tm.id IS NULL
    `.then((rows) => Number(rows[0]?.count ?? 0)),

    prisma.project.groupBy({
      by: ["status"],
      _count: { status: true },
    }),

    prisma.task.groupBy({
      by: ["status"],
      _count: { status: true },
    }),

    prisma.task.groupBy({
      by: ["priority"],
      _count: { priority: true },
    }),

    prisma.teamMember.groupBy({
      by: ["role"],
      _count: { role: true },
    }),
  ]);

  const report: CheckReport = {
    ok: true,
    checks: {
      projectsWithoutStatus,
      tasksWithoutPriority,
      teamsWithoutProject,
      teamsWithParent,
      tasksWithLegacyStatus,
      teamMembersWithLegacyManagerRole,
      tasksWithMissingProject,
      teamsWithMissingProjectReference,
      taskMilestonesDangling,
      taskTeamsDangling,
    },
    distributions: {
      projectStatus: projectStatusRows.map((row) => ({
        status: row.status as string | null,
        count: row._count.status,
      })),
      taskStatus: taskStatusRows.map((row) => ({
        status: row.status as string | null,
        count: row._count.status,
      })),
      taskPriority: taskPriorityRows.map((row) => ({
        priority: row.priority as string | null,
        count: row._count.priority,
      })),
      teamMemberRole: teamMemberRoleRows.map((row) => ({
        role: row.role as string | null,
        count: row._count.role,
      })),
    },
    warnings: [],
  };

  if (projectsWithoutStatus > 0) {
    report.ok = false;
    report.warnings.push("Des projets n'ont pas de status.");
  }

  if (tasksWithoutPriority > 0) {
    report.ok = false;
    report.warnings.push("Des tâches n'ont pas de priorité.");
  }

  if (teamsWithoutProject > 0) {
    report.ok = false;
    report.warnings.push("Des équipes ne sont pas rattachées à un projet.");
  }

  if (tasksWithLegacyStatus > 0) {
    report.ok = false;
    report.warnings.push("Des tâches ont encore un statut legacy.");
  }

  if (teamMembersWithLegacyManagerRole > 0) {
    report.ok = false;
    report.warnings.push("Des TeamMember ont encore le rôle MANAGER.");
  }

  if (tasksWithMissingProject > 0) {
    report.ok = false;
    report.warnings.push("Des tâches pointent vers un projet introuvable.");
  }

  if (teamsWithMissingProjectReference > 0) {
    report.ok = false;
    report.warnings.push("Des équipes pointent vers un projet introuvable.");
  }

  if (taskMilestonesDangling > 0) {
    report.ok = false;
    report.warnings.push("Des tâches référencent un milestone introuvable.");
  }

  if (taskTeamsDangling > 0) {
    report.ok = false;
    report.warnings.push("Des tâches référencent une équipe introuvable.");
  }

  if (teamsWithParent > 0) {
    report.warnings.push(
      "Des équipes ont déjà un parent. Ce n'est pas forcément invalide, mais inattendu à ce stade du backfill."
    );
  }

  console.log(JSON.stringify(report, null, 2));

  if (!report.ok) {
    console.error("❌ Checks post-migration KO. Ne pas lancer le resserrage final.");
    process.exitCode = 1;
    return;
  }

  console.log("✅ Checks post-migration OK. Tu peux passer au resserrage final.");
}

main()
  .catch((error) => {
    console.error("Erreur pendant les checks:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });