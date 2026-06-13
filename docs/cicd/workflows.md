# CI/CD - Pipelines

## Pipeline principal

**Fichier :** `.github/workflows/ci.yml`  
**Déclenché :** à chaque push sur `main`

Le pipeline orchestre dans l'ordre :

1. Build et tests backend (Maven)
2. Build et tests frontend (npm)
3. Build et publication des images Docker sur GHCR
4. Build de la documentation MkDocs

La validation Docker peut aussi être lancée indépendamment via `.github/workflows/build-docker.yml`.

---

## Images Docker publiées (GHCR)

```
ghcr.io/bastien-guiguen-cs2i/biblioapp/back:latest
ghcr.io/bastien-guiguen-cs2i/biblioapp/front:latest
ghcr.io/bastien-guiguen-cs2i/biblioapp/swagger:latest
ghcr.io/bastien-guiguen-cs2i/biblioapp/docs:latest
```

---

## Démarrage local

```bash
# Build depuis les sources
make up

# Depuis les images GHCR (aucun build local)
make prod-up
```
