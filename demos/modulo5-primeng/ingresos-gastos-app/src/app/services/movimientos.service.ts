import {Injectable} from '@angular/core';
import {Movimiento, ResumenAnio} from '../models/movimiento.model';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, map, Observable, of, tap} from 'rxjs';

/** Datos desde public/db.json (sin backend). Para usar Quarkus, cambia a API_BASE y descomenta el POST. */
const DB_JSON = '/db.json';

interface DbJson {
  movimientos: Movimiento[];
}

@Injectable({providedIn: 'root'})
export class MovimientosService {

  private movimientos: Movimiento[] = [];
  private readonly data$ = new BehaviorSubject<Movimiento[]>([]);

  constructor(private http: HttpClient) {
    this.loadFromDb();
  }

  private loadFromDb() {
    this.http.get<DbJson>(DB_JSON)
      .pipe(
        map((db) => db.movimientos ?? []),
        tap((list) => {
          this.movimientos = list;
          this.data$.next([...this.movimientos]);
        })
      ).subscribe();
  }

  getMovimientos$() {
    return this.data$.asObservable();
  }

  add(m: Omit<Movimiento, 'id'>): Observable<Movimiento> {
    const nextId = this.movimientos.length > 0
      ? Math.max(...this.movimientos.map((x) => x.id)) + 1
      : 1;
    const nuevo: Movimiento = { ...m, id: nextId };
    this.movimientos.push(nuevo);
    this.data$.next([...this.movimientos]);
    return of(nuevo);
  }

  getResumenPorAnio(): ResumenAnio[] {
    const byAnio = new Map<number, { ingresos: number; gastos: number }>();
    for (const m of this.movimientos) {
      const cur = byAnio.get(m.anio) ?? { ingresos: 0, gastos: 0 };
      if (m.tipo === 'ingreso') cur.ingresos += m.monto;
      else cur.gastos += m.monto;
      byAnio.set(m.anio, cur);
    }
    return Array.from(byAnio.entries())
      .map(([anio, v]) => ({
        anio,
        ingresos: v.ingresos,
        gastos: v.gastos,
        balance: v.ingresos - v.gastos
      }))
      .sort((a, b) => a.anio - b.anio);
  }

  getResumenPorMes() {
    const byKey = new Map<string, { ingresos: number; gastos: number }>();
    for (const m of this.movimientos) {
      const key = `${m.anio}-${m.mes}`;
      const cur = byKey.get(key) ?? { ingresos: 0, gastos: 0 };
      if (m.tipo === 'ingreso') cur.ingresos += m.monto;
      else cur.gastos += m.monto;
      byKey.set(key, cur);
    }
    return Array.from(byKey.entries())
      .map(([key, v]) => {
        const [anio, mes] = key.split('-').map(Number);
        return {
          mes,
          anio,
          ingresos: v.ingresos,
          gastos: v.gastos,
          balance: v.ingresos - v.gastos
        }
      }).sort((a, b) => a.anio - b.anio || a.mes - b.mes);
  }
}
