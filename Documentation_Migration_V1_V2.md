# Documentation de travail — Migration Sunu Projets V1 → V2

## Périmètre de ce document

Ce document synthétise **tout le travail réalisé dans ce chat** autour de la migration de **Sunu Projets** entre la **V1** et la **V2**, avec un focus principal sur :

- l’analyse documentaire de la cible V2 ;
- la comparaison entre le modèle actuel et le modèle cible ;
- la définition de la stratégie de migration ;
- la conception du **Lot 1 — Migration Prisma non destructive** ;
- les difficultés rencontrées avec Prisma Migrate ;
- la méthode retenue pour appliquer le schéma V2 sans reset de la base ;
- le résultat final obtenu.

Ce document sert de **base de documentation technique** pour la migration globale. Il pourra être enrichi ensuite avec les travaux issus des autres chats concernant les lots suivants : backfill de données, rôles/permissions, équipes V2, tâches V2, notifications, réunions, dashboard owner, nettoyage legacy.

---

# 1. Contexte général

## 1.1 Contexte produit

Sunu Projets est une application de gestion de projets d’entreprise. La migration V1 → V2 vise à faire évoluer l’architecture métier afin de :

- recentrer le modèle sur `Project` comme entité racine ;
- intégrer un rôle `VIEWER` avec permissions granulaires ;
- rattacher les équipes au projet ;
- enrichir fortement le modèle de tâches ;
- introduire des notifications in-app ;
- préparer un dashboard propriétaire consolidé.

## 1.2 Règles de lecture des sources

Les sources de référence ont été hiérarchisées ainsi :

1. `sunu_projets_v2.pptx` = **source d’autorité fonctionnelle principale** ;
2. `sunu_projets_v2_analyse.pdf` = **source secondaire complémentaire** ;
3. documentation analytique V1 (`ANALYSE_CONCEPTION_COMPLETE.md`, `ANALYSE_RELATIONS_FLUX.md`, `ARCHITECTURE_AVANCEE.md`, etc.) = **source historique technique** décrivant l’existant.

Règle d’arbitrage retenue :

- en cas de conflit entre PPTX et PDF, **le PPTX V2 prime** ;
- en cas de conflit entre documents V2 et documents V1, **les documents V2 priment** ;
- les anciens éléments liés à Clerk dans la documentation historique ne doivent plus être considérés comme des cibles actuelles, car le projet utilise désormais une **authentification locale native**.

---

# 2. Travaux réalisés au début du chantier dans ce chat

## 2.1 Analyse et consolidation documentaire de la cible V2

Le travail a commencé par une reprise structurée des documents de cadrage afin d’éviter de patcher Prisma sur une compréhension partielle du produit.

Les objectifs de cette phase étaient :

- relire les documents sources ;
- verrouiller les règles de priorité entre les sources ;
- distinguer clairement la cible V2 du fonctionnement historique V1 ;
- isoler les parties obsolètes de la documentation, notamment les références à Clerk.

## 2.2 Reconstruction propre de la cible métier V2

La cible métier V2 a été reformulée proprement autour des principes suivants :

- `Project` devient l’entité centrale de l’architecture ;
- les `Team` ne sont plus pensées comme des entités indépendantes, mais comme des structures rattachées à un projet ;
- apparition du rôle `VIEWER` avec permissions granulaires ;
- enrichissement du modèle `Task` : priorité, tags, jalons, commentaires, statuts étendus ;
- ajout des notifications in-app en complément des emails ;
- préparation d’un futur dashboard owner avec score de santé et métriques consolidées.

## 2.3 Identification des écarts V1 → V2

Une comparaison structurée entre l’architecture actuelle et la cible V2 a permis d’identifier les écarts majeurs :

- passage d’un modèle partiellement séparé `Project` / `Team` à un modèle project-centric ;
- ajout du rôle `VIEWER` dans la logique projet ;
- simplification/repositionnement futur de `TeamMember` ;
- enrichissement important de `Task` ;
- extension de `ActivityLog` ;
- ajout de nouvelles entités V2 (`Milestone`, `TaskComment`, `ViewerPermissionGrant`, `MeetingParticipant`, `Notification`).

## 2.4 Définition du plan global de migration

Une stratégie progressive a été retenue avec l’ordre logique suivant :

1. migration Prisma / schéma ;
2. migration de données / backfill ;
3. permissions / rôles / logique métier ;
4. front-end ;
5. validation et nettoyage final.

Décision importante : **ne pas démarrer par le dashboard** ni par des vues analytiques tant que la base métier n’est pas stabilisée.

