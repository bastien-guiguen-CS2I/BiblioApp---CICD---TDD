COMPOSE = docker compose

.PHONY: up down build logs

up:
	$(COMPOSE) up --build -d

down:
	$(COMPOSE) down -v

build:
	$(COMPOSE) build

logs:
	$(COMPOSE) logs -f