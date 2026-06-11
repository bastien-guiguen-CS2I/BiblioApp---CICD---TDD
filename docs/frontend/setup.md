# Frontend - Setup

## Prérequis

| Outil | Version |
|-------|---------|
| Node.js | 22.x |
| npm | 11.x |

## Lancer en local

```bash
cd BiblioFront
npm install
npm start
```

App disponible sur `http://localhost:4200`.

Le fichier `proxy.conf.json` redirige automatiquement `/api/*` vers `http://localhost:8080` - le backend doit tourner en parallèle.

## Commandes

```bash
npm start        # serveur de développement
npm run build    # build de production
npm run lint     # ESLint
npm test         # tests unitaires (Vitest)
```