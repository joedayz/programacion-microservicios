import { Routes } from '@angular/router';
import {HomeComponent} from './home.component';
import {NotFoundComponent} from './not-found.component';
import {
  PassengerDashboardComponent
} from './passenger-dashboard/containers/passsenger-dashboard/passenger-dashboard.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'passengers', component: PassengerDashboardComponent, pathMatch: 'full'},
  { path: '**', component: NotFoundComponent }
];
