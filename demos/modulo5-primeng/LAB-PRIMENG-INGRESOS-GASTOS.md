# LAB: Ingresos y Gastos con Angular y PrimeNG

**Objetivo:** Construir una aplicación para registrar ingresos y gastos por mes y año, con vistas por mes y por año, usando Angular y PrimeNG.

**Solución de referencia:** La carpeta `ingresos-gastos` de este mismo directorio contiene el proyecto completo. Úsala para comparar si algo no compila o para ver el código final.

---

## Requisitos previos

- Node.js 18+ y npm
- Angular CLI: `npm install -g @angular/cli`
- Editor de código (VS Code, etc.)

---

## Parte 1: Crear el proyecto e instalar dependencias

### Paso 1.1 – Crear el proyecto Angular

En la carpeta `demos/modulo-primeng`, ejecuta:

```bash
ng new ingresos-gastos-app --routing --style=css --ssr=false
```

- Cuando pregunte por Angular strict mode, puedes elegir **Yes**.
- Entra al proyecto: `cd ingresos-gastos-app`

### Paso 1.2 – Instalar PrimeNG, tema e iconos

```bash
npm install primeng @primeng/themes primeicons
```

### Paso 1.3 – Instalar Chart.js (para los gráficos)

```bash
npm install chart.js
```

### Paso 1.4 – Configurar el tema PrimeNG 19

En PrimeNG 21 el tema se configura por código, no por CSS en `angular.json`.

1. Abre **`src/app/app.config.ts`**.
2. Añade los imports necesarios y el proveedor del tema:

```typescript
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    providePrimeNG({ theme: { preset: Aura } })
  ]
};
```

### Paso 1.5 – Estilos globales

1. En **`angular.json`**, dentro de `projects` → `ingresos-gastos-app` → `architect` → `build` → `options`, en **`styles`** deja solo (o añade si falta):

    - `"node_modules/primeicons/primeicons.css"`
    - `"src/styles.css"`

   No uses rutas antiguas de PrimeNG (`primeng/resources/...`); en v19 no existen.

2. En **`src/styles.css`** añade al menos:

```css
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: var(--font-family);
  background: var(--surface-ground);
  color: var(--text-color);
}

.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.tipo-ingreso { color: var(--green-600); }
.tipo-gasto { color: var(--red-600); }

.summary-positive { color: var(--green-600); font-weight: 600; }
.summary-negative { color: var(--red-600); font-weight: 600; }
```

### Paso 1.6 – Carpeta `public` y archivo de datos

1. Crea la carpeta **`public`** en la raíz del proyecto (al mismo nivel que `src`).
2. En **`angular.json`**, en `options` → `assets`, asegúrate de tener algo como:

```json
"assets": [
  { "glob": "**/*", "input": "public" }
]
```

Así todo lo que pongas en `public` se servirá en la raíz (por ejemplo `/db.json`).

3. Crea **`public/db.json`** con datos iniciales:

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
    },
    {
      "id": 2,
      "tipo": "gasto",
      "descripcion": "Alquiler",
      "monto": 900,
      "mes": 1,
      "anio": 2025
    },
    {
      "id": 3,
      "tipo": "gasto",
      "descripcion": "Supermercado",
      "monto": 320,
      "mes": 1,
      "anio": 2025
    }
  ]
}
```

### Paso 1.7 – Registrar Chart.js en `main.ts`

En **`src/main.ts`**, antes de `bootstrapApplication`, registra Chart.js:

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { Chart, registerables } from 'chart.js';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

Chart.register(...registerables);
bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
```

---

## Parte 2: Modelos y servicio

### Paso 2.1 – Modelo de datos

1. Crea la carpeta **`src/app/models`**.
2. Crea **`src/app/models/movimiento.model.ts`**:

