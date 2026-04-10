-- =========================================
-- Sunu Projets V2 - Migration additive schéma
-- Phase 1 : ajouts non destructifs
-- MySQL + Prisma
-- =========================================

-- -------------------------------------------------
-- 1) Enums existants à faire évoluer
-- -------------------------------------------------

-- ProjectRole : ajout VIEWER
ALTER TABLE `ProjectUser`
    MODIFY `role` ENUM('OWNER', 'MANAGER', 'VIEWER', 'MEMBER') NOT NULL;

-- TeamMember.role simplifié vers OWNER | MEMBER
-- On suppose ici qu'on exécute cette migration AVANT le backfill complet,
-- donc on garde encore la colonne compatible si nécessaire.
-- Si tu veux faire ça proprement en 2 temps, on peut temporairement garder MANAGER
-- puis resserrer après le backfill. Ici je te propose la version safe :
ALTER TABLE `TeamMember`
    MODIFY `role` ENUM('OWNER', 'MANAGER', 'MEMBER') NOT NULL;

-- Task.status : extension V2
ALTER TABLE `Task`
    MODIFY `status` ENUM('To Do', 'In Progress', 'Done', 'TODO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE', 'CANCELLED') NOT NULL DEFAULT 'TODO';

-- -------------------------------------------------
-- 2) Nouvelles colonnes sur Project
-- -------------------------------------------------

ALTER TABLE `Project`
    ADD COLUMN `status` ENUM('ACTIVE', 'COMPLETED', 'ARCHIVED', 'ON_HOLD') NULL,
    ADD COLUMN `startDate` DATETIME(3) NULL,
    ADD COLUMN `endDate` DATETIME(3) NULL;

-- -------------------------------------------------
-- 3) Nouvelles colonnes sur ProjectUser
-- -------------------------------------------------

ALTER TABLE `ProjectUser`
    ADD COLUMN `inviteToken` VARCHAR(191) NULL;

CREATE UNIQUE INDEX `ProjectUser_inviteToken_key`
    ON `ProjectUser`(`inviteToken`);

-- -------------------------------------------------
-- 4) Nouvelles colonnes sur Team
-- -------------------------------------------------

ALTER TABLE `Team`
    ADD COLUMN `projectId` VARCHAR(191) NULL,
    ADD COLUMN `parentId` VARCHAR(191) NULL;

CREATE INDEX `Team_projectId_idx`
    ON `Team`(`projectId`);

CREATE INDEX `Team_parentId_idx`
    ON `Team`(`parentId`);

-- FK ajoutées nullable dans un premier temps
ALTER TABLE `Team`
    ADD CONSTRAINT `Team_projectId_fkey`
        FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`)
        ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `Team`
    ADD CONSTRAINT `Team_parentId_fkey`
        FOREIGN KEY (`parentId`) REFERENCES `Team`(`id`)
        ON DELETE SET NULL ON UPDATE CASCADE;

-- -------------------------------------------------
-- 5) Nouvelles colonnes sur Task
-- -------------------------------------------------

ALTER TABLE `Task`
    ADD COLUMN `priority` ENUM('LOW', 'MEDIUM', 'HIGH', 'CRITICAL') NULL,
    ADD COLUMN `tags` JSON NULL,
    ADD COLUMN `milestoneId` VARCHAR(191) NULL,
    ADD COLUMN `teamId` VARCHAR(191) NULL;

CREATE INDEX `Task_milestoneId_idx`
    ON `Task`(`milestoneId`);

CREATE INDEX `Task_teamId_idx`
    ON `Task`(`teamId`);

-- Les FK seront ajoutées vers Milestone / Team après création des tables
-- plus bas dans ce script.

-- -------------------------------------------------
-- 6) Nouvelles colonnes sur ActivityLog
-- -------------------------------------------------

ALTER TABLE `ActivityLog`
    ADD COLUMN `metadata` JSON NULL;

-- -------------------------------------------------
-- 7) TeamMeeting : garder projectId nullable
-- -------------------------------------------------

-- Si ta table TeamMeeting existe déjà avec projectId NOT NULL
-- ne touche rien ici tant qu'on n'a pas vérifié le schéma actuel.
-- Si besoin, on fera une migration dédiée ensuite.
-- Exemple seulement si nécessaire :
-- ALTER TABLE `TeamMeeting`
--     MODIFY `projectId` VARCHAR(191) NULL;

-- -------------------------------------------------
-- 8) Nouvelles tables V2
-- -------------------------------------------------

-- ViewerPermissionGrant
CREATE TABLE `ViewerPermissionGrant` (
    `id` VARCHAR(191) NOT NULL,
    `projectUserId` VARCHAR(191) NOT NULL,
    `permission` ENUM(
        'VIEW_PROJECT_PROGRESS',
        'VIEW_MEMBER_STATS',
        'ASSIGN_TASKS',
        'CREATE_TASK',
        'VIEW_MEETINGS',
        'JOIN_MEETINGS'
    ) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `ViewerPermissionGrant_projectUserId_permission_key`(`projectUserId`, `permission`),
    INDEX `ViewerPermissionGrant_projectUserId_idx`(`projectUserId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE `ViewerPermissionGrant`
    ADD CONSTRAINT `ViewerPermissionGrant_projectUserId_fkey`
        FOREIGN KEY (`projectUserId`) REFERENCES `ProjectUser`(`id`)
        ON DELETE CASCADE ON UPDATE CASCADE;

