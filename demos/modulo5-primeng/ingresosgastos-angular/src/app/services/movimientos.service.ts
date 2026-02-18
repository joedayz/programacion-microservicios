import {Injectable} from '@angular/core';
import {Movimiento, ResumenAnio} from '../models/movimiento.model';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, map, Observable, tap} from 'rxjs';

const API_BASE = 'http://localhost:8080/api';

@Injectable({providedIn: 'root'})
export class MovimientosService {

  private movimientos: Movimiento[] = [];
  private readonly data$ = new BehaviorSubject<Movimiento[]>([]);

  constructor(private http: HttpClient) {
    this.loadFromApi();
  }

  private loadFromApi() {
    this.http.get<Movimiento[]>(`${API_BASE}/movimientos`)
      .pipe(
        map((list) => list ?? []),
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
    return this.http.post<Movimiento>(`${API_BASE}/movimientos`, m).pipe(
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