## 2.5 Découpage en lots techniques

Le chantier global a été découpé en lots :

- Lot 0 — verrouillage des règles métier V2 ;
- Lot 1 — Prisma non destructif ;
- Lot 2 — backfill / migration de données ;
- Lot 3 — permissions / rôles / VIEWER ;
- Lot 4 — équipes V2 ;
- Lot 5 — tâches V2 ;
- Lot 6 — notifications ;
- Lot 7 — réunions ;
- Lot 8 — dashboard owner ;
- Lot 9 — validation / nettoyage legacy.

Dans ce chat, le travail a surtout porté sur **le Lot 1**.

---

# 3. Analyse du schéma Prisma réel avant migration

## 3.1 Pourquoi cette étape était nécessaire

Avant de proposer une migration, il a fallu vérifier le **schéma réel du dépôt**, et non seulement la documentation historique.

Cette étape a permis d’éviter plusieurs erreurs de conception, car le code réel ne correspondait plus totalement à l’état décrit dans certains anciens documents.

## 3.2 Constats sur le schéma existant

Le schéma Prisma réel montrait notamment :

- une base MySQL déjà en place ;
- un modèle `Project`, `Task`, `Team`, `TeamMember`, `ProjectUser`, `TeamMeeting`, `MeetingRecording`, `ActivityLog` correspondant à la V1 actuelle ;
- la présence d’une **auth locale native** via `AuthCredential` et `Session` ;
- un `MeetingProvider` limité à `NONE` et `JITSI` ;
- un `Task.status` encore stocké comme `String` ;
- une relation legacy `Project.teamId -> Team.id` encore active ;
- aucune migration Prisma historisée localement dans `prisma/migrations`.

## 3.3 Décisions de conception prises à partir du schéma réel

À partir de cette lecture, plusieurs décisions ont été prises :

- conserver `AuthCredential` et `Session` totalement intacts ;
- ne pas modifier `MeetingProvider` au Lot 1 ;
- conserver temporairement la relation legacy `Project.teamId` ;
- ajouter la nouvelle logique `Team.projectId` sans casser la V1 ;
- conserver `Task.status` en `String` au Lot 1 pour éviter une migration destructrice ou trop invasive ;
- repousser la simplification stricte de `TeamMember.role` à un lot ultérieur.

---

# 4. Cible V2 retenue dans ce chat

## 4.1 Entités et champs à introduire au Lot 1

La cible retenue pour le Lot 1 était d’étendre le schéma afin qu’il puisse accueillir la V2 sans casser la V1.

Les changements retenus étaient :

### `Project`
- ajout de `status` ;
- ajout de `startDate` ;
- ajout de `endDate`.

### `ProjectUser`
- ajout du rôle `VIEWER` ;
- ajout de `inviteToken` nullable.

### `Team`
- ajout de `projectId` nullable au début ;
- ajout de `parentId` nullable.

### `Task`
- ajout de `priority` ;
- ajout de `tags` ;
- ajout de `milestoneId` ;
- ajout de `teamId`.

### `ActivityLog`
- ajout de `metadata` JSON nullable.

### Nouvelles tables
- `ViewerPermissionGrant` ;
- `Milestone` ;
- `TaskComment` ;
- `MeetingParticipant` ;
- `Notification`.

## 4.2 Points ambigus entre PPTX et PDF

Certains points ont été arbitré selon la hiérarchie des sources.

### `TeamMeeting.projectId`
- le PPTX indique un `projectId` **optionnel** ;
- le PDF contient une formulation plus stricte ;
- décision retenue : **rester sur un `projectId` optionnel**, conformément au PPTX.

### Permissions du `VIEWER`
- le PPTX mentionne `CREATE_TASK` parmi les permissions du VIEWER ;
- le PDF détaillé est moins cohérent sur ce point ;
- décision retenue : **prévoir `CREATE_TASK` dans l’enum de permissions** dès le Lot 1, même si la logique métier détaillée viendra plus tard.

---

# 5. Stratégie de migration retenue pour le Lot 1

## 5.1 Principe général

La migration devait être :

- progressive ;
- non destructive ;
- compatible avec la base existante ;
- sans reset ;
- sans suppression brutale des structures V1 ;
- compatible avec la préservation des données en place.

## 5.2 Règles appliquées

Les règles suivantes ont été suivies :

- tout nouveau champ devait être nullable au début si possible ;
- les nouvelles tables devaient pouvoir exister sans dépendre immédiatement du code V1 ;
- les anciennes structures nécessaires au runtime ne devaient pas être supprimées ;
- les changements de rôle et de statuts trop risqués devaient être reportés à un lot ultérieur.