-- Milestone
CREATE TABLE `Milestone` (
    `id` VARCHAR(191) NOT NULL,
    `projectId` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `targetDate` DATETIME(3) NULL,
    `status` ENUM('PENDING', 'IN_PROGRESS', 'COMPLETED', 'DELAYED') NOT NULL DEFAULT 'PENDING',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Milestone_projectId_idx`(`projectId`),
    INDEX `Milestone_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE `Milestone`
    ADD CONSTRAINT `Milestone_projectId_fkey`
        FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`)
        ON DELETE CASCADE ON UPDATE CASCADE;

-- TaskComment
CREATE TABLE `TaskComment` (
    `id` VARCHAR(191) NOT NULL,
    `taskId` VARCHAR(191) NOT NULL,
    `authorUserId` VARCHAR(191) NOT NULL,
    `content` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `TaskComment_taskId_idx`(`taskId`),
    INDEX `TaskComment_authorUserId_idx`(`authorUserId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE `TaskComment`
    ADD CONSTRAINT `TaskComment_taskId_fkey`
        FOREIGN KEY (`taskId`) REFERENCES `Task`(`id`)
        ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `TaskComment`
    ADD CONSTRAINT `TaskComment_authorUserId_fkey`
        FOREIGN KEY (`authorUserId`) REFERENCES `User`(`id`)
        ON DELETE RESTRICT ON UPDATE CASCADE;

-- MeetingParticipant
CREATE TABLE `MeetingParticipant` (
    `id` VARCHAR(191) NOT NULL,
    `meetingId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `displayName` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `MeetingParticipant_meetingId_idx`(`meetingId`),
    INDEX `MeetingParticipant_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE `MeetingParticipant`
    ADD CONSTRAINT `MeetingParticipant_meetingId_fkey`
        FOREIGN KEY (`meetingId`) REFERENCES `TeamMeeting`(`id`)
        ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `MeetingParticipant`
    ADD CONSTRAINT `MeetingParticipant_userId_fkey`
        FOREIGN KEY (`userId`) REFERENCES `User`(`id`)
        ON DELETE SET NULL ON UPDATE CASCADE;

-- Notification
CREATE TABLE `Notification` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `type` VARCHAR(100) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `message` TEXT NOT NULL,
    `isRead` BOOLEAN NOT NULL DEFAULT FALSE,
    `metadata` JSON NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Notification_userId_idx`(`userId`),
    INDEX `Notification_userId_isRead_idx`(`userId`, `isRead`),
    INDEX `Notification_createdAt_idx`(`createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE `Notification`
    ADD CONSTRAINT `Notification_userId_fkey`
        FOREIGN KEY (`userId`) REFERENCES `User`(`id`)
        ON DELETE CASCADE ON UPDATE CASCADE;

-- -------------------------------------------------
-- 9) FK Task vers Milestone / Team
-- -------------------------------------------------

ALTER TABLE `Task`
    ADD CONSTRAINT `Task_milestoneId_fkey`
        FOREIGN KEY (`milestoneId`) REFERENCES `Milestone`(`id`)
        ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE `Task`
    ADD CONSTRAINT `Task_teamId_fkey`
        FOREIGN KEY (`teamId`) REFERENCES `Team`(`id`)
        ON DELETE SET NULL ON UPDATE CASCADE;