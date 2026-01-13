# Product Service - Microservicio de Productos

Microservicio básico para gestión de productos.

## Ejecución Local

```bash
# Compilar
mvn clean package

# Ejecutar
java -jar target/product-service-1.0.0.jar
```

## Endpoints

- GET `/products` - Listar todos los productos
- GET `/products/{id}` - Obtener producto por ID
- POST `/products` - Crear nuevo producto

## Ejemplos

### Linux / macOS

```bash
# Listar productos
curl http://localhost:8080/products

# Crear producto
curl -X POST http://localhost:8080/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Laptop","price":1299.99,"stock":10}'

# Obtener producto por ID
curl http://localhost:8080/products/1
```

### Windows (cmd.exe)

```cmd
REM Listar productos
curl.exe http://localhost:8080/products

REM Crear producto
curl.exe -X POST http://localhost:8080/products -H "Content-Type: application/json" -d "{\"name\":\"Laptop\",\"price\":1299.99,\"stock\":10}"

REM Obtener producto por ID
curl.exe http://localhost:8080/products/1
```

### Windows (PowerShell)

```powershell
# Listar productos
curl.exe http://localhost:8080/products

# Crear producto
curl.exe -X POST http://localhost:8080/products `
  -H "Content-Type: application/json" `
  -d '{\"name\":\"Laptop\",\"price\":1299.99,\"stock\":10}'

# Obtener producto por ID
curl.exe http://localhost:8080/products/1
```

## Docker / Podman

### Docker

```bash
# Construir imagen
docker build -t product-service:1.0 .

# Ejecutar contenedor
docker run -p 8080:8080 product-service:1.0
```

### Podman

```bash
# Construir imagen
podman build -t product-service:1.0 .

# Ejecutar contenedor
podman run -p 8080:8080 product-service:1.0
```

**Nota:** Podman es una alternativa a Docker que no requiere un daemon. Los comandos son compatibles con Docker.
