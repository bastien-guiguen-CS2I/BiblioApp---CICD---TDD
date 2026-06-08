# CI/CD Workflows

Workflow principal: .github/workflows/ci.yml
Orchestre les workflows réutilisables backend, frontend et documentation.

Le workflow principal peut aussi lancer la validation Docker via `.github/workflows/build-docker.yml`.
En local, utilise `make up` pour démarrer la pile complète via `docker compose`.
