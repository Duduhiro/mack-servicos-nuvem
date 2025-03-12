FROM openjdk:17-jdk-slim

WORKDIR /app
COPY target/backend.jar backend.jar
EXPOSE 25000

CMD ["java", "-jar", "backend.jar"]