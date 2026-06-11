# Frontend - Stack

| Technologie | Version | Rôle |
|-------------|---------|------|
| Angular | 21.2 | Framework SPA |
| TypeScript | 5.9 | Langage |
| RxJS | 7.8 | Gestion des flux asynchrones |
| TailwindCSS | 3.4 | Styles utilitaires |
| Angular ESLint | 21.4 | Linting TypeScript + templates |
| Vitest | 4.x | Tests unitaires |
| Node.js | 22.x | Runtime requis |
| npm | 11.x | Gestionnaire de paquets |

## Dépendances (`package.json`)

```json
"dependencies": {
  "@angular/common":           "^21.2.0",
  "@angular/compiler":         "^21.2.0",
  "@angular/core":             "^21.2.0",
  "@angular/forms":            "^21.2.0",
  "@angular/platform-browser": "^21.2.0",
  "@angular/router":           "^21.2.0",
  "rxjs":                      "~7.8.0",
  "tslib":                     "^2.3.0"
}
```

```json
"devDependencies": {
  "@angular/build":     "^21.2.0",
  "@angular/cli":       "^21.2.0",
  "angular-eslint":     "21.4.0",
  "eslint":             "^10.3.0",
  "tailwindcss":        "^3.4.17",
  "typescript":         "~5.9.2",
  "typescript-eslint":  "8.59.2",
  "vitest":             "^4.0.8"
}
```

## Structure du code

```
BiblioFront/src/app/
├── pages/
│   ├── ajouter-livre/
│   ├── ajouter-utilisateur/
│   ├── modification-livre/
│   ├── modification-utilisateur/
│   ├── mes-emprunts/
│   └── login/
├── services/
│   ├── auth.service.ts
│   ├── ressource.service.ts
│   ├── utilisateur.service.ts
│   └── notification.service.ts
└── models/
    └── models.ts
```