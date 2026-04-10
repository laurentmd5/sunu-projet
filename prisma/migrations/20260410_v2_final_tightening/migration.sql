-- =========================================
-- Sunu Projets V2 - Migration finale de resserrage
-- Phase 2 : verrouillage final après backfill validé
-- MySQL + Prisma
-- =========================================

-- -------------------------------------------------
-- 0) Préconditions de sécurité
-- -------------------------------------------------
-- À exécuter seulement si :
-- - Team.projectId ne contient plus aucun NULL
-- - Task.status ne contient plus aucune valeur legacy
-- - TeamMember.role ne contient plus MANAGER

-- -------------------------------------------------
-- 1) Team.projectId devient obligatoire
-- -------------------------------------------------

ALTER TABLE `Team` 
    MODIFY `projectId` VARCHAR(191) NOT NULL;

-- -------------------------------------------------
-- 2) TeamMember.role resserré à OWNER | MEMBER
-- -------------------------------------------------

ALTER TABLE `TeamMember` 
    MODIFY `role` ENUM('OWNER', 'MEMBER') NOT NULL;

-- -------------------------------------------------
-- 3) Task.status resserré aux seules valeurs V2
-- -------------------------------------------------

ALTER TABLE `Task` 
    MODIFY `status` ENUM('TODO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE', 'CANCELLED') NOT NULL DEFAULT 'TODO';

-- -------------------------------------------------
-- 4) Defaults finaux utiles
-- -------------------------------------------------

ALTER TABLE `Project` 
    MODIFY `status` ENUM('ACTIVE', 'COMPLETED', 'ARCHIVED', 'ON_HOLD') NOT NULL DEFAULT 'ACTIVE';

ALTER TABLE `Task` 
    MODIFY `priority` ENUM('LOW', 'MEDIUM', 'HIGH', 'CRITICAL') NOT NULL DEFAULT 'MEDIUM';

-- -------------------------------------------------
-- 5) Optionnel : contraintes utiles sur Team
-- -------------------------------------------------
-- parentId reste nullable, car une équipe racine n'a pas de parent.
-- projectId reste obligatoire.
