import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Summary = {
  tasksTodoToTodo: number;
  tasksInProgressToInProgress: number;
  tasksDoneToDone: number;
  teamManagerToOwner: number;
  teamOwnerKept: number;
  teamMemberKept: number;
};

async function main() {
  console.log("=== V2 backfill: normalize statuses and team roles ===");

  const summary: Summary = {
    tasksTodoToTodo: 0,
    tasksInProgressToInProgress: 0,
    tasksDoneToDone: 0,
    teamManagerToOwner: 0,
    teamOwnerKept: 0,
    teamMemberKept: 0,
  };

  await prisma.$transaction(async (tx) => {
    // 1) Task.status : "To Do" -> "TODO"
    const todoResult = await tx.task.updateMany({
      where: {
        status: "To Do" as any,
      },
      data: {
        status: "TODO" as any,
      },
    });
    summary.tasksTodoToTodo = todoResult.count;

    // 2) Task.status : "In Progress" -> "IN_PROGRESS"
    const inProgressResult = await tx.task.updateMany({
      where: {
        status: "In Progress" as any,
      },
      data: {
        status: "IN_PROGRESS" as any,
      },
    });
    summary.tasksInProgressToInProgress = inProgressResult.count;

    // 3) Task.status : "Done" -> "DONE"
    const doneResult = await tx.task.updateMany({
      where: {
        status: "Done" as any,
      },
      data: {
        status: "DONE" as any,
      },
    });
    summary.tasksDoneToDone = doneResult.count;

    // 4) TeamMember.role : MANAGER -> OWNER
    const managerResult = await tx.teamMember.updateMany({
      where: {
        role: "MANAGER" as any,
      },
      data: {
        role: "OWNER" as any,
      },
    });
    summary.teamManagerToOwner = managerResult.count;

    // 5) Comptage informatif des rôles déjà conformes
    summary.teamOwnerKept = await tx.teamMember.count({
      where: {
        role: "OWNER" as any,
      },
    });

    summary.teamMemberKept = await tx.teamMember.count({
      where: {
        role: "MEMBER" as any,
      },
    });
  });

  console.log("Backfill terminé.");
  console.log(JSON.stringify(summary, null, 2));

  // Vérification simple post-script
  const remainingLegacyTaskStatuses = await prisma.task.groupBy({
    by: ["status"],
    _count: {
      status: true,
    },
  });

  const remainingTeamRoles = await prisma.teamMember.groupBy({
    by: ["role"],
    _count: {
      role: true,
    },
  });

  console.log("Répartition finale Task.status:");
  console.log(JSON.stringify(remainingLegacyTaskStatuses, null, 2));

  console.log("Répartition finale TeamMember.role:");
  console.log(JSON.stringify(remainingTeamRoles, null, 2));
}

main()
  .catch((error) => {
    console.error("Erreur pendant le backfill:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
