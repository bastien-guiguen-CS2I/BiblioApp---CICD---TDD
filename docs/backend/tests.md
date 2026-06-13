# Backend - Tests

Les tests sont écrits selon l'approche **TDD** (Test-Driven Development).

## Lancer les tests

```bash
cd BiblioBack

./mvnw test        # macOS / Linux
.\mvnw.cmd test    # Windows
```

## Localisation

```
BiblioBack/src/test/java/
```

## CI

Les tests sont exécutés automatiquement dans le pipeline GitHub Actions à chaque push. Un push ne peut pas merger sur `main` si les tests échouent.
