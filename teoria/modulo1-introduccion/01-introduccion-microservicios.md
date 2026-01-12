# MÓDULO 1: INTRODUCCIÓN A MICROSERVICIOS

## Duración: 6 horas (2h teoría + 4h práctica)

---

## 1.1 ¿QUÉ SON LOS MICROSERVICIOS?

### Definición
Los microservicios son un estilo arquitectónico que estructura una aplicación como una colección de servicios débilmente acoplados, que:
- Son independientes y desplegables
- Se comunican mediante APIs bien definidas
- Están organizados alrededor de capacidades de negocio
- Pueden ser desarrollados, desplegados y escalados independientemente

### Características Principales

1. **Descomposición por Dominio**
   - Cada servicio representa una capacidad de negocio específica
   - Ejemplo: servicio de usuarios, servicio de productos, servicio de pagos

2. **Independencia Tecnológica**
   - Cada microservicio puede usar diferentes tecnologías
   - Permite elegir la mejor herramienta para cada problema

3. **Despliegue Independiente**
   - Cambios en un servicio no afectan a otros
   - Permite releases frecuentes

4. **Comunicación Descentralizada**
   - Comunicación mediante APIs REST, gRPC, mensajería
   - Sin base de datos compartida

---

## 1.2 ARQUITECTURA MONOLÍTICA VS MICROSERVICIOS

### Arquitectura Monolítica

**Ventajas:**
- Desarrollo inicial más simple
- Testing más fácil (todo en un solo lugar)
- Despliegue sencillo (un solo artefacto)
- Transacciones ACID más fáciles de manejar

**Desventajas:**
- Dificulta el escalado independiente
- Cambios pequeños requieren redeploy de todo
- Tecnología única para toda la aplicación
- Un bug puede afectar toda la aplicación
- Tiempos de arranque lentos

### Arquitectura de Microservicios

**Ventajas:**
- Escalado independiente por servicio
- Despliegue independiente
- Tecnología heterogénea
- Aislamiento de fallos
- Desarrollo paralelo por equipos

**Desventajas:**
- Mayor complejidad operacional
- Necesidad de gestión de servicios distribuidos
- Testing más complejo
- Transacciones distribuidas complejas
- Overhead de red

### ¿Cuándo usar cada uno?

**Usar Monolito cuando:**
- Equipo pequeño (< 10 personas)
- Aplicación pequeña o mediana
- Requisitos simples
- Necesitas desarrollo rápido inicial

**Usar Microservicios cuando:**
- Equipo grande y múltiples equipos
- Aplicación grande y compleja
- Necesitas escalar componentes específicos
- Diferentes requisitos de rendimiento por componente

---

## 1.3 CONTENEDORES Y DOCKER

### ¿Qué es Docker?

Docker es una plataforma de contenedorización que permite empaquetar aplicaciones y sus dependencias en contenedores ligeros y portables.

### Conceptos Clave

**Imagen:**
- Plantilla de solo lectura para crear contenedores
- Define el sistema de archivos y configuración
- Ejemplo: `openjdk:17-jdk-slim`

**Contenedor:**
- Instancia ejecutable de una imagen
- Aislado del sistema host
- Ejemplo: aplicación Java corriendo en contenedor

**Dockerfile:**
- Archivo de texto con instrucciones para construir una imagen
- Define el entorno de ejecución

### Ventajas de los Contenedores

1. **Consistencia**
   - Mismo entorno en desarrollo, testing y producción
   - "Funciona en mi máquina" ya no es problema

2. **Aislamiento**
   - Cada contenedor tiene su propio sistema de archivos
   - No interfiere con otros contenedores

3. **Portabilidad**
   - Corre en cualquier máquina con Docker
   - Independiente del sistema operativo host

4. **Escalabilidad**
   - Fácil crear múltiples instancias
   - Orquestación con Kubernetes, Docker Swarm

### Dockerfile Básico para Java

```dockerfile
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY target/mi-app.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

---

## 1.4 DOCKER COMPOSE

### ¿Qué es Docker Compose?

Herramienta para definir y ejecutar aplicaciones Docker multi-contenedor usando un archivo YAML.

### Ventajas

- Define múltiples servicios en un solo archivo
- Facilita la gestión de redes y volúmenes
- Comandos simples para levantar/bajar servicios
- Ideal para desarrollo local

### Estructura Básica

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "8080:8080"
    environment:
      - DB_HOST=db
    depends_on:
      - db
  
  db:
    image: postgres:15
    environment:
      POSTGRES_DB: mi_db
      POSTGRES_USER: usuario
      POSTGRES_PASSWORD: password
    volumes:
      - db_data:/var/lib/postgresql/data

volumes:
  db_data:
```

### Comandos Principales

```bash
# Levantar servicios
docker-compose up

# Levantar en segundo plano
docker-compose up -d

# Detener servicios
docker-compose down

# Ver logs
docker-compose logs -f

# Reconstruir imágenes
docker-compose build
```

---

## 1.5 ECOSISTEMA DE MICROSERVICIOS

### Componentes Necesarios

1. **Service Discovery**
   - Eureka, Consul, Kubernetes Service Discovery
   - Permite que servicios se encuentren dinámicamente

2. **API Gateway**
   - Spring Cloud Gateway, Kong, Zuul
   - Punto de entrada único para clientes
   - Routing, autenticación, rate limiting

3. **Configuración Centralizada**
   - Spring Cloud Config, Consul KV
   - Gestión de configuración externa

4. **Circuit Breaker**
   - Resilience4j, Hystrix
   - Manejo de fallos y resiliencia

5. **Distributed Tracing**
   - Zipkin, Jaeger
   - Seguimiento de requests entre servicios

6. **Message Broker**
   - RabbitMQ, Kafka, ActiveMQ
   - Comunicación asíncrona

7. **Container Orchestration**
   - Kubernetes, Docker Swarm
   - Gestión de contenedores a escala

---

## 1.6 PATRONES COMUNES

### API Gateway Pattern
- Punto de entrada único
- Enrutamiento a servicios internos
- Autenticación centralizada

### Service Discovery Pattern
- Servicios se registran automáticamente
- Clientes encuentran servicios dinámicamente
- Elimina configuración estática

### Circuit Breaker Pattern
- Previene cascadas de fallos
- Abre el circuito cuando hay muchos errores
- Permite recuperación automática

### Database per Service
- Cada servicio tiene su propia base de datos
- Evita acoplamiento de datos
- Permite diferentes tipos de BD por servicio

### Saga Pattern
- Maneja transacciones distribuidas
- Secuencia de transacciones locales
- Compensación en caso de fallo

---

## RESUMEN DEL MÓDULO

### Conceptos Clave Aprendidos:
1. ✅ Microservicios: servicios independientes y desplegables
2. ✅ Ventajas y desventajas vs arquitectura monolítica
3. ✅ Docker: contenedorización de aplicaciones
4. ✅ Docker Compose: orquestación local multi-contenedor
5. ✅ Ecosistema: componentes necesarios para microservicios

### Próximo Módulo:
En el siguiente módulo aprenderemos Spring Framework y cómo crear APIs REST usando programación anotada.

---

## RECURSOS ADICIONALES

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Microservices Patterns](https://microservices.io/patterns/)
- [Martin Fowler - Microservices](https://martinfowler.com/articles/microservices.html)
