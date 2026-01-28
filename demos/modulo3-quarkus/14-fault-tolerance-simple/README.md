## Ejemplo simple: tolerancia a fallos

Este ejemplo usa `quarkus-rest` y `quarkus-smallrye-fault-tolerance` para aplicar `@Retry`, `@Timeout` y `@Fallback`.

### Ejecutar

```bash
mvn quarkus:dev
```

### Probar

```bash
curl --max-time 5 http://localhost:8080/monitor/ping
curl --max-time 5 http://localhost:8080/monitor
```

Comportamiento esperado:
- `/monitor/ping` responde rápido con `pong`.
- Primeras llamadas a `/monitor`: `DEGRADED ...` por el fallback.
- Luego: `OK ...` cuando el servicio deja de fallar.
