import { Component } from '@angular/core';
import {DatePipe, JsonPipe, NgClass, NgStyle, UpperCasePipe} from '@angular/common';


interface Child{
  name: string,
  age: number
}

interface Passenger{
  id: number,
  fullname: string,
  checkedIn: boolean
  checkInDate: number | null,
  children: Child[] | null
}

@Component({
  selector: 'app-root',
  template: `
    <div clas="app">

      <h3>Airline Passengers</h3>
      <ul>
        @for (passenger of passengers; track passenger.id; let i = $index) {
          <li>
                    <span class="status"
                          [class.checked-in]="passenger.checkedIn"
                          [class.checked-out]="!passenger.checkedIn">
                    </span>
            {{ i }} : {{ passenger.fullname }}

            <p>{{ passenger | json }}</p>

            <div class="date">
              Check in date:
              {{ passenger.checkInDate ? (passenger.checkInDate | date: 'yMMMMd' | uppercase) : 'Not checked in yet' }}
            </div>
            <div class="children">
              Children: {{ passenger.children?.length || 0 }}
            </div>
          </li>

        }
        <!--        @for (passenger of passengers; track passenger.id; let i = $index) {-->
        <!--          <li>-->
        <!--            <span class="status"-->
        <!--                  [ngClass]="{-->
        <!--                  'checked-in': passenger.checkedIn,-->
        <!--                  'checked-out': !passenger.checkedIn-->
        <!--                  }">-->
        <!--            </span>-->
        <!--            {{ i }} : {{ passenger.fullname }}-->
        <!--          </li>-->

        <!--        }-->

        <!--        @for (passenger of passengers; track passenger.id; let i = $index) {-->
        <!--          <li>-->
        <!--            <span class="status"-->
        <!--                  [ngStyle]="{backgroundColor: (passenger.checkedIn ? '#2ecc71' : '#c0392b')}">-->
        <!--            </span>-->
        <!--            {{ i }} : {{ passenger.fullname }}-->
        <!--          </li>-->

        <!--        }-->
      </ul>

    </div>
  `,
  imports: [
    //NgClass,
    //NgStyle,
    JsonPipe,
    DatePipe,
    UpperCasePipe
  ],
  standalone: true,
  styleUrl: './app.css'
})
export class App {

  passengers: Passenger[] = [
    {id: 1, fullname: 'Stephen', checkedIn: true, checkInDate: 1490742000000, children: null},
    {id: 2, fullname: 'Rose', checkedIn: false, checkInDate: null, children: [{name: 'Ted', age: 12},{name: 'Chloe', age: 7}]},
    {id: 3, fullname: 'James', checkedIn: true, checkInDate: 1491606000000, children:null},
    {id: 4, fullname: 'Louise', checkedIn: true, checkInDate: 1488412800000, children: [{name: 'Jessica', age: 1}]},
    {id: 5, fullname: 'Tina', checkedIn: false, checkInDate: null, children: null},
  ];
}
