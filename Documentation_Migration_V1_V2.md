# Documentation de travail — Migration Sunu Projets V1 → V2

## Périmètre du document

Ce document synthétise l’avancement technique de la migration **Sunu Projets V1 → V2** avec un focus sur :

- l’analyse de la cible V2 et des écarts avec la V1 ;
- la mise à niveau du schéma Prisma ;
- la stratégie de migration retenue ;
- la migration des données minimales V1 → V2 ;
- la stabilisation du code applicatif autour du modèle V2 final ;
- le nettoyage de l’historique Prisma local ;
- l’état final obtenu après validation TypeScript et vérifications fonctionnelles.

Ce document constitue une base technique de référence pour la suite du chantier V2.

---

# 1. Contexte général

## 1.1 Objectif produit de la V2

La V2 de Sunu Projets vise à faire évoluer l’architecture métier afin de :

- recentrer le système sur `Project` comme entité racine ;
- introduire le rôle `VIEWER` avec permissions granulaires ;
- rattacher les équipes aux projets ;
- permettre une hiérarchie d’équipes limitée à 2 niveaux ;
- enrichir fortement les tâches ;
- préparer les notifications in-app ;
- préparer le futur dashboard propriétaire consolidé.

## 1.2 Hiérarchie des sources

Les sources ont été interprétées dans l’ordre suivant :

1. `sunu_projets_v2.pptx` = source fonctionnelle principale ;
2. `sunu_projets_v2_analyse.pdf` = source complémentaire ;
3. documentation analytique V1 = source historique décrivant l’existant.

Règle d’arbitrage :

- en cas de conflit entre PPTX et PDF, le PPTX V2 prime ;
- en cas de conflit entre V2 et V1, la V2 prime ;
- les anciens éléments documentaires non alignés avec l’état réel du projet sont considérés comme historiques uniquement.

---

# 2. Cible V2 retenue

## 2.1 Principes structurants

La cible V2 retenue repose sur les principes suivants :

- `Project` devient l’entité centrale ;
- les `Team` sont rattachées aux projets ;
- `ProjectRole` devient `OWNER | MANAGER | VIEWER | MEMBER` ;
- `TeamRole` est simplifié à `OWNER | MEMBER` ;
- `TaskStatus` devient `TODO | IN_PROGRESS | IN_REVIEW | DONE | CANCELLED` ;
- `TaskPriority` devient `LOW | MEDIUM | HIGH | CRITICAL` ;
- les tâches peuvent être enrichies avec priorité, tags, jalons, équipe et commentaires ;
- `ActivityLog` peut porter des métadonnées JSON ;
- de nouvelles tables apparaissent pour les permissions VIEWER, jalons, commentaires, participants de réunion et notifications.

## 2.2 Points d’arbitrage importants

### `TeamMeeting.projectId`
Décision retenue : `projectId` reste **optionnel**, conformément au PPTX V2.

### `TeamRole`
Décision retenue : le rôle d’équipe final est réduit à :

- `OWNER`
- `MEMBER`

### `Task.status`
Décision retenue : après migration finale, les seuls statuts valides sont :

- `TODO`
- `IN_PROGRESS`
- `IN_REVIEW`
- `DONE`
- `CANCELLED`

---

# 3. Stratégie de migration retenue

## 3.1 Découpage logique

La migration a été traitée dans l’ordre suivant :

1. migration de schéma ;
2. migration / normalisation minimale des données ;
3. resserrage du schéma final ;
4. réalignement du runtime ;
5. réalignement du front ;
6. validation TypeScript et tests de fonctionnement.

## 3.2 Principes appliqués

Les principes suivants ont été respectés :

- séparer schéma, backfill et resserrage final ;
- éviter les suppressions destructrices au début ;
- rendre les scripts de backfill idempotents ;
- conserver les éléments legacy tant qu’ils étaient encore nécessaires au runtime ;
- verrouiller le modèle final seulement après validation des données.

---

# 4. Migration de schéma

## 4.1 Première phase : schéma V2 additif

Une première migration SQL additive a été conçue pour introduire les structures V2 sans casser immédiatement la V1.

### Ajouts principaux

#### `Project`
- `status`
- `startDate`
- `endDate`

#### `ProjectUser`
- ajout du rôle `VIEWER`
- `inviteToken`

#### `Team`
- `projectId`
- `parentId`

#### `Task`
- `priority`
- `tags`
- `milestoneId`
- `teamId`

#### `ActivityLog`
- `metadata`

### Nouvelles tables
- `ViewerPermissionGrant`
- `Milestone`
- `TaskComment`
- `MeetingParticipant`
- `Notification`

## 4.2 Migration finale de resserrage

Une fois les données remises en cohérence, le schéma a été resserré afin d’atteindre le modèle V2 final.

### Changements verrouillés
- `Team.projectId` devient obligatoire ;
- `TeamMember.role` est réduit à `OWNER | MEMBER` ;
- `Task.status` est réduit aux seuls statuts V2 ;
- `Project.status` devient non nullable avec défaut `ACTIVE` ;
- `Task.priority` devient non nullable avec défaut `MEDIUM`.

---

# 5. Migration de données et backfill

## 5.1 Contexte de données

La base ne contenait pas de données critiques. Cela a permis d’adopter une stratégie simple et sûre, sans contrainte de conservation métier forte.

## 5.2 Scripts réalisés

### Script 01 — normalisation des statuts et rôles
Ce script a réalisé :

- `To Do` → `TODO`
- `In Progress` → `IN_PROGRESS`
- `Done` → `DONE`
- `TeamMember.MANAGER` → `OWNER`

### Script 02 — remplissage des nouveaux champs
Ce script a réalisé :

- `Task.priority = MEDIUM` si vide ;
- `Project.status = ACTIVE` si vide ;
- remise à `null` contrôlée de certains champs transitoires (`parentId`, `milestoneId`, `teamId`, `inviteToken`, `metadata`) dans le cadre du backfill minimal V2.

### Script 03 — rattachement des équipes aux projets
Ce script a permis de remplir `Team.projectId` en utilisant :

- l’ancien lien historique lorsqu’il existait ;
- un fallback contrôlé en cas de projet unique.

Résultat constaté :
- les équipes existantes ont été rattachées correctement ;
- aucun cas non résolu n’est resté sur l’échantillon traité.

### Script 04 — contrôles post-migration
Ce script a validé :

- absence de projets sans `status` ;
- absence de tâches sans `priority` ;
- absence d’équipes sans projet ;
- absence de statuts tâche legacy ;
- absence de rôle `MANAGER` résiduel dans `TeamMember` ;
- absence de références cassées vers projet, équipe ou jalon.

Résultat obtenu : contrôles post-migration validés.

---

# 6. Refonte de l’historique Prisma local

## 6.1 Problème rencontré

L’historique local de migrations Prisma n’était pas cohérent avec l’état réel de la base, ce qui empêchait `prisma migrate dev` de reconstruire correctement une shadow database.

## 6.2 Méthode retenue

La solution retenue a été :

- nettoyer l’ancien historique local cassé ;
- repartir d’un `schema.prisma` finalisé ;
- réinitialiser la base de développement locale ;
- recréer une migration baseline propre.

## 6.3 Résultat

Une nouvelle migration baseline propre a été générée et appliquée :

- base locale réinitialisée correctement ;
- schéma Prisma final synchronisé ;
- historique de migrations nettoyé ;
- génération Prisma Client validée.

---

# 7. Alignement du schéma Prisma final

Le `schema.prisma` a été réaligné sur le modèle V2 final.

## 7.1 Évolutions principales

### `ProjectRole`
- `OWNER`
- `MANAGER`
- `VIEWER`
- `MEMBER`

### `TeamRole`
- `OWNER`
- `MEMBER`

### `TaskStatus`
- `TODO`
- `IN_PROGRESS`
- `IN_REVIEW`
- `DONE`
- `CANCELLED`

### Relations
- suppression de la logique legacy `Project.teamId` du modèle final ;
- `Project` expose `teams[]` ;
- `Team` appartient à un `project` ;
- `Team.parentId` permet la hiérarchie 2 niveaux.

### Champs V2 stabilisés
- `Project.status`
- `Project.startDate`
- `Project.endDate`
- `Task.priority`
- `Task.tags`
- `Task.milestoneId`
- `Task.teamId`
- `ActivityLog.metadata`

---

# 8. Alignement du runtime et du front sur la V2

Après stabilisation du schéma, le code applicatif a été mis à niveau pour refléter le modèle final.

## 8.1 Fichiers partagés et helpers

Les éléments suivants ont été réalignés :

- `type.ts`
- `lib/project-roles.ts`
- `lib/team-roles.ts`
- `lib/task-status.ts`
- `lib/prisma.ts`
- `lib/team-role-labels.ts`
- `lib/permissions.ts`
- `lib/validations.ts`

### Ajustements majeurs
- ajout de `VIEWER` dans les helpers de rôles projet ;
- suppression de `MANAGER` des rôles d’équipe ;
- remplacement des anciens statuts texte par les statuts V2 ;
- assouplissement ciblé des types front sur `Project.teams` pour accepter des sélections Prisma partielles ;
- suppression du recours au client généré legacy dans `prisma/generated/client` au profit de `@prisma/client`.

## 8.2 Actions serveur

Les actions suivantes ont été réalignées :

- `tasks.ts`
- `teams.ts`
- `meetings.ts`
- `members.ts`
- `projects.ts`
- `index.ts`

### Ajustements majeurs
- validation stricte des statuts V2 dans les actions de tâche ;
- suppression des références à `Project.teamId` ;
- passage de `project.team` à `project.teams` ;
- suppression de l’ancienne logique `attachProjectToTeam` devenue obsolète ;
- adaptation des contrôles de rôle d’équipe au modèle `OWNER | MEMBER` ;
- prise en charge de `VIEWER` dans les rôles projet.

## 8.3 Pages et composants front

Les pages et composants principaux ont été remis en cohérence avec la V2 :

- `app/page.tsx`
- `app/general-projects/page.tsx`
- `app/new-tasks/[projectId]/page.tsx`
- `app/project/[projectId]/page.tsx`
- `app/task-details/[taskId]/page.tsx`
- `app/teams/[teamId]/page.tsx`
- `app/meetings/[meetingId]/page.tsx`
- `app/components/ProjectComponent.tsx`
- `app/components/TeamComponent.tsx`

### Ajustements majeurs
- ajout de `VIEWER` dans les maps et sections UI projet ;
- suppression de tout usage résiduel de `project.team` ;
- remplacement des statuts V1 dans les filtres, selects et compteurs ;
- adaptation des pages équipe/réunion au nouveau `TeamRole` ;
- remplacement de `team.projects` par `team.project` ;
- compatibilité avec les statuts `IN_REVIEW` et `CANCELLED`.

---

# 9. Validation finale

## 9.1 Validation technique

La commande suivante a été exécutée avec succès :

```bash
npx tsc --noEmit
```

Résultat :
- **aucune erreur TypeScript**.

## 9.2 Validation fonctionnelle

Des vérifications manuelles ont été réalisées sur les flux jugés critiques.

