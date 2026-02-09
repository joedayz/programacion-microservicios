import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError, map, Observable, of, tap} from 'rxjs';
import {Branch, Item, Product} from '../models/product.interface';

const API_URL:string = 'http://localhost:3000';

@Injectable({ providedIn: 'root' })
export class StockInventoryService {



  constructor(private http: HttpClient) { }

  getCartItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${API_URL}/cart`);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${API_URL}/products`);
  }

  checkBranchId(id:string):Observable<boolean>{
    const param = new HttpParams().set('id', id);
    return this.http.get<Branch[]>(`${API_URL}/branches`, {params: param})
      .pipe(
        map(branches => branches.length>0),
        catchError(() => of(false))
      )
  }
}
