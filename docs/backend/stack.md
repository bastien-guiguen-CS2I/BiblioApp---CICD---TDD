# Backend - Stack & Structure

## Stack

| Technologie | Version | Usage |
|-------------|---------|-------|
| Java | 21 | Langage |
| Spring Boot | 4.0.6 | Framework principal |
| Spring Web MVC | - | API REST |
| Spring Data JPA | - | Accès base de données |
| H2 Database | - | BDD en mémoire (développement) |
| SpringDoc OpenAPI | 2.x | Génération Swagger automatique |
| Maven Wrapper | - | Build sans installation globale |

## Structure du code

```
BiblioBack/src/main/java/
├── controller/     # Endpoints REST
├── service/        # Logique métier
├── repository/     # Accès données (JPA)
└──  entity/         # Entités
```

## Configuration clé (`application.properties`)

```properties
springdoc.openapi.info.title=BiblioBack API
springdoc.openapi.info.version=0.0.1
springdoc.api-docs.path=/v3/api-docs
```

## Lancer en local

```bash
cd BiblioBack
chmod +x mvnw                 # macOS / Linux
./mvnw spring-boot:run        # macOS / Linux
.\mvnw.cmd spring-boot:run    # Windows
```

API disponible sur `http://localhost:8080`.