Résultat :
- les fonctionnalités qui devaient continuer à fonctionner fonctionnent correctement dans l’état actuel du projet.

---

# 10. État obtenu

À ce stade, les éléments suivants sont considérés comme validés :

- schéma Prisma V2 final ;
- baseline Prisma locale propre ;
- migration de données minimale V1 → V2 ;
- resserrage du schéma final ;
- réalignement du runtime ;
- réalignement du front ;
- suppression des références legacy majeures ;
- compilation TypeScript globale sans erreur ;
- validation fonctionnelle manuelle des flux attendus.

La migration technique V1 → V2 peut donc être considérée comme **stabilisée** sur le périmètre traité.

---

# 11. Éléments volontairement reportés

La stabilisation technique ne signifie pas que toutes les capacités métier V2 sont déjà totalement exploitées.

Restent encore à approfondir ou compléter selon le planning produit :

- activation complète des permissions granulaires `VIEWER` dans tous les cas d’usage ;
- enrichissement métier complet des jalons, commentaires et notifications ;
- dashboard owner et métriques consolidées ;
- finalisation des comportements métier spécifiques autour des équipes hiérarchiques ;
- nettoyage métier fin de certains comportements hérités si nécessaire.

---

# 12. Recommandations pour la suite

## 12.1 Suite immédiate recommandée

La prochaine étape logique n’est plus une réparation de migration, mais une **consolidation fonctionnelle V2** :

- vérifier les permissions `VIEWER` en profondeur ;
- tester les workflows métiers V2 bout en bout ;
- prioriser les capacités encore seulement préparées au niveau structurel.

## 12.2 Intérêt de ce document

Ce document peut servir à :

- garder une trace technique claire de la migration ;
- justifier les choix de schéma et de stratégie ;
- faciliter la reprise du projet ;
- préparer la phase de validation métier V2.

---

# 13. Fichiers principaux concernés

Les principaux fichiers touchés dans ce chantier sont notamment :

- `prisma/schema.prisma`
- `prisma/migrations/...`
- `scripts/migration-v2/01-normalize-statuses-and-roles.ts`
- `scripts/migration-v2/02-fill-default-fields.ts`
- `scripts/migration-v2/03-attach-teams-to-projects.ts`
- `scripts/migration-v2/04-post-migration-checks.ts`
- `type.ts`
- `lib/project-roles.ts`
- `lib/team-roles.ts`
- `lib/task-status.ts`
- `lib/prisma.ts`
- `lib/permissions.ts`
- `lib/validations.ts`
- `app/actions/projects.ts`
- `app/actions/tasks.ts`
- `app/actions/teams.ts`
- `app/actions/meetings.ts`
- `app/actions/members.ts`
- `app/actions/index.ts`
- principales pages et composants projet / tâche / équipe / réunion.

---

# 14. Résumé exécutif

La migration Sunu Projets V1 → V2 a été menée en plusieurs étapes complémentaires :

- extension du schéma vers la cible V2 ;
- migration minimale des données existantes ;
- resserrage du modèle final ;
- reconstruction propre de l’historique Prisma local ;
- réalignement du runtime et du front ;
- validation finale TypeScript et fonctionnelle.

Le résultat obtenu est un socle V2 techniquement cohérent, compilable et fonctionnel sur le périmètre traité, prêt pour la poursuite de la finalisation métier de la version 2.

---

# 15. Avancement complémentaire — lot 3 permissions / rôles / VIEWER (13/04/2026)

## 15.1 Objectif du lot traité

Après stabilisation du schéma V2, un lot complémentaire a été mené pour refondre le noyau d’autorisation métier et commencer l’activation concrète du rôle `VIEWER` côté runtime et côté interface.

Ce lot a porté sur :

- la refonte du noyau permissions autour de `ProjectUser` ;
- l’introduction d’un système de capabilities réutilisable ;
- la prise en charge opérationnelle du rôle `VIEWER` et de ses permissions granulaires ;
- la migration progressive des actions critiques (`activity`, `members`, `tasks`) ;
- le branchement initial du front sur ces nouvelles règles.

## 15.2 Noyau permissions V2

### 15.2.1 Principe retenu

La logique d’autorisation a été recentrée sur :

- `ProjectUser` comme source d’autorité projet ;
- `ViewerPermissionGrant` comme source des droits fins des observateurs ;
- un mapping centralisé entre rôles / grants et capacités métier.

L’objectif était de sortir de la logique V1 fondée principalement sur des vérifications ponctuelles de rôles ou de simples appartenances projet/équipe.

### 15.2.2 Modules ajoutés

Les modules suivants ont été introduits :

- `lib/permissions-core.ts`
- `lib/project-access.ts`
- `lib/project-capabilities.ts`
- `lib/permission-helpers.ts`

### 15.2.3 Rôle de ces modules

Ces modules permettent désormais de :

- centraliser `ActionError` et les types liés aux rôles/capabilities ;
- récupérer un contexte d’accès projet unifié ;
- faire porter l’autorisation par des capacités explicites ;
- fournir des helpers de haut niveau utilisés par les actions serveur.

Exemples de capacités exploitées :

- `READ_PROJECT`
- `CREATE_TASK`
- `ASSIGN_TASKS`
- `MANAGE_MEMBERS`
- `MANAGE_VIEWERS`
- `VIEW_PROJECT_PROGRESS`
- `READ_MEETINGS`
- `JOIN_MEETING`

## 15.3 Réalignement des wrappers legacy

Pour ne pas casser l’existant d’un seul coup, plusieurs fichiers historiques ont été transformés en wrappers ou façades :

- `lib/permissions.ts`
- `lib/project-roles.ts`
- `lib/team-roles.ts`

Résultat :

- compatibilité maintenue avec les imports historiques ;
- anciens helpers progressivement rebranchés sur le nouveau moteur V2 ;
- réduction du risque de régression pendant la migration action par action.

## 15.4 Migration des permissions liées aux projets

### 15.4.1 Activity logs

L’accès aux activity logs a été réaligné sur la capacité :

- `VIEW_PROJECT_PROGRESS`

Correction apportée :

- suppression d’une logique V1 encore basée sur `assertHasProjectRole(...)` ;
- correction d’une erreur constatée quand un `VIEWER` ouvrait une page projet sans disposer des bons droits ;
- mise en cohérence entre la lecture du projet et la lecture de son activité.

### 15.4.2 Members / rôles

Le domaine `members.ts` a été restructuré afin de séparer clairement :

- les transitions standard `MEMBER <-> MANAGER` ;
- la gestion spécifique des `VIEWER` ;
- les permissions granulaires associées aux `VIEWER`.

Changements principaux :

- `updateProjectMemberRole()` restreinte aux transitions `MANAGER` / `MEMBER` ;
- création de `createProjectViewer()` ;
- création de `updateViewerPermissions()` ;
- enrichissement de `getProjectMembersWithRoles()` pour retourner aussi les permissions viewer ;
- conservation de `removeProjectMember()` avec compatibilité V2.

### 15.4.3 UI projet — gestion des VIEWER

La page projet `/project/[projectId]` a été enrichie avec :

- ajout d’un bloc “Ajouter un observateur” ;
- choix des permissions viewer via cases à cocher ;
- affichage des permissions d’un viewer existant ;
- édition inline des permissions d’un viewer ;
- retrait d’un viewer depuis l’interface ;
- séparation définitive entre le flux standard de changement de rôle et le flux viewer.

Des ajustements responsive ont également été réalisés sur cette page afin de préserver un affichage correct sur mobile.

## 15.5 Migration des permissions liées aux tâches

### 15.5.1 Création de tâche

La création de tâche a été adaptée au modèle V2.

Évolutions apportées :

- prise en compte de `CREATE_TASK` côté serveur ;
- prise en compte de `ASSIGN_TASKS` côté serveur ;
- possibilité de créer une tâche sans assignation ;
- `assignToEmail` rendu nullable ;
- `dueDate` rendue nullable / optionnelle ;
- rejet des dates passées ;
- exclusion des `VIEWER` de la liste des personnes assignables ;
- alignement progressif du front `/new-tasks/[projectId]` avec les nouvelles permissions.

Conséquences fonctionnelles :

- un `VIEWER` disposant seulement de `CREATE_TASK` peut créer une tâche sans l’assigner ;
- un `VIEWER` disposant aussi de `ASSIGN_TASKS` peut en plus choisir un assigné ;
- la date peut être masquée pour les profils qui ne doivent pas la définir.

### 15.5.2 Détail de tâche et gestion post-création

La page `/task-details/[taskId]` a été enrichie avec un bloc de gestion visible pour :

- `OWNER`
- `MANAGER`

Évolutions apportées :

- ajout de `updateTaskManagement()` ;
- modification de l’assignation après création ;
- modification de la date d’échéance à tout moment ;
- possibilité de remettre une tâche en “non assignée” ;
- exclusion des `VIEWER` des assignables ;
- date d’échéance toujours optionnelle mais contrôlée côté backend.

### 15.5.3 Mise à jour de statut

La logique de mise à jour de statut a été corrigée pour inclure aussi :

- le `MANAGER`

Ainsi :

- le backend accepte désormais le manager comme acteur légitime pour changer le statut ;
- le front a été réaligné pour ne pas le bloquer inutilement côté interface.

## 15.6 Exports d’actions

L’index des actions a été mis à jour afin d’exposer les nouvelles capacités introduites, notamment :

- `createProjectViewer`
- `updateViewerPermissions`
- `updateTaskManagement`

## 15.7 Vérifications effectuées

Les vérifications suivantes ont été réalisées pendant ce lot :

- builds `npm run build` exécutés avec succès après chaque étape majeure ;
- validation des flux `VIEWER` côté page projet ;
- validation de la création de tâche selon `CREATE_TASK` / `ASSIGN_TASKS` ;
- validation de la création sans assignation ;
- validation de la gestion ultérieure de la date et de l’assignation par `OWNER` / `MANAGER` ;
- vérification de l’absence de régression responsive notable sur la page projet ;
- vérification des guards côté backend et côté front.

## 15.8 Résultat de cette étape

À l’issue de ce lot complémentaire, les éléments suivants peuvent être considérés comme stabilisés :

- noyau permissions V2 centralisé ;
- support opérationnel du rôle `VIEWER` ;
- gestion granulaire des permissions viewer ;
- séparation claire entre rôles standard et observateurs ;
- activation concrète de plusieurs permissions viewer dans les interfaces ;
- alignement des workflows critiques `members`, `activity` et `tasks`.

Ce lot constitue une avancée majeure dans la consolidation fonctionnelle de la V2, au-delà de la seule migration de schéma.

## 15.9 Fichiers particulièrement concernés par ce lot

En complément des fichiers déjà listés plus haut, cette étape a particulièrement touché :

- `lib/permissions-core.ts`
- `lib/project-access.ts`
- `lib/project-capabilities.ts`
- `lib/permission-helpers.ts`
- `lib/permissions.ts`
- `lib/project-roles.ts`
- `lib/team-roles.ts`
- `app/actions/activity.ts`
- `app/actions/members.ts`
- `app/actions/tasks.ts`
- `app/actions/index.ts`
- `app/project/[projectId]/page.tsx`
- `app/new-tasks/[projectId]/page.tsx`
- `app/task-details/[taskId]/page.tsx`
- `type.ts`


