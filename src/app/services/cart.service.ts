import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DiscountCode } from '../interfaces/discount-code';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  readonly ROOT_URL = 'https://kvalifikacija.frb.io';
  constructor(private http: HttpClient) {}

  checkCode(code: string): any {
    return this.http.get<DiscountCode[]>(this.ROOT_URL + '/code', {
      headers: new HttpHeaders({
        code: code,
      }),
    });
  }
}
