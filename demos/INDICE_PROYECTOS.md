# ÍNDICE DE PROYECTOS DEMO

Este documento lista todos los proyectos completos disponibles para apoyo al profesor.

## MÓDULO 1: INTRODUCCIÓN A MICROSERVICIOS

### demo-monolito/
Aplicación Java monolítica simple que gestiona productos.
- **Ubicación:** `modulo1-introduccion/demo-monolito/`
- **Tecnología:** Java 17, Maven
- **Ejecución:** `mvn exec:java`

### microservicios/product-service/
Microservicio básico de productos con REST API.
- **Ubicación:** `modulo1-introduccion/microservicios/product-service/`
- **Tecnología:** Java 17, Jersey, Jetty
- **Puerto:** 8080
- **Ejecución:** `mvn clean package && java -jar target/product-service-1.0.0.jar`

### microservicios/order-service/
Microservicio básico de pedidos con REST API que se comunica con ProductService.
- **Ubicación:** `modulo1-introduccion/microservicios/order-service/`
- **Tecnología:** Java 17, Jersey, Jetty
- **Puerto:** 8081
- **Endpoints:** GET /orders, POST /orders
- **Comunicación:** Se comunica con ProductService para validar productos
- **Ejecución:** `mvn clean package && java -jar target/order-service-1.0.0.jar`

### microservicios/docker-compose.yml
Orquestación de microservicios con Docker Compose / Podman Compose.
- **Ubicación:** `modulo1-introduccion/microservicios/`
- **Servicios:** ProductService (8080) y OrderService (8081)
- **Ejecución Docker:** `docker-compose up --build`
- **Ejecución Podman:** `podman-compose up --build` o `podman compose up --build`

---

## MÓDULO 2: SPRING FRAMEWORK

### spring-boot-demo/
Proyecto Spring Boot completo con REST API, Swagger, validación y manejo de excepciones.
- **Ubicación:** `modulo2-spring/spring-boot-demo/`
- **Tecnología:** Spring Boot 3.2, Swagger/OpenAPI
- **Puerto:** 8080
- **Swagger UI:** http://localhost:8080/swagger-ui.html
- **Ejecución:** `mvn spring-boot:run`

**Características incluidas:**
- ✅ REST API completa (CRUD)
- ✅ Validación de datos
- ✅ Manejo de excepciones global
- ✅ Swagger/OpenAPI documentación
- ✅ Spring DevTools configurado

---

## MÓDULO 3: QUARKUS

### quarkus-demo/
Proyecto Quarkus completo con REST API.
- **Ubicación:** `modulo3-quarkus/quarkus-demo/`
- **Tecnología:** Quarkus 3.7.0
- **Puerto:** 8080
- **Dev UI:** http://localhost:8080/q/dev
- **Swagger UI:** http://localhost:8080/q/swagger-ui
- **Ejecución:** `./mvnw quarkus:dev`

**Características incluidas:**
- ✅ REST API con JAX-RS
- ✅ Inyección de dependencias con CDI
- ✅ Hot reload en desarrollo
- ✅ OpenAPI integrado

---

## MÓDULO 4: JPA Y PANACHE

### spring-data-jpa-demo/
Proyecto Spring Boot con Spring Data JPA.
- **Ubicación:** `modulo4-jpa/spring-data-jpa-demo/`
- **Tecnología:** Spring Boot, Spring Data JPA, PostgreSQL
- **Características:** Repositorios, queries personalizadas, relaciones

### quarkus-panache-demo/
Proyecto Quarkus con Panache (Repository y Active Record).
- **Ubicación:** `modulo4-jpa/quarkus-panache-demo/`
- **Tecnología:** Quarkus, Panache, PostgreSQL
- **Características:** Panache Repository y Active Record patterns

---

## MÓDULO 5: APIs REST Y GraphQL

### rest-api-advanced/
API REST avanzada con paginación, filtrado y ordenamiento.
- **Ubicación:** `modulo5-apis/rest-api-advanced/`
- **Tecnología:** Spring Boot
- **Características:** Paginación, filtrado, búsqueda, ordenamiento

### graphql-quarkus/
API GraphQL en Quarkus.
- **Ubicación:** `modulo5-apis/graphql-quarkus/`
- **Tecnología:** Quarkus, SmallRye GraphQL
- **GraphQL UI:** http://localhost:8080/graphql-ui

### graphql-spring/
API GraphQL en Spring Boot.
- **Ubicación:** `modulo5-apis/graphql-spring/`
- **Tecnología:** Spring Boot, GraphQL Java Kickstart

---

## MÓDULO 6: SEGURIDAD CON KEYCLOAK

### quarkus-keycloak-demo/
Proyecto Quarkus protegido con Keycloak.
- **Ubicación:** `modulo6-seguridad/quarkus-keycloak-demo/`
- **Tecnología:** Quarkus, Quarkus-OIDC, Keycloak
- **Características:** Autenticación, autorización, roles

### spring-keycloak-demo/
Proyecto Spring Boot protegido con Keycloak.
- **Ubicación:** `modulo6-seguridad/spring-keycloak-demo/`
- **Tecnología:** Spring Boot, Spring Security, Keycloak
- **Características:** OAuth 2.0, JWT, roles y permisos

---

## MÓDULO 7: ANGULAR 20

### angular-demo/
Aplicación Angular básica con componentes y servicios.
- **Ubicación:** `modulo7-angular/angular-demo/`
- **Tecnología:** Angular 20, TypeScript
- **Ejecución:** `ng serve`
- **Puerto:** 4200

**Características incluidas:**
- ✅ Componentes básicos
- ✅ Servicios HTTP
- ✅ Routing
- ✅ Consumo de API REST

---

## MÓDULO 8: PRIMENG

### angular-primeng-demo/
Aplicación Angular con PrimeNG.
- **Ubicación:** `modulo8-primeng/angular-primeng-demo/`
- **Tecnología:** Angular 20, PrimeNG
- **Ejecución:** `ng serve`

**Características incluidas:**
- ✅ Componentes PrimeNG (DataTable, Forms, Dialogs)
- ✅ Temas personalizados
- ✅ Dashboard completo

---

## NOTAS PARA EL PROFESOR

1. **Uso en Clase:** Estos proyectos son de referencia. En clase, los estudiantes crearán los proyectos desde cero siguiendo los pasos del README.md de cada módulo.

2. **Estructura:** Cada proyecto incluye:
   - Código fuente completo
   - Archivos de configuración
   - README con instrucciones
   - Ejemplos de uso

3. **Pruebas:** Todos los proyectos están listos para ejecutarse. Verificar requisitos previos (Java, Maven, Docker/Podman, Node.js según el módulo).

4. **Docker vs Podman:** Todos los proyectos que usan contenedores soportan tanto Docker como Podman. Los comandos son compatibles (solo cambiar `docker` por `podman`). Podman es una alternativa rootless que no requiere daemon.

5. **Personalización:** Los proyectos pueden modificarse según necesidades específicas del curso.

---

## REQUISITOS GENERALES

- Java 17+
- Maven 3.8+
- Docker y Docker Compose **o** Podman y Podman Compose (módulos 1, 6)
- Node.js 18+ y npm (módulos 7, 8)
- PostgreSQL (módulo 4)
- Keycloak (módulo 6)

**Nota:** Docker y Podman son intercambiables. Podman es una alternativa rootless que no requiere daemon.

---

## ORDEN DE USO RECOMENDADO

1. Revisar el proyecto antes de la clase
2. Ejecutar el proyecto para verificar que funciona
3. Usar como referencia durante las demos
4. Los estudiantes crearán sus propios proyectos siguiendo los README.md
