# Frontend Setup

Ce guide explique comment lancer l'application frontend Angular localement.

**Prérequis**
- **Node.js** : installer Node.js 20+ (npm 11 recommandé, voir `package.json` `packageManager`).
- **npm** : fourni avec Node.js ; `npm --version` pour vérifier.
- **Git** (optionnel) : pour cloner le dépôt.
- **IDE recommandé** : Visual Studio Code.

**1) Cloner et se positionner**

```bash
git clone <url-du-repo>
cd "BiblioApp - CICD - TDD"/BiblioFront
```

**2) Installer les dépendances**

```bash
# Windows / macOS / Linux
npm install
```

Le `package.json` contient les scripts suivants : `start` (`ng serve`), `build` (`ng build`), `test` (`ng test`).

**3) Lancer le serveur de développement**

Par défaut Angular sert sur `http://localhost:4200`.

```bash
# Démarrer en développement
npm start
```

**4) Proxy vers le backend (développement)**

Le projet contient un fichier `proxy.conf.json` pour rediriger les appels API vers le backend local (ex : `http://localhost:8080`). Pour l'utiliser :

Cela évite les problèmes CORS et permet d'appeler `/api/ressources` directement depuis le frontend.


**5) Tests**

```bash
npm test
```
