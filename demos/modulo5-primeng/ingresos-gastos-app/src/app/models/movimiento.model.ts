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
