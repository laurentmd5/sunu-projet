# Roadmap mise à jour — App Gestion de Projets

## État actuel du projet

L’application a dépassé le stade de simple clone technique et dispose désormais d’un socle fonctionnel exploitable :

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
- mise en place d’un démarrage simplifié de la base via Docker.

L’objectif n’est plus uniquement de stabiliser la base technique, mais de faire évoluer l’application vers un outil réellement utile pour une équipe.

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

---

# Roadmap à venir

## Priorité 1 — Rendre l’application plus utile au quotidien

### 1. Notifications email lors de l’assignation d’une tâche
**Objectif**  
Informer automatiquement un membre lorsqu’une nouvelle tâche lui est attribuée.

**Travaux à prévoir**
- envoyer un email lors de la création d’une tâche assignée à un utilisateur ;
- inclure dans l’email :
  - le nom du projet ;
  - le nom de la tâche ;
  - la date limite si elle existe ;
  - un lien vers la tâche ou le projet ;
- définir une règle métier claire si la tâche est assignée à son propre créateur ;
- préparer une base réutilisable pour de futurs emails métier.

**Résultat attendu**  
Une meilleure réactivité des collaborateurs et une fonctionnalité immédiatement utile en usage réel.

---

### 2. Gestion métier plus complète des tâches
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

### 3. Historique d’activité du projet
**Objectif**  
Donner de la traçabilité sur les actions importantes d’un projet.

**Travaux à prévoir**
- journaliser :
  - création de projet ;
  - création de tâche ;
  - changement de statut ;
  - ajout ou retrait d’un membre ;
  - changement de rôle ;
- créer une section “Activité récente” sur la page projet ;
- stocker :
  - l’acteur ;
  - l’action ;
  - la cible ;
  - la date.

**Résultat attendu**  
Une meilleure visibilité sur l’évolution du projet et une base pour de futures notifications.

---

## Priorité 2 — Renforcer la collaboration

### 4. Réunions et comptes-rendus écrits
**Objectif**  
Permettre un suivi structuré des échanges d’équipe, même avant l’intégration de la vidéo.

**Travaux à prévoir**
- ajouter une page ou section “Réunions” ;
- permettre de créer une réunion liée à un projet ;
- enregistrer :
  - la date ;
  - le titre ;
  - les participants ;
  - le résumé / PV ;
  - les décisions prises ;
  - les actions à suivre ;
- afficher l’historique des réunions du projet.

**Résultat attendu**  
Une collaboration plus professionnelle, avec mémoire écrite des échanges.

---

### 5. Commentaires sur les tâches
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

### 6. Amélioration du flux de collaboration
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

## Priorité 3 — Structurer le produit pour la suite

### 7. Gestion des équipes / espaces de travail
**Objectif**  
Passer d’une logique centrée uniquement sur le projet à une logique d’équipe.

**Travaux à prévoir**
- créer une entité `Team` ;
- créer une relation `TeamMember` ;
- rattacher les projets à une équipe ;
- permettre à plusieurs membres de collaborer dans une même équipe ;
- préparer une hiérarchie :
  - propriétaire d’équipe ;
  - manager d’équipe ;
  - membre ;
- adapter les permissions au niveau équipe.

**Résultat attendu**  
Une structuration multi-projets plus proche d’un usage en entreprise.

---

### 8. Préparer la future brique visioconférence
**Objectif**  
Préparer le terrain pour la demande du directeur sans implémenter trop tôt une brique lourde.

**Travaux à prévoir**
- concevoir la place future des réunions vidéo dans le modèle ;
- prévoir le lien entre :
  - projet ;
  - réunion ;
  - compte-rendu ;
  - enregistrement ;
- garder une architecture compatible avec une future intégration externe.

**Résultat attendu**  
Une base prête pour la visioconférence et l’enregistrement plus tard, sans bloquer l’avancement actuel.

---

## Priorité 4 — Améliorer l’expérience utilisateur

### 9. Dashboard plus utile
**Objectif**  
Donner une vraie vue d’ensemble à l’utilisateur.

**Travaux à prévoir**
- afficher les projets actifs ;
- afficher les tâches assignées ;
- afficher les tâches en retard ;
- afficher les tâches terminées récemment ;
- afficher une activité récente synthétique.

**Résultat attendu**  
Une page d’accueil plus informative et moins “liste brute”.

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

## Priorité 5 — Refactorisation technique

### 11. Découpage de `app/actions.ts`
**Objectif**  
Sortir de la logique monolithique actuelle.

**Travaux à prévoir**
- séparer :
  - `actions/projects.ts`
  - `actions/tasks.ts`
  - `actions/members.ts`
  - `actions/users.ts`
  - puis plus tard `actions/meetings.ts`
- centraliser les messages métier ;
- améliorer les types partagés ;
- réduire les `any`.

**Résultat attendu**  
Un code plus lisible, plus maintenable et plus simple à faire évoluer.

---

### 12. Stabilisation environnement / déploiement
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
1. Notifications email à l’assignation d’une tâche  
2. Gestion métier plus complète des tâches  
3. Historique d’activité du projet  

## Priorité court terme
4. Réunions / PV écrits  
5. Commentaires sur les tâches  
6. Amélioration du dashboard  
7. Refactorisation de `app/actions.ts`

## Priorité moyen terme
8. Gestion des équipes / espaces de travail  
9. Préparation de la future visioconférence  
10. Stabilisation plus poussée pour usage d’équipe

---

# Prochain enchaînement recommandé

1. Notifications email lorsqu’une tâche est assignée  
2. Historique d’activité du projet  
3. Page de réunions avec PV / résumés écrits  

Cet enchaînement apporte rapidement de la valeur métier, améliore la collaboration et reste réaliste par rapport à l’état actuel du projet.