import {Injectable} from '@angular/core';
import {Passenger} from '../models/passsenger.interface';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';


const PASSENGER_API : string = 'http://localhost:3000/passengers';


@Injectable({ providedIn: 'root' })
export class PassengerDashboardService {

  constructor(private httpClient: HttpClient){}

  getPassengers(): Observable<Passenger[]>{
    return this.httpClient.get<Passenger[]>(PASSENGER_API);
  }

  updatePassenger(passenger: Passenger): Observable<any>{
    return this.httpClient.put(`${PASSENGER_API}/${passenger.id}`, passenger);
  }

  removePassenger(passenger: Passenger): Observable<any>{
    return this.httpClient.delete(`${PASSENGER_API}/${passenger.id}`);
  }

}
