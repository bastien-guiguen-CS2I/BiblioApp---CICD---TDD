# Backend - Stack

| Technologie       | Version | Usage                          |
|-------------------|---------|--------------------------------|
| Java              | 21      | Langage                        |
| Spring Boot       | 3.x     | Framework principal            |
| Spring Web MVC    | -       | API REST                       |
| Spring Data JPA   | -       | Accès base de données          |
| H2 Database       | -       | BDD en mémoire (dev)           |
| SpringDoc OpenAPI | 2.x     | Génération Swagger automatique |
| Maven Wrapper     | -       | Build sans installation globale |

## Configuration clé (`application.properties`)

```properties
springdoc.openapi.info.title=BiblioBack API
springdoc.openapi.info.version=0.0.1
springdoc.api-docs.path=/v3/api-docs
```

## Structure

```
BiblioBack/src/main/java/
├── controller/     # Endpoints REST
├── service/        # Logique métier
├── repository/     # Accès données (JPA)
├── model/          # Entités
└── dto/            # Objets de transfert
```