# Docker - Versioning & Récupération des images

## Registre

Toutes les images sont publiées sur **GitHub Container Registry (GHCR)** :

```
ghcr.io/bastien-guiguen-cs2i/biblioapp/<image>:<tag>
```

Images disponibles : `back`, `front`, `swagger`, `docs`

---

## Stratégie de tags

### Vue d'ensemble

| Déclencheur | Tags produits | Push sur GHCR |
|---|---|---|
| Push sur n'importe quelle branche | `sha-xxxxxxx` (build local uniquement) | OK |
| Push sur `main` | `sha-xxxxxxx`, `latest` | OK |
| Tag Git `v1.2.3` | `sha-xxxxxxx`, `1.2.3`, `1.2`, `1`, `latest` | OK |
| Pull Request | `sha-xxxxxxx` (build local uniquement) | NOK |

---

### Détail des tags

#### `latest`
Pointe toujours sur le **dernier commit mergé sur `main`**.  
Ce tag est écrasé à chaque push sur `main` - ne pas l'utiliser en production.

```bash
docker pull ghcr.io/bastien-guiguen-cs2i/biblioapp/back:latest
```

---

#### `sha-xxxxxxx`
Tag immuable généré à partir des **7 premiers caractères du SHA du commit**.  
C'est le seul tag qui permet de retrouver **exactement** l'image d'un commit précis.  
Il est produit à chaque build, même sur les branches et PR (sans push).

```bash
docker pull ghcr.io/bastien-guiguen-cs2i/biblioapp/back:sha-abc1234
```

> Retrouve les SHA disponibles dans l'onglet **Packages** de ton repo GitHub,  
> ou via `git log --oneline`.

---

#### `1.2.3` - version complète
Tag exact correspondant au tag Git `v1.2.3` posé manuellement.  
Immuable - ne sera jamais écrasé.

```bash
docker pull ghcr.io/bastien-guiguen-cs2i/biblioapp/back:1.2.3
```

---

#### `1.2` - version mineure
Pointe sur le **dernier patch** de la version `1.2.x`.  
Écrasé à chaque nouveau tag `v1.2.x`.

```bash
docker pull ghcr.io/bastien-guiguen-cs2i/biblioapp/back:1.2
```

---

#### `1` - version majeure
Pointe sur le **dernier minor** de la version `1.x.x`.  
Écrasé à chaque nouveau tag `v1.x.x`.

```bash
docker pull ghcr.io/bastien-guiguen-cs2i/biblioapp/back:1
```

---

## Créer une nouvelle release

```bash
# 1. S'assurer d'être sur main et à jour
git checkout main
git pull origin main

# 2. Poser le tag sémantique
git tag v1.2.3
git push origin v1.2.3
```

Le CI se déclenche automatiquement et publie les images avec tous les tags associés.

### Convention de versioning (SemVer)

| Type de changement | Incrément | Exemple |
|---|---|---|
| Correctif / bugfix | **patch** | `1.2.2` → `1.2.3` |
| Nouvelle fonctionnalité rétrocompatible | **minor** | `1.2.3` → `1.3.0` |
| Rupture de compatibilité | **major** | `1.3.0` → `2.0.0` |

---

## Exemples concrets

### Récupérer la dernière version stable
```bash
docker pull ghcr.io/bastien-guiguen-cs2i/biblioapp/back:latest
```

### Récupérer une version précise pour la prod
```bash
docker pull ghcr.io/bastien-guiguen-cs2i/biblioapp/back:1.2.3
```

### Revenir à un commit spécifique (rollback)
```bash
# 1. Identifier le SHA dans GitHub > Packages ou via git log
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
| **Développement** | `latest` | Toujours à jour avec `main` |
| **Staging** | `1.2` | Suit les patches automatiquement |
| **Production** | `1.2.3` | Version figée, rollback facile |
| **Debug / investigation** | `sha-xxxxxxx` | Reproductibilité exacte |
