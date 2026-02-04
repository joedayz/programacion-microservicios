import { Component } from '@angular/core';
import { PassengerDashboardComponent } from './passenger-dashboard/containers/passsenger-dashboard/passenger-dashboard.component';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PassengerDashboardComponent],
  template: `
    <div clas="app">

        <passenger-dashboard></passenger-dashboard>
    </div>
  `,
  styleUrl: './app.css'
})
export class App {


}
