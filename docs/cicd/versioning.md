# CI/CD - Versioning des images Docker

## Registre

Toutes les images sont publiées sur **GitHub Container Registry (GHCR)** :

```
ghcr.io/bastien-guiguen-cs2i/biblioapp/<image>:<tag>
```

Images disponibles : `back`, `front`, `swagger`, `docs`

---

## Stratégie de tags

| Déclencheur | Tags produits | Push sur GHCR |
|---|---|---|
| Push sur n'importe quelle branche | `sha-xxxxxxx` | OK |
| Push sur `main` | `sha-xxxxxxx`, `latest` | OK |
| Tag Git `v1.2.3` | `sha-xxxxxxx`, `1.2.3`, `1.2`, `1`, `latest` | OK |
| Pull Request | `sha-xxxxxxx` (build local uniquement) | NOK |

### `latest`
Toujours le **dernier commit mergé sur `main`**. Écrasé à chaque push - ne pas utiliser en production.

### `sha-xxxxxxx`
Tag immuable basé sur les 7 premiers caractères du SHA du commit. Seul tag permettant de retrouver **exactement** l'image d'un commit précis. Disponible même sur les branches et PR (sans push GHCR).

### `1.2.3` / `1.2` / `1`
Générés uniquement lors d'un **tag Git sémantique** (`git tag v1.2.3`).

- `1.2.3` → immuable, correspond exactement au tag
- `1.2` → écrasé à chaque nouveau patch `1.2.x`
- `1` → écrasé à chaque nouveau minor `1.x.x`

---

## Convention de versioning (SemVer)

| Type de changement | Incrément | Exemple |
|---|---|---|
| Correctif / bugfix | **patch** | `1.2.2` → `1.2.3` |
| Nouvelle fonctionnalité rétrocompatible | **minor** | `1.2.3` → `1.3.0` |
| Rupture de compatibilité | **major** | `1.3.0` → `2.0.0` |

---

## Créer une release

```bash
# 1. S'assurer d'être sur main et à jour
git checkout main
git pull origin main

# 2. Poser le tag sémantique
git tag v1.2.3
git push origin v1.2.3
```

Le CI se déclenche automatiquement et publie les images avec tous les tags associés.

---

## Exemples de commandes Docker

### Récupérer la dernière version (dev)
```bash
docker pull ghcr.io/bastien-guiguen-cs2i/biblioapp/back:latest
```

### Récupérer une version figée (production)
```bash
docker pull ghcr.io/bastien-guiguen-cs2i/biblioapp/back:1.2.3
```

### Rollback sur un commit précis
```bash
# 1. Identifier le SHA
git log --oneline

# 2. Tirer l'image correspondante
docker pull ghcr.io/bastien-guiguen-cs2i/biblioapp/back:sha-abc1234
```

### Récupérer toutes les images d'une release
```bash
TAG="1.2.3"
REGISTRY="ghcr.io/bastien-guiguen-cs2i/biblioapp"

docker pull $REGISTRY/back:$TAG
docker pull $REGISTRY/front:$TAG
docker pull $REGISTRY/swagger:$TAG
docker pull $REGISTRY/docs:$TAG
```

---

## Recommandations par environnement

| Environnement | Tag recommandé | Raison |
|---|---|---|
| Développement | `latest` | Toujours à jour avec `main` |
| Staging | `1.2` | Suit les patches automatiquement |
| Production | `1.2.3` | Version figée, rollback facile |
| Debug / investigation | `sha-xxxxxxx` | Reproductibilité exacte |
