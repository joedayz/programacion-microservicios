import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MenuItem} from 'primeng/api';
import {Menubar} from 'primeng/menubar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Menubar],
  template: `
    <div class="app-container">
      <p-menubar [model]="items"/>
      <main style="margin-top: 1rem;">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
})
export class App {
  items: MenuItem[] = [
    { label: 'Inicio', routerLink: '/inicio', icon: 'pi pi-home' },
    { label: 'Registrar', routerLink: '/registrar', icon: 'pi pi-plus' },
    { label: 'Por mes', routerLink: '/por-mes', icon: 'pi pi-calendar' },
    { label: 'Por año', routerLink: '/por-anio', icon: 'pi pi-chart-bar' }
  ];
}
