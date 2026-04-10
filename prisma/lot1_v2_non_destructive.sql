-- AlterTable
ALTER TABLE `Team` ADD COLUMN `parentId` VARCHAR(36) NULL,
    ADD COLUMN `projectId` VARCHAR(36) NULL;

-- AlterTable
ALTER TABLE `Project` ADD COLUMN `endDate` DATETIME(3) NULL,
    ADD COLUMN `startDate` DATETIME(3) NULL,
    ADD COLUMN `status` ENUM('ACTIVE', 'COMPLETED', 'ARCHIVED', 'ON_HOLD') NULL;

-- AlterTable
ALTER TABLE `Task` ADD COLUMN `milestoneId` VARCHAR(36) NULL,
    ADD COLUMN `priority` ENUM('LOW', 'MEDIUM', 'HIGH', 'CRITICAL') NULL,
    ADD COLUMN `tags` JSON NULL,
    ADD COLUMN `teamId` VARCHAR(36) NULL;

-- AlterTable
ALTER TABLE `ProjectUser` ADD COLUMN `inviteToken` VARCHAR(100) NULL,
    MODIFY `role` ENUM('OWNER', 'MANAGER', 'VIEWER', 'MEMBER') NOT NULL DEFAULT 'MEMBER';

-- AlterTable
ALTER TABLE `ActivityLog` ADD COLUMN `metadata` JSON NULL,
    MODIFY `type` ENUM('PROJECT_CREATED', 'MEMBER_JOINED', 'MEMBER_ROLE_UPDATED', 'MEMBER_REMOVED', 'TASK_CREATED', 'TASK_STATUS_UPDATED', 'TEAM_CREATED', 'TEAM_MEMBER_JOINED', 'TEAM_MEMBER_ROLE_UPDATED', 'TEAM_MEMBER_REMOVED', 'PROJECT_LINKED_TO_TEAM', 'VIEWER_INVITED', 'VIEWER_PERMISSIONS_UPDATED', 'MANAGER_ASSIGNED', 'SUBTEAM_CREATED', 'TASK_PRIORITY_CHANGED', 'MILESTONE_CREATED', 'MILESTONE_COMPLETED', 'MILESTONE_DELAYED', 'TASK_COMMENT_ADDED') NOT NULL;

-- CreateTable
CREATE TABLE `Milestone` (
    `id` VARCHAR(36) NOT NULL,
    `projectId` VARCHAR(36) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `targetDate` DATETIME(3) NULL,
    `status` ENUM('PENDING', 'IN_PROGRESS', 'COMPLETED', 'DELAYED') NOT NULL DEFAULT 'PENDING',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Milestone_projectId_status_idx`(`projectId`, `status`),
    INDEX `Milestone_targetDate_idx`(`targetDate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TaskComment` (
    `id` VARCHAR(36) NOT NULL,
    `taskId` VARCHAR(36) NOT NULL,
    `authorId` VARCHAR(36) NOT NULL,
    `body` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `TaskComment_taskId_createdAt_idx`(`taskId`, `createdAt`),
    INDEX `TaskComment_authorId_idx`(`authorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ViewerPermissionGrant` (
    `id` VARCHAR(36) NOT NULL,
    `projectUserId` VARCHAR(36) NOT NULL,
    `permission` ENUM('VIEW_PROJECT_PROGRESS', 'VIEW_MEMBER_STATS', 'ASSIGN_TASKS', 'CREATE_TASK', 'VIEW_MEETINGS', 'JOIN_MEETINGS') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `ViewerPermissionGrant_projectUserId_idx`(`projectUserId`),
    UNIQUE INDEX `ViewerPermissionGrant_projectUserId_permission_key`(`projectUserId`, `permission`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MeetingParticipant` (
    `id` VARCHAR(36) NOT NULL,
    `meetingId` VARCHAR(36) NOT NULL,
    `userId` VARCHAR(36) NOT NULL,
    `joinedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `MeetingParticipant_userId_idx`(`userId`),
    UNIQUE INDEX `MeetingParticipant_meetingId_userId_key`(`meetingId`, `userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notification` (
    `id` VARCHAR(36) NOT NULL,
    `userId` VARCHAR(36) NOT NULL,
    `type` VARCHAR(100) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NULL,
    `link` VARCHAR(255) NULL,
    `metadata` JSON NULL,
    `readAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Notification_userId_createdAt_idx`(`userId`, `createdAt`),
    INDEX `Notification_userId_readAt_idx`(`userId`, `readAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Team_projectId_idx` ON `Team`(`projectId`);

-- CreateIndex
CREATE INDEX `Team_parentId_idx` ON `Team`(`parentId`);

-- CreateIndex
CREATE INDEX `Project_status_idx` ON `Project`(`status`);

-- CreateIndex
CREATE INDEX `Task_projectId_idx` ON `Task`(`projectId`);

-- CreateIndex
CREATE INDEX `Task_userId_idx` ON `Task`(`userId`);

-- CreateIndex
CREATE INDEX `Task_milestoneId_idx` ON `Task`(`milestoneId`);

-- CreateIndex
CREATE INDEX `Task_teamId_idx` ON `Task`(`teamId`);

-- CreateIndex
CREATE INDEX `Task_priority_idx` ON `Task`(`priority`);

-- CreateIndex
CREATE UNIQUE INDEX `ProjectUser_inviteToken_key` ON `ProjectUser`(`inviteToken`);

-- CreateIndex
CREATE INDEX `ProjectUser_projectId_role_idx` ON `ProjectUser`(`projectId`, `role`);

-- CreateIndex
CREATE INDEX `ActivityLog_actorUserId_idx` ON `ActivityLog`(`actorUserId`);

-- AddForeignKey
ALTER TABLE `Team` ADD CONSTRAINT `Team_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Team` ADD CONSTRAINT `Team_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `Team`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_milestoneId_fkey` FOREIGN KEY (`milestoneId`) REFERENCES `Milestone`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Team`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Milestone` ADD CONSTRAINT `Milestone_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TaskComment` ADD CONSTRAINT `TaskComment_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `Task`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TaskComment` ADD CONSTRAINT `TaskComment_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ViewerPermissionGrant` ADD CONSTRAINT `ViewerPermissionGrant_projectUserId_fkey` FOREIGN KEY (`projectUserId`) REFERENCES `ProjectUser`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MeetingParticipant` ADD CONSTRAINT `MeetingParticipant_meetingId_fkey` FOREIGN KEY (`meetingId`) REFERENCES `TeamMeeting`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MeetingParticipant` ADD CONSTRAINT `MeetingParticipant_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

