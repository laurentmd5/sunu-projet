# Sunu Projets — Application de gestion de projet

Application web de gestion de projets, tâches, équipes et réunions, conçue pour un usage interne en entreprise.  
Le projet est développé avec Next.js App Router, TypeScript, Tailwind CSS + DaisyUI, **authentification locale maison**, Prisma avec MySQL, Resend pour les emails transactionnels, et une intégration Jitsi V1 basée sur des liens externes de réunion.

---

## 1. Objectif du projet

L’objectif de l’application est de fournir une base de travail simple, claire et exploitable pour :

- structurer le suivi des projets ;
- répartir les tâches entre collaborateurs ;
- gérer des équipes / workspaces ;
- organiser des réunions d’équipe ou liées à un projet ;
- centraliser des comptes-rendus et des liens d’enregistrement ;
- conserver une UX responsive, notamment sur mobile.

L’application est déjà utilisable en interne, tout en restant en évolution active.

---

## 2. Fonctionnalités principales

- **Authentification locale** : Inscription, connexion et sessions sécurisées
- **Projets** : Création, gestion et jointure par code d'invitation
- **Tâches** : Assignation, suivi des statuts et notifications email
- **Équipes** : Workspaces collaboratifs avec rôles hiérarchiques
- **Réunions** : Planification et liens externes (Jitsi V1)
- **Activité** : Historique des actions projet

---

## 3. État actuel du projet

Le dépôt public reflète aujourd’hui une version plus avancée que la première base clonée :

- authentification locale maison et routes privées protégées ;
- gestion complète des utilisateurs avec sessions sécurisées ;
- création de projets et jointure par code d’invitation ;
- rôles collaborateurs par projet (`OWNER`, `MANAGER`, `MEMBER`) ;
- historique d’activité projet ;
- gestion des tâches et de leur statut ;
- assignation de tâches avec notification email via Resend ;
- module équipes / workspaces ;
- rattachement d’un projet à une équipe ;
- module réunions ;
- réunions liées à une équipe, avec projet optionnel ;
- lien de réunion externe (V1 Jitsi) ;
- gestion des enregistrements via URL.

---

## 4. Workflow utilisateur

1. **Créer un compte / se connecter** : Inscription via formulaire ou connexion avec identifiants
2. **Créer un projet ou rejoindre un projet** : Création autonome ou jointure par code d'invitation
3. **Gérer tâches et membres** : Assignation, suivi des statuts et gestion des collaborateurs
4. **Rattacher à une équipe** : Organisation hiérarchique des projets et utilisateurs
5. **Gérer réunions** : Planification et liens externes pour les visioconférences

---

## 5. Sécurité et permissions

- **Routes privées protégées par middleware** : Vérification automatique des sessions
- **Sessions HTTP-only** : Cookies sécurisés avec expiration
- **Contrôle d'accès côté serveur** : Validation des permissions dans les Server Actions
- **Rôles projet** : `OWNER`, `MANAGER`, `MEMBER` avec permissions granulaires
- **Rôles équipe** : Hiérarchie `OWNER`, `MANAGER`, `MEMBER` pour l'organisation

---

## 6. Stack technique

### Frontend
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- DaisyUI
- Lucide React
- React Toastify
- react-quill-new

### Backend / logique serveur
- Server Actions Next.js
- Prisma ORM
- MySQL
- Zod

### Services externes
- Resend pour les emails
- Jitsi en V1 via lien externe de réunion

### Sécurité et authentification
- **Authentification locale interne** basée sur sessions sécurisées

---

## 7. Dépendances importantes observées dans le dépôt

Le dépôt utilise notamment :

- `next`, `react`, `react-dom`
- `@prisma/client`
- `resend`
- `zod`
- `react-toastify`
- `react-quill-new`

Scripts disponibles :

```bash
npm run dev
npm run build
npm run start
npm run lint
```

---

## 8. Modèle métier actuel

### Authentification locale
- **Inscription** : Formulaire `/register` avec validation et hash bcrypt
- **Connexion** : Formulaire `/login` avec vérification des identifiants
- **Sessions** : Cookies HTTP-only sécurisés avec expiration
- **Middleware** : Protection des routes par vérification de session locale

### Utilisateurs
Gestion locale des utilisateurs comme base des relations métier.

### Équipes
Structuration hiérarchique avec rôles `OWNER`, `MANAGER`, `MEMBER`.

