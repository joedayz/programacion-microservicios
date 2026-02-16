# Demo: Ingresos y Gastos con PrimeNG

Aplicación Angular + PrimeNG para registrar y consultar ingresos y gastos por mes y año.

## Guía paso a paso (para hacer la demo con alumnos)

**LAB-PRIMENG-INGRESOS-GASTOS.md** es una guía desde cero: creación del proyecto Angular, instalación de dependencias (PrimeNG, Chart.js), configuración del tema, y creación de cada página (Inicio, Registrar, Por mes, Por año). El proyecto **ingresos-gastos** de esta carpeta es la **solución** de referencia para comparar o copiar código.

## Contenido

- **ingresos-gastos**: App que permite:
    - **Inicio**: listado de últimos movimientos
    - **Registrar**: alta de ingreso o gasto (descripción, monto, mes, año)
    - **Por mes**: resumen y gráfico de ingresos vs gastos por mes
    - **Por año**: resumen y gráfico de balance por año

La data inicial se carga desde `public/db.json`. Los cambios (altas) se mantienen en memoria; al recargar la página se vuelve a cargar solo lo de `db.json`. Más adelante se puede conectar a un backend Quarkus.

## Cómo ejecutar

```bash
cd ingresos-gastos
npm install
npm start
```

Abrir http://localhost:4200

## Estructura de datos (db.json)

```json
{
  "movimientos": [
    {
      "id": 1,
      "tipo": "ingreso",
      "descripcion": "Salario",
      "monto": 3500,
      "mes": 1,
      "anio": 2025
    }
  ]
}
```

- `tipo`: `"ingreso"` | `"gasto"`
- `mes`: 1-12
- `anio`: número (ej. 2025)

## Próximo paso: backend Quarkus

Cuando quieras pasar a backend:
- Exponer en Quarkus endpoints REST para CRUD de movimientos (y opcionalmente resúmenes).
- En esta app, sustituir en `MovimientosService` la carga desde `/db.json` y el array en memoria por llamadas `HttpClient` a la API de Quarkus.
