# Roadmap mise à jour — App Gestion de Projets

## État actuel du projet

L’application dispose désormais d’un socle fonctionnel solide :

- authentification Clerk opérationnelle ;
- création de projet ;
- jointure à un projet par code d’invitation ;
- affichage des projets créés et des collaborations ;
- gestion des tâches ;
- page détail projet ;
- page détail tâche ;
- changement de statut des tâches ;
- rôles collaborateurs par projet (`OWNER`, `MANAGER`, `MEMBER`) ;
- contrôles d’accès côté serveur ;
- gestion des membres d’un projet ;
- sécurisation UI des actions sensibles ;
- migration de la base de données vers PostgreSQL en environnement local ;
- mise en place d’un démarrage simplifié de la base via Docker ;
- envoi d’email lors de l’assignation d’une tâche ;
- historique d’activité V1 sur la page projet ;
- début de refactorisation des server actions en dossier structuré.

L’objectif n’est plus de construire seulement une base technique, mais de faire évoluer l’application vers un outil réellement exploitable par une équipe de travail.

---

## Terminé récemment

### Gestion des rôles et permissions
- ajout des rôles collaborateurs par projet (`OWNER`, `MANAGER`, `MEMBER`) ;
- attribution automatique des rôles :
  - créateur du projet → `OWNER`
  - utilisateur rejoignant un projet → `MEMBER`
- création d’helpers de permissions et de rôles côté serveur ;
- contrôles d’accès serveur sur les actions projet et tâche.

### Gestion des membres
- récupération des membres d’un projet avec leur rôle ;
- modification du rôle d’un collaborateur ;
- retrait d’un collaborateur ;
- affichage d’une section “Membres du projet” dans la page détail projet ;
- hiérarchisation visuelle des membres par rôle.

### Sécurisation des actions sensibles
- ajout de confirmations explicites pour les actions sensibles ;
- amélioration de la sécurité UI pour :
  - suppression de projet ;
  - changement de rôle ;
  - retrait d’un collaborateur.

### Fiabilisation métier
- validation serveur avec Zod sur les actions principales ;
- centralisation des statuts de tâches dans un fichier dédié ;
- correction du bug d’ajout automatique d’un utilisateur Clerk sans `fullName`.

### Base de données et environnement
- abandon de SQLite comme base principale de développement ;
- mise en place de PostgreSQL en local ;
- compatibilité Prisma avec PostgreSQL ;
- documentation et setup Docker mis à jour.

### Notifications et traçabilité
- envoi d’un email lors de l’assignation d’une tâche ;
- intégration d’un historique d’activité V1 sur les projets ;
- journalisation des actions principales :
  - création de projet ;
  - jointure d’un membre ;
  - changement de rôle ;
  - retrait d’un membre ;
  - création de tâche ;
  - changement de statut d’une tâche.

### Refactorisation technique
- début de découpage de l’ancien `app/actions.ts` en plusieurs fichiers par domaine.

---

# Roadmap à venir

## Priorité 1 — Structurer l’application autour des équipes

### 1. Gestion des équipes / espaces de travail
**Objectif**  
Créer une couche métier supérieure au projet afin de structurer les utilisateurs, les accès et les futures fonctionnalités de collaboration.

**Travaux à prévoir**
- créer une entité `Team` ;
- créer une relation `TeamMember` ;
- rattacher les projets à une équipe ;
- permettre à plusieurs membres de collaborer dans une même équipe ;
- définir des rôles d’équipe :
  - propriétaire d’équipe ;
  - manager d’équipe ;
  - membre ;
- adapter les permissions au niveau équipe ;
- distinguer clairement la gestion des membres d’une équipe de la gestion des membres d’un projet.

**Résultat attendu**  
Une architecture plus réaliste pour un usage en entreprise, avec une couche organisationnelle externe au module projet.

---

### 2. Pages et flux de gestion des équipes
**Objectif**  
Rendre les équipes utilisables dans l’interface.

**Travaux à prévoir**
- créer une page liste des équipes ;
- créer une page détail équipe ;
- permettre la création d’une équipe ;
- afficher les membres de l’équipe ;
- permettre l’ajout, le retrait et la gestion des rôles dans une équipe ;
- afficher les projets rattachés à une équipe.

**Résultat attendu**  
Une vraie entrée “équipe / workspace” dans l’application, distincte de la logique projet.

---

## Priorité 2 — Préparer et intégrer les réunions

### 3. Réunions et comptes-rendus écrits
**Objectif**  
Mettre en place une première brique de collaboration structurée avant la visioconférence.

**Travaux à prévoir**
- créer une entité `Meeting` ;
- rattacher une réunion à une équipe ;
- permettre éventuellement de lier une réunion à un projet ;
- enregistrer :
  - la date ;
  - le titre ;
  - les participants ;
  - le résumé / PV ;
  - les décisions prises ;
  - les actions à suivre ;
- afficher l’historique des réunions.

**Résultat attendu**  
Une base métier claire pour les réunions, avec mémoire écrite des échanges.

---

### 4. Intégration d’une réunion vidéo avec Jitsi
**Objectif**  
Permettre de lancer et rejoindre des réunions vidéo rapidement via Jitsi.

**Travaux à prévoir**
- intégrer Jitsi dans l’application ;
- créer une salle de réunion liée à une équipe ;
- permettre éventuellement un lien avec un projet ;
- générer un accès simple à une salle depuis l’interface ;
- afficher les informations de réunion dans l’application ;
- préparer une structure compatible avec l’évolution vers un usage plus robuste.

**Résultat attendu**  
Une V1 de visioconférence directement utilisable dans l’application.

---

