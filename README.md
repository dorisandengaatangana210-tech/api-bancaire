# API Bancaire

API de gestion des comptes bancaires avec CRUD utilisateur, dépôt, retrait, virement et historique des transactions.

## Installation

```bash
npm install
```

## Démarrage

```bash
npm start
```

Le serveur démarrera sur `http://localhost:3000`.

## Interface Web

Une interface web complète est disponible pour gérer les utilisateurs et effectuer des transactions :

**Formulaire de gestion** : `http://localhost:3000/formulaire.html`

### Fonctionnalités du formulaire :
- ➕ **Ajouter des utilisateurs** avec nom, email et solde initial
- 📋 **Lister tous les utilisateurs** avec leurs informations
- ✏️ **Modifier les utilisateurs** (nom, email, solde)
- 🗑️ **Supprimer les utilisateurs**
- 💰 **Effectuer des dépôts** sur les comptes
- 💸 **Effectuer des retraits** des comptes
- 🔄 **Faire des virements** entre utilisateurs
- 📊 **Consulter l'historique** des transactions

## Documentation Swagger

La documentation API est disponible sur :

`http://localhost:3000/api-docs`

## Endpoints principaux

- `POST /api/users` : créer un utilisateur
- `GET /api/users` : lister tous les utilisateurs
- `GET /api/users/:id` : récupérer un utilisateur
- `PUT /api/users/:id` : modifier un utilisateur
- `DELETE /api/users/:id` : supprimer un utilisateur
- `POST /api/users/:id/deposit` : déposer de l'argent
- `POST /api/users/:id/withdraw` : retirer de l'argent
- `POST /api/transfers` : effectuer un virement
- `GET /api/users/:id/history` : consulter l'historique des transactions

## Tests

```bash
npm test
```

Le script de test vérifie les opérations basiques sur les modèles `User` et `Transaction`.

## Déploiement

L'application est configurée pour être déployée sur Render. L'interface web sera accessible via l'URL de votre déploiement Render suivi de `/formulaire.html`.
