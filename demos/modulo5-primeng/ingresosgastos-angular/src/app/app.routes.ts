import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', loadComponent: () => import('./pages/inicio/inicio.component').then(m => m.InicioComponent) },
  { path: 'registrar', loadComponent: () => import('./pages/registrar/registrar.component').then(m => m.RegistrarComponent) },
  { path: 'por-mes', loadComponent: () => import('./pages/por-mes/por-mes.component').then(m => m.PorMesComponent) },
  { path: 'por-anio', loadComponent: () => import('./pages/por-anio/por-anio.component').then(m => m.PorAnioComponent) }
];
