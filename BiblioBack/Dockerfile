FROM maven:3.9.11-eclipse-temurin-21 AS build

WORKDIR /workspace

COPY pom.xml .
COPY src ./src

RUN mvn -B -DskipTests package


FROM eclipse-temurin:21-jre-jammy

WORKDIR /app

COPY --from=build /workspace/target/BiblioBack-0.0.1-SNAPSHOT.jar app.jar

RUN useradd -m appuser
RUN chown appuser:appuser app.jar
USER appuser

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]