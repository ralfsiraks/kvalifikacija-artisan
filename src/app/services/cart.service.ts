import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DiscountCode } from '../interfaces/discount-code';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // readonly ROOT_URL = 'https://artisan-backend.frb.io/api';
  readonly ROOT_URL = 'http://127.0.0.1:8000/api';
  constructor(private http: HttpClient) {}

  checkCode(code: string): Observable<object> {
    return this.http.get<DiscountCode[]>(this.ROOT_URL + '/code', {
      headers: new HttpHeaders({
        code: code,
      }),
    });
  }
}