---

# 16. Avancement complémentaire — lot 4 migration du module Équipes (14/04/2026)

## 16.1 Objectif du lot traité

Après la stabilisation du schéma V2 et du noyau permissions, un lot complémentaire a été mené pour finaliser la migration du module **Équipes** vers une logique pleinement centrée sur le projet.

Ce lot a porté sur :

- le réalignement du domaine `teams` avec la cible V2 ;
- l’introduction d’une hiérarchie d’équipes exploitable côté runtime et côté interface ;
- la suppression progressive de la logique V1 d’équipe autonome ;
- l’intégration du concept de **chef d’équipe** au niveau des équipes racines ;
- la stabilisation des memberships entre équipes racines et sous-équipes ;
- le nettoyage final des points d’entrée legacy encore visibles dans l’application.

## 16.2 Principes fonctionnels retenus

### 16.2.1 Recentrage sur le projet

La logique V2 retenue pour les équipes repose désormais sur les principes suivants :

- une équipe appartient obligatoirement à un projet ;
- la création d’une équipe se fait depuis le projet ;
- une sous-équipe appartient elle-même au même projet via son équipe racine ;
- la hiérarchie est limitée à 2 niveaux :
  - équipe racine ;
  - sous-équipe.

La page projet devient donc le point d’entrée principal pour consulter, créer et organiser les équipes.

### 16.2.2 Positionnement des sous-équipes

Les sous-équipes ont été interprétées comme des **sous-groupes opérationnels** de l’équipe racine, et non comme des mini-équipes autonomes.

Décisions retenues :

- une sous-équipe n’a pas de chef d’équipe dédié ;
- une sous-équipe ne porte pas d’autorité projet autonome ;
- un utilisateur peut appartenir à plusieurs sous-équipes d’une même équipe racine ;
- une sous-équipe sert principalement à catégoriser et redistribuer le travail au sein de l’équipe racine.

### 16.2.3 Chef d’équipe

Le concept de chef d’équipe a été introduit via `leadUserId` avec les règles suivantes :

- seul une **équipe racine** peut avoir un chef d’équipe ;
- une sous-équipe ne peut pas avoir de chef ;
- le chef d’équipe doit appartenir au projet ;
- un `VIEWER` ne peut pas être chef d’équipe ;
- un chef d’équipe n’est pas nécessairement un `MANAGER` projet ;
- le rôle projet reste la source d’autorité globale ;
- le chef d’équipe représente une responsabilité locale, utile pour les futurs flux d’assignation.

## 16.3 Évolutions du schéma et des types

Le schéma Prisma et les types TypeScript ont été enrichis afin de supporter cette cible.

### 16.3.1 Schéma Prisma

Les évolutions suivantes ont été intégrées :

- ajout de `Team.leadUserId` ;
- ajout de la relation `Team.lead -> User` ;
- ajout de la relation inverse `User.ledTeams` ;
- index dédié sur `leadUserId`.

### 16.3.2 Types front et back

Les types partagés ont été mis à jour afin d’exposer :

- le lead d’une équipe ;
- les structures hiérarchiques d’équipe ;
- les compteurs distinguant :
  - les membres directs ;
  - les membres effectifs.

Cette évolution a notamment permis de distinguer clairement les besoins d’affichage entre équipe racine et sous-équipe.

## 16.4 Réalignement des actions serveur `teams`

Le fichier `app/actions/teams.ts` a été fortement révisé afin de refléter le modèle V2.

### 16.4.1 Création d’équipe et de sous-équipe

Les actions de création ont été réalignées afin de :

- imposer `projectId` comme ancre métier ;
- accepter `parentId` pour les sous-équipes ;
- vérifier la cohérence du parent ;
- empêcher la création d’une hiérarchie au-delà de 2 niveaux ;
- interdire la définition d’un chef d’équipe sur une sous-équipe.

### 16.4.2 Lecture des équipes par projet

Une action de lecture dédiée par projet a été consolidée afin de :

- récupérer uniquement les équipes d’un projet donné ;
- renvoyer une structure hiérarchisée ;
- exposer les informations du lead ;
- distinguer les compteurs directs et effectifs.

### 16.4.3 Détail d’équipe

La lecture du détail d’une équipe a été enrichie pour retourner :

- le projet parent ;
- l’équipe parente si présente ;
- les sous-équipes ;
- les membres de l’équipe ;
- le chef d’équipe si applicable.

### 16.4.4 Gestion du chef d’équipe

Une action dédiée de mise à jour du lead a été ajoutée afin de :

- définir ou retirer un chef d’équipe ;
- vérifier l’appartenance projet ;
- interdire explicitement les leads sur sous-équipes ;
- ajouter automatiquement le lead dans les memberships de l’équipe s’il n’y est pas encore.

## 16.5 Stabilisation des memberships équipe / sous-équipe

Une partie importante du lot a consisté à clarifier la logique d’appartenance entre équipes racines et sous-équipes.

### 16.5.1 Ajout de membre

Une action d’ajout de membre à une équipe a été introduite.

Règles retenues :

- l’utilisateur doit déjà appartenir au projet ;
- un `VIEWER` ne peut pas être ajouté comme membre d’équipe ;
- si l’ajout cible une sous-équipe, l’utilisateur est ajouté automatiquement à l’équipe racine si nécessaire ;
- l’ajout direct à plusieurs sous-équipes d’une même équipe racine reste autorisé.

### 16.5.2 Retrait de membre

La logique de suppression a été ajustée pour refléter la hiérarchie :

- si un membre est retiré d’une équipe racine, il est également retiré des sous-équipes rattachées ;
- si un membre est retiré d’une sous-équipe, il peut rester membre de l’équipe racine ;
- le propriétaire d’équipe reste protégé contre une suppression directe.

### 16.5.3 Comptage des effectifs

La logique de calcul des effectifs a été revue pour éviter les doubles comptages.

Décision retenue :

- `directMembersCount` correspond aux memberships directement rattachés à une équipe ;
- `effectiveMembersCount` correspond, pour une équipe racine, à l’union distincte des membres directs de l’équipe et de ses sous-équipes.

Conséquence :

- un utilisateur présent dans l’équipe racine et dans plusieurs sous-équipes n’est compté qu’une seule fois dans l’effectif de l’équipe racine.

## 16.6 Réalignement des pages et composants front

Le front a été restructuré pour faire disparaître la logique d’équipe autonome de la V1.

### 16.6.1 Page projet

La page projet a été refondue pour introduire une organisation par onglets :

- vue d’ensemble ;
- tâches ;
- équipes ;
- membres ;
- activité.

L’onglet **Équipes** devient l’entrée principale de consultation et de gestion des équipes du projet.

Cet onglet permet désormais :

- l’affichage hiérarchique des équipes ;
- la création d’équipes principales ;
- la création de sous-équipes ;
- l’affichage et la mise à jour du chef d’équipe ;
- le chargement à la demande des données liées aux équipes.

### 16.6.2 Page détail équipe

La page `/teams/[teamId]` a été refondue pour devenir une vue de détail V2 contextualisée.

La page affiche désormais :

- le nom et la description de l’équipe ;
- le rôle courant de l’utilisateur dans l’équipe ;
- le chef d’équipe pour les équipes racines ;
- un message explicite indiquant qu’une sous-équipe n’a pas de chef dédié ;
- le projet parent ;
- l’équipe parente si l’équipe affichée est une sous-équipe ;
- les sous-équipes si l’équipe affichée est une équipe racine ;
- la liste des membres ;
- une interface minimale d’ajout de membres du projet à l’équipe.

Le bloc d’invitation legacy a été retiré de cette page.

### 16.6.3 Suppression de la page autonome `/teams`

La route `/teams`, héritée de la V1 comme hub autonome des équipes, a été supprimée.

Cette suppression s’accompagne de :

- la suppression du composant `TeamComponent` devenu obsolète ;
- le retrait du lien de navigation vers la page équipes dans la navbar ;
- le repositionnement définitif des équipes comme sous-domaine du projet.

## 16.7 Nettoyage du legacy V1

Le lot a aussi porté sur un nettoyage progressif des flux encore marqués par la V1.

### 16.7.1 Flux d’invitation d’équipe

Le flux `joinTeamByInviteCode()` a été conservé temporairement comme compatibilité legacy, mais il a été durci :

- impossibilité de rejoindre une équipe sans appartenir au projet parent ;
- non-utilisation de ce flux comme point d’entrée principal dans la V2.

### 16.7.2 Libellés et organisation UI

Les écrans ont été réajustés afin d’abandonner les formulations et patterns hérités :

- disparition de la notion d’équipe autonome comme axe principal ;
- disparition des invitations d’équipe dans les écrans principaux ;
- recentrage du vocabulaire autour du projet parent et de la hiérarchie d’équipes.

## 16.8 Vérifications effectuées

Les vérifications suivantes ont été menées pendant ce lot :

- builds `npm run build` exécutés avec succès après chaque étape sensible ;
- validation du chargement et du rendu de la nouvelle page projet à onglets ;
- validation de l’onglet équipes ;
- validation de la création d’équipe racine ;
- validation de la création de sous-équipe ;
- validation de la mise à jour du chef d’équipe ;
- validation du détail équipe racine / sous-équipe ;
- validation de l’ajout de membre à une équipe ;
- validation du comportement des memberships sur sous-équipe ;
- validation de la suppression de la page `/teams` après nettoyage du cache `.next`.

## 16.9 Résultat obtenu

À l’issue du lot 4, le module Équipes peut être considéré comme réaligné sur la V2 sur le périmètre traité.

Les éléments suivants sont désormais stabilisés :

- équipes intégrées au projet comme sous-domaine ;
- hiérarchie racine / sous-équipe cohérente ;
- chef d’équipe limité aux équipes racines ;
- memberships conformes au futur modèle de redistribution ;
- compteurs d’effectifs cohérents ;
- disparition des principaux points d’entrée V1 autonomes dans l’interface.

Ce lot constitue une étape structurante pour préparer le lot suivant relatif à l’assignation des tâches aux équipes et à leur redistribution interne.

## 16.10 Fichiers particulièrement concernés par ce lot

Cette étape a particulièrement touché :

- `prisma/schema.prisma`
- `type.ts`
- `lib/validations.ts`
- `lib/project-roles.ts`
- `lib/team-hierarchy.ts`
- `app/actions/teams.ts`
- `app/actions/index.ts`
- `app/actions/members.ts`
- `app/project/[projectId]/page.tsx`
- `app/project/[projectId]/ProjectOverviewTab.tsx`
- `app/project/[projectId]/ProjectMembersTab.tsx`
- `app/project/[projectId]/ProjectActivityTab.tsx`
- `app/project/[projectId]/ProjectTeamsTab.tsx`
- `app/teams/[teamId]/page.tsx`
- `app/components/navbar.tsx`


---

# 17. Avancement complémentaire — lot 5 migration du module Tâches vers la V2 consolidée (16/04/2026 → 17/04/2026)

## 17.1 Objectif du lot traité

