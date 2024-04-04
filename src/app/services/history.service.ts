import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Order } from '../interfaces/order';
import { OrderHistory } from '../interfaces/order-history';
import { HttpHeadersService } from './http-headers.service';

@Injectable({
	providedIn: 'root',
})
export class HistoryService {
	readonly ROOT_URL = environment.apiUrl;

	constructor(private http: HttpClient, private httpHeadersService: HttpHeadersService) {}

	getOrderHistory(token: string): Observable<OrderHistory[]> {
		const headers = this.httpHeadersService.getHeaders();

		return this.http.get<OrderHistory[]>(this.ROOT_URL + `/history`, {
			headers,
		});
	}

	getOrder(token: string, orderId: number): Observable<Order> {
		const headers = this.httpHeadersService.getHeaders();

		return this.http.get<Order>(this.ROOT_URL + `/order/${orderId}`, {
			headers,
		});
	}
}
