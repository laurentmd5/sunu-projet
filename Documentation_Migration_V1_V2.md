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
