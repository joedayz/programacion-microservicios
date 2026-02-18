import {Injectable} from '@angular/core';
import {Movimiento, ResumenAnio} from '../models/movimiento.model';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, map, Observable, tap} from 'rxjs';

/** API del backend Quarkus - usa /api/movimientos/db para formato compatible con db.json */
const API_BASE = '/api/movimientos';

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
    this.http.get<DbJson>(`${API_BASE}/db`)
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
    return this.http.post<Movimiento>(API_BASE, m).pipe(
      tap((nuevo) => {
        this.movimientos.push(nuevo);
        this.data$.next([...this.movimientos]);
      })
    );
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
}
