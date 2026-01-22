# LAB 10: QUARKUS VIRTUAL THREADS ARCHITECTURE

**Autor:** José Díaz  
**Github Repo:** https://github.com/joedayz/soccer-fees-management.git

## Descripción

Este laboratorio demuestra cómo implementar **Virtual Threads** en Quarkus para mejorar el rendimiento de aplicaciones que realizan operaciones de I/O lentas **sin cambiar a un modelo reactivo**. El proyecto consta de dos servicios:

- **products**: Servicio REST que expone una API para consultar productos y su historial de precios (llamadas bloqueantes)
- **prices**: Servicio externo que proporciona datos históricos de precios (simula un proceso costoso que tarda ~2 segundos)

## Problema

El servicio **products** está configurado para usar solo:
- 1 hilo de trabajo (worker thread)

El endpoint `GET /products/{id}/priceHistory` depende del servicio **prices** para obtener datos históricos. Como el servicio **prices** tarda aproximadamente 2 segundos en responder, cada solicitud bloquea el hilo de trabajo durante ese tiempo, causando que las solicitudes se pongan en cola y el rendimiento se degrade significativamente.

La idea es **mantener el modelo bloqueante** (más simple de programar) y usar **Virtual Threads** para escalar sin reescribir a reactive.

## Estructura del Proyecto

```
07-virtualthreads-architecture-solution/
├── products/          # Servicio Quarkus (Java)
│   ├── src/main/java/com/bcp/training/
│   │   ├── ProductsResource.java      # Recurso REST
│   │   ├── PricesService.java         # Cliente REST
│   │   ├── ProductPriceHistory.java   # Modelo de datos
│   │   └── Price.java                 # Modelo de datos
│   ├── benchmark.sh                   # Script de benchmark (Linux/Mac)
│   ├── benchmark.ps1                  # Script de benchmark (Windows)
│   └── pom.xml
└── prices/            # Servicio externo (Python)
    ├── app.py
    └── README.md
```

## Prerequisitos

- Java 21+
- Maven 3.8+
- Docker o Podman
- curl (o PowerShell en Windows)

## Configuración Inicial

### 1. Ejecutar el servicio prices

Ejecuta el servicio **prices** según el container runtime que tengas configurado:

**Podman:**
```bash
podman run -d --name prices -p 5500:5000 --restart=always docker.io/joedayz/do378-reactive-architecture-prices:latest
```

**Docker:**
```bash
docker run -d --name prices -p 5500:5000 --restart=always docker.io/joedayz/do378-reactive-architecture-prices:latest
```

### 2. Configuración del servicio products

El archivo `application.properties` está configurado con:

```properties
quarkus.http.access-log.enabled=true
quarkus.rest-client."com.bcp.training.PricesService".url=http://localhost:5500/
```

**Nota:** En Quarkus 3 no es necesario habilitar Virtual Threads por configuración.

## Ejecución del Laboratorio

### Paso 1: Verificar el problema de bloqueo

#### 1.1. Navegar al directorio del proyecto

```bash
cd products
```

#### 1.2. Iniciar el servicio products en modo desarrollo

```bash
mvn quarkus:dev
```

Deberías ver:
```
INFO [io.quarkus] Listening on: http://localhost:8080
```

#### 1.3. Probar el endpoint (bloqueante)

**Linux/MacOS/Git Bash:**
```bash
time curl http://localhost:8080/products/1/priceHistory
```

**Windows PowerShell:**
```powershell
Measure-Command { curl.exe http://localhost:8080/products/1/priceHistory }
```

Verifica que el request toma alrededor de 2 segundos en finalizar.

#### 1.4. Ejecutar el benchmark

El script `benchmark.sh` envía 10 requests en un segundo, pero toma más de 20 segundos en recibir todas las respuestas.

**Linux/MacOS/Git Bash:**
```bash
time ./benchmark.sh
```

**Windows PowerShell:**
```powershell
./benchmark.ps1
```

**Resultado esperado:** ~20 segundos (2 segundos por request × 10 requests)

#### 1.5. Inspeccionar los logs (antes de Virtual Threads)

En esta primera ejecución (sin Virtual Threads), verifica que el `executor-thread-0` worker thread atendió los requests uno por uno, tomándole dos segundos por cada request:

```
INFO [io.qua.htt.access-log] (executor-thread-0) ... 26/Jan/2023:14:08:28
INFO [io.qua.htt.access-log] (executor-thread-0) ... 26/Jan/2023:14:08:30
INFO [io.qua.htt.access-log] (executor-thread-0) ... 26/Jan/2023:14:08:32
```

#### 1.6. Conclusión del problema

Con una carga concurrente, el servicio procesa las solicitudes en serie porque el hilo de trabajo se bloquea en cada llamada al servicio `prices`.

### Paso 2: Habilitar Virtual Threads con anotaciones

En Quarkus 3, basta con usar la anotación `@RunOnVirtualThread`.

#### 2.1. Ejecutar el endpoint principal en Virtual Threads

Actualiza `ProductsResource.java` para ejecutar en virtual threads usando `@RunOnVirtualThread`:

