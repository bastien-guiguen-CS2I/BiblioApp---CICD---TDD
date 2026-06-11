# CI/CD - Workflows

## Pipeline principal

Fichier : `.github/workflows/ci.yml`

Déclenché à chaque push sur `main`. Orchestre :

- Build et tests backend (Maven)
- Build et tests frontend (npm)
- Build et publication des images Docker sur GHCR
- Build de la documentation MkDocs

La validation Docker peut aussi être lancée séparément via `.github/workflows/build-docker.yml`.

## Images publiées (GHCR)

```
ghcr.io/bastien-guiguen-cs2i/biblioapp/back:latest
ghcr.io/bastien-guiguen-cs2i/biblioapp/front:latest
ghcr.io/bastien-guiguen-cs2i/biblioapp/swagger:latest
ghcr.io/bastien-guiguen-cs2i/biblioapp/docs:latest
```

## Démarrage local rapide

```bash
# Build depuis les sources
make up

# Depuis les images GHCR (aucun build)
make prod-up
```