# Spring Boot Demo - Módulo 2

Proyecto Spring Boot completo con REST API, Swagger, validación y manejo de excepciones.

## Ejecución

```bash
# Ejecutar aplicación
mvn spring-boot:run

# O compilar y ejecutar
mvn clean package
java -jar target/spring-boot-demo-1.0.0.jar
```

## Endpoints

- GET `/api/products` - Listar productos
- GET `/api/products/{id}` - Obtener producto por ID
- POST `/api/products` - Crear producto
- PUT `/api/products/{id}` - Actualizar producto
- DELETE `/api/products/{id}` - Eliminar producto

## Swagger UI

Acceder a: http://localhost:8080/swagger-ui.html

## Ejemplos

### Linux / macOS

```bash
# Crear producto
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Laptop","description":"Gaming laptop","price":1299.99,"stock":10}'

# Listar productos
curl http://localhost:8080/api/products

# Obtener por ID
curl http://localhost:8080/api/products/1
```

### Windows (PowerShell)

```powershell
# Crear producto
curl.exe -X POST http://localhost:8080/api/products `
  -H "Content-Type: application/json" `
  -d "{\"name\":\"Laptop\",\"description\":\"Gaming laptop\",\"price\":1299.99,\"stock\":10}"

# Listar productos
curl.exe http://localhost:8080/api/products

# Obtener por ID
curl.exe http://localhost:8080/api/products/1
```

### Windows (CMD)

```bat
:: Crear producto (una línea)
curl.exe -X POST http://localhost:8080/api/products -H "Content-Type: application/json" -d "{\"name\":\"Laptop\",\"description\":\"Gaming laptop\",\"price\":1299.99,\"stock\":10}"

:: Listar productos
curl.exe http://localhost:8080/api/products

:: Obtener por ID
curl.exe http://localhost:8080/api/products/1
```

**Nota Windows:** Usar comillas dobles y escapar las comillas internas con `\"`. En PowerShell usar `` ` `` para continuar líneas.

## Notas para el Profesor

Este proyecto incluye todas las características del módulo 2:
- REST API completa
- Validación de datos
- Manejo de excepciones
- Swagger/OpenAPI
- Spring DevTools configurado
