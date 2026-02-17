import {Component} from '@angular/core';
import {Movimiento} from '../../models/movimiento.model';
import {MovimientosService} from '../../services/movimientos.service';
import {Card} from 'primeng/card';
import {TableModule} from 'primeng/table';
import {Tag} from 'primeng/tag';
import {CommonModule} from '@angular/common';


@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    Card,
    TableModule,
    Tag,
    CommonModule
  ],
  template: `
    <p-card header="Ultimos Movimientos">
      <p-table [value]="movimientos" [rows]="10" [paginator]="true" class="p-datatable-sm">
        <ng-template pTemplate="header">
          <tr>
            <th>Fecha</th>
            <th>Descripción</th>
            <th>Tipo</th>
            <th>Monto</th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-m>
          <tr>
            <td>{{ m.mes }} / {{ m.anio }}</td>
            <td>{{ m.descripcion }}</td>
            <td>
              <p-tag [value]="m.tipo === 'ingreso' ? 'Ingreso': 'Gasto'"
                     [severity]="m.tipo === 'ingreso' ? 'success': 'danger'"></p-tag>
            </td>
            <td [class.tipo-ingreso]="m.tipo === 'ingreso'" [class.tipo-gasto]="m.tipo === 'gasto'">
              {{ m.tipo === 'ingreso' ? '+' : '-' }} {{ m.monto | number:'1.2-2' }}
            </td>
          </tr>
        </ng-template>
        <ng-template pTemplate="emptymessage">
          <tr>
            <td colspan="4">Sin movimientos. Ve a registrar para agregar.</td>
          </tr>
        </ng-template>
      </p-table>
    </p-card>
  `
})
export class InicioComponent {
  movimientos: Movimiento[] = [];

  constructor(private svc: MovimientosService) {
    this.svc.getMovimientos$().subscribe((list) => {
      this.movimientos = [...list].sort((a, b) => b.anio - a.anio || b.mes - a.mes);
    });
  }
}
