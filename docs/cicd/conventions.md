# Développement - Conventions

## Style de code

| Langage | Indentation |
|---------|-------------|
| Java | 4 espaces |
| TypeScript | 2 espaces |

## Commits

Utiliser les **commits conventionnels** :

```
feat: ajout de la page d'emprunt
fix: correction du login utilisateur
docs: mise à jour du README
chore: bump dépendances npm
```

## Tests

- Les tests **backend sont obligatoires** pour tout changement côté Java.
- Le projet suit une approche **TDD** - écrire le test avant le code.
- Les tests sont exécutés automatiquement en CI à chaque push.

## Workflow de contribution

1. Créer une branche depuis `main`
2. Développer en TDD (backend)
3. Lancer les tests localement avant de push
4. Ouvrir une Pull Request vers `main`
5. Le pipeline CI valide automatiquement le build et les tests
6. Merger une fois le CI vert
