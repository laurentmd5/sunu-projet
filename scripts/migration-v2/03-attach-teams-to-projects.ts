import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type LegacyProjectTeamRow = {
  projectId: string;
  teamId: string | null;
};

type TeamRow = {
  id: string;
  name: string;
  projectId: string | null;
  parentId: string | null;
};

type ProjectRow = {
  id: string;
  name: string;
};

type Summary = {
  totalTeams: number;
  alreadyAttached: number;
  attachedFromLegacyProjectTeamId: number;
  attachedFromSingleProjectFallback: number;
  unresolvedTeams: number;
};

async function legacyProjectTeamIdColumnExists(tx: PrismaClient | any): Promise<boolean> {
  const result = await tx.$queryRaw<Array<{ COLUMN_NAME: string }>>`
    SELECT COLUMN_NAME
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'Project'
      AND COLUMN_NAME = 'teamId'
  `;
  return result.length > 0;
}

async function main() {
  console.log("=== V2 backfill: attach teams to projects ===");

  const summary: Summary = {
    totalTeams: 0,
    alreadyAttached: 0,
    attachedFromLegacyProjectTeamId: 0,
    attachedFromSingleProjectFallback: 0,
    unresolvedTeams: 0,
  };

  await prisma.$transaction(async (tx) => {
    const teams = await tx.team.findMany({
      select: {
        id: true,
        name: true,
        projectId: true,
        parentId: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    const projects = await tx.project.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    summary.totalTeams = teams.length;

    if (teams.length === 0) {
      console.log("Aucune équipe à rattacher.");
      return;
    }

    const singleProjectFallback = projects.length === 1 ? projects[0] : null;

    const hasLegacyProjectTeamId = await legacyProjectTeamIdColumnExists(tx);

    const legacyLinks: LegacyProjectTeamRow[] = hasLegacyProjectTeamId
      ? await tx.$queryRawUnsafe(`
          SELECT id AS projectId, teamId
          FROM Project
        `)
      : [];

    const teamIdToProjectIds = new Map<string, string[]>();

    for (const row of legacyLinks) {
      if (!row.teamId) continue;
      const current = teamIdToProjectIds.get(row.teamId) ?? [];
      current.push(row.projectId);
      teamIdToProjectIds.set(row.teamId, current);
    }

    const unresolved: Array<{ id: string; name: string; reason: string }> = [];

    for (const team of teams as TeamRow[]) {
      // déjà rattachée
      if (team.projectId) {
        summary.alreadyAttached++;
        continue;
      }

      const candidateProjectIds = teamIdToProjectIds.get(team.id) ?? [];
      const uniqueCandidateProjectIds = [...new Set(candidateProjectIds)];

      // cas 1 : ancien lien Project.teamId unique
      if (uniqueCandidateProjectIds.length === 1) {
        await tx.team.update({
          where: { id: team.id },
          data: {
            projectId: uniqueCandidateProjectIds[0],
            parentId: null,
          },
        });

        summary.attachedFromLegacyProjectTeamId++;
        continue;
      }

      // cas 2 : aucun lien historique mais un seul projet dans la base
      if (uniqueCandidateProjectIds.length === 0 && singleProjectFallback) {
        await tx.team.update({
          where: { id: team.id },
          data: {
            projectId: singleProjectFallback.id,
            parentId: null,
          },
        });

        summary.attachedFromSingleProjectFallback++;
        continue;
      }

      // cas 3 : ambigu ou non résolu
      if (uniqueCandidateProjectIds.length > 1) {
        unresolved.push({
          id: team.id,
          name: team.name,
          reason: `Plusieurs projets candidats: ${uniqueCandidateProjectIds.join(", ")}`,
        });
      } else {
        unresolved.push({
          id: team.id,
          name: team.name,
          reason: "Aucun projet candidat trouvé et aucun fallback unique possible",
        });
      }
    }

    summary.unresolvedTeams = unresolved.length;

    if (unresolved.length > 0) {
      console.log("Équipes non résolues:");
      console.log(JSON.stringify(unresolved, null, 2));
    }
  });

  console.log("Backfill terminé.");
  console.log(JSON.stringify(summary, null, 2));

  const teamsWithoutProject = await prisma.$queryRaw<
    Array<{ id: string; name: string; projectId: string | null; parentId: string | null }>
  >`
    SELECT id, name, projectId, parentId
    FROM Team
    WHERE projectId IS NULL
    ORDER BY createdAt ASC
  `;

  console.log("Équipes encore sans projet:");
  console.log(JSON.stringify(teamsWithoutProject, null, 2));
}

main()
  .catch((error) => {
    console.error("Erreur pendant le backfill:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