### 5. Préparer la gestion future des enregistrements
**Objectif**  
Garder l’architecture compatible avec un futur besoin d’enregistrement sans bloquer l’intégration initiale.

**Travaux à prévoir**
- prévoir le lien entre :
  - équipe ;
  - réunion ;
  - projet ;
  - compte-rendu ;
  - enregistrement ;
- définir où stocker une référence d’enregistrement plus tard ;
- distinguer clairement la réunion vidéo en direct de l’archive ou du replay.

**Résultat attendu**  
Une structure prête pour accueillir plus tard l’enregistrement des réunions.

---

## Priorité 3 — Renforcer la collaboration métier

### 6. Commentaires sur les tâches
**Objectif**  
Faciliter les échanges directement au niveau des tâches.

**Travaux à prévoir**
- ajouter un fil de discussion simple par tâche ;
- afficher l’auteur, la date et le message ;
- intégrer les commentaires dans la page détail tâche ;
- respecter les permissions d’accès à la tâche.

**Résultat attendu**  
Une meilleure communication opérationnelle sans sortir de l’application.

---

### 7. Amélioration du flux de collaboration
**Objectif**  
Rendre le travail collaboratif plus fluide.

**Travaux à prévoir**
- permettre la régénération du code d’invitation ;
- améliorer l’UX de la page “Collaborations” ;
- clarifier les retours utilisateur lors de la jointure ;
- prévenir les doublons et les cas limites ;
- afficher le rôle courant de l’utilisateur dans plus d’endroits stratégiques.

**Résultat attendu**  
Une expérience plus propre côté membres, invitations et accès.

---

## Priorité 4 — Améliorer l’expérience utilisateur

### 8. Dashboard plus utile
**Objectif**  
Donner une vraie vue d’ensemble à l’utilisateur.

**Travaux à prévoir**
- afficher les projets actifs ;
- afficher les tâches assignées ;
- afficher les tâches en retard ;
- afficher les tâches terminées récemment ;
- afficher une activité récente synthétique ;
- plus tard, intégrer aussi les équipes et réunions récentes.

**Résultat attendu**  
Une page d’accueil plus informative et mieux adaptée à un usage réel.

---

### 9. Gestion métier plus complète des tâches
**Objectif**  
Rendre le suivi des tâches plus réaliste et plus lisible.

**Travaux à prévoir**
- ajouter une priorité sur les tâches :
  - basse ;
  - moyenne ;
  - haute ;
- afficher des badges de priorité dans les listes et les détails ;
- améliorer la gestion des échéances :
  - en retard ;
  - à faire aujourd’hui ;
  - bientôt à échéance ;
- enrichir les filtres :
  - par priorité ;
  - par statut ;
  - par assigné ;
  - par date limite ;
- ajouter une recherche par nom de tâche.

**Résultat attendu**  
Une page projet plus utile au quotidien et mieux adaptée au pilotage.

---

### 10. Uniformisation UI et suppression du legacy tutoriel
**Objectif**  
Rendre l’interface plus cohérente et plus maintenable.

**Travaux à prévoir**
- réduire l’usage de `document.getElementById(...)` au profit du state React ;
- harmoniser cartes, modales, badges et boutons ;
- améliorer les loaders, empty states et confirmations ;
- poursuivre les vérifications responsive mobile.

**Résultat attendu**  
Une application plus propre visuellement et plus stable côté front.

---

## Priorité 5 — Refactorisation technique et stabilisation

### 11. Finaliser la refactorisation des server actions
**Objectif**  
Achever proprement le découpage de la logique métier.

**Travaux à prévoir**
- stabiliser le dossier `app/actions/` ;
- vérifier les imports et réexports ;
- centraliser les messages métier ;
- améliorer les types partagés ;
- réduire les `any` restants ;
- préparer à terme `actions/teams.ts` et `actions/meetings.ts`.

**Résultat attendu**  
Un code plus lisible, plus maintenable et plus simple à faire évoluer.

---

### 12. Historique d’activité V2
**Objectif**  
Améliorer la qualité de lecture de l’historique déjà en place.

**Travaux à prévoir**
- badges par type d’activité ;
- libellés plus métier ;
- dates plus lisibles ;
- amélioration visuelle du bloc activité ;
- éventuels logs complémentaires.

**Résultat attendu**  
Une meilleure lisibilité sans remettre en cause la V1 déjà fonctionnelle.

---

### 13. Stabilisation environnement / déploiement
**Objectif**  
Préparer une utilisation plus régulière de l’application.

**Travaux à prévoir**
- fiabiliser le setup Docker/PostgreSQL ;
- clarifier les variables d’environnement ;
- documenter précisément le workflow de lancement ;
- préparer une future cible de déploiement simple.

**Résultat attendu**  
Un projet plus facile à relancer, partager et maintenir.

---

# Priorisation recommandée

## Priorité immédiate
1. Gestion des équipes / espaces de travail  
2. Pages et flux de gestion des équipes  
3. Réunions et comptes-rendus écrits  

## Priorité court terme
4. Intégration Jitsi  
5. Préparation de la gestion des enregistrements  
6. Finalisation de la refactorisation des actions  

## Priorité moyen terme
7. Commentaires sur les tâches  
8. Dashboard plus utile  
9. Gestion métier plus complète des tâches  
10. Historique d’activité V2

---

# Prochain enchaînement recommandé

1. Créer le module `Team` / `TeamMember`  
2. Rattacher les projets à une équipe  
3. Créer les pages de gestion des équipes  
4. Ajouter le module `Meeting` / comptes-rendus  
5. Intégrer Jitsi sur cette base

Cet enchaînement évite de construire les réunions directement sur le projet, et prépare une architecture plus cohérente pour la suite.