# Microservicios - Módulo 1

Este directorio contiene los microservicios ProductService y OrderService.

## Estructura

- `product-service/` - Microservicio de productos
- `order-service/` - Microservicio de pedidos
- `docker-compose.yml` - Orquestación de servicios

## Ejecución con Docker Compose

### Docker Compose

```bash
# Levantar todos los servicios
docker-compose up --build

# Levantar en segundo plano
docker-compose up -d --build

# Ver logs
docker-compose logs -f

# Detener servicios
docker-compose down
```

### Podman Compose

```bash
# Levantar todos los servicios
podman-compose up --build
# O con la versión más reciente:
podman compose up --build

# Levantar en segundo plano
podman-compose up -d --build
# O:
podman compose up -d --build

# Ver logs
podman-compose logs -f
# O:
podman compose logs -f

# Detener servicios
podman-compose down
# O:
podman compose down
```

## Ejecución Individual

Ver los README de cada servicio:
- [ProductService README](./product-service/README.md)
- [OrderService README](./order-service/README.md)

## Verificar Servicios

```bash
# ProductService
curl http://localhost:8080/products

# OrderService
curl http://localhost:8081/orders
```

## Notas

- **Docker:** Requiere Docker daemon ejecutándose
- **Podman:** No requiere daemon, funciona rootless por defecto
- Ambos son compatibles con los mismos comandos y archivos de configuración