```typescript
export type TipoMovimiento = 'ingreso' | 'gasto';

export interface Movimiento {
  id: number;
  tipo: TipoMovimiento;
  descripcion: string;
  monto: number;
  mes: number;
  anio: number;
}

export interface ResumenMes {
  mes: number;
  anio: number;
  ingresos: number;
  gastos: number;
  balance: number;
}

export interface ResumenAnio {
  anio: number;
  ingresos: number;
  gastos: number;
  balance: number;
}

export const MESES_NOMBRE: Record<number, string> = {
  1: 'Enero', 2: 'Febrero', 3: 'Marzo', 4: 'Abril', 5: 'Mayo', 6: 'Junio',
  7: 'Julio', 8: 'Agosto', 9: 'Septiembre', 10: 'Octubre', 11: 'Noviembre', 12: 'Diciembre'
};
```

### Paso 2.2 – Servicio de movimientos

1. Crea la carpeta **`src/app/services`**.
2. Crea **`src/app/services/movimientos.service.ts`**:

- Importa `Injectable`, `HttpClient`, `BehaviorSubject`, `map`, `tap` y los tipos del modelo.
- Define una interfaz local para el JSON: `interface DbJson { movimientos: Movimiento[]; }`.
- Marca la clase con `@Injectable({ providedIn: 'root' })`.
- Propiedades: `private movimientos: Movimiento[] = []` y `private readonly data$ = new BehaviorSubject<Movimiento[]>([])`.
- En el constructor, llama a un método `loadFromDb()` que haga `this.http.get<DbJson>('/db.json')`, use `map(db => db.movimientos ?? [])` y en un `tap` asigne a `this.movimientos` y haga `this.data$.next([...this.movimientos])`.
- Métodos públicos:
    - `getMovimientos$()`: retornar `this.data$.asObservable()`.
    - `add(m: Omit<Movimiento, 'id'>)`: calcular `id`, crear el movimiento, añadirlo al array, hacer `data$.next` y retornar el creado.
    - `getResumenPorMes()`: recorrer `movimientos`, agrupar por `anio-mes`, sumar ingresos y gastos, devolver array de `ResumenMes` (con `balance = ingresos - gastos`).
    - `getResumenPorAnio()`: igual pero agrupando solo por `anio`.

Puedes copiar el código completo del servicio desde el proyecto **`ingresos-gastos`** (solución) en `src/app/services/movimientos.service.ts`.

---

## Parte 3: Páginas (componentes)

Todos los componentes son **standalone**. Crea la carpeta **`src/app/pages`** y dentro una carpeta por página.

### Paso 3.1 – Página Inicio

1. Crea **`src/app/pages/inicio/inicio.component.ts`**.

- Imports: `Component`, `CommonModule`, `MovimientosService`, `CardModule`, `TableModule`, `TagModule`, y del modelo `Movimiento`.
- Template: un `p-card` con header "Últimos movimientos". Dentro, un `p-table` con `[value]="movimientos"`, `[rows]="10"`, `[paginator]="true"`, `styleClass="p-datatable-sm"`.
- Columnas: Fecha (mes/anio), Descripción, Tipo (usar `p-tag` con `value` "Ingreso"/"Gasto" y `severity` "success"/"danger"), Monto (con signo + o - y formato número).
- `emptymessage`: mensaje tipo "Sin movimientos. Ve a Registrar para agregar."
- En la clase: propiedad `movimientos: Movimiento[] = []`. En el constructor, inyectar `MovimientosService` y suscribirse a `getMovimientos$()`; en el callback, asignar la lista ordenada por año y mes (más recientes primero) a `this.movimientos`.

Puedes copiar el archivo completo desde **`ingresos-gastos/src/app/pages/inicio/inicio.component.ts`**.

### Paso 3.2 – Página Registrar

1. Crea **`src/app/pages/registrar/registrar.component.ts`**.

