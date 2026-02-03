import { Component } from '@angular/core';



@Component({
  selector: 'app-root',
  template: `
    <div class="app">

      <input
        type="text"
        [value]="name"
        (input)="handleChange($event)">


      @if(name.length>3){
        <div>
        Searching for... {{name}}
        </div>
      }


<!--      <input type="text" #username/>-->


<!--      <button (click)="handleClick(username.value)">-->
<!--        Cambiar nombre-->
<!--      </button>-->


<!--      <input-->
<!--        type="text"-->
<!--        [ngModel]="name"-->
<!--        (ngModelChange)="handleChange($event)">-->

<!--      <input-->
<!--        type="text"-->
<!--        [(ngModel)]="name">-->

<!--      <input type="text"-->
<!--             [value]="name"-->
<!--             (input)="handleInput($event)"-->
<!--             (blur)="handleBlur($event)"/>-->
<!--      <div>{{ name }}</div>-->

      <!--      {{ title + "!"}}-->
<!--      <h1 [innerHTML]="title"></h1>-->
<!--      <h1>{{ title }}</h1>-->
<!--      <div>-->
<!--        {{ numberOne + numberTwo }}-->
<!--      </div>-->
<!--      <div>-->
<!--        {{ isHappy ? ':)' : ':(' }}-->
<!--      </div>-->
<!--      <input type="text" [value]="name"/>-->
<!--      <div>{{ name }}</div>-->
<!--      <img [ngSrc]="logo" width="250" height="80" alt="Logo">-->

    </div>
  `,
  imports: [
    //NgIf,
    //FormsModule,
    //NgOptimizedImage
  ],
  styleUrl: './app.css'
})
export class App {
  title: string;
  // isHappy: boolean = false;
  // numberOne: number = 1;
  // numberTwo: number = 2;
  name: string = 'Jose';
  //logo: string = 'logo.gif';

  constructor() {
    this.title = 'Angular CAS Training';
  }

  // protected handleClick(value: string) {
  //   //this.name = 'Amadeo';
  //   console.log('value: ' + value + '');
  //   this.name = value;
  // }

  // protected handleInput($event: any) {
  //   this.name = $event.target.value;
  // }
  //
  // protected handleBlur($event: any) {
  //   this.name = $event.target.value;
  // }

  // protected handleChange(value: string) {
  //   this.name = value;
  // }
  protected handleChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.name = value;
  }
}
