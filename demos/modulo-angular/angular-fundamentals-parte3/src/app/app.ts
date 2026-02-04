import { Component } from '@angular/core';
import { PassengerDashboardComponent } from './passenger-dashboard/containers/passsenger-dashboard/passenger-dashboard.component';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

interface Nav{
  link: string,
  name: string,
  exact: boolean
}


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div clas="app">
        <nav class="nav">
            @for (item of nav; track item.link) {
              <a [routerLink]="item.link"
                 routerLinkActive="active"
                 [routerLinkActiveOptions]="{ exact: item.exact }"
              >{{item.name}}</a>
            }
        </nav>
        <router-outlet></router-outlet>
    </div>
  `,
  styleUrl: './app.css'
})
export class App {

  nav: Nav[] = [
    {link: '/', name: 'Home', exact: true},
    {link: '/passengers', name: 'Passengers', exact: true},
    {link: '/oops', name: '404', exact: false}
  ]

}
