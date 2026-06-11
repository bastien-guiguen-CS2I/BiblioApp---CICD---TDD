# Backend - Swagger / OpenAPI

## Endpoints

| URL | Description |
|-----|-------------|
| `http://localhost:8080/swagger-ui/index.html` | Interface graphique (Try it out) |
| `http://localhost:8080/v3/api-docs` | Schéma OpenAPI JSON |

Via Docker, Swagger UI est aussi disponible sur `http://localhost:8081`.

## Configuration (`application.properties`)

```properties
springdoc.openapi.info.title=BiblioBack API
springdoc.openapi.info.version=0.0.1
springdoc.api-docs.path=/v3/api-docs
```