- Imports: `Component`, `FormsModule`, `MovimientosService`, `CardModule`, `ButtonModule`, `InputTextModule`, `InputNumberModule`, `DropdownModule`, `MessageService` de `primeng/api`, `ToastModule` de `primeng/toast`, y del modelo `TipoMovimiento`, `MESES_NOMBRE`.
- Template:
    - `<p-toast />` al inicio.
    - `p-card` con header "Registrar ingreso o gasto".
    - Formulario con:
        - **Tipo:** `p-dropdown` con opciones `[{ label: 'Ingreso', value: 'ingreso' }, { label: 'Gasto', value: 'gasto' }]`, `[(ngModel)]="tipo"`, `optionLabel="label"`, `optionValue="value"`.
        - **Descripción:** `<input type="text" pInputText [(ngModel)]="descripcion" placeholder="Ej: Salario, Alquiler" class="w-full" />` (en PrimeNG 19 se usa la directiva `pInputText` en un `input`, no el componente `p-inputText`).
        - **Monto:** `p-inputNumber` con `[(ngModel)]="monto"`, `mode="currency"`, `currency="PEN"`, `locale="es-PE"`.
        - **Mes:** `p-dropdown` con opciones generadas desde `MESES_NOMBRE` (array de `{ value: número, label: nombre }`), `[(ngModel)]="mes"`.
        - **Año:** `p-inputNumber` con `[(ngModel)]="anio"`, `[min]="2020"`, `[max]="2030"`.
    - Botón: `p-button` label "Guardar", icon "pi pi-check", `(onClick)="guardar()"`.
- Clase: propiedades `tipo`, `descripcion`, `monto`, `mes`, `anio`; arrays `tipos` y `mesesOpt` (meses desde `MESES_NOMBRE`). En `guardar()` validar que todos los campos estén completos; si no, mostrar toast de advertencia con `messageService.add`. Si todo está bien, llamar a `this.svc.add(...)`, mostrar toast de éxito y limpiar descripción y monto.
- En el decorator: `providers: [MessageService]`.

Puedes copiar el archivo completo desde **`ingresos-gastos/src/app/pages/registrar/registrar.component.ts`**.

### Paso 3.3 – Página Por mes

1. Crea **`src/app/pages/por-mes/por-mes.component.ts`**.

- Imports: `Component`, `CommonModule`, `MovimientosService`, `CardModule`, `TableModule`, `TagModule`, `ChartModule`, y del modelo `ResumenMes`, `MESES_NOMBRE`.
- Template:
    - Primer `p-card`: header "Resumen por mes". Dentro, `p-table` con `[value]="resumenes"`. Columnas: Mes/Año (usar `MESES_NOMBRE[r.mes]` y `r.anio`), Ingresos, Gastos, Balance (con clases para positivo/negativo).
    - Segundo bloque: un `<div style="margin-top: 1rem;">` con otro `p-card` header "Ingresos vs Gastos por mes" y dentro `<p-chart type="bar" [data]="chartData" [options]="chartOptions" />`.
- Clase: `resumenes: ResumenMes[] = []`, `chartData`, `chartOptions`. En el constructor, suscribirse a `getMovimientos$()` y en el callback llamar a un método `actualizar()` que: asigne `this.resumenes = this.svc.getResumenPorMes()`, y arme `chartData` con `labels` (mes y año) y dos datasets (Ingresos y Gastos) con colores verde y rojo. `chartOptions` con `responsive: true` y `scales.y.beginAtZero: true`.

Puedes copiar el archivo completo desde **`ingresos-gastos/src/app/pages/por-mes/por-mes.component.ts`**.

### Paso 3.4 – Página Por año

1. Crea **`src/app/pages/por-anio/por-anio.component.ts`**.

- Imports: `Component`, `CommonModule`, `MovimientosService`, `CardModule`, `TableModule`, `ChartModule`, y `ResumenAnio`.
- Template:
    - Primer `p-card`: "Resumen por año", tabla con columnas Año, Ingresos, Gastos, Balance.
    - Segundo bloque: `<div style="margin-top: 1rem;">` con `p-card` "Balance por año" y `<p-chart type="bar" [data]="chartData" [options]="chartOptions" />`.