## 5.3 Choix prudents retenus

- `Task.status` conservé en `String` ;
- `Team.projectId` ajouté mais non obligatoire au départ ;
- `TeamMember.role` non simplifié immédiatement ;
- relation legacy `Project.teamId` conservée ;
- `tags` stockés en `Json?` ;
- nouveaux enums ajoutés mais sans imposer immédiatement toute la logique métier associée.

---

# 6. Conception du patch `schema.prisma`

## 6.1 Patch conçu

Le patch `schema.prisma` a été préparé pour introduire :

### Nouveaux enums
- `ProjectStatus` ;
- `TaskPriority` ;
- `MilestoneStatus` ;
- `ViewerPermission` ;
- extension de `ProjectRole` avec `VIEWER` ;
- enrichissement de `ActivityType` avec les nouveaux événements V2.

### Nouvelles relations
- relation V2 `Team.projectId -> Project.id` ;
- relation hiérarchique `Team.parentId -> Team.id` ;
- relation `Task.milestoneId -> Milestone.id` ;
- relation `Task.teamId -> Team.id` ;
- relation `MeetingParticipant -> TeamMeeting / User` ;
- relation `ViewerPermissionGrant -> ProjectUser` ;
- relation `Notification -> User`.

### Nouvelles tables et nouveaux champs
Le patch a bien introduit l’ensemble du périmètre non destructif du Lot 1.

## 6.2 Double relation `Project` ↔ `Team`

Le point le plus sensible du patch a été la coexistence temporaire de deux logiques relationnelles :

- la relation legacy V1 : `Project.teamId -> Team.id` ;
- la relation V2 : `Team.projectId -> Project.id`.

Pour éviter toute ambiguïté Prisma, il a fallu **nommer explicitement les relations** dans le schéma.

---

# 7. Validation initiale du schéma patché

## 7.1 Commandes exécutées

Après application du patch sur `schema.prisma`, plusieurs commandes Prisma ont été exécutées :

- `npx prisma format`
- `npx prisma validate`
- `npx prisma generate`

## 7.2 Résultat

Ces trois commandes ont fonctionné correctement, ce qui a confirmé que :

- le schéma était syntaxiquement valide ;
- Prisma Client pouvait être généré ;
- le problème ne venait donc pas de la structure du schéma lui-même.

---

# 8. Problème rencontré avec Prisma Migrate

## 8.1 Symptôme

Lors de la tentative de lancement de :

```bash
npx prisma migrate dev --name lot1_v2_non_destructive
```

Prisma a détecté un **drift** et a proposé un reset de la base.

## 8.2 Cause réelle

Le problème venait du fait que :

- la base MySQL existait déjà et contenait toutes les tables V1 ;
- mais le projet n’avait **aucun historique local de migrations** ;
- Prisma Migrate ne savait donc pas comment relier l’état réel de la base à un historique versionné.

Autrement dit, la base existait, mais Prisma ne possédait pas son “historique narratif”.

## 8.3 Décision prise

Décision explicite : **ne pas utiliser `prisma migrate reset`**, afin de ne pas perdre les données existantes.

Une stratégie alternative a donc été retenue.

---

# 9. Tentative de baseline et limites de cette approche

## 9.1 Mise en place d’une baseline

Une baseline technique a été créée pour essayer de donner à Prisma un point de départ minimal dans `prisma/migrations`.

## 9.2 Limite rencontrée

Le problème est que la baseline avait été générée **à partir du schéma déjà patché V2**, alors que la base réelle était encore en V1.

Conséquence :

- Prisma comparait une base V1 réelle à un historique qui disait déjà “V2 attendue” ;
- cela provoquait encore du drift.

## 9.3 Conclusion

La baseline seule n’était donc pas suffisante pour appliquer proprement le Lot 1 dans ce contexte.

---

# 10. Méthode alternative retenue : diff SQL V1 → V2

## 10.1 Changement de stratégie

Plutôt que de forcer `migrate dev`, la méthode suivante a été retenue :

1. figer le schéma V1 dans un fichier dédié ;
2. comparer ce schéma V1 au nouveau `schema.prisma` V2 patché ;
3. générer un script SQL de diff ;
4. relire manuellement ce script ;
5. exécuter le script directement contre la base.

## 10.2 Création d’un schéma de référence V1

Un fichier `prisma/schema.v1.prisma` a été créé afin de conserver une représentation fidèle du schéma historique avant patch.

