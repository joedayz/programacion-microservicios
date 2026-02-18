import {Component} from '@angular/core';
import {Card} from 'primeng/card';
import {TableModule} from 'primeng/table';
import {UIChart} from 'primeng/chart';
import {ResumenMes, MESES_NOMBRE} from '../../models/movimiento.model';
import {CommonModule} from '@angular/common';
import {MovimientosService} from '../../services/movimientos.service';


@Component({
  selector: 'app-por-mes',
  standalone: true,
  imports: [
    Card,
    TableModule,
    UIChart,
    CommonModule
  ],
  template: `
    <p-card header="Resumen por mes">
      <p-table [value]="resumenes" class="p-datatable-sm">
        <ng-template pTemplate="header">
          <tr>
            <th>Mes / Año</th>
            <th>Ingresos</th>
            <th>Gastos</th>
            <th>Balance</th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-r>
          <tr>
            <td>{{ MESES_NOMBRE[r.mes] }} {{ r.anio }}</td>
            <td class="tipo-ingreso">{{ r.ingresos | number: '1.2-2' }}</td>
            <td class="tipo-gasto">{{ r.gastos | number: '1.2-2' }}</td>
            <td [class.summary-positive]="r.balance>=0" [class.summary-negative]="r.balance<0">
              {{ r.balance | number: '1.2-2' }}
            </td>
          </tr>
        </ng-template>
        <ng-template pTemplate="emptymessage">
          <tr>
            <td colspan="4">Sin datos.</td>
          </tr>
        </ng-template>
      </p-table>
    </p-card>
    <div style="margin-top: 1rem;">
      <p-card header="Ingresos vs Gastos por mes">
        <p-chart type="bar" [data]="chartData" [options]="chartOptions"/>
      </p-card>
    </div>
  `
})
export class PorMesComponent {
  resumenes: ResumenMes[] = [];
  MESES_NOMBRE = MESES_NOMBRE;
  chartData: any;
  chartOptions: any;

  constructor(private svc: MovimientosService) {
    this.svc.getMovimientos$().subscribe(() => this.actualizar());
  }

  private actualizar() {
    this.resumenes = this.svc.getResumenPorMes();
    const labels = this.resumenes.map((r) => `${MESES_NOMBRE[r.mes]} ${r.anio}`);
    this.chartData = {
      labels,
      datasets: [
        {label: 'Ingresos', data: this.resumenes.map((r) => r.ingresos), backgroundColor: 'rgba(34, 197, 94, 0.7)'},
        {label: 'Gastos', data: this.resumenes.map((r) => r.gastos), backgroundColor: 'rgba(239, 68, 68, 0.7)'}
      ]
    };
    this.chartOptions = {
      responsive: true
      , scales: {y: {beginAtZero: true}}
    };
  }
}
