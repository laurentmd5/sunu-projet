"use server";

import prisma from "@/lib/prisma";
import { getCurrentDbUser } from "@/lib/project-access";
import {
  buildProjectAlerts,
  computeMilestoneRisk,
  computeProjectHealth,
  computeWeightedOverdueTaskTotal,
  computeWeightedProjectProgressPercent,
  computeWeightedTaskTotal,
  isTaskDueSoon,
  isTaskOverdue,
} from "@/lib/dashboard";
import {
  OwnerDashboardOverview,
  OwnerDashboardProjectCard,
  OwnerDashboardProjectInsight,
} from "@/type";

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
          role: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
      tasks: {
        select: {
          id: true,
          status: true,
          dueDate: true,
          milestoneId: true,
          userId: true,
          teamId: true,
          priority: true,
        },
      },
      teams: {
        select: {
          id: true,
          name: true,
          members: {
            select: {
              userId: true,
            },
          },
        },
      },
      milestones: {
        select: {
          id: true,
          targetDate: true,
          status: true,
          createdAt: true,
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

    // Filter out VIEWERS for executable metrics
    const executableMembers = project.users.filter(
      (membership) => membership.role !== "VIEWER"
    );
    const executableMembersCount = executableMembers.length;

    const executableMemberIds = new Set(
      executableMembers.map((membership) => membership.user.id)
    );

    const activeMembersSet = new Set(
      project.activityLogs
        .map((log) => log.actorUserId)
        .filter((actorUserId) => executableMemberIds.has(actorUserId))
    );

    const activeMembers7d = activeMembersSet.size;
    const inactiveMembersCount = Math.max(0, executableMembersCount - activeMembers7d);

    // Member metrics calculation (exclude VIEWERS)
    const memberMetrics = executableMembers.map((membership) => {
      const memberTasks = project.tasks.filter(
        (task) => task.userId === membership.user.id
      );
      const assignedTasks = memberTasks.length;
      const completedMemberTasks = memberTasks.filter(
        (task) => task.status === "DONE"
      ).length;
      const overdueMemberTasks = memberTasks.filter((task) =>
        isTaskOverdue(task.dueDate, task.status, now)
      ).length;

      const weightedAssignedTasks = computeWeightedTaskTotal(
        memberTasks,
        (task) => task.priority
      );

      const weightedCompletedTasks = computeWeightedTaskTotal(
        memberTasks.filter((task) => task.status === "DONE"),
        (task) => task.priority
      );

      const weightedOverdueMemberTasks = computeWeightedOverdueTaskTotal(
        memberTasks,
        (task) => task.dueDate,
        (task) => task.status,
        (task) => task.priority,
        now
      );

      const completionRatePercent =
        weightedAssignedTasks > 0
          ? Math.round((weightedCompletedTasks / weightedAssignedTasks) * 100)
          : 0;

      const isActive7d = activeMembersSet.has(membership.user.id);

      const performanceScore = Math.max(
        0,
        Math.round(
          completionRatePercent - weightedOverdueMemberTasks * 5 + (isActive7d ? 10 : 0)
        )
      );

      return {
        userId: membership.user.id,
        name: membership.user.name,
        email: membership.user.email,
        assignedTasks,
        completedTasks: completedMemberTasks,
        overdueTasks: overdueMemberTasks,
        completionRatePercent,
        performanceScore,
        isActive7d,
      };
    });

    const topMembers = [...memberMetrics]
      .filter((member) => member.assignedTasks > 0)
      .sort((a, b) => b.performanceScore - a.performanceScore)
      .slice(0, 3);

    const topPerformer = topMembers.length > 0 ? topMembers[0] : null;

    const strugglingMembers = [...memberMetrics]
      .filter((member) => member.overdueTasks > 0 || !member.isActive7d)
      .sort((a, b) => b.overdueTasks - a.overdueTasks)
      .slice(0, 3);

    // Team metrics calculation
    const teamMetrics = (project.teams || []).map((team) => {
      const teamTasks = project.tasks.filter((task) => task.teamId === team.id);
      const totalTeamTasks = teamTasks.length;
      const completedTeamTasks = teamTasks.filter(
        (task) => task.status === "DONE"
      ).length;
      const overdueTeamTasks = teamTasks.filter((task) =>
        isTaskOverdue(task.dueDate, task.status, now)
      ).length;

      const progressTeamPercent = computeWeightedProjectProgressPercent(
        teamTasks,
        (task) => task.status,
        (task) => task.priority
      );

      return {
        teamId: team.id,
        teamName: team.name,
        membersCount: team.members.length,
        totalTasks: totalTeamTasks,
        completedTasks: completedTeamTasks,
        overdueTasks: overdueTeamTasks,
        progressPercent: progressTeamPercent,
      };
    });

    const weightedProgressPercent = computeWeightedProjectProgressPercent(
      project.tasks,
      (task) => task.status,
      (task) => task.priority
    );

    const weightedActiveTasksWithDueDate = computeWeightedTaskTotal(
      project.tasks.filter(
        (t) => t.dueDate && t.status !== "DONE" && t.status !== "CANCELLED"
      ),
      (task) => task.priority
    );

    const weightedOverdueTasks = computeWeightedOverdueTaskTotal(
      project.tasks,
      (task) => task.dueDate,
      (task) => task.status,
      (task) => task.priority,
      now
    );

    const progressPercent = weightedProgressPercent;

    const health = computeProjectHealth({
      overdueTasks,
      activeTasksWithDueDate,
      weightedOverdueTasks,
      weightedActiveTasksWithDueDate,
      activeMembers7d,
      membersCount: executableMembersCount,
      progressPercent,
      totalTasks,
      activeTasks,
      projectStatus: project.status,
      startDate: project.startDate,
      endDate: project.endDate,
      now,
    });

    const milestoneRiskResults = project.milestones
      .filter((milestone) => milestone.status !== "COMPLETED")
      .map((milestone) => {
        const totalMilestoneTasks = milestone.tasks.length;
        const doneMilestoneTasks = milestone.tasks.filter((t) => t.status === "DONE").length;

        return computeMilestoneRisk({
          totalTasks: totalMilestoneTasks,
          completedTasks: doneMilestoneTasks,
          targetDate: milestone.targetDate,
          createdAt: milestone.createdAt,
          now,
        });
      });

    const milestonesAtRiskCount = milestoneRiskResults.filter(
      (result) => result.isAtRisk
    ).length;

    const criticalMilestonesAtRiskCount = milestoneRiskResults.filter(
      (result) => result.riskLevel === "CRITICAL"
    ).length;

    const isCompletedOrArchived =
      project.status === "COMPLETED" || project.status === "ARCHIVED";

    const alerts = buildProjectAlerts({
      overdueTasks: isCompletedOrArchived ? 0 : overdueTasks,
      dueSoonTasks: isCompletedOrArchived ? 0 : dueSoonTasks,
      inactiveMembersCount: isCompletedOrArchived ? 0 : inactiveMembersCount,
      milestonesAtRiskCount: isCompletedOrArchived ? 0 : milestonesAtRiskCount,
      healthColor: health.healthColor,
    });

    return {
      projectId: project.id,
      projectName: project.name,
      projectStatus: project.status as "ACTIVE" | "COMPLETED" | "ARCHIVED" | "ON_HOLD",
      startDate: project.startDate,
      endDate: project.endDate,
      membersCount,
      executableMembersCount,
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
      healthDrivers: health.healthDrivers,
      alerts,
      recentActivity: project.activityLogs.slice(0, 5).map((log) => ({
        id: log.id,
        type: log.type,
        message: log.message,
        createdAt: log.createdAt,
        actor: log.actor,
      })),
      insights: {
        topMembers,
        strugglingMembers,
        teamMetrics,
        topPerformer,
        milestonesAtRiskCount: isCompletedOrArchived ? 0 : milestonesAtRiskCount,
        criticalMilestonesAtRiskCount: isCompletedOrArchived ? 0 : criticalMilestonesAtRiskCount,
      } satisfies OwnerDashboardProjectInsight,
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
