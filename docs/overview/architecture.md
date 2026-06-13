# Vue d'ensemble

BiblioApp est une application web de gestion de bibliothèque (ressources, utilisateurs, emprunts) développée en suivant une approche TDD et déployée via un pipeline CI/CD complet.

---

## Architecture

```
┌─────────────────┐         ┌──────────────────────────┐
│  Angular 21     │──HTTP──▶  Java Spring Boot 4.0.6│
│  :4200          │◀───────│  :8080                 │
└─────────────────┘         └───────────┬──────────────┘
                                        │
                                ┌───────▼────────┐
                                │   H2 (dev)    │
                                └────────────────┘

Swagger UI  :8081  →  /v3/api-docs  (back:8080)
Docs MkDocs :8082
```

Le frontend Angular proxifie toutes les requêtes `/api/*` vers le backend Spring Boot - pas de problème CORS en développement.

---

## Stack technique

| Couche | Technologie | Version |
|--------|-------------|---------|
| Frontend | Angular | 21.2 |
| Frontend | TypeScript | 5.9 |
| Frontend | TailwindCSS | 3.4 |
| Frontend | Vitest | 4.x |
| Backend | Java / Spring Boot | 21 / 4.0.6 |
| Backend | Spring Data JPA | - |
| Backend | H2 Database (dev) | - |
| Backend | SpringDoc OpenAPI | 2.x |
| Infra | Docker | - |
| Infra | GitHub Actions | - |
| Infra | GHCR | - |

---

## Services Docker

| Service | Image GHCR | Port |
|---------|------------|------|
| `back` | `ghcr.io/bastien-guiguen-cs2i/biblioapp/back` | 8080 |
| `front` | `ghcr.io/bastien-guiguen-cs2i/biblioapp/front` | 4200 |
| `swagger` | `ghcr.io/bastien-guiguen-cs2i/biblioapp/swagger` | 8081 |
| `docs` | `ghcr.io/bastien-guiguen-cs2i/biblioapp/docs` | 8082 |

Tous les services communiquent sur le réseau interne `biblio-net`.

---

## Prérequis

| Outil | Version | Usage |
|-------|---------|-------|
| JDK | 21 | Backend |
| Maven Wrapper | inclus | Build backend (aucune installation globale requise) |
| Node.js | 22.x | Frontend |
| npm | 11.x | Gestionnaire de paquets frontend |
| Docker | récent | Démarrage via images GHCR |

---

## Quick Start

### Option A - Depuis les images GHCR (recommandé, aucun build)

```bash
make prod-up
```

### Option B - Build depuis les sources

```bash
make up
```

### Option C - Démarrage manuel service par service

**Backend :**
```bash
cd BiblioBack
chmod +x mvnw                 # macOS / Linux
./mvnw spring-boot:run        # macOS / Linux
.\mvnw.cmd spring-boot:run    # Windows
```

**Frontend :**
```bash
cd BiblioFront
npm install
npm start
```

Une fois démarrés :

| URL | Description |
|-----|-------------|
| `http://localhost:4200` | Application Angular |
| `http://localhost:8080` | API Spring Boot |
| `http://localhost:8080/swagger-ui/index.html` | Swagger UI (direct) |
| `http://localhost:8081` | Swagger UI (via Docker) |
| `http://localhost:8082` | Documentation MkDocs |
