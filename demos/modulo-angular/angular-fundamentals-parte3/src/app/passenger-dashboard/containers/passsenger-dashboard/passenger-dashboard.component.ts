import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Passenger} from '../../models/passsenger.interface';


@Component({
  selector: 'passenger-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="app">

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

      </ul>

    </div>
  `,
  styleUrl: './passenger-dashboard.component.css'
})
export class PassengerDashboardComponent implements OnInit{

  passengers: Passenger[] = [];

  constructor() {
    console.log('Constructor es para inyeccion de dependencias');
  }

  ngOnInit() {
    console.log('Inicializacion de componente');
    this.passengers = [
      {id: 1, fullname: 'Stephen', checkedIn: true, checkInDate: 1490742000000, children: null},
      {id: 2, fullname: 'Rose', checkedIn: false, checkInDate: null, children: [{name: 'Ted', age: 12},{name: 'Chloe', age: 7}]},
      {id: 3, fullname: 'James', checkedIn: true, checkInDate: 1491606000000, children:null},
      {id: 4, fullname: 'Louise', checkedIn: true, checkInDate: 1488412800000, children: [{name: 'Jessica', age: 1}]},
      {id: 5, fullname: 'Tina', checkedIn: false, checkInDate: null, children: null},
    ];
  }


}
