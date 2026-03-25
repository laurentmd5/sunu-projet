# Checklist de mise en production — App Gestion de Projets

## Objectif

Cette checklist a pour but de préparer correctement la mise en ligne de l’application pour un usage réel en entreprise, en tenant compte :

- de l’authentification Clerk ;
- de l’envoi d’emails via Resend ;
- de la base de données PostgreSQL ;
- de la configuration de l’environnement ;
- des vérifications fonctionnelles avant ouverture aux utilisateurs.

---

## 1. Préparer l’environnement de production

### Hébergement de l’application
- choisir la plateforme d’hébergement de l’application ;
- définir l’URL finale de l’application ;
- vérifier que l’URL de production est stable et accessible.

### Variables d’environnement
- préparer les variables d’environnement de production ;
- séparer clairement les variables de développement et de production ;
- ne jamais réutiliser les clés de développement en production.

Variables à prévoir :
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL`
- `NEXT_PUBLIC_CLERK_SIGN_UP_URL`
- `DATABASE_URL`
- `RESEND_API_KEY`
- `EMAIL_FROM`
- `APP_BASE_URL`

---

## 2. Base de données PostgreSQL

### Mise en place
- prévoir une base PostgreSQL de production ;
- éviter d’utiliser la base Docker locale de développement comme base finale ;
- vérifier que la base est persistante et sauvegardable.

### Vérifications
- vérifier la connexion depuis l’application ;
- appliquer les migrations Prisma sur la base de production ;
- tester Prisma Studio ou une commande Prisma en lecture si nécessaire ;
- vérifier que les tables attendues existent.

### Sécurité
- utiliser de vrais identifiants de production ;
- ne pas conserver une configuration permissive type développement local ;
- limiter l’accès réseau à la base si nécessaire.

---

## 3. Authentification Clerk

### Instance de production
- utiliser une instance Clerk de production ;
- récupérer les clés de production Clerk ;
- les injecter dans l’environnement d’hébergement.

### Domaine
- configurer le domaine final de l’application dans Clerk ;
- vérifier que les redirections `sign-in` et `sign-up` sont correctes ;
- tester le flux complet :
  - inscription ;
  - connexion ;
  - reconnexion ;
  - accès protégé.

### Vérifications métier
- vérifier que les utilisateurs Clerk sont bien ajoutés dans la base interne ;
- vérifier que les comptes sans `fullName` sont toujours bien gérés ;
- vérifier que les emails récupérés via Clerk restent cohérents avec les données métier.

---

## 4. Emails avec Resend

### Configuration Resend
- créer une clé API de production ;
- utiliser une clé avec droits adaptés, idéalement limités à l’envoi ;
- vérifier un vrai domaine d’envoi dans Resend ;
- configurer les enregistrements DNS nécessaires.

### Adresse expéditrice
- remplacer l’adresse de test `onboarding@resend.dev` ;
- utiliser une vraie adresse du domaine vérifié, par exemple :
  - `noreply@...`
  - `notifications@...`

### Vérifications
- tester l’envoi d’un email de notification lors d’une assignation de tâche ;
- vérifier la bonne réception ;
- vérifier que les liens contenus dans l’email pointent vers l’URL réelle de production ;
- vérifier que les erreurs d’envoi sont bien loggées sans casser la logique métier.

---

## 5. Configuration applicative

### URL publique
- définir `APP_BASE_URL` avec l’URL réelle de l’application ;
- vérifier que les emails et redirections utilisent bien cette URL.

### Build et lancement
- vérifier que le projet build correctement ;
- vérifier que le mode production démarre correctement ;
- s’assurer que la configuration locale de développement n’est pas utilisée en production.

### Docker / environnement
- décider si PostgreSQL de production sera :
  - managé ;
  - auto-hébergé ;
  - ou lancé via infrastructure dédiée ;
- garder Docker local surtout pour le développement et les tests internes si besoin.

---

## 6. Vérifications fonctionnelles avant ouverture

### Authentification
- création de compte ;
- connexion ;
- reconnexion ;
- déconnexion ;
- accès interdit aux pages protégées si non connecté.

### Projets
- création de projet ;
- affichage des projets créés ;
- suppression de projet avec confirmation ;
- jointure à un projet via code d’invitation.

### Membres et rôles
- affichage des membres d’un projet ;
- changement de rôle `MEMBER ↔ MANAGER` ;
- retrait d’un collaborateur ;
- vérification des permissions `OWNER / MANAGER / MEMBER`.

### Tâches
- création de tâche ;
- assignation à un collaborateur ;
- changement de statut ;
- affichage correct dans le projet ;
- suppression si autorisée ;
- vérification des filtres et compteurs.

### Email
- vérification qu’un email est bien envoyé lors de l’assignation d’une tâche ;
- vérification qu’aucun email inutile n’est envoyé lors d’une auto-assignation si cette règle est conservée.

---

## 7. Sécurité minimale avant mise en ligne

### Variables sensibles
- ne pas committer les secrets ;
- stocker les clés uniquement dans l’environnement sécurisé de l’hébergeur.

### Base de données
- utiliser un vrai mot de passe fort ;
- limiter les accès réseau ;
- prévoir une sauvegarde.

### Application
- conserver les confirmations sur actions sensibles ;
- vérifier que les contrôles d’accès serveur fonctionnent toujours en production ;
- vérifier qu’un utilisateur ne peut pas agir hors de son périmètre.

---

## 8. Documentation minimale à finaliser

Avant mise en usage interne, vérifier que le dépôt contient :
- un `README.md` à jour ;
- la roadmap actuelle ;
- les instructions de lancement ;
- les variables d’environnement attendues ;
- le workflow de développement local.

---

## 9. Checklist de validation finale

### Technique
- [ ] build production OK
- [ ] base PostgreSQL de production accessible
- [ ] migrations Prisma appliquées
- [ ] variables d’environnement de production configurées
- [ ] application accessible via l’URL finale

### Services externes
- [ ] Clerk configuré en production
- [ ] domaine Clerk configuré
- [ ] Resend configuré avec clé de production
- [ ] domaine email vérifié
- [ ] adresse expéditrice de production en place

### Fonctionnel
- [ ] connexion / inscription testées
- [ ] création de projet testée
- [ ] collaboration par code testée
- [ ] création et assignation de tâche testées
- [ ] email d’assignation reçu
- [ ] rôles et permissions validés
- [ ] actions sensibles validées

---

## 10. Suivi après mise en ligne

Après ouverture aux premiers utilisateurs :
- surveiller les erreurs de connexion ;
- surveiller les erreurs d’envoi email ;
- vérifier les retours sur l’ergonomie ;
- corriger en priorité les bugs bloquants ;
- continuer les évolutions prévues dans la roadmap.

---

## Remarque

Le setup actuel convient très bien au développement local.  
Pour une utilisation réelle dans l’entreprise, il faudra remplacer progressivement les éléments de test par des configurations de production :

- vraie base PostgreSQL de production ;
- vraies clés Clerk de production ;
- vrai domaine vérifié dans Resend ;
- vraie URL publique de l’application.