```java
@GET
@RunOnVirtualThread
@Path("/{productId}/priceHistory")
public ProductPriceHistory getProductPriceHistory(
    @PathParam("productId") final Long productId
) {
    return pricesService.getProductPriceHistory(productId);
}
```

#### 2.2. Proteger un endpoint bloqueante largo (opcional)

Aplica la misma anotación en el endpoint de prueba:

```java
@GET
@RunOnVirtualThread
@Path("/blocking")
public String blocking() {
    try {
        Thread.sleep(30000);
    } catch(InterruptedException e) {
        e.printStackTrace();
    }
    return "I am a blocking operation";
}
```

#### 2.3. Reiniciar la aplicación

Detén la aplicación (presiona `q`) y reinicia:

```bash
mvn quarkus:dev
```

#### 2.4. Probar el endpoint con Virtual Threads

**Linux/MacOS/Git Bash:**
```bash
curl http://localhost:8080/products/1/priceHistory | jq
```

**Windows PowerShell:**
```powershell
Invoke-RestMethod http://localhost:8080/products/1/priceHistory | ConvertTo-Json -Depth 10
```

Deberías recibir una respuesta válida sin errores.

#### 2.5. Inspeccionar los logs

Verifica que el request es atendido por un **virtual thread** (deberías ver un nombre de hilo como `quarkus-virtual-thread-17`):

```
INFO [io.qua.htt.access-log] (quarkus-virtual-thread-17) ...
```

#### 2.6. Ejecutar el benchmark nuevamente

**Linux/MacOS/Git Bash:**
```bash
time ./benchmark.sh
```

**Windows PowerShell:**
```powershell
./benchmark.ps1
```

**Resultado esperado:** ~3 segundos (6 veces más rápido que la versión bloqueante)

El tiempo de respuesta usando Virtual Threads procesa los 10 requests mucho más rápido manteniendo el código bloqueante.

### Paso 3: Operaciones bloqueantes largas con Virtual Threads

#### 3.1. Probar el endpoint bloqueante

El endpoint `/products/blocking` simula una operación que bloquea el hilo por 30 segundos:

**Linux/MacOS/Git Bash:**
```bash
curl http://localhost:8080/products/blocking; echo
```

**Windows PowerShell:**
```powershell
curl http://localhost:8080/products/blocking
```

**Nota:** Ahora no deberías ver un `io.vertx.core.VertxException: Thread blocked` porque el endpoint corre en virtual threads.

#### 3.2. Ejecutar benchmark mientras el endpoint bloqueante está activo

Mientras esperas que el endpoint bloqueante responda, abre una nueva terminal y ejecuta el benchmark:

```bash
time ./benchmark.sh
```

**Resultado esperado:** El benchmark debería completarse en ~3 segundos, demostrando que los hilos de plataforma no quedan bloqueados mientras el endpoint usa virtual threads.

#### 3.3. Inspeccionar los logs

Verifica que los requests a `/products/1/priceHistory` y `/products/blocking` son atendidos por virtual threads:

```
INFO [io.qua.htt.access-log] (quarkus-virtual-thread-17) ... "GET /products/1/priceHistory HTTP/1.1" 200 6741
INFO [io.qua.htt.access-log] (quarkus-virtual-thread-18) ... "GET /products/blocking HTTP/1.1" 200 25
```

## Conceptos Clave

### Operaciones Bloqueantes vs Virtual Threads

- **Bloqueante tradicional:** Una operación que espera por I/O bloquea el hilo y limita concurrencia
- **Virtual Threads:** Permiten bloquear sin consumir un hilo de plataforma por request, aumentando la concurrencia

### Anotaciones

- **`@RunOnVirtualThread`:** Ejecuta el endpoint en un virtual thread (ideal para I/O bloqueante)

### Threads en Quarkus

- **Event Loop Threads:** Manejan operaciones no bloqueantes
- **Worker Threads:** Manejan operaciones bloqueantes tradicionales
- **Virtual Threads:** Manejan operaciones bloqueantes con alta concurrencia

## Resultados Esperados

| Escenario | Tiempo (10 requests) | Thread Utilizado |
|-----------|---------------------|------------------|
| Bloqueante (inicial) | ~20 segundos | executor-thread-0 |
| Bloqueante con Virtual Threads | ~3 segundos | virtual-thread-* |
| Bloqueante largo con Virtual Threads | No bloquea hilos de plataforma | virtual-thread-* |

## Finalización

Para detener la aplicación products, presiona `q` en la terminal donde está ejecutándose.

Para detener el contenedor prices:

**Podman:**
```bash
podman stop prices
podman rm prices
```

**Docker:**
```bash
docker stop prices
docker rm prices
```

## Referencias

- [Quarkus Virtual Threads](https://quarkus.io/guides/virtual-threads)
- [Quarkus REST](https://quarkus.io/guides/rest)
- [MicroProfile REST Client](https://quarkus.io/guides/rest-client)

---

**Felicitaciones. Has terminado el laboratorio.**

José Díaz

