# Backend - Setup

## Prérequis

| Outil | Version |
|-------|---------|
| JDK | 21 |
| Maven | via wrapper - aucune installation globale requise |

## Lancer en local

```bash
cd BiblioBack

./mvnw spring-boot:run        # macOS / Linux
.\mvnw.cmd spring-boot:run    # Windows
```

API disponible sur `http://localhost:8080`.

## Tests

```bash
./mvnw test        # macOS / Linux
.\mvnw.cmd test    # Windows
```

Les tests sont dans `BiblioBack/src/test/java`.

## Swagger

- Swagger UI : http://localhost:8080/swagger-ui/index.html
- OpenAPI JSON : http://localhost:8080/v3/api-docs