## 10.3 Génération du script SQL de migration

La commande Prisma `migrate diff` a été utilisée pour générer le SQL de transformation entre :

- `schema.v1.prisma`
- `schema.prisma`

## 10.4 Contrôle manuel du script

Le script généré a été relu pour vérifier qu’il ne contenait pas :

- de `DROP TABLE` ;
- de `DROP COLUMN` ;
- de reset ;
- d’opérations destructrices non souhaitées.

Le contenu attendu était bien composé de :

- `ALTER TABLE ... ADD COLUMN ...` ;
- `CREATE TABLE ...` ;
- `CREATE INDEX ...` ;
- `ALTER TABLE ... ADD CONSTRAINT ...`.

---

# 11. Incident sur le fichier SQL généré sous PowerShell

## 11.1 Symptôme

Même après génération du SQL, il a été constaté que le fichier avait un comportement anormal.

La commande `prisma db execute` retournait un succès, mais les différences restaient visibles lors des comparaisons Prisma.

## 11.2 Cause exacte

Le fichier SQL avait été écrit sous une forme incorrecte :

- tous les blocs `-- AlterTable`, `-- CreateTable`, etc. se retrouvaient sur une seule ligne ;
- en SQL, `--` commente tout le reste de la ligne ;
- comme le fichier ne contenait pas de vrais retours à la ligne, une grande partie du script était en réalité neutralisée comme commentaire.

## 11.3 Conséquence

- `prisma db execute` n’échouait pas ;
- mais le script n’était quasiment pas exécuté ;
- Prisma détectait toujours les différences après coup.

## 11.4 Résolution

Le fichier SQL a été **réécrit correctement avec de vrais sauts de ligne**, ce qui a permis de transformer le contenu en instructions SQL réellement exécutables.

Exemple du format corrigé :

```sql
-- AlterTable
ALTER TABLE `Team` ADD COLUMN `parentId` VARCHAR(36) NULL,
    ADD COLUMN `projectId` VARCHAR(36) NULL;
```

À partir de là, le script est devenu exploitable par MariaDB / MySQL.

---

# 12. Application effective du Lot 1

## 12.1 Exécution du script SQL corrigé

Une fois le fichier SQL correctement écrit, il a été exécuté avec :

```bash
npx prisma db execute --file prisma/lot1_v2_non_destructive.sql --schema prisma/schema.prisma
```

Résultat : exécution réussie.

## 12.2 Vérifications réalisées ensuite

Après exécution, les commandes suivantes ont été relancées :

- `npx prisma validate`
- `npx prisma generate`
- `npx prisma migrate diff --from-schema-datasource prisma/schema.prisma --to-schema-datamodel prisma/schema.prisma`

## 12.3 Résultat final

La comparaison finale Prisma a retourné :

- **No difference detected**

Cela signifie que :

- la base est maintenant alignée avec le `schema.prisma` patché ;
- le Lot 1 a bien été appliqué ;
- le schéma étendu V2 est désormais effectivement en place en base.

---

# 13. Changements effectivement appliqués au Lot 1

## 13.1 Colonnes ajoutées

### `Team`
- `parentId`
- `projectId`

### `Project`
- `endDate`
- `startDate`
- `status`

### `Task`
- `milestoneId`
- `priority`
- `tags`
- `teamId`

### `ProjectUser`
- `inviteToken`
- évolution de l’enum `role` avec `VIEWER`

### `ActivityLog`
- `metadata`
- enrichissement de l’enum `type`

## 13.2 Tables créées

- `Milestone`
- `TaskComment`
- `ViewerPermissionGrant`
- `MeetingParticipant`
- `Notification`

## 13.3 Index créés

Ont notamment été ajoutés :

- index sur `Team.projectId`
- index sur `Team.parentId`
- index sur `Project.status`
- index sur `Task.milestoneId`
- index sur `Task.teamId`
- index sur `Task.priority`
- index sur `ProjectUser.inviteToken`
- index sur `ProjectUser(projectId, role)`
- index sur `ActivityLog.actorUserId`

## 13.4 Clés étrangères ajoutées

Ont été ajoutées les foreign keys nécessaires pour :

- `Team.projectId`
- `Team.parentId`
- `Task.milestoneId`
- `Task.teamId`
- `Milestone.projectId`
- `TaskComment.taskId`
- `TaskComment.authorId`
- `ViewerPermissionGrant.projectUserId`
- `MeetingParticipant.meetingId`
- `MeetingParticipant.userId`
- `Notification.userId`

---

