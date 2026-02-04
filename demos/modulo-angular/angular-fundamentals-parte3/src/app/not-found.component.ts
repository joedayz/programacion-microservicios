import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div>
        Page not found!, <a routerLink="/" href="/">go home</a>?
    </div>
  `
})
export class NotFoundComponent {}