### Projets
Autonomes ou rattachés à une équipe, avec collaborateurs et rôles projet.

### Tâches
Assignation, statuts, échéances et descriptions de solution.

### Réunions
Planification équipe avec projet optionnel et liens externes.

---

## 9. Organisation actuelle du projet

```text
app/
  actions/
    auth.ts
  components/
  general-projects/
  meetings/
  new-tasks/[projectId]/
  project/[projectId]/
  login/[[...login]]/
  register/[[...register]]/
  task-details/[taskId]/
  teams/
lib/
  auth-client.ts
  auth-routes.ts
  email.ts
  permissions.ts
  prisma.ts
  project-role-labels.ts
  project-roles.ts
  task-status.ts
  team-role-labels.ts
  team-roles.ts
  validations.ts
prisma/
  migrations/
  schema.prisma
public/
proxy.ts
type.ts
```

La logique métier n’est plus centralisée dans un unique `app/actions.ts` : elle est désormais découpée en dossier `app/actions/`.

---

## 10. Variables d'environnement

### Variables obligatoires

```env
DATABASE_URL=
RESEND_API_KEY=
EMAIL_FROM=
APP_BASE_URL=
```

### Recommandations
- ne jamais committer les secrets ;
- utiliser des valeurs différentes entre local, staging et production ;
- garder `EMAIL_FROM` cohérent avec le domaine vérifié dans Resend ;
- définir `APP_BASE_URL` sur l'URL publique réelle de l'application.

---

## 11. Lancement en local

### 1. Cloner le dépôt

```bash
git clone https://github.com/laurentmd5/sunu-projet.git
cd sunu-projet
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Démarrer MySQL local via Docker

```bash
docker compose up -d
```

### 4. Configurer l’environnement

Créer un fichier `.env.local` à la racine du projet et y renseigner les variables nécessaires.

Exemple local :

```env
DATABASE_URL="mysql://app_user:app_password@127.0.0.1:3306/app_gestion_projets"

RESEND_API_KEY=
EMAIL_FROM="Sunu Projets <onboarding@resend.dev>"
APP_BASE_URL="http://localhost:3000"
```

### 5. Appliquer les migrations Prisma

```bash
npx prisma migrate dev
npx prisma generate
```

### 6. Lancer l’application

```bash
npm run dev
```

L’application est alors disponible sur :

```text
http://localhost:3000
```

---

## 12. Notes importantes sur les services externes

### Authentification locale
Le projet utilise **une authentification locale interne** pour protéger les routes privées et gérer les sessions utilisateur.

### Resend
Les emails d’assignation de tâche passent par `lib/email.ts`.  
Si `RESEND_API_KEY` est absente, l’envoi est simplement ignoré avec un warning, ce qui évite de casser le flux métier.

### Jitsi
L’intégration actuelle est une V1 légère : la réunion stocke un `provider` et une `externalUrl`.  
Le projet ne gère pas encore un hébergement Jitsi dédié ni une intégration iframe poussée.

---

## 13. Déploiement — vue rapide

Pour la mise en ligne, il faut prévoir au minimum :

1. un hébergement Node.js / Next.js ;
2. une base MySQL de production ;
3. une configuration email Resend ;
4. les variables d'environnement de production ;
5. l'application des migrations Prisma sur la base de production ;
6. une vérification fonctionnelle complète.

Une checklist détaillée est fournie dans `CHECKLIST_MISE_EN_PRODUCTION.md` pour la procédure complète.

---

## 14. Limites connues / points d’attention

Le projet est déjà exploitable, mais plusieurs points restent à consolider :

- le schéma de tâche utilise encore un statut stocké en chaîne ;
- certaines permissions restent à durcir sur certaines actions ;
- l’UI est fonctionnelle mais encore perfectible sur certains flux ;
- le module commentaires sur les tâches n’est pas encore intégré ;
- la partie Jitsi reste volontairement légère en V1.

---

## 15. Documentation associée

Le dépôt contient également :

- `Workflow_Gestion_de_Projet.md`
- `CHECKLIST_MISE_EN_PRODUCTION.md`
- `Roadmap_Gestion_de_Projet.md`

---

## 16. Auteur

Projet réalisé par **Moulaye Cheikh Oumar KOUNTA** dans le cadre d'un stage d'entreprise. Application conçue pour un usage interne en entreprise.