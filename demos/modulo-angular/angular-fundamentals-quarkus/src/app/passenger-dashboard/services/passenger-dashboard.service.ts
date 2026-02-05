import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Passenger } from '../models/passsenger.interface';

const PASSENGER_API: string = 'http://localhost:8080/passengers';

@Injectable({ providedIn: 'root' })
export class PassengerDashboardService {
  constructor(private httpClient: HttpClient) {}

  getPassengers(): Observable<Passenger[]> {
    return this.httpClient.get<Passenger[]>(PASSENGER_API);
  }

  updatePassenger(passenger: Passenger): Observable<Passenger> {
    return this.httpClient.put<Passenger>(`${PASSENGER_API}/${passenger.id}`, passenger);
  }

  removePassenger(passenger: Passenger): Observable<void> {
    return this.httpClient.delete<void>(`${PASSENGER_API}/${passenger.id}`);
  }
}