Après la stabilisation du schéma V2, du noyau permissions et du module Équipes, un lot complémentaire a été mené pour finaliser la migration du module **Tâches** vers la cible métier V2.

Ce lot a porté sur :

- l’enrichissement complet du modèle `Task` ;
- l’introduction des jalons et commentaires ;
- la clarification de l’assignation V2 entre exécutant et équipe responsable ;
- l’introduction du workflow de revue ;
- la mise en place de la redistribution interne des tâches ;
- l’alignement des permissions liées au chef d’équipe et aux sous-équipes ;
- la remise en cohérence du front projet / tâche avec ces nouveaux comportements.

## 17.2 Principes fonctionnels retenus

### 17.2.1 Distinction entre responsabilité métier et exécution

La cible V2 a été consolidée autour de la distinction suivante :

- `teamId` sur `Task` représente l’**équipe racine responsable** ;
- `userId` représente l’**exécutant courant** lorsqu’une personne est explicitement ciblée ;
- la redistribution interne est portée par une structure dédiée et non par un détournement des champs existants.

Cette distinction a permis de clarifier plusieurs cas d’usage :

- tâche sans équipe responsable ;
- tâche assignée à un individu ;
- tâche assignée à une équipe racine ;
- tâche assignée à un individu au sein d’une équipe ;
- tâche redistribuée à une sous-équipe.

### 17.2.2 Positionnement du chef d’équipe

Le chef d’équipe n’a pas été introduit comme nouveau rôle projet global.

Décision retenue :

- le chef d’équipe reste une **responsabilité locale** portée par `Team.leadUserId` ;
- il peut redistribuer une tâche portée par son équipe racine ;
- il peut renvoyer une tâche en revue ;
- il peut piloter le statut opérationnel d’une tâche portée par son équipe.

### 17.2.3 Interprétation de la redistribution vers sous-équipe

La redistribution vers une sous-équipe a été interprétée comme un ciblage collectif utile et non comme une simple étape intermédiaire sans effet.

Décision retenue :

- lorsqu’une tâche est redistribuée vers une sous-équipe, tous les membres de cette sous-équipe peuvent faire avancer le statut de la tâche ;
- `task.userId` reste `null` tant qu’aucun exécutant individuel n’est désigné ;
- la responsabilité métier reste portée par l’équipe racine d’origine.

## 17.3 Enrichissement du schéma et des types

Le schéma Prisma et les types TypeScript ont été enrichis afin de supporter le modèle tâche V2 complet.

### 17.3.1 Enrichissement de `Task`

Les champs suivants ont été intégrés ou stabilisés dans le modèle de tâche :

- `priority` ;
- `tags` ;
- `milestoneId` ;
- `teamId` ;
- `reviewFeedback` ;
- `reviewedById` ;
- `reviewedAt`.

Le statut tâche a été confirmé dans sa forme V2 finale :

- `TODO`
- `IN_PROGRESS`
- `IN_REVIEW`
- `DONE`
- `CANCELLED`

### 17.3.2 Nouvelles structures métier

Les structures suivantes ont été mises en œuvre dans le modèle de données :

- `Milestone` ;
- `TaskComment` ;
- `TaskRouting` ;
- `TaskRoutingTargetType` avec :
  - `USER`
  - `SUBTEAM`.

### 17.3.3 Activity logs enrichis

L’`ActivityLog` a été enrichi pour mieux tracer les nouveaux comportements du domaine tâches.

Les événements suivants ont notamment été activés côté runtime :

- `TASK_COMMENT_ADDED` ;
- `MILESTONE_CREATED` ;
- `MILESTONE_UPDATED` ;
- `MILESTONE_DELETED` ;
- `TASK_ROUTED_TO_USER` ;
- `TASK_ROUTED_TO_SUBTEAM` ;
- `TASK_ROUTING_CLEARED`.

## 17.4 Réalignement des validations partagées

Le fichier `lib/validations.ts` a été enrichi afin de couvrir les nouveaux flux V2 liés aux tâches.

### Schémas ajoutés ou consolidés

- `taskPrioritySchema` ;
- `taskTagsSchema` ;
- `createTaskSchema` enrichi avec priorité, tags, équipe et jalon ;
- `updateTaskManagementSchema` enrichi ;
- `sendTaskToReviewSchema` ;
- `addTaskCommentSchema` ;
- `createMilestoneSchema` ;
- `getProjectMilestonesSchema` ;
- `updateMilestoneSchema` ;
- `deleteMilestoneSchema` ;
- `routeTaskToUserSchema` ;
- `routeTaskToSubteamSchema` ;
- `clearTaskRoutingSchema`.

Cette étape a permis d’unifier la validation backend de l’ensemble des comportements du nouveau module Tâches.

## 17.5 Réalignement des actions serveur `tasks`

Le fichier `app/actions/tasks.ts` a été fortement révisé afin de porter la logique V2 consolidée.

### 17.5.1 Création et gestion de tâche enrichies

La création et la gestion des tâches ont été étendues pour supporter :

- la priorité ;
- les tags ;
- l’équipe responsable ;
- le jalon ;
- l’assignation nullable ;
- la date d’échéance nullable ;
- la normalisation des tags ;
- les métadonnées d’activité enrichies.

Une contrainte métier importante a été ajoutée :

- si un exécutant est défini en même temps qu’une équipe responsable, cet exécutant doit appartenir à l’équipe racine ou à l’une de ses sous-équipes.

### 17.5.2 Détail de tâche

`getTaskDetails()` a été enrichie afin de retourner l’ensemble des données utiles au nouveau front :

- projet ;
- créateur ;
- exécutant ;
- équipe responsable ;
- jalon ;
- commentaires avec auteur ;
- information de revue ;
- routing complet avec :
  - équipe racine,
  - utilisateur cible,
  - sous-équipe cible,
  - auteur de la redistribution.

### 17.5.3 Workflow de revue

Le workflow `DONE -> IN_REVIEW -> DONE` a été introduit pour permettre la validation intermédiaire d’une solution.

Décisions retenues :

- l’exécutant termine la tâche avec une solution ;
- un responsable peut renvoyer la tâche en revue avec un retour explicite ;
- l’exécutant peut ensuite proposer une nouvelle solution et remettre la tâche à l’état terminé ;
- le passage vers `IN_REVIEW` est réservé à l’action dédiée `sendTaskToReview()`.

### 17.5.4 Commentaires de tâche

Le lot a introduit un premier niveau de commentaires via `TaskComment`.

Évolutions apportées :

- ajout de `addTaskComment()` ;
- affichage chronologique des commentaires dans le détail tâche ;
- interdiction de commentaire pour les `VIEWER` ;
- traçabilité dédiée dans `ActivityLog`.

### 17.5.5 Jalons

Le domaine `Milestone` a été rendu opérationnel.

Actions ajoutées ou stabilisées :

- `createMilestone()` ;
- `getProjectMilestones()` ;
- `updateMilestone()` ;
- `deleteMilestone()`.

Comportements retenus :

- seuls `OWNER` et `MANAGER` peuvent créer, modifier ou supprimer un jalon ;
- une tâche peut être rattachée ou détachée d’un jalon à la création ou en gestion ;
- les jalons sont visibles depuis la tâche et depuis le projet.

### 17.5.6 Redistribution opérationnelle

La redistribution interne a été introduite via `TaskRouting`.

Actions ajoutées :

- `routeTaskToUser()` ;
- `routeTaskToSubteam()` ;
- `clearTaskRouting()`.

Règles mises en œuvre :

- seule une tâche portée par une équipe racine peut être redistribuée ;
- la redistribution vers un membre met à jour `task.userId` ;
- la redistribution vers une sous-équipe vide `task.userId` ;
- le retrait de redistribution nettoie le routing actif ;
- l’équipe racine responsable reste inchangée ;
- les `VIEWER` ne peuvent jamais devenir exécutants.

## 17.6 Permissions et contrôles d’accès

Une partie importante du lot a consisté à aligner les permissions avec la cible métier finale.

### 17.6.1 Chef d’équipe

Le rôle du chef d’équipe a été renforcé au niveau opérationnel.

Évolutions apportées :

- correction de `assertTaskAccess()` afin d’autoriser aussi le chef de l’équipe racine responsable ;
- autorisation du chef d’équipe pour la redistribution ;
- autorisation du chef d’équipe pour le renvoi en revue ;
- autorisation du chef d’équipe pour le pilotage du statut opérationnel.

### 17.6.2 Sous-équipe cible

Le changement de statut a été réaligné pour refléter le sens métier d’une redistribution vers sous-équipe.

Décision retenue :

- lorsqu’une tâche est routée vers une sous-équipe, tout membre de cette sous-équipe peut faire avancer le statut ;
- ce droit est validé côté backend, même si aucun exécutant individuel n’est désigné.

### 17.6.3 Synthèse des acteurs autorisés à modifier le statut

À l’issue du lot, les acteurs suivants peuvent modifier le statut selon les cas :

- l’exécutant direct ;
- le créateur de la tâche ;
- le propriétaire du projet ;
- le manager du projet ;
- le chef de l’équipe racine responsable ;
- un membre de la sous-équipe cible lorsqu’un routing actif de type `SUBTEAM` existe.

## 17.7 Réalignement du front — création, détail et liste des tâches

Le front a été remis en cohérence avec la sémantique V2.

### 17.7.1 Création de tâche

La page `/new-tasks/[projectId]` a été enrichie pour supporter :

- le choix de la priorité ;
- les tags ;
- l’équipe responsable ;
- le jalon ;
- un vocabulaire clarifié entre :
  - **exécutant**,
  - **équipe responsable**.

Une modal de création rapide de jalon a également été ajoutée pour fluidifier le rattachement dès la création de la tâche.

### 17.7.2 Détail de tâche

La page `/task-details/[taskId]` a été enrichie avec :

- un bloc “Responsabilité” distinguant exécutant, équipe responsable et jalon ;
- un bloc de revue ;
- un bloc commentaires ;
- un bloc de redistribution opérationnelle ;
- une interface de redistribution vers membre ou sous-équipe ;
- une interface de retrait de redistribution ;
- une modal de gestion de tâche ;
- une modal de création de jalon ;
- une clarification du vocabulaire UI autour de l’assignation V2.

### 17.7.3 Liste et filtres des tâches projet

La section tâches du projet a été enrichie afin d’exploiter réellement le nouveau modèle.

Évolutions apportées :

- prise en compte de la priorité ;
- prise en compte du jalon ;
- prise en compte de l’équipe responsable ;
- prise en compte de la redistribution ;
- correction de l’affichage d’une tâche redistribuée à une sous-équipe ;
- enrichissement des filtres ;
- remplacement du filtre de statut par un dropdown plus lisible.

## 17.8 Vérifications effectuées

Les vérifications suivantes ont été menées au fil du lot :

- builds `npm run build` exécutés avec succès après chaque étape sensible ;
- validation de la création de tâche enrichie ;
- validation de la gestion post-création des champs enrichis ;
- validation du workflow de revue ;
- validation des commentaires ;
- validation des jalons :
  - création,
  - modification,
  - suppression,
  - rattachement,
  - détachement ;
