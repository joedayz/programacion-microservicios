import {Injectable} from '@angular/core';
import {Movimiento} from '../models/movimiento.model';
import {HttpClient} from '@angular/common/http';


interface DbJson{
  movimientos: Movimiento[];
}


@Injectable({providedIn: 'root'})
export class MovimientosService {

  private movimientos: Movimiento[] = [];

  constructor(private http: HttpClient) {
    this.loadFromDb();
  }

  private loadFromDb() {
    //TODO obtener la data desde el archivo db.json (en la carpeta public)
  }
}