# 14. Ce qui a été volontairement laissé pour plus tard

## 14.1 Éléments non traités au Lot 1

Afin de préserver la stabilité, plusieurs transformations ont été volontairement reportées :

- backfill des nouveaux champs (`Project.status`, `Task.priority`, etc.) ;
- rattachement effectif des équipes existantes via `Team.projectId` ;
- simplification stricte de `TeamMember.role` ;
- conversion métier complète des statuts de tâches ;
- activation réelle des permissions `VIEWER` dans les Server Actions ;
- implémentation des notifications in-app côté métier/front ;
- logique complète de commentaires de tâche, jalons et participants de réunion.

## 14.2 Structures legacy maintenues

Sont restées en place :

- la relation legacy `Project.teamId` ;
- le stockage actuel de `Task.status` ;
- les rôles historiques de `TeamMember` ;
- les modèles d’auth locale `AuthCredential` et `Session` inchangés.

---

# 15. Difficultés techniques rencontrées dans ce chat

## 15.1 Base existante sans historique de migrations

C’est la difficulté principale du chantier : Prisma Migrate est plus simple lorsqu’il pilote une base depuis le départ ou avec un historique versionné cohérent. Ici, il a fallu gérer une base déjà vivante sans historique local.

## 15.2 Pièges PowerShell sur la génération du SQL

Le second problème a été lié au mode d’écriture du fichier SQL sous PowerShell, qui a cassé les retours à la ligne et neutralisé le script via les commentaires SQL.

## 15.3 Importance des vérifications intermédiaires

Le travail a montré la nécessité de vérifier systématiquement :

- le contenu du fichier SQL ;
- la présence effective des sauts de ligne ;
- l’absence d’opérations destructrices ;
- l’alignement final entre base et schéma Prisma.

---

# 16. Résultat global obtenu dans ce chat

Au terme du travail effectué dans ce chat, le projet dispose désormais de :

- la cible V2 mieux clarifiée sur le périmètre Prisma ;
- un schéma `schema.prisma` étendu et cohérent ;
- un `schema.v1.prisma` de référence utile pour la suite des diff ;
- un script SQL de migration non destructive V1 → V2 ;
- une base réellement migrée sans reset ;
- une validation finale confirmant l’absence de différence entre base et schéma.

Le **Lot 1 — Migration Prisma non destructive** peut être considéré comme **réalisé**.

---

# 17. Recommandations pour la suite

## 17.1 Prochaine étape logique

La suite logique est le **Lot 2 — migration de données / backfill**.

Objectifs typiques du Lot 2 :

- initialiser `Project.status = ACTIVE` pour les projets existants ;
- initialiser `Task.priority = MEDIUM` pour les tâches existantes ;
- rattacher progressivement les `Team` aux `Project` via `Team.projectId` ;
- préparer les premières données nécessaires aux permissions VIEWER ;
- poser les bases du futur usage des `Milestone`, `TaskComment`, `Notification`, `MeetingParticipant`.

## 17.2 Utilité de ce document

Ce document peut servir de base pour :

- documenter la migration V1 → V2 au fil des chats ;
- justifier les choix techniques du Lot 1 ;
- transmettre le contexte à d’autres intervenants ;
- préparer les lots suivants avec une compréhension claire de ce qui a déjà été fait.

---

# 18. Fichiers concernés dans ce chat

Les principaux fichiers manipulés ou générés dans ce travail ont été :

- `prisma/schema.prisma`
- `prisma/schema.v1.prisma`
- `prisma/lot1_v2_non_destructive.sql`
- `prisma/migrations/0000_baseline/migration.sql` (tentative technique intermédiaire)

---

# 19. Résumé exécutif court

Dans ce chat, le travail a consisté à préparer et appliquer le **Lot 1 de la migration V1 → V2** pour Sunu Projets.

Après avoir clarifié la cible V2 à partir des documents de référence et recalé le schéma réel du projet, un patch Prisma non destructif a été conçu. Ce patch ajoutait les nouvelles structures nécessaires à la V2 sans supprimer les structures legacy V1.

L’utilisation directe de `prisma migrate dev` a échoué à cause de l’absence d’historique de migrations sur une base déjà existante. Une stratégie alternative a donc été mise en place : figer le schéma V1, générer un diff SQL V1 → V2, corriger un problème d’écriture du fichier SQL sous PowerShell, puis exécuter ce script directement contre la base.

La validation finale a confirmé que la base est désormais alignée avec le `schema.prisma` patché, ce qui permet de considérer le **Lot 1 comme terminé**.
