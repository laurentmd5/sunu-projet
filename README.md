# App Gestion de Projets

Application web de gestion de projets et de tâches destinée à suivre l’avancement d’un travail d’équipe, répartir les tâches, gérer les membres d’un projet et visualiser l’état global de l’activité.

Cette version du README reflète **l’état actuel réel du dépôt**, et non plus seulement la base initiale du projet.

---

## 1. État actuel du projet
Le projet est déjà fonctionnel sur les points suivants :
- authentification avec Clerk ;
- protection des routes privées ;
- création automatique d’un utilisateur applicatif local à partir du compte Clerk ;
- création de projet avec code d’invitation unique ;
- affichage des projets créés par l’utilisateur ;
- page de collaborations permettant de rejoindre un projet via code d’invitation ;
- affichage des projets auxquels l’utilisateur participe ;
- consultation du détail d’un projet ;
- création de tâche dans un projet ;
- assignation d’une tâche à un membre du projet ;
- suppression d’une tâche ;
- consultation du détail d’une tâche ;
- mise à jour du statut d’une tâche ;
- ajout d’une description de solution quand une tâche est marquée comme terminée.

Le projet constitue donc une **V1 fonctionnelle** de gestion de projets/tâches, construite comme base de travail avant enrichissement métier.

---

## 2. Écart avec l’ancien README
L’ancien README décrivait surtout une base encore en construction, avec une navigation “en cours de construction” et des fonctionnalités “visées”.

Ce n’est plus complètement à jour.

### Ce qui était incomplet dans l’ancien README
- il ne reflétait pas l’existence des pages métier déjà présentes ;
- il ne détaillait pas le flux réel de création et de collaboration ;
- il présentait encore la page d’accueil comme une simple page temporaire, alors qu’elle sert déjà de dashboard “Mes projets” ;
- il ne décrivait pas les server actions déjà implémentées ;
- il ne montrait pas clairement le schéma métier actuel basé sur `User`, `Project`, `Task` et `ProjectUser`.

Ce README corrige ces écarts.

---

## 3. Stack technique
- **Framework** : Next.js (App Router)
- **Langage** : TypeScript
- **UI** : Tailwind CSS v4 + DaisyUI
- **Authentification** : Clerk (`@clerk/nextjs`)
- **ORM** : Prisma
- **Base de données** : SQLite
- **Icônes** : Lucide React
- **Notifications UI** : React Toastify
- **Éditeur riche installé** : `react-quill-new`

---

## 4. Architecture générale
### Dossiers principaux
```text
app/
├── components/
│   ├── AssignTask.tsx
│   ├── AuthWrapper.tsx
│   ├── EmptyState.tsx
│   ├── Navbar.tsx
│   ├── ProjectComponent.tsx
│   ├── TaskComponent.tsx
│   ├── UserInfo.tsx
│   └── Wrapper.tsx
├── general-projects/
│   └── page.tsx
├── new-tasks/
│   └── [projectId]/
│       └── page.tsx
├── project/
│   └── [projectId]/
│       └── page.tsx
├── sign-in/
│   └── [[...sign-in]]/
│       └── page.tsx
├── sign-up/
│   └── [[...sign-up]]/
│       └── page.tsx
├── task-details/
│   └── [taskId]/
│       └── page.tsx
├── actions.ts
├── globals.css
├── layout.tsx
└── page.tsx

lib/
└── prisma.ts

prisma/
├── migrations/
├── dev.db
└── schema.prisma

proxy.ts
type.ts
```

---

## 5. Modèle de données actuel
### `User`
Représente un utilisateur applicatif.

Champs et relations principaux :
- `id`
- `name`
- `email`
- tâches assignées
- tâches créées
- projets créés
- participations via `ProjectUser`

### `Project`
Représente un projet.

Champs et relations principaux :
- `id`
- `name`
- `description`
- `createdAt`
- `updatedAt`
- `inviteCode`
- `createdById`
- liste des tâches
- liste des membres via `ProjectUser`

### `Task`
Représente une tâche de projet.

Champs et relations principaux :
- `id`
- `name`
- `description`
- `status`
- `dueDate`
- `projectId`
- `userId` (utilisateur assigné)
- `createdById`
- `solutionDescription`

### `ProjectUser`
Table de jointure entre utilisateur et projet.

Elle permet de gérer les membres associés à un projet et empêche les doublons via une contrainte unique sur le couple utilisateur/projet.

---

## 6. Fonctionnalités actuellement disponibles
### Authentification
- connexion et inscription via Clerk ;
- routes publiques : `/sign-in`, `/sign-up` ;
- routes privées protégées via `proxy.ts`.

