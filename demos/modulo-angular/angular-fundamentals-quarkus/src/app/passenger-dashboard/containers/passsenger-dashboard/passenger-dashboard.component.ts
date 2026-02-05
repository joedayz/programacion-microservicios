import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Passenger } from '../../models/passsenger.interface';
import { PassengerDetailComponent } from '../../components/passengrer-detail/passenger-detail.component';
import { PassengerCountComponent } from '../../components/passenger-count/passenger-count.component';
import { PassengerDashboardService } from '../../services/passenger-dashboard.service';

@Component({
  selector: 'passenger-dashboard',
  standalone: true,
  imports: [CommonModule, PassengerDetailComponent, PassengerCountComponent],
  template: `
    <div class="app">
      <passenger-count [items]="passengers"></passenger-count>
      @for (passenger of passengers; track passenger.id) {
        <passenger-detail [detail]="passenger"
                          (edit)="handleEdit($event)"
                          (remove)="handleRemove($event)"
        ></passenger-detail>
      }
    </div>
  `
})
export class PassengerDashboardComponent implements OnInit {
  passengers: Passenger[] = [];

  constructor(
    private passengerService: PassengerDashboardService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.passengerService.getPassengers()
      .subscribe(passengers => {
        this.passengers = passengers;
        this.cdr.detectChanges();
      });
  }

  protected handleEdit(event: Passenger) {
    this.passengerService.updatePassenger(event).subscribe(
      () => this.passengers = this.passengers.map(passenger =>
        passenger.id === event.id ? { ...passenger, ...event } : passenger
      )
    );
  }

  protected handleRemove(passenger: Passenger) {
    this.passengerService.removePassenger(passenger).subscribe(
      () => this.passengers = this.passengers.filter(p => p.id !== passenger.id)
    );
  }
}
