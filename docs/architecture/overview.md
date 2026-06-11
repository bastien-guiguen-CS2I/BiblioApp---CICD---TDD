# Architecture - Vue d'ensemble

```
┌─────────────────┐        ┌─────────────────┐
│  Angular 21     │──HTTP──▶  Spring Boot 3  │
│  :4200          │◀───────│  :8080          │
└─────────────────┘        └────────┬────────┘
                                    │
                            ┌───────▼────────┐
                            │   H2 (dev)     │
                            └────────────────┘

Swagger UI  :8081  →  /v3/api-docs  (back:8080)
Docs MkDocs :8082
```

## Services Docker

| Service | Image GHCR | Port |
|---------|------------|------|
| back | `ghcr.io/bastien-guiguen-cs2i/biblioapp/back:latest` | 8080 |
| front | `ghcr.io/bastien-guiguen-cs2i/biblioapp/front:latest` | 4200 |
| swagger | `ghcr.io/bastien-guiguen-cs2i/biblioapp/swagger:latest` | 8081 |
| docs | `ghcr.io/bastien-guiguen-cs2i/biblioapp/docs:latest` | 8082 |

Tous les services communiquent sur le réseau interne `biblio-net`.

## Proxy dev

En développement, le frontend proxifie `/api/*` vers `localhost:8080` via `proxy.conf.json` - pas de problème CORS.