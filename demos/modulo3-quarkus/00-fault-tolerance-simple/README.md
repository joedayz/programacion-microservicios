## Ejemplo simple: tolerancia a fallos

Este ejemplo usa `quarkus-rest` y `quarkus-smallrye-fault-tolerance` para aplicar `@Retry`, `@Timeout` y `@Fallback`.

### Ejecutar

```bash
mvn quarkus:dev
```

### Probar

```bash
curl http://localhost:8080/monitor
```

Comportamiento esperado:
- Primeras llamadas: `DEGRADED ...` por el fallback.
- Luego: `OK ...` cuando el servicio deja de fallar.