- validation de la redistribution :
  - vers membre,
  - vers sous-équipe,
  - retrait de redistribution ;
- validation de la redistribution par chef d’équipe ;
- validation du changement de statut par chef d’équipe ;
- validation du changement de statut par membre d’une sous-équipe cible ;
- validation des filtres enrichis de la section tâches ;
- correction du double toast sur le changement de statut.

## 17.9 Résultat obtenu

À l’issue du lot 5, le module **Tâches** peut être considéré comme réaligné sur la V2 sur le périmètre traité.

Les éléments suivants sont désormais stabilisés :

- modèle `Task` enrichi ;
- distinction claire entre exécutant et équipe responsable ;
- workflow de revue ;
- commentaires de tâche ;
- jalons ;
- redistribution interne des tâches ;
- droits du chef d’équipe ;
- droits des sous-équipes ciblées ;
- affichage et filtrage cohérents côté projet et détail tâche.

Ce lot clôture la partie principale du modèle tâche V2, en cohérence avec la hiérarchie d’équipes introduite précédemment.

## 17.10 Fichiers particulièrement concernés par ce lot

Cette étape a particulièrement touché :

- `prisma/schema.prisma`
- `type.ts`
- `lib/validations.ts`
- `lib/permissions.ts`
- `lib/task-status.ts`
- `lib/task-tags.ts`
- `app/actions/tasks.ts`
- `app/actions/milestones.ts`
- `app/actions/activity.ts`
- `app/actions/projects.ts`
- `app/actions/index.ts`
- `app/new-tasks/[projectId]/page.tsx`
- `app/task-details/[taskId]/page.tsx`
- `app/project/[projectId]/page.tsx`
- `app/project/[projectId]/ProjectMilestonesTab.tsx`
- `app/components/TaskComponent.tsx`
- `app/project/[projectId]/ProjectMembersTab.tsx`
- `Documentation_Migration_V1_V2.md`.


---

# 18. Avancement complémentaire — lot 6 notifications in-app (17/04/2026 → 18/04/2026)

## 18.1 Objectif du lot traité

Après la stabilisation du schéma V2, du noyau permissions, du module Équipes et du module Tâches, un lot complémentaire a été mené pour rendre le système de **notifications in-app** réellement opérationnel sur les domaines déjà les plus avancés de la V2.

Ce lot a porté sur :

- la consolidation du modèle `Notification` introduit par la V2 ;
- l’introduction d’un backend dédié de création, lecture et marquage des notifications ;
- le branchement progressif des notifications sur les événements métier déjà disponibles ;
- la coexistence entre emails transactionnels existants et notifications in-app ;
- l’introduction d’une première UI de consultation dans la navbar ;
- l’ajout d’une page dédiée `/notifications` ;
- l’amélioration de l’expérience utilisateur sur desktop et mobile ;
- la préparation de l’extension future vers le module Réunions V2.

## 18.2 Principes fonctionnels retenus

### 18.2.1 Distinction entre audit projet et notification utilisateur

La cible V2 a été consolidée autour de la distinction suivante :

- `ActivityLog` reste le support de **traçabilité projet** ;
- `Notification` devient le support de **notification in-app par utilisateur**.

Cette distinction a permis de conserver une séparation claire entre :

- l’historique métier visible au niveau projet ;
- l’alerte contextuelle reçue individuellement par un utilisateur.

### 18.2.2 Coexistence avec les emails transactionnels

Décision retenue :

- les emails transactionnels existants sont conservés ;
- les notifications in-app sont ajoutées en parallèle ;
- l’email n’est pas remplacé brutalement par la notification.

Cette règle a été appliquée en priorité sur l’assignation de tâche :

- l’email Resend historique reste envoyé ;
- une notification `TASK_ASSIGNED` est désormais créée en parallèle.

### 18.2.3 Déploiement progressif par domaine métier

Le lot a été volontairement déployé par étapes afin de limiter les régressions.

Ordre retenu :

- socle technique `Notification` ;
- notifications liées au domaine Tâches ;
- notifications liées au domaine Projet / rôles / VIEWER ;
- consultation utilisateur ;
- raffinements UX ;
- préparation de l’extension future vers les Réunions.

## 18.3 Évolutions du schéma et des types

Le schéma Prisma et les types TypeScript ont été enrichis afin de rendre le module notifications réellement exploitable.

### 18.3.1 Modèle `Notification`

Le modèle `Notification` a été consolidé avec les champs suivants :

- `userId` ;
- `type` ;
- `title` ;
- `message` ;
- `link` ;
- `metadata` ;
- `readAt` ;
- `createdAt`.

### 18.3.2 Enum `NotificationType`

Le type libre initial a été remplacé par un enum Prisma dédié.

Les types stabilisés dans ce lot sont :

- `TASK_ASSIGNED`
- `TASK_REVIEW_REQUESTED`
- `TASK_ROUTED_TO_USER`
- `TASK_ROUTED_TO_SUBTEAM`
- `TASK_ROUTING_CLEARED`
- `TASK_COMMENT_ADDED`
- `MANAGER_ASSIGNED`
- `VIEWER_INVITED`
- `VIEWER_PERMISSIONS_UPDATED`
- `MEETING_INVITED`
- `MEETING_UPDATED`

### 18.3.3 Index et structure de consultation

Le modèle a été enrichi avec des index adaptés à la consultation utilisateur :

- index par `userId, createdAt` ;
- index par `userId, readAt` ;
- index par `userId, type, createdAt`.

### 18.3.4 Types partagés

Les types front et back ont été mis à jour afin d’exposer :

- `NotificationType` ;
- `NotificationPayload` ;
- `NotificationItem` ;
- `NotificationRoutingType`.

Le payload de notification a été structuré pour transporter notamment :

- `projectId` ;
- `taskId` ;
- `meetingId` ;
- `teamId` ;
- `subteamId` ;
- `commentId` ;
- `actorUserId` ;
- `routingType`.

## 18.4 Backend notifications dédié

Un module serveur dédié a été introduit pour centraliser le comportement des notifications.

### 18.4.1 Fichier dédié

Le fichier `app/actions/notifications.ts` a été ajouté.

### 18.4.2 Capacités introduites

Ce module permet désormais de :

- créer une notification unitaire ;
- créer plusieurs notifications en lot ;
- construire un lien profond cohérent selon le type de notification ;
- lire les notifications de l’utilisateur courant ;
- obtenir le compteur de notifications non lues ;
- marquer une notification comme lue ;
- marquer une notification comme non lue ;
- marquer toutes les notifications comme lues.

### 18.4.3 Exports d’actions

`app/actions/index.ts` a été enrichi afin d’exposer les nouvelles actions de notifications au front.

## 18.5 Branches métier activées — domaine Tâches

Le lot a d’abord été branché sur le domaine Tâches, déjà le plus riche en événements métier.

### 18.5.1 Assignation de tâche

Lors de la création d’une tâche avec assignation :

- l’email transactionnel historique continue d’être envoyé ;
- une notification `TASK_ASSIGNED` est créée pour l’exécutant cible ;
- un lien profond vers la fiche tâche est généré.

### 18.5.2 Renvoi en revue

L’action `sendTaskToReview()` a été enrichie afin de produire une notification `TASK_REVIEW_REQUESTED`.

Destinataire retenu :

- exécutant courant si pertinent ;
- sinon créateur de tâche selon le contexte.

### 18.5.3 Redistribution vers un membre

L’action `routeTaskToUser()` produit désormais :

- le log projet correspondant ;
- une notification `TASK_ROUTED_TO_USER` pour l’utilisateur cible.

### 18.5.4 Redistribution vers une sous-équipe

L’action `routeTaskToSubteam()` produit désormais :

- le log projet correspondant ;
- des notifications `TASK_ROUTED_TO_SUBTEAM` pour les membres de la sous-équipe cible.

### 18.5.5 Retrait de redistribution

L’action `clearTaskRouting()` produit désormais :

- le log projet correspondant ;
- une notification `TASK_ROUTING_CLEARED` pour les anciens destinataires concernés.

### 18.5.6 Commentaires

L’action `addTaskComment()` a été enrichie afin de produire une notification `TASK_COMMENT_ADDED`.

Destinataires retenus :

- exécutant courant ;
- créateur ;
- cible utilisateur d’un éventuel routing actif ;

avec exclusion systématique de l’auteur du commentaire.

## 18.6 Branches métier activées — domaine Projet / rôles / VIEWER

Le lot a ensuite été étendu au domaine projet déjà stabilisé au lot 3.

### 18.6.1 Nomination manager

L’action `updateProjectMemberRole()` a été enrichie afin de créer une notification `MANAGER_ASSIGNED` lorsque la cible devient manager.

### 18.6.2 Création d’un viewer

L’action `createProjectViewer()` crée désormais une notification `VIEWER_INVITED` pour l’utilisateur ajouté comme observateur.

### 18.6.3 Mise à jour des permissions viewer

L’action `updateViewerPermissions()` crée désormais une notification `VIEWER_PERMISSIONS_UPDATED` pour le viewer concerné.

## 18.7 Enrichissement de la traçabilité

Le lot a également servi à réaligner `ActivityLog.metadata` avec les nouveaux usages.

### 18.7.1 Objectif

L’objectif n’était pas de fusionner activité et notification, mais de :

- mieux contextualiser les événements ;
- aligner les liens profonds avec les ressources métier ;
- améliorer la cohérence entre audit projet et navigation utilisateur.

### 18.7.2 Métadonnées enrichies

Les métadonnées portent désormais plus systématiquement, selon les cas :

- `projectId` ;
- `taskId` ;
- `commentId` ;
- `teamId` ;
- `rootTeamId` ;
- `targetUserId` ;
- `targetTeamId` ;
- `actorUserId` ;
- les transitions de rôle ou de statut.

## 18.8 Réalignement du front — navbar et dropdown

La première UI de consultation des notifications a été ajoutée dans la navigation principale.

### 18.8.1 Cloche notifications

Un composant `NotificationBell` a été introduit dans la navbar.

Capacités apportées :

- compteur de non lues ;
- ouverture du centre de notifications rapide ;
- lecture des dernières notifications ;
- marquage lu / non lu depuis l’UI ;
- action “Tout lire”.

### 18.8.2 Première version du dropdown

Le dropdown desktop a été introduit comme accès rapide aux notifications récentes avec :

- titre ;
- message ;
- date ;
- état lu / non lu ;
- lien profond vers la ressource concernée.

### 18.8.3 Retrait du doublon de navigation

Un lien “Notifications” avait d’abord été ajouté à la navbar, puis retiré.

Décision retenue :

- la cloche devient le point d’entrée principal du centre de notifications ;
- la redondance avec un onglet de navigation classique a été supprimée.

## 18.9 Page dédiée `/notifications`

Le lot a ensuite dépassé la simple cloche navbar avec l’ajout d’une vraie page de consultation.

### 18.9.1 Objectif

Créer une page dédiée permettant :

- de consulter davantage de notifications ;
- de travailler sur le statut lu / non lu ;
- de filtrer les notifications ;
- d’améliorer l’usage sur mobile.