### Gestion des utilisateurs
- synchronisation de l’utilisateur Clerk avec la base locale via `checkAndAddUser(email, name)` ;
- appel effectué au montage de la navbar quand l’utilisateur est connu.

### Gestion des projets
- création d’un projet avec nom, description et code d’invitation unique ;
- affichage des projets créés par l’utilisateur connecté ;
- suppression d’un projet ;
- affichage des informations détaillées d’un projet.

### Collaboration
- jointure à un projet via code d’invitation ;
- affichage des projets auxquels l’utilisateur est associé ;
- affichage des membres d’un projet.

### Gestion des tâches
- création d’une tâche dans un projet ;
- affectation de la tâche à un membre ;
- suppression d’une tâche ;
- affichage du détail d’une tâche ;
- changement de statut ;
- possibilité d’ajouter une solution lors du passage à l’état “Done”.

---

## 7. Flux applicatif principal
### 1. Connexion
L’utilisateur s’authentifie via Clerk.

### 2. Synchronisation utilisateur
Au chargement de l’interface, la navbar appelle `checkAndAddUser(...)` pour s’assurer que l’utilisateur existe dans la base SQLite.

### 3. Tableau de bord personnel
La page `/` affiche les projets créés par l’utilisateur.

### 4. Création d’un projet
Depuis la page d’accueil, l’utilisateur peut créer un projet avec nom et description. Un code d’invitation est généré automatiquement.

### 5. Collaboration
Depuis `/general-projects`, l’utilisateur peut rejoindre un projet avec un code d’invitation puis consulter ses projets collaboratifs.

### 6. Gestion détaillée d’un projet
Depuis `/project/[projectId]`, l’utilisateur peut :
- consulter les informations du projet ;
- voir les tâches ;
- filtrer les tâches ;
- supprimer une tâche ;
- accéder au formulaire de création de tâche.

### 7. Gestion détaillée d’une tâche
Depuis `/task-details/[taskId]`, l’utilisateur consulte les informations d’une tâche et met à jour son statut.

---

## 8. Server actions actuellement présentes
Le fichier `app/actions.ts` centralise actuellement la logique serveur.

Fonctions principales :
- `checkAndAddUser`
- `createProject`
- `getProjectsCreatedByUSer`
- `deleteProjectById`
- `addUserToProject`
- `getProjectsAssociatedWithUser`
- `getProjectInfo`
- `getProjectUsers`
- `createTask`
- `deleteTaskById`
- `getTaskDetails`
- `updateTaskStatus`

---

## 9. Installation et lancement
### Prérequis
- Node.js
- npm
- compte Clerk

### Installation
```bash
npm install
```

### Variables d’environnement
Créer un fichier `.env` avec au minimum :
```env
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="..."
CLERK_SECRET_KEY="..."
```

Selon la configuration Clerk utilisée, d’autres variables peuvent être nécessaires.

### Prisma
```bash
npx prisma generate
npx prisma migrate dev
```

### Lancement du projet
```bash
npm run dev
```

Application disponible localement sur l’URL de développement Next.js.

---

## 10. Scripts disponibles
```bash
npm run dev
npm run build
npm run start
npm run lint
```

---

## 11. Points d’attention techniques
Le projet est fonctionnel, mais plusieurs améliorations sont recommandées avant montée en version :
- ajouter de vraies vérifications d’autorisation métier sur les actions serveur ;
- remplacer certains `throw new Error` trop génériques ;
- découper `app/actions.ts` ;
- mieux typer les données ;
- remplacer les manipulations directes des modales par une gestion React plus propre ;
- enrichir la gestion des statuts et des priorités.

---

## 12. Positionnement du projet
Le projet actuel est une **base validée fonctionnellement**, issue d’un clonage guidé d’une application de gestion de projet, puis adaptée comme point de départ.

La suite du travail consiste à :
- fiabiliser la logique métier ;
- améliorer la structure ;
- enrichir l’expérience utilisateur ;
- ajouter des fonctionnalités différenciantes.

---

## 13. Évolutions recommandées
À court et moyen terme, les pistes les plus pertinentes sont :
- rôles projet (`owner`, `manager`, `member`) ;
- priorités de tâches ;
- tâches en retard ;
- dashboard enrichi ;
- historique d’activité ;
- Kanban ;
- meilleure gestion mobile.

---

## 14. Résumé
L’application actuelle n’est plus un simple squelette.

C’est déjà une V1 exploitable de gestion de projets et tâches avec authentification, collaboration par invitation, création de tâches et suivi de leur statut.

Le vrai enjeu désormais est de la faire évoluer vers une version plus robuste, mieux sécurisée et mieux structurée.
