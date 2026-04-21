"use server";

import prisma from "@/lib/prisma";
import { getCurrentDbUser } from "@/lib/project-access";
import {
  buildProjectAlerts,
  computeProjectHealth,
  computeProjectProgressPercent,
  isTaskDueSoon,
  isTaskOverdue,
} from "@/lib/dashboard";
import { OwnerDashboardOverview, OwnerDashboardProjectCard } from "@/type";

export async function getOwnerDashboardOverview(): Promise<OwnerDashboardOverview> {
  const user = await getCurrentDbUser();
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const projects = await prisma.project.findMany({
    where: {
      createdById: user.id,
    },
    select: {
      id: true,
      name: true,
      status: true,
      startDate: true,
      endDate: true,
      users: {
        select: {
          userId: true,
        },
      },
      tasks: {
        select: {
          id: true,
          status: true,
          dueDate: true,
          milestoneId: true,
        },
      },
      milestones: {
        select: {
          id: true,
          targetDate: true,
          status: true,
          tasks: {
            select: {
              id: true,
              status: true,
            },
          },
        },
      },
      activityLogs: {
        where: {
          createdAt: {
            gte: sevenDaysAgo,
          },
        },
        select: {
          id: true,
          type: true,
          message: true,
          createdAt: true,
          actorUserId: true,
          actor: {
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
    orderBy: {
      createdAt: "desc",
    },
  });

  const cards: OwnerDashboardProjectCard[] = projects.map((project) => {
    const totalTasks = project.tasks.length;
    const completedTasks = project.tasks.filter((t) => t.status === "DONE").length;
    const activeTasks = project.tasks.filter(
      (t) => t.status !== "DONE" && t.status !== "CANCELLED"
    ).length;

    const activeTasksWithDueDate = project.tasks.filter(
      (t) => t.dueDate && t.status !== "DONE" && t.status !== "CANCELLED"
    ).length;

    const overdueTasks = project.tasks.filter((t) =>
      isTaskOverdue(t.dueDate, t.status, now)
    ).length;

    const dueSoonTasks = project.tasks.filter((t) =>
      isTaskDueSoon(t.dueDate, t.status, now)
    ).length;

    const membersCount = project.users.length;

    const activeMembersSet = new Set(
      project.activityLogs.map((log) => log.actorUserId)
    );
    const activeMembers7d = activeMembersSet.size;
    const inactiveMembersCount = Math.max(0, membersCount - activeMembers7d);

    const progressPercent = computeProjectProgressPercent(completedTasks, totalTasks);

    const health = computeProjectHealth({
      overdueTasks,
      activeTasksWithDueDate,
      activeMembers7d,
      membersCount,
      progressPercent,
      startDate: project.startDate,
      endDate: project.endDate,
      now,
    });

    const milestonesAtRiskCount = project.milestones.filter((milestone) => {
      if (!milestone.targetDate || milestone.status === "COMPLETED") return false;

      const totalMilestoneTasks = milestone.tasks.length;
      const doneMilestoneTasks = milestone.tasks.filter((t) => t.status === "DONE").length;
      const milestoneProgress =
        totalMilestoneTasks > 0
          ? Math.round((doneMilestoneTasks / totalMilestoneTasks) * 100)
          : 0;

      const target = new Date(milestone.targetDate).getTime();
      const remaining = target - now.getTime();

      return remaining <= 0 || (remaining <= 3 * 24 * 60 * 60 * 1000 && milestoneProgress < 50);
    }).length;

    const alerts = buildProjectAlerts({
      overdueTasks,
      dueSoonTasks,
      inactiveMembersCount,
      milestonesAtRiskCount,
      healthColor: health.healthColor,
    });

    return {
      projectId: project.id,
      projectName: project.name,
      projectStatus: project.status as "ACTIVE" | "COMPLETED" | "ARCHIVED" | "ON_HOLD",
      startDate: project.startDate,
      endDate: project.endDate,
      membersCount,
      activeMembers7d,
      totalTasks,
      activeTasks,
      completedTasks,
      overdueTasks,
      dueSoonTasks,
      progressPercent,
      lateRatePercent: health.lateRatePercent,
      activityRatePercent: health.activityRatePercent,
      scheduleAlignmentPercent: health.scheduleAlignmentPercent,
      healthScore: health.healthScore,
      healthColor: health.healthColor,
      alerts,
      recentActivity: project.activityLogs.slice(0, 5).map((log) => ({
        id: log.id,
        type: log.type,
        message: log.message,
        createdAt: log.createdAt,
        actor: log.actor,
      })),
    };
  });

  return {
    projects: cards,
    summary: {
      totalProjects: cards.length,
      greenProjects: cards.filter((c) => c.healthColor === "GREEN").length,
      orangeProjects: cards.filter((c) => c.healthColor === "ORANGE").length,
      redProjects: cards.filter((c) => c.healthColor === "RED").length,
      totalOverdueTasks: cards.reduce((sum, card) => sum + card.overdueTasks, 0),
    },
  };
}
