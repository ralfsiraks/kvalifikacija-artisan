import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  readonly ROOT_URL = environment.apiUrl;

  constructor(private http: HttpClient, private toastService: ToastService) {}

  onCheckout(cart: number[], discountId: number): any {
    const authHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem(`token`)}`,
    });

    return this.http.post<any>(
      `${this.ROOT_URL}/checkout`,
      {
        cart,
        discountId,
      },
      {
        headers: authHeaders,
      }
    );
  }
}