### 18.9.2 Capacités ajoutées

La page `/notifications` permet désormais :

- l’affichage d’une liste étendue de notifications ;
- l’action “Marquer comme lue” ;
- l’action “Marquer comme non lue” ;
- l’action “Tout marquer comme lu” ;
- l’ouverture de la ressource liée ;
- le filtrage par état :
  - `Toutes`
  - `Non lues`
- le filtrage par catégorie :
  - `Tous types`
  - `Tâches`
  - `Projet`
  - `Réunions`

### 18.9.3 Combinaison des filtres

Les filtres ont été conçus pour être combinables, par exemple :

- `Non lues + Tâches`
- `Toutes + Projet`
- `Toutes + Réunions`

## 18.10 Raffinements UX

Une phase de polish a été menée sur la cloche et la page dédiée.

### 18.10.1 Lisibilité métier

Les notifications affichent désormais :

- un libellé métier plus clair selon le type ;
- une icône dédiée par type ;
- une date plus lisible au format relatif ;
- une distinction visuelle plus nette entre lu et non lu.

### 18.10.2 Cycle complet lu / non lu

Le lot a complété le cycle de vie d’une notification :

- lecture ;
- marquage lu ;
- marquage non lu ;
- tout marquer comme lu.

Cette évolution a été branchée à la fois :

- dans le dropdown navbar ;
- sur la page `/notifications`.

## 18.11 Responsive / mobile

Une anomalie responsive a été identifiée sur téléphone.

### 18.11.1 Problème constaté

Le dropdown notifications, conçu d’abord pour desktop, s’ouvrait mal lorsqu’il était rendu dans le menu mobile plein écran :

- panneau tronqué ;
- débordement horizontal ;
- affichage non exploitable.

### 18.11.2 Correction retenue

La logique responsive a été revue avec la règle suivante :

- sur desktop : la cloche ouvre un dropdown ;
- sur mobile : la cloche redirige vers la page `/notifications`.

Cette solution permet :

- d’éviter les débordements ;
- de conserver une UX simple ;
- de réutiliser la page dédiée comme centre de notifications mobile.

## 18.12 Réunions — préparation et report

Le lot a également préparé la suite du chantier sans forcer une implémentation incomplète.

### 18.12.1 Types prévus

Les types suivants sont déjà présents dans le modèle notifications :

- `MEETING_INVITED`
- `MEETING_UPDATED`

### 18.12.2 Décision retenue

L’activation réelle des notifications réunions a été volontairement reportée.

Raison :

- le modèle Réunions V2 n’était pas encore suffisamment stabilisé/testable ;
- il était préférable de ne pas empiler du code difficile à valider dans l’immédiat.

## 18.13 Vérifications effectuées

Les vérifications suivantes ont été menées au fil du lot :

- builds `npm run build` exécutés avec succès après chaque étape sensible ;
- validation de la création des notifications en base ;
- validation des liens profonds générés ;
- validation des notifications tâches :
  - assignation ;
  - revue ;
  - redistribution vers membre ;
  - redistribution vers sous-équipe ;
  - retrait de redistribution ;
  - commentaire ;
- validation des notifications projet :
  - nomination manager ;
  - création viewer ;
  - mise à jour permissions viewer ;
- validation du compteur de non lues ;
- validation du marquage comme lue ;
- validation du marquage comme non lue ;
- validation du marquage global comme lu ;
- validation du dropdown navbar ;
- validation de la page `/notifications` ;
- validation des filtres par état ;
- validation des filtres par catégorie ;
- validation du comportement responsive mobile après correction.

## 18.14 Résultat obtenu

À l’issue du lot 6, le module **Notifications in-app** peut être considéré comme stabilisé sur le périmètre déjà actif de la V2.

Les éléments suivants sont désormais considérés comme en place :

- modèle Prisma `Notification` consolidé ;
- backend notifications dédié ;
- notifications liées au domaine Tâches ;
- notifications liées au domaine Projet / rôles / VIEWER ;
- coexistence avec les emails transactionnels existants ;
- cloche navbar opérationnelle ;
- page dédiée `/notifications` ;
- cycle complet lu / non lu ;
- filtrage par état et catégorie ;
- comportement responsive corrigé.

Ce lot constitue une avancée importante dans la concrétisation de la cible V2, en rendant le système plus vivant et plus exploitable au quotidien par les utilisateurs.

## 18.15 Fichiers particulièrement concernés par ce lot

Cette étape a particulièrement touché :

- `prisma/schema.prisma`
- `type.ts`
- `app/actions/activity.ts`
- `app/actions/tasks.ts`
- `app/actions/members.ts`
- `app/actions/notifications.ts`
- `app/actions/index.ts`
- `app/components/Navbar.tsx`
- `app/components/NotificationBell.tsx`
- `app/notifications/page.tsx`
- `lib/email.ts`
- `Documentation_Migration_V1_V2.md`


---

# 19. Avancement complémentaire — lot 7 migration du module Réunions vers la V2 consolidée (20/04/2026 → 21/04/2026)

## 19.1 Objectif du lot traité

Après la stabilisation du schéma V2, du noyau permissions, du module Équipes, du module Tâches et du socle de notifications in-app, un lot complémentaire a été mené pour réaligner le module **Réunions** sur la cible métier V2.

Ce lot a porté sur :

- le réalignement du domaine `TeamMeeting` avec la V2 consolidée ;
- l’exploitation réelle de `MeetingParticipant` ;
- la clarification des permissions de consultation, participation et gestion ;
- l’introduction d’un modèle de réunions plus souple, compatible avec :
  - réunion autonome,
  - réunion projet,
  - réunion d’équipe ;
- le maintien et la consolidation de l’intégration Jitsi ;
- le branchement des notifications in-app sur les événements réunion ;
- l’ajout des emails d’invitation réunion ;
- la remise en cohérence du front de création, de liste et de détail des réunions ;
- un passage final de polish UI sur la page `/meetings`.

## 19.2 Principes fonctionnels retenus

### 19.2.1 Réunion et contexte métier

La cible V2 a été consolidée autour des règles suivantes :

- une réunion peut être liée à un projet ;
- une réunion peut cibler une équipe spécifique ;
- une réunion peut aussi exister sans projet ni équipe comme **réunion autonome** ;
- le projet reste le contexte d’autorisation principal lorsqu’il est renseigné ;
- le cas autonome repose sur le créateur et les participants explicites.

Cette interprétation permet de conserver la souplesse du modèle V2 tout en restant cohérent avec la cible où `TeamMeeting.projectId` est maintenu optionnel.

### 19.2.2 Distinction des niveaux d’accès

Le lot a clarifié la séparation entre trois niveaux d’accès :

- **lecture** d’une réunion ;
- **participation** effective à la visioconférence ;
- **gestion** de la réunion.

Cette distinction a été appliquée aussi bien :

- côté backend ;
- côté page détail ;
- côté affichage des actions Jitsi ;
- côté visibilité des réunions dans la liste.

### 19.2.3 Réunions autonomes

Le besoin d’un module Réunions réellement exploitable hors projet a conduit à retenir explicitement le cas des réunions autonomes.

Décisions retenues :

- une réunion autonome peut être créée sans projet ni équipe ;
- le créateur peut la gérer ;
- les participants explicites peuvent la consulter et la rejoindre ;
- un utilisateur non invité ne peut ni la voir ni y accéder ;
- ce comportement reste indépendant du système d’appartenance projet.

### 19.2.4 Réunions projet et réunions d’équipe

Pour les réunions liées à un projet, la logique de permissions repose désormais sur le moteur V2 de capabilities projet.

Règles consolidées :

- `OWNER` et `MANAGER` gèrent les réunions du projet ;
- `VIEWER` peut consulter les réunions si `VIEW_MEETINGS` est accordé ;
- `VIEWER` peut rejoindre la visio seulement si `JOIN_MEETINGS` est accordé ;
- `MEMBER` peut consulter les réunions du projet et rejoindre la visio ;
- une réunion ciblée sur une équipe n’est plus affichée inutilement aux membres non concernés lorsque cela crée de la confusion ;
- un participant explicite conserve la visibilité et l’accès attendus.

## 19.3 Évolutions du schéma et des types

Le schéma Prisma et les types partagés ont été enrichis afin de supporter le modèle Réunions V2 finalisé.

### 19.3.1 Schéma Prisma

Les évolutions suivantes ont été stabilisées :

- `TeamMeeting.teamId` rendu nullable ;
- relation `TeamMeeting.team` rendue optionnelle ;
- maintien de `TeamMeeting.projectId` optionnel ;
- exploitation réelle de `MeetingParticipant` comme table métier d’invitation explicite.

Cette évolution permet désormais de supporter les trois cas :

- réunion autonome ;
- réunion projet ;
- réunion projet ciblée équipe.

### 19.3.2 Types partagés

Les types front et back ont été mis à jour afin d’exposer :

- les participants explicites ;
- les enregistrements enrichis avec auteur ;
- les booléens de capacités de la page détail :
  - `canManageMeeting`
  - `canJoinMeeting`.

Le type `TeamMeeting` a également été réaligné avec les payloads réels renvoyés par les actions serveur.

## 19.4 Réalignement des accès et permissions

Une partie importante du lot a consisté à sortir définitivement d’une logique purement centrée sur l’ancien rôle d’équipe.

### 19.4.1 Helper d’accès réunion

Un helper dédié `meeting-access` a été consolidé afin de résoudre le contexte d’accès d’une réunion en fonction :

- du projet direct si présent ;
- du projet de l’équipe si nécessaire ;
- ou du caractère autonome de la réunion.

Ce helper permet désormais de centraliser :

- la lecture ;
- la participation ;
- la gestion ;
- l’ajout d’enregistrements.

### 19.4.2 Réunions projet

Lorsqu’une réunion est liée à un projet, les droits sont évalués via les capabilities projet V2.

Les capacités exploitées dans ce lot sont notamment :

- lecture de réunion ;
- participation à la réunion ;
- mise à jour de réunion ;
- ajout d’enregistrement ;
- création de réunion.

### 19.4.3 Réunions autonomes

Lorsqu’une réunion n’est liée à aucun projet, les règles suivantes sont appliquées :

- le créateur peut lire, rejoindre et gérer ;
- un participant explicite peut lire et rejoindre ;
- un utilisateur non invité ne peut pas accéder à la réunion ;
- les enregistrements et les actions de gestion restent réservés au créateur.

### 19.4.4 Alignement des booléens de capacité pour le front

La page détail ne dépend plus uniquement de `currentUserTeamRole`.

Le backend renvoie maintenant directement :

- `canManageMeeting`
- `canJoinMeeting`

Ce changement a permis de remettre en cohérence :

- les actions de gestion des participants ;
- les actions Jitsi ;
- l’édition des notes ;
- la gestion des enregistrements ;
- le comportement de la page détail sur les réunions autonomes et projet.

## 19.5 Participants explicites

Le lot a mis en exploitation réelle la table `MeetingParticipant`.

### 19.5.1 Création de réunion avec participants

La création d’une réunion accepte désormais une liste de participants explicites.

Règles retenues :

