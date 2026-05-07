# Swagger / OpenAPI

Cette page décrit comment accéder et configurer la documentation OpenAPI (Swagger) pour l'API.

Endpoints principaux
- OpenAPI JSON : `/v3/api-docs`
- Swagger UI : `/swagger-ui/index.html`

Notes pratiques
- Swagger UI permet de tester les endpoints depuis le navigateur (Try it out).

Exemple local
1. Lancer l'application Spring Boot (port par défaut 8080) :

```bash
.\mvnw.cmd spring-boot:run
```

2. Ouvrir dans le navigateur :

- OpenAPI JSON : http://localhost:8080/v3/api-docs
- Swagger UI : http://localhost:8080/swagger-ui/index.html

Configuration recommandée
- Propriétés utiles dans `application.properties` :

```properties
# titre et version visibles dans l'UI
springdoc.openapi.info.title=BiblioBack API
springdoc.openapi.info.version=0.0.1
springdoc.api-docs.path=/v3/api-docs
```

Voir aussi
- [API principale](api.md)
