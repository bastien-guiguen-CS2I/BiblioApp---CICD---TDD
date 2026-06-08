COMPOSE = docker compose

.PHONY: up down build logs prod prod-down prod-logs

# build local
up:
	$(COMPOSE) up --build -d

down:
	$(COMPOSE) down -v

build:
	$(COMPOSE) build

logs:
	$(COMPOSE) logs -f

# images GHCR
prod-up:
	$(COMPOSE) -f docker-compose.prod.yml up -d

prod-down:
	$(COMPOSE) -f docker-compose.prod.yml down -v

prod-logs:
	$(COMPOSE) -f docker-compose.prod.yml logs -f