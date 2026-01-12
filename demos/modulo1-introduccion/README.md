# DEMOS MÓDULO 1: INTRODUCCIÓN A MICROSERVICIOS

## Duración: 4 horas de práctica

---

## DEMO 1: Aplicación Monolítica Simple (1 hora)

### Objetivo
Crear una aplicación Java monolítica básica que gestiona productos.

### Pasos

1. **Crear estructura del proyecto**
```bash
mkdir demo-monolito
cd demo-monolito
```

2. **Crear clase Product**
```java
public class Product {
    private Long id;
    private String name;
    private Double price;
    // getters, setters, constructor
}
```

3. **Crear servicio simple**
```java
public class ProductService {
    private List<Product> products = new ArrayList<>();
    
    public List<Product> getAll() { return products; }
    public Product create(Product product) { /* ... */ }
}
```

4. **Crear aplicación main**
```java
public class MonolithApp {
    public static void main(String[] args) {
        ProductService service = new ProductService();
        // Lógica simple de consola
    }
}
```

### Resultado Esperado
Aplicación Java simple que funciona como un monolito.

---

## DEMO 2: Descomponer en Microservicios (1.5 horas)

### Objetivo
Dividir el monolito en dos microservicios: ProductService y OrderService.

### Pasos

1. **Crear microservicio de Productos**
   - Estructura Maven/Gradle
   - REST API básica
   - Endpoints: GET /products, POST /products

2. **Crear microservicio de Pedidos**
   - Estructura Maven/Gradle
   - REST API básica
   - Endpoints: GET /orders, POST /orders
   - Comunicación con ProductService

3. **Ejecutar ambos servicios**
   - ProductService en puerto 8080
   - OrderService en puerto 8081

### Resultado Esperado
Dos servicios independientes comunicándose vía HTTP.

---

## DEMO 3: Contenedorizar con Docker (1 hora)

### Objetivo
Crear imágenes Docker para cada microservicio.

### Pasos

1. **Crear Dockerfile para ProductService**
```dockerfile
FROM eclipse-temurin:17-jdk-jammy
WORKDIR /app
COPY target/product-service.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

2. **Crear Dockerfile para OrderService**
```dockerfile
FROM eclipse-temurin:17-jdk-jammy
WORKDIR /app
COPY target/order-service.jar app.jar
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "app.jar"]
```

**Nota:** Usamos `eclipse-temurin:17-jdk-jammy` en lugar de `openjdk:17-jdk-slim` porque la imagen oficial de OpenJDK ya no está disponible en Docker Hub. Eclipse Temurin es la distribución oficial recomendada y funciona con Docker y Podman.

3. **Construir imágenes**

**Con Docker:**
```bash
docker build -t product-service:1.0 .
docker build -t order-service:1.0 .
```

**Con Podman:**
```bash
podman build -t product-service:1.0 .
podman build -t order-service:1.0 .
```

4. **Ejecutar contenedores**

**Con Docker:**
```bash
docker run -p 8080:8080 product-service:1.0
docker run -p 8081:8081 order-service:1.0
```

**Con Podman:**
```bash
podman run -p 8080:8080 product-service:1.0
podman run -p 8081:8081 order-service:1.0
```

### Resultado Esperado
Microservicios ejecutándose en contenedores Docker.

---

## DEMO 4: Docker Compose Multi-Servicio (0.5 horas)

### Objetivo
Orquestar múltiples servicios con Docker Compose.

### Pasos

1. **Crear docker-compose.yml**
```yaml
version: '3.8'
services:
  product-service:
    build: ./product-service
    ports:
      - "8080:8080"
    networks:
      - microservices-network
  
  order-service:
    build: ./order-service
    ports:
      - "8081:8081"
    depends_on:
      - product-service
    networks:
      - microservices-network
    environment:
      - PRODUCT_SERVICE_URL=http://product-service:8080

networks:
  microservices-network:
    driver: bridge
```

2. **Ejecutar con Docker Compose / Podman Compose**

**Con Docker Compose:**
```bash
docker-compose up --build
```

**Con Podman Compose:**
```bash
podman-compose up --build
# O con la versión más reciente:
podman compose up --build
```

3. **Verificar servicios**
```bash
curl http://localhost:8080/products
curl http://localhost:8081/orders
```

### Resultado Esperado
Sistema completo ejecutándose con un solo comando.

---

## EJERCICIO PRÁCTICO: Sistema Completo (1 hora)

### Objetivo
Crear un sistema de e-commerce básico con 3 microservicios:
- UserService (usuarios)
- ProductService (productos)
- OrderService (pedidos)

### Requisitos

1. Cada servicio debe tener su propio Dockerfile
2. Usar Docker Compose para orquestar
3. Implementar comunicación entre servicios
4. Documentar con README

### Entregables

- Código fuente de los 3 servicios
- Dockerfiles
- docker-compose.yml
- README con instrucciones

---

## CHECKLIST DE EVALUACIÓN

- [ ] Entiendo qué es un microservicio
- [ ] Puedo crear una aplicación monolítica simple
- [ ] Puedo descomponer un monolito en microservicios
- [ ] Sé crear y ejecutar contenedores Docker
- [ ] Puedo usar Docker Compose para múltiples servicios
- [ ] Comprendo la comunicación entre servicios

---

## PRÓXIMOS PASOS

En el siguiente módulo aprenderemos Spring Framework para crear APIs REST profesionales.
