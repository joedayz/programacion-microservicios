import {NgModule} from '@angular/core';
import {PassengerDashboardComponent} from './containers/passsenger-dashboard/passenger-dashboard.component';
import {CommonModule} from '@angular/common';


@NgModule({
  imports: [
    CommonModule,
    PassengerDashboardComponent
  ],
  exports:[
    PassengerDashboardComponent
  ],

  providers:[
  ]
})
export class PassengerDashboardModule { }