- exclusion du créateur de la liste des participants explicites ;
- validation par appartenance projet lorsqu’un projet est lié ;
- validation par existence d’utilisateurs applicatifs pour les réunions autonomes.

### 19.5.2 Mise à jour des participants après création

La page détail réunion permet désormais d’ajouter et retirer des participants après création.

Évolutions apportées :

- récupération des participants éligibles ;
- sauvegarde des ajouts et retraits ;
- notification des nouveaux participants ajoutés ;
- mise à jour cohérente de l’état de la réunion.

### 19.5.3 Participants éligibles selon le contexte

Deux comportements distincts ont été stabilisés :

- **réunion projet** :
  - membres du projet ;
  - `VIEWER` uniquement si `JOIN_MEETINGS` ;
- **réunion autonome** :
  - utilisateurs valides de l’application.

### 19.5.4 Exclusion du créateur

Le créateur de la réunion a été exclu :

- de la liste des participants éligibles ;
- du payload de création ;
- du payload de mise à jour.

Cette règle a été appliquée à la fois :

- côté front ;
- côté backend.

## 19.6 Notifications et invitations réunion

Le lot a prolongé le socle notifications in-app du lot 6 sur le domaine Réunions.

### 19.6.1 Notifications in-app réunion

Les événements suivants ont été activés ou consolidés :

- `MEETING_INVITED`
- `MEETING_UPDATED`

Ces notifications sont utilisées notamment lors de :

- la création d’une réunion avec participants ;
- l’ajout de nouveaux participants ;
- la mise à jour des notes ;
- le changement de statut ;
- la génération / régénération / suppression du lien Jitsi.

### 19.6.2 Liens profonds

Le système de deep links du centre de notifications a été validé pour les réunions.

Les notifications réunion renvoient désormais vers :

- `/meetings/[meetingId]`

grâce au `meetingId` présent dans les métadonnées.

### 19.6.3 Emails d’invitation réunion

Le lot a ajouté un envoi d’email en complément des notifications in-app, conformément à la cible V2.

Un helper dédié a été ajouté dans `lib/email.ts` afin d’envoyer un email d’invitation contenant :

- le titre de la réunion ;
- la date et l’horaire ;
- la durée prévue ;
- le contexte projet ou autonome ;
- le lien direct vers la réunion dans l’application ;
- le lien de visioconférence lorsqu’il existe.

Cet envoi est branché :

- lors de la création d’une réunion avec participants ;
- lors de l’ajout de nouveaux participants après création.

La logique a été conservée **non bloquante**, dans le même esprit que les emails liés au domaine Tâches.

## 19.7 Réalignement des actions serveur `meetings`

Le fichier `app/actions/meetings.ts` a été fortement révisé afin de refléter la sémantique V2 consolidée.

### 19.7.1 Création de réunion

La création de réunion supporte désormais :

- `projectId` optionnel ;
- `teamId` optionnel ;
- `participantUserIds` ;
- `notes` ;
- `durationMinutes` ;
- `externalUrl`.

La logique de création :

- déduit le projet depuis l’équipe si nécessaire ;
- autorise les réunions autonomes ;
- vérifie la cohérence équipe / projet ;
- persiste les participants explicites.

### 19.7.2 Lecture de la liste des réunions

`getMeetingsForCurrentUser()` a été revu afin de mieux distinguer les cas métier.

Le comportement final prend en compte :

- les réunions projet lisibles ;
- les réunions d’équipe réellement pertinentes pour l’utilisateur ;
- les réunions autonomes créées par l’utilisateur ;
- les réunions autonomes où l’utilisateur est participant explicite.

Cette évolution a notamment permis d’éviter qu’un membre voie dans `/meetings` des réunions d’équipe non pertinentes.

### 19.7.3 Détail réunion

`getMeetingDetails()` a été enrichie afin de retourner :

- projet ;
- équipe ;
- créateur ;
- participants enrichis ;
- enregistrements enrichis ;
- `canManageMeeting` ;
- `canJoinMeeting`.

### 19.7.4 Notes, statut et enregistrements

Les actions suivantes ont été réalignées sur les nouvelles règles d’accès :

- `updateMeetingNotes()`
- `updateMeetingStatus()`
- `addMeetingRecording()`
- `removeMeetingRecording()`

Elles produisent également les notifications réunion correspondantes lorsque pertinent.

### 19.7.5 Participants

L’action `updateMeetingParticipants()` permet désormais :

- l’ajout de participants ;
- le retrait de participants ;
- la notification des nouveaux invités ;
- l’envoi des emails d’invitation associés.

### 19.7.6 Visioconférence Jitsi

Les actions suivantes ont été consolidées :

- `generateJitsiMeetingLink()`
- `regenerateJitsiMeetingLink()`
- `removeMeetingVideoLink()`

Le comportement Jitsi reste compatible avec l’existant, avec une gestion plus fine des droits de consultation et de participation.

## 19.8 Réalignement du front — page de création et page détail

Le front a été remis en cohérence avec la nouvelle souplesse du module Réunions.

### 19.8.1 Page `/meetings` — création

Le formulaire de création a été refondu selon la logique :

- projet éventuel ;
- équipe concernée optionnelle ;
- participants explicites optionnels.

Évolutions apportées :

- possibilité de créer une réunion autonome ;
- chargement des projets associés directement, indépendamment de l’existence d’une équipe ;
- équipe devenue optionnelle ;
- ajout d’une sélection de participants à la création ;
- ajout d’une recherche de participants ;
- maintien du responsive.

### 19.8.2 Page `/meetings/[meetingId]` — détail

La page détail réunion a été fortement enrichie.

Évolutions principales :

- affichage des participants explicites ;
- mise à jour des participants après création ;
- recherche dans la liste des participants éligibles ;
- bouton pour afficher / masquer la zone de gestion des participants ;
- exclusion du créateur de la liste sélectionnable ;
- réactivation cohérente du bloc Jitsi selon les permissions réelles ;
- masquage du lien Jitsi lorsqu’un utilisateur peut consulter la réunion sans pouvoir la rejoindre ;
- édition des notes et des enregistrements selon `canManageMeeting`.

## 19.9 Polish UI de la page liste des réunions

Une phase de polish a été menée sur la page `/meetings` afin de mieux absorber la richesse fonctionnelle du lot.

### 19.9.1 Filtres et recherche

La page a été enrichie avec :

- une recherche texte ;
- un filtre par statut ;
- un filtre par type de réunion ;
- un filtre temporel.

### 19.9.2 Clarification des types de réunion

Les libellés ont été revus afin de distinguer plus clairement :

- réunion autonome ;
- réunion projet ;
- réunion d’équipe.

### 19.9.3 Lisibilité de la liste

Les cartes de réunions ont été améliorées avec :

- badges de statut ;
- badges de type ;
- libellés plus explicites pour le projet et l’équipe ;
- maintien du responsive.

## 19.10 Vérifications effectuées

Les vérifications suivantes ont été menées au fil du lot :

- validations Prisma (`format`, `validate`, `generate`) ;
- migrations Prisma appliquées avec succès ;
- builds `npm run build` exécutés avec succès après chaque étape sensible ;
- validation de la création d’une réunion :
  - autonome,
  - projet,
  - projet + équipe ;
- validation de l’affichage des réunions autonomes dans la liste ;
- validation de la page détail réunion ;
- validation de la mise à jour des participants après création ;
- validation de la recherche de participants ;
- validation des notifications réunion in-app ;
- validation des emails d’invitation réunion ;
- validation du comportement Jitsi ;
- validation des deep links notifications → réunion ;
- validation du comportement responsive sur la création, la liste et le détail ;
- validation finale des permissions sur les cas suivants :
  - `VIEWER` avec `VIEW_MEETINGS` ;
  - `VIEWER` avec `JOIN_MEETINGS` ;
  - `MEMBER` sur réunion projet ;
  - créateur de réunion autonome ;
  - participant explicite d’une réunion autonome ;
  - utilisateur non invité à une réunion autonome.

## 19.11 Résultat obtenu

À l’issue du lot 7, le module **Réunions** peut être considéré comme réaligné sur la V2 sur le périmètre traité.

Les éléments suivants sont désormais stabilisés :

- réunions autonomes ;
- réunions liées à un projet ;
- réunions ciblées sur une équipe ;
- participants explicites ;
- gestion des participants après création ;
- séparation claire entre lecture, participation et gestion ;
- exploitation de `VIEW_MEETINGS` et `JOIN_MEETINGS` ;
- Jitsi cohérent avec les permissions réelles ;
- notifications in-app réunion ;
- emails d’invitation réunion ;
- page détail stabilisée ;
- page liste enrichie et plus lisible.

Ce lot clôt le réalignement principal du domaine Réunions dans la migration V2 consolidée.

## 19.12 Fichiers particulièrement concernés par ce lot

Cette étape a particulièrement touché :

- `prisma/schema.prisma`
- `type.ts`
- `lib/meeting-access.ts`
- `lib/email.ts`
- `app/actions/meetings.ts`
- `app/actions/index.ts`
- `app/actions/notifications.ts`
- `app/meetings/page.tsx`
- `app/meetings/[meetingId]/page.tsx`
- `Documentation_Migration_V1_V2.md`


---

# 20. Avancement complémentaire — lot 8 dashboard projets / owner consolidé (22/04/2026)

## 20.1 Objectif du lot traité

Après la stabilisation du schéma V2, du noyau permissions, du module Équipes, du module Tâches, du socle notifications in-app et du module Réunions, un lot complémentaire a été mené pour rendre le **dashboard projets** réellement exploitable dans la V2.

Ce lot a porté sur :

- la construction d’une vue macro consolidée par projet ;
- l’introduction d’un score de santé projet ;
- l’agrégation d’indicateurs métier lisibles pour le pilotage ;
- l’introduction de métriques membre et équipe ;
- la prise en compte du cycle de vie du projet dans la lecture dashboard ;
- la mise en place d’un premier niveau d’explicabilité du score ;
- l’ouverture progressive du dashboard aux `VIEWER` qualifiés ;
- la mise en cohérence UI/UX du dashboard avec la densité d’information réelle du module.

## 20.2 Principes fonctionnels retenus

### 20.2.1 Vue macro par projet

La cible V2 a été interprétée comme une **vue centralisée multi-projets** capable de fournir, pour chaque projet :

- un score de santé ;
- un avancement global ;
- des alertes prioritaires ;
- une activité récente ;
- des métriques de membres ;
- des métriques d’équipes ;
- des signaux de risque liés aux jalons.

Le dashboard ne remplace pas la page projet, mais sert de point d’entrée synthétique et de lecture transverse.

### 20.2.2 Priorité à la lisibilité métier

Décision retenue :

- commencer par un MVP utile et fiable ;
- éviter les calculs trop fragiles ou trop lourds au début ;
- distinguer clairement :
  - les signaux opérationnels immédiats ;
  - les signaux historiques ;
  - les raffinements visuels.

Le dashboard a donc été construit comme une vue de pilotage progressive et non comme un écran de reporting exhaustif.

### 20.2.3 Distinction entre exécutants et observateurs

Le lot a consolidé la règle suivante :

