# Order Service - Microservicio de Pedidos

Microservicio básico para gestión de pedidos que se comunica con ProductService.

## Ejecución Local

```bash
# Compilar
mvn clean package

# Ejecutar (asegúrate de que ProductService esté corriendo en puerto 8080)
java -jar target/order-service-1.0.0.jar

# O con variable de entorno para URL del ProductService
PRODUCT_SERVICE_URL=http://localhost:8080 java -jar target/order-service-1.0.0.jar
```

## Endpoints

- GET `/orders` - Listar todos los pedidos
- GET `/orders/{id}` - Obtener pedido por ID
- POST `/orders` - Crear nuevo pedido

## Ejemplos

### Linux / macOS

```bash
# Listar pedidos
curl http://localhost:8081/orders

# Crear pedido
curl -X POST http://localhost:8081/orders \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "items": [
      {
        "productId": 1,
        "quantity": 2
      }
    ]
  }'

# Obtener pedido por ID
curl http://localhost:8081/orders/1
```

### Windows (cmd.exe)

```cmd
REM Listar pedidos
curl.exe http://localhost:8081/orders

REM Crear pedido
curl.exe -X POST http://localhost:8081/orders -H "Content-Type: application/json" -d "{""userId"":1,""items"":[{""productId"":1,""quantity"":2}]}"

REM Obtener pedido por ID
curl.exe http://localhost:8081/orders/1
```

### Windows (PowerShell)

```powershell
# Listar pedidos
curl.exe http://localhost:8081/orders

# Crear pedido
curl.exe -X POST http://localhost:8081/orders `
  -H "Content-Type: application/json" `
  -d '{\"userId\":1,\"items\":[{\"productId\":1,\"quantity\":2}]}'

# Obtener pedido por ID
curl.exe http://localhost:8081/orders/1
```

## Comunicación con ProductService

El OrderService se comunica con ProductService para:
- Validar que los productos existen
- Obtener información de productos (nombre, precio)
- Calcular el total del pedido

## Docker / Podman

### Docker

```bash
# Construir imagen
docker build -t order-service:1.0 .

# Ejecutar contenedor (requiere que ProductService esté disponible)
docker run -p 8081:8081 \
  -e PRODUCT_SERVICE_URL=http://product-service:8080 \
  order-service:1.0
```

### Podman

```bash
# Construir imagen
podman build -t order-service:1.0 .

# Ejecutar contenedor (requiere que ProductService esté disponible)
podman run -p 8081:8081 \
  -e PRODUCT_SERVICE_URL=http://product-service:8080 \
  order-service:1.0
```

**Nota:** Podman es una alternativa a Docker que no requiere un daemon. Los comandos son compatibles con Docker.

## Notas

- El servicio requiere que ProductService esté ejecutándose
- La URL de ProductService se puede configurar con la variable de entorno `PRODUCT_SERVICE_URL`
- Por defecto usa `http://localhost:8080` si no se especifica