- Clase: `resumenes: ResumenAnio[] = []`, `chartData`, `chartOptions`. Al actualizar, `this.resumenes = this.svc.getResumenPorAnio()` y el gráfico con un solo dataset "Balance" (colores según signo).

Puedes copiar el archivo completo desde **`ingresos-gastos/src/app/pages/por-anio/por-anio.component.ts`**.

---

## Parte 4: Rutas y aplicación principal

### Paso 4.1 – Rutas

En **`src/app/app.routes.ts`** define:

```typescript
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', loadComponent: () => import('./pages/inicio/inicio.component').then(m => m.InicioComponent) },
  { path: 'registrar', loadComponent: () => import('./pages/registrar/registrar.component').then(m => m.RegistrarComponent) },
  { path: 'por-mes', loadComponent: () => import('./pages/por-mes/por-mes.component').then(m => m.PorMesComponent) },
  { path: 'por-anio', loadComponent: () => import('./pages/por-anio/por-anio.component').then(m => m.PorAnioComponent) }
];
```

### Paso 4.2 – Componente raíz (menú y salida de rutas)

En **`src/app/app.component.ts`**:

- Imports: `Component`, `RouterOutlet`, `MenuItem` de `primeng/api`, `TabMenuModule` de `primeng/tabmenu`.
- Template:
    - Un div con clase `app-container`.
    - `<p-tabMenu [model]="items" [activeItem]="items[0]"></p-tabMenu>`.
    - `<main style="margin-top: 1rem;"><router-outlet /></main>`.
- Clase: `items: MenuItem[]` con cuatro elementos: Inicio (`routerLink: '/inicio'`, icon `pi pi-home`), Registrar (`/registrar`, `pi pi-plus`), Por mes (`/por-mes`, `pi pi-calendar`), Por año (`/por-anio`, `pi pi-chart-bar`).

No importes `RouterLink` ni `RouterLinkActive` si no los usas en el template; el menú usa solo el modelo de TabMenu.

Puedes copiar el archivo completo desde **`ingresos-gastos/src/app/app.component.ts`**.

---

## Parte 5: Probar la aplicación

1. Ejecuta:

```bash
npm start
```

2. Abre **http://localhost:4200**. Deberías ver el menú y la página Inicio con los movimientos de `db.json`.
3. Prueba:
    - **Registrar:** agregar un ingreso o gasto y comprobar que aparece en Inicio.
    - **Por mes:** tabla y gráfico de ingresos vs gastos por mes.
    - **Por año:** tabla y gráfico de balance por año.

---

## Resumen de estructura esperada

```
ingresos-gastos-app/
├── public/
│   └── db.json
├── src/
│   ├── app/
│   │   ├── models/
│   │   │   └── movimiento.model.ts
│   │   ├── services/
│   │   │   └── movimientos.service.ts
│   │   ├── pages/
│   │   │   ├── inicio/
│   │   │   │   └── inicio.component.ts
│   │   │   ├── registrar/
│   │   │   │   └── registrar.component.ts
│   │   │   ├── por-mes/
│   │   │   │   └── por-mes.component.ts
│   │   │   └── por-anio/
│   │   │       └── por-anio.component.ts
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   ├── main.ts
│   ├── index.html
│   └── styles.css
└── angular.json
```

---

## Solución de referencia

Si algo no coincide o falla al compilar, compara con el proyecto **`ingresos-gastos`** en esta misma carpeta (`demos/modulo-primeng/ingresos-gastos`). Ese proyecto es la solución completa del lab.

---

## Próximo paso (opcional)

Más adelante se puede reemplazar la carga desde `db.json` y el almacenamiento en memoria por un backend en Quarkus que exponga endpoints REST para los movimientos; el servicio Angular pasaría a usar solo `HttpClient` contra esa API.
