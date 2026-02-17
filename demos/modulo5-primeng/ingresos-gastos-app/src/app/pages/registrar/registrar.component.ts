import {Component} from '@angular/core';
import {Toast} from 'primeng/toast';
import {Card} from 'primeng/card';
import {Select} from 'primeng/select';
import {FormsModule} from '@angular/forms';
import {MESES_NOMBRE, TipoMovimiento} from '../../models/movimiento.model';
import {MessageService} from 'primeng/api';
import {InputNumber} from 'primeng/inputnumber';
import {Button} from 'primeng/button';
import {MovimientosService} from '../../services/movimientos.service';


@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [
    Toast,
    Card,
    Select,
    FormsModule,
    InputNumber,
    Button
  ],
  providers: [MessageService],
  template: `
    <p-toast/>
    <p-card header="Registrar ingreso o gasto">
      <div class="p-fluid" style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;">
        <div>
          <label>Tipo</label>
          <p-select [options]="tipos" [(ngModel)]="tipo" optionLabel="label" optionValue="value"
            placeholder="Seleccione" class="w-full">
          </p-select>
        </div>
        <div>
          <label>Descripción</label>
          <input type="text" pInputText [(ngModel)]="descripcion" placeholder="Ej: Salario, Alquiler" class="w-full"/>
        </div>
        <div>
          <label>Monto</label>
          <p-inputNumber [(ngModel)]="monto" mode="currency" currency="EUR" locale="es-ES" class="w-full"></p-inputNumber>
        </div>
        <div style="display: flex; gap: 1rem;">
          <div style="flex: 1;">
            <label>Mes</label>
            <p-select [options]="mesesOpt" [(ngModel)]="mes" optionLabel="label" optionValue="value"
                      placeholder="Mes" class="w-full">
            </p-select>
          </div>
          <div style="flex: 1;">
            <label>Año</label>
            <p-inputNumber [(ngModel)]="anio" [min]="2020" [max]="2030" placeholder="Año" class="w-full" />
          </div>
        </div>
        <div>
          <p-button label="Guardar" icon="pi pi-check" (onClick)="guardar()" />
        </div>
      </div>
    </p-card>
  `
})
export class RegistrarComponent {
  tipo: TipoMovimiento = 'ingreso';
  descripcion = '';
  monto: number | null = null;
  mes: number | null = null;
  anio: number | null = new Date().getFullYear();


  mesesOpt = Object.entries(MESES_NOMBRE).map(([value, label]) => ({ value: +value, label }));



  tipos = [
    {label: 'Ingreso', value: 'ingreso' as TipoMovimiento},
    {label: 'Gasto', value: 'gasto' as TipoMovimiento}
  ];

  constructor(private svc: MovimientosService,
    private messageService:MessageService) {
  }

  protected guardar() {
    if(this.descripcion.trim().length === 0 || this.monto === null || this.mes === null || this.anio === null) {
      this.messageService.add({severity:'warn', summary:'Datos incompletos', detail:'Por favor llene todos los campos.'});
      return;
    }
    this.svc.add({
      tipo: this.tipo,
      descripcion: this.descripcion.trim(),
      monto: this.monto,
      mes: this.mes,
      anio: this.anio
    });
    this.messageService.add({severity:'success',
      summary:'Movimiento registrado', detail:'Se ha registrado el movimiento correctamente.'});
    this.descripcion = '';
    this.monto = null;
  }
}
