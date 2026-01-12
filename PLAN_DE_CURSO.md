# PLAN DE CURSO: PROGRAMACIÓN DE MICROSERVICIOS
## Duración Total: 57 horas

---

## DISTRIBUCIÓN DE HORAS POR MÓDULO

### MÓDULO 1: INTRODUCCIÓN Y FUNDAMENTOS (6 horas)
**Objetivo:** Introducción a microservicios, contenedores y ecosistema moderno

- **Teoría (2 horas):**
  - Arquitectura de microservicios vs monolitos
  - Ventajas y desventajas
  - Contenedores y Docker
  - Orquestación básica (Docker Compose)
  
- **Práctica (4 horas):**
  - Demo: Crear aplicación monolítica simple
  - Demo: Descomponer en microservicios básicos
  - Demo: Contenedorizar con Docker
  - Ejercicio práctico: Docker Compose con múltiples servicios

---

### MÓDULO 2: SPRING FRAMEWORK Y PROGRAMACIÓN ANOTADA (8 horas)
**Objetivo:** Dominar Spring Framework para desarrollo de APIs REST

- **Teoría (3 horas):**
  - Spring Boot: fundamentos y arquitectura
  - Inyección de dependencias
  - Programación anotada (@RestController, @Service, @Repository)
  - Configuración con application.properties/yml
  
- **Práctica (5 horas):**
  - Demo: Crear proyecto Spring Boot desde cero
  - Demo: Implementar REST API completa (CRUD)
  - Demo: Integración con Swagger/OpenAPI
  - Demo: Spring DevTools y hot reload
  - Ejercicio práctico: API de gestión de productos

---

### MÓDULO 3: QUARKUS - BACKEND MODERNO (10 horas)
**Objetivo:** Aprender Quarkus 3.27 LTS y compararlo con Spring Boot

- **Teoría (3 horas):**
  - Quarkus: filosofía y ventajas
  - Comparación Quarkus vs Spring Boot
  - Compilación nativa y tiempos de arranque
  - Extensiones y ecosistema
  
- **Práctica (7 horas):**
  - Demo: Crear proyecto Quarkus
  - Demo: REST API en Quarkus
  - Demo: Comparación de rendimiento (Spring vs Quarkus)
  - Demo: Compilación nativa con GraalVM
  - Ejercicio práctico: Migrar API Spring a Quarkus
  - Proyecto: Microservicio completo en Quarkus

---

### MÓDULO 4: GESTIÓN DE BBDD CON JPA Y PANACHE (8 horas)
**Objetivo:** Dominar acceso a datos con JPA y Panache

- **Teoría (2 horas):**
  - JPA: conceptos fundamentales
  - Panache: simplificación de acceso a datos
  - Entidades y relaciones
  - Transacciones y queries
  
- **Práctica (6 horas):**
  - Demo: Configurar JPA en Spring Boot
  - Demo: Entidades y repositorios
  - Demo: Panache en Quarkus (Active Record pattern)
  - Demo: Queries personalizadas
  - Ejercicio práctico: CRUD completo con base de datos
  - Proyecto: Sistema de gestión con persistencia

---

### MÓDULO 5: APIs REST Y GraphQL (8 horas)
**Objetivo:** Implementar APIs REST y GraphQL, entender diferencias

- **Teoría (2 horas):**
  - REST: principios y mejores prácticas
  - GraphQL: conceptos y ventajas
  - Comparación REST vs GraphQL
  - Apollo Client/Server
  
- **Práctica (6 horas):**
  - Demo: API REST completa con validaciones
  - Demo: Implementar GraphQL en Quarkus/Spring
  - Demo: Apollo Client en backend
  - Demo: Integración Jackson y modelos de datos
  - Ejercicio práctico: API híbrida (REST + GraphQL)
  - Proyecto: Sistema con ambas arquitecturas

---

### MÓDULO 6: SEGURIDAD EN APIs (7 horas)
**Objetivo:** Implementar autenticación y autorización con Keycloak

- **Teoría (2 horas):**
  - OAuth 2.0 y OpenID Connect
  - Keycloak: servidor de identidad
  - Roles y permisos
  - Tokens JWT
  
- **Práctica (5 horas):**
  - Demo: Configurar Keycloak
  - Demo: Integración Quarkus-OIDC
  - Demo: Proteger endpoints con roles
  - Demo: Validación de tokens
  - Ejercicio práctico: API segura con autenticación
  - Proyecto: Sistema con seguridad completa

---

### MÓDULO 7: FRONTEND CON ANGULAR 20 (6 horas)
**Objetivo:** Introducción a Angular y TypeScript

- **Teoría (2 horas):**
  - Angular: arquitectura y conceptos
  - TypeScript: fundamentos
  - Componentes, servicios y módulos
  - Routing y navegación
  
- **Práctica (4 horas):**
  - Demo: Crear proyecto Angular
  - Demo: Componentes y servicios
  - Demo: Consumir API REST desde Angular
  - Demo: Routing básico
  - Ejercicio práctico: Aplicación frontend conectada al backend

---

### MÓDULO 8: DISEÑO UI CON PRIMENG (4 horas)
**Objetivo:** Crear interfaces modernas con PrimeNG

- **Teoría (1 hora):**
  - PrimeNG: biblioteca de componentes
  - Temas y personalización
  - Componentes más utilizados
  
- **Práctica (3 horas):**
  - Demo: Instalar y configurar PrimeNG
  - Demo: Componentes principales (tablas, formularios, diálogos)
  - Demo: Temas y estilos
  - Ejercicio práctico: Dashboard completo con PrimeNG

---

### MÓDULO 9: INTEGRACIÓN Y CI/CD (0 horas - integrado en proyectos)
**Objetivo:** Entender ecosistema de servicios y CI/CD

- **Contenido integrado en proyectos anteriores:**
  - Docker Compose para desarrollo local
  - GitHub Actions / GitLab CI
  - Despliegue en contenedores
  - Buenas prácticas de desarrollo

---

## ESTRUCTURA DE CLASES SUGERIDA

### Día 1-2 (12 horas): Fundamentos
- Módulo 1: Introducción (6h)
- Módulo 2: Spring Framework (6h)

### Día 3-4 (18 horas): Backend Moderno
- Módulo 2: Spring Framework (2h restantes)
- Módulo 3: Quarkus (10h)
- Módulo 4: JPA/Panache (6h)

### Día 5 (8 horas): APIs y Datos
- Módulo 4: JPA/Panache (2h restantes)
- Módulo 5: REST y GraphQL (6h)

### Día 6 (7 horas): Seguridad
- Módulo 6: Seguridad con Keycloak (7h)

### Día 7 (10 horas): Frontend
- Módulo 7: Angular 20 (6h)
- Módulo 8: PrimeNG (4h)

---

## METODOLOGÍA

- **Teoría:** Presentaciones interactivas con ejemplos
- **Demos:** Código en vivo paso a paso
- **Ejercicios:** Prácticas guiadas
- **Proyectos:** Aplicaciones completas integrando conceptos
- **Evaluación:** Proyecto final integrador

---

## RECURSOS NECESARIOS

- Java 17+
- Maven/Gradle
- Docker y Docker Compose
- IDE (IntelliJ IDEA / VS Code)
- Node.js y npm
- Keycloak (contenedorizado)
- PostgreSQL/MySQL