- les `VIEWER` ne sont pas comptés comme exécutants métier ;
- les métriques d’activité, de performance membre et de santé projet s’appuient sur les **membres exécutants réels** ;
- les `VIEWER` restent traités comme observateurs du projet, sauf lorsqu’ils sont explicitement autorisés à consulter le dashboard en lecture.

Cette distinction a été appliquée afin d’éviter toute dégradation artificielle du score santé ou du classement des contributeurs.

## 20.3 Agrégations backend et score de santé

Le backend dashboard a été introduit autour d’une action dédiée de synthèse consolidée.

### 20.3.1 Action serveur dédiée

Une action `getOwnerDashboardOverview()` a été ajoutée afin de renvoyer :

- une liste de cartes projet enrichies ;
- un résumé global agrégé.

Cette action constitue désormais le point d’entrée principal du dashboard côté front.

### 20.3.2 Données consolidées par projet

Les agrégats suivants ont été mis en place par projet :

- nombre total de tâches ;
- nombre de tâches actives ;
- nombre de tâches terminées ;
- nombre de tâches en retard ;
- nombre de tâches proches de l’échéance ;
- nombre de membres actifs sur 7 jours ;
- nombre d’exécutants ;
- alertes principales ;
- activité récente ;
- état des jalons à risque.

### 20.3.3 Score de santé

Le score de santé projet a été construit autour de trois axes, conformément à la cible V2 :

- taux de retard ;
- activité récente des membres ;
- alignement entre le calendrier projet et l’avancement réel.

Le résultat est ensuite traduit dans une couleur de synthèse :

- `GREEN`
- `ORANGE`
- `RED`

Cette logique a été encapsulée dans des helpers dédiés au domaine dashboard.

### 20.3.4 Explicabilité du score

Le lot a ajouté une première logique d’explicabilité avec des facteurs principaux tels que :

- retards élevés ;
- retards à surveiller ;
- activité faible ;
- planning à surveiller ;
- avancement en retard sur le planning.

L’objectif retenu n’était pas seulement d’attribuer une note, mais aussi d’expliquer à l’utilisateur pourquoi cette note baisse.

## 20.4 Priorisation métier et enrichissement des métriques

Une seconde phase du lot a consisté à raffiner la qualité métier des calculs.

### 20.4.1 Pondération par priorité

Les calculs du dashboard ont été enrichis avec une pondération légère des tâches selon leur priorité :

- `LOW`
- `MEDIUM`
- `HIGH`
- `CRITICAL`

Cette pondération est utilisée pour affiner notamment :

- l’avancement du projet ;
- le taux de retard ;
- le score de performance des membres ;
- la progression des équipes.

### 20.4.2 Métriques membre

Le lot a introduit des métriques par membre permettant de faire ressortir :

- les top contributeurs ;
- les membres à surveiller ;
- le score de performance ;
- l’activité récente ;
- les retards individuels.

Ces métriques ont été volontairement réservées aux exécutants réels du projet.

### 20.4.3 Métriques équipe

Le lot a également introduit des métriques par équipe :

- progression d’équipe ;
- volume de tâches ;
- tâches terminées ;
- tâches en retard ;
- effectif de l’équipe.

Cette vue permet de mieux exploiter la hiérarchie d’équipes V2 déjà consolidée dans les lots précédents.

## 20.5 Jalons à risque et robustification métier

Le lot a ensuite été renforcé pour éviter des signaux trompeurs sur certains cas limites.

### 20.5.1 Risque jalon

Une logique dédiée d’évaluation du risque jalon a été introduite.

Cette logique compare :

- le niveau d’avancement du jalon ;
- sa date cible ;
- le temps déjà écoulé ou restant ;
- l’écart entre progression réelle et progression attendue.

Elle permet de distinguer au moins :

- risque faible ;
- risque modéré ;
- risque critique.

### 20.5.2 Robustesse selon le cycle de vie projet

Le score santé a été adapté afin de prendre en compte correctement les cas suivants :

- projet `ACTIVE` ;
- projet `ON_HOLD` ;
- projet `COMPLETED` ;
- projet `ARCHIVED` ;
- projet sans tâches ;
- projet sans exécutants.

Conséquences principales :

- un projet terminé n’est plus pénalisé artificiellement par des retards historiques ;
- un projet archivé est lu comme clos ;
- un projet en pause est évalué plus souplement ;
- un projet vide reçoit un score neutre plutôt qu’un faux signal critique.

## 20.6 Réalignement des actions projet et pilotage du statut

Le lot a mis en évidence que le dashboard utilisait déjà `Project.status`, mais que ce statut n’était pas encore réellement pilotable côté application.

### 20.6.1 Mise à jour du statut projet

Une action serveur `updateProjectStatus()` a été introduite afin de permettre la mise à jour du statut d’un projet avec :

- validation Zod ;
- contrôle d’accès ;
- mise à jour Prisma ;
- message de retour cohérent.

### 20.6.2 Traçabilité projet

Un nouvel événement `PROJECT_STATUS_UPDATED` a été ajouté afin de tracer les changements de statut dans l’historique projet.

Cette évolution a nécessité :

- l’ajout du type dans `ActivityType` ;
- le branchement de l’activité associée dans l’action serveur.

### 20.6.3 Intégration dans la page projet

La page projet a été enrichie dans l’onglet Aperçu avec :

- un sélecteur de statut ;
- la gestion de la mise à jour en direct ;
- le rechargement du projet et de l’activité après changement.

Par prudence, l’interface a été restreinte au rôle `OWNER` pour ce flux.

## 20.7 Ouverture du dashboard aux viewers qualifiés

Le lot a ensuite été étendu afin que le dashboard ne reste pas réservé aux seuls propriétaires de projets.

### 20.7.1 Règle retenue

Un `VIEWER` peut accéder au dashboard d’un projet en lecture si, et seulement si, il dispose simultanément des permissions :

- `VIEW_PROJECT_PROGRESS`
- `VIEW_MEMBER_STATS`

### 20.7.2 Conséquences fonctionnelles

Le dashboard devient ainsi une vue de suivi ouverte :

- à l’owner créateur du projet ;
- aux viewers explicitement qualifiés pour la lecture des métriques et de la progression.

Le comportement reste strictement **en lecture** pour ces profils.

### 20.7.3 Ajustement du wording

Le titre du dashboard a été rendu plus neutre afin d’éviter une formulation trop centrée owner lorsque la vue est ouverte à d’autres profils autorisés.

## 20.8 Réalignement du front — carte projet et lisibilité dashboard

Le front a été remanié afin d’absorber la richesse fonctionnelle du lot sans surcharger l’écran.

### 20.8.1 Résumé global

Le haut du dashboard a été enrichi avec un bloc de synthèse affichant :

- nombre de projets ;
- projets verts ;
- projets orange ;
- projets rouges ;
- volume global de tâches en retard.

### 20.8.2 Projets à surveiller

Une section dédiée **Projets à surveiller** a été ajoutée afin de faire remonter rapidement les projets les plus critiques selon :

- couleur santé ;
- score ;
- présence d’alertes principales.

### 20.8.3 Filtres par statut

Le dashboard a été enrichi avec un filtre par statut :

- tous ;
- actifs ;
- en pause ;
- terminés ;
- archivés.

### 20.8.4 Carte projet enrichie

Les cartes projet affichent désormais :

- nom du projet ;
- statut ;
- score santé ;
- avancement ;
- message de cycle de vie ;
- alerte principale ;
- indicateurs clés ;
- bouton d’accès au projet.

Les détails secondaires restent accessibles sans surcharger immédiatement la lecture.

## 20.9 Polish UI et réduction de la densité visuelle

Une phase de polish UI a été menée pour éviter que la richesse du dashboard ne devienne contre-productive.

### 20.9.1 Carte compacte par défaut

La carte dashboard a été restructurée afin de mettre en avant par défaut uniquement :

- le résumé immédiat ;
- les signaux clés ;
- les compteurs principaux.

### 20.9.2 Détails repliables

Les éléments secondaires ont été déplacés dans une zone repliable “Voir les détails”, notamment :

- dates ;
- facteurs principaux ;
- barres détaillées ;
- historique d’alertes ;
- activité récente ;
- insights membres / équipes / jalons.

### 20.9.3 Allègement visuel

Les sous-blocs ont été retravaillés avec :

- moins de bordures lourdes ;
- des fonds plus discrets ;
- une hiérarchie plus lisible entre niveau essentiel et niveau secondaire.

### 20.9.4 Adaptation au cycle de vie

La présentation des cartes a été adaptée selon le statut du projet :

- `ACTIVE` conserve une logique de pilotage ;
- `ON_HOLD` réduit l’urgence des signaux ;
- `COMPLETED` et `ARCHIVED` basculent vers une logique plus historique et synthétique.

Conséquences :

- les libellés changent selon le cycle de vie ;
- certains signaux trop opérationnels sont atténués ;
- les “membres à surveiller” disparaissent sur les projets clos ;
- les alertes deviennent historiques sur les projets terminés ou archivés.

## 20.10 Vérifications effectuées

Les vérifications suivantes ont été menées au fil du lot :

- builds `npm run build` exécutés après les étapes sensibles ;
- validation du chargement du dashboard sur la page d’accueil ;
- validation des cartes projet enrichies ;
- validation du score de santé et des couleurs associées ;
- validation du filtre par statut ;
- validation du comportement des projets clos et en pause ;
- validation du changement de statut projet et de son activité associée ;
- validation de l’ouverture du dashboard aux viewers qualifiés ;
- validation du comportement du mode détails repliable ;
- validation responsive générale après le polish UI.

## 20.11 Résultat obtenu

À l’issue du lot 8, le **dashboard projets** peut être considéré comme opérationnel sur un MVP enrichi cohérent avec la cible V2.

Les éléments suivants sont désormais stabilisés :

- agrégations backend dashboard ;
- score de santé projet ;
- alertes et facteurs explicatifs ;
- métriques membre et équipe ;
- pondération par priorité ;
- jalons à risque ;
- robustesse selon le cycle de vie projet ;
- gestion réelle du statut projet ;
- ouverture du dashboard aux viewers qualifiés ;
- filtres et polish UI ;
- lecture compacte avec détails repliables.

Ce lot constitue une avancée majeure dans la concrétisation de la V2, en apportant une véritable vue consolidée de pilotage et de suivi des projets.

## 20.12 Fichiers particulièrement concernés par ce lot

Cette étape a particulièrement touché :

- `prisma/schema.prisma`
- `type.ts`
- `lib/dashboard.ts`
- `lib/project-status.ts`
- `lib/project-access.ts`
- `lib/project-capabilities.ts`
- `lib/permissions.ts`
- `lib/project-roles.ts`
- `app/actions/dashboard.ts`
- `app/actions/projects.ts`
- `app/actions/index.ts`
- `app/page.tsx`
- `app/project/[projectId]/page.tsx`
- `app/components/OwnerDashboardSummary.tsx`
- `app/components/OwnerPriorityProjects.tsx`
- `app/components/OwnerDashboardProjectCard.tsx`
- `app/components/OwnerDashboardProjectInsights.tsx`
- `Documentation_Migration_V1_V2.md`
