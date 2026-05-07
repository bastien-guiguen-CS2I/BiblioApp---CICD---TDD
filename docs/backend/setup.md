# Backend Setup

Ce guide explique comment préparer l'environnement et lancer le backend localement.

**Prérequis**
- **JDK 21** : installez OpenJDK 21 ou une distribution équivalente. Vérifier avec `java -version` (doit afficher `21` ou plus).
- **Maven** : non requis globalement — le projet contient le *Maven Wrapper* (`mvnw` / `mvnw.cmd`).
- **Git** (optionnel) : pour cloner le dépôt.

**1) Cloner et se positionner**

```bash
git clone <url-du-repo>
cd "BiblioApp - CICD - TDD"/BiblioBack
```

Sur Windows utilisez `mvnw.cmd`, sur macOS / Linux utilisez `./mvnw`.

**2) Exécuter les tests**

```bash
# Windows
.\mvnw.cmd test

# macOS / Linux
./mvnw test
```

**3) Lancer l'application en mode développement**

```bash
# Windows
.\mvnw.cmd spring-boot:run

# macOS / Linux
./mvnw spring-boot:run
```

L'application démarre par défaut sur `http://localhost:8080`.

**4) Swagger**
- Swagger UI : `http://localhost:8080/swagger-ui/index.html`
