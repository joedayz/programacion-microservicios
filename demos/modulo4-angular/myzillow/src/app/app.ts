import {Component} from '@angular/core';
import {Home} from './home/home';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  template: `

    <main>
      <a [routerLink]="['/']">
        <header class="brand-name">
          <img class="brand-logo" src="logo.svg" alt="MyZillow Logo" aria-hidden="true"/>
        </header>
      </a>
      <section class="content">
        <router-outlet/>
      </section>
    </main>

  `,
  imports: [
    RouterLink,
    RouterOutlet
  ],
  styleUrl: './app.css'
})
export class App {
  title = 'homes';
}
