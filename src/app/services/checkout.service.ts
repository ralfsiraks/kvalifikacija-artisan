import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpHeadersService } from './http-headers.service';

@Injectable({
	providedIn: 'root',
})
export class CheckoutService {
	readonly ROOT_URL = environment.apiUrl;

	constructor(private http: HttpClient, private httpHeadersService: HttpHeadersService) {}

	onCheckout(cart: number[], discountId: number): Observable<number> {
		const headers = this.httpHeadersService.getHeaders();

		return this.http.post<number>(
			`${this.ROOT_URL}/checkout`,
			{
				cart,
				discountId,
			},
			{
				headers,
			}
		);
	}
}
