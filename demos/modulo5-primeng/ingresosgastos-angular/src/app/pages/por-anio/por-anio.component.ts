import {Component} from '@angular/core';
import {Card} from 'primeng/card';
import {TableModule} from 'primeng/table';
import {ResumenAnio} from '../../models/movimiento.model';
import {MovimientosService} from '../../services/movimientos.service';
import {CommonModule} from '@angular/common';
import {UIChart} from 'primeng/chart';


@Component({
  selector: 'app-por-anio',
  standalone: true,
  imports: [
    Card,
    TableModule,
    CommonModule,
    UIChart
  ],
  template: `
    <p-card header="Resumen por año">
      <p-table [value]="resumenes" class="p-datatable-sm">
        <ng-template pTemplate="header">
          <tr>
            <th>Año</th>
            <th>Ingresos</th>
            <th>Gastos</th>
            <th>Balance</th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-r>
          <tr>
            <td>{{ r.anio }}</td>
            <td class="tipo-ingreso">{{ r.ingresos | number:'1.2-2' }}</td>
            <td class="tipo-gasto">{{ r.gastos | number:'1.2-2' }}</td>
            <td [class.summary-positive]="r.balance >= 0" [class.summary-negative]="r.balance < 0">
              {{ r.balance | number:'1.2-2' }}
            </td>
          </tr>
        </ng-template>
        <ng-template pTemplate="emptymessage">
          <tr>
            <td colspan="4">No hay data.</td>
          </tr>
        </ng-template>
      </p-table>
    </p-card>
    <div style="margin-top: 1rem;">
      <p-card header="Balance por año">
        <p-chart type="bar" [data]="chartData" [options]="chartOptions"></p-chart>
      </p-card>
    </div>
  `
})
export class PorAnioComponent {
  resumenes: ResumenAnio[] = [];
  chartData: any;
  chartOptions: any;

  constructor(private svc: MovimientosService) {
    this.svc.getMovimientos$().subscribe( () => this.actualizar());
  }

  private actualizar(){
    this.resumenes = this.svc.getResumenPorAnio();

    this.chartData = {
      labels: this.resumenes.map((r) => r.anio),
      datasets: [
        {
          label: 'Balance', data: this.resumenes.map((r) => r.balance),
          backgroundColor: this.resumenes.map((r) => r.balance >= 0
            ? 'rgba(34, 197, 94, 0.7)' : 'rgba(239, 68, 68, 0.7)')
        }
      ]
    };

    this.chartOptions = {
      responsive: true,
      scales: { y: { beginAtZero: true }}
    };

  }
}
