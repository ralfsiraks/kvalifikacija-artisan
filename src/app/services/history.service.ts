import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { OrderHistory } from '../interfaces/order-history';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  readonly ROOT_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getOrderHistory(token: string) {
    const authHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<OrderHistory[]>(this.ROOT_URL + `/history`, {
      headers: authHeaders,
    });
  }
}
