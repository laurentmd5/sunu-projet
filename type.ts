import { Project as PrismaProject, Task as PrismaTask, User } from '@prisma/client';

export type ProjectRole = "OWNER" | "MANAGER" | "MEMBER";

export type ProjectUserMember = {
    id: string;
    projectId: string;
    userId: string;
    role: ProjectRole;
    user: {
        id: string;
        name: string | null;
        email: string;
    };
};

export type Project = PrismaProject & {
    totalTasks?: number;
    collaboratorsCount?: number;

    taskStats?: {
        toDo: number;
        inProgress: number;
        done: number;
    };
    percentages?: {
        progressPercentage: number;
        inProgressPercentage: number;
        toDoPercentage: number;
    };
    tasks?: Task[];
    users?: User[];
    createdBy?: User;
};

export type Task = PrismaTask & {
    user?: User | null;
    createdBy?: User | null;
};