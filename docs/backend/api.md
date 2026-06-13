# Backend - API REST

Base URL : `/api`

---

## Ressources

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `GET` | `/ressources` | Liste toutes les ressources |
| `GET` | `/ressources/{id}` | Détail d'une ressource |
| `POST` | `/ressources` | Créer une ressource |
| `PUT` | `/ressources/{id}` | Modifier une ressource |
| `DELETE` | `/ressources/{id}` | Supprimer une ressource |

## Utilisateurs

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `GET` | `/utilisateurs` | Liste des utilisateurs |
| `GET` | `/utilisateurs/{id}` | Détail d'un utilisateur |
| `GET` | `/utilisateurs/email/{email}` | Recherche par email |
| `POST` | `/utilisateurs` | Créer un utilisateur |
| `PUT` | `/utilisateurs/{id}` | Modifier un utilisateur |
| `DELETE` | `/utilisateurs/{id}` | Supprimer un utilisateur |
| `POST` | `/utilisateurs/login` | Authentification |

---

## Documentation interactive (Swagger)

| URL | Description |
|-----|-------------|
| `http://localhost:8080/swagger-ui/index.html` | Interface graphique — Try it out |
| `http://localhost:8080/v3/api-docs` | Schéma OpenAPI JSON brut |
| `http://localhost:8081` | Swagger UI via le service Docker dédié |

Swagger est généré automatiquement à partir des annotations du code grâce à **SpringDoc OpenAPI 2.x** — aucune configuration manuelle des endpoints nécessaire.
