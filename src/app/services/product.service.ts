import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Pagination } from '../interfaces/pagination';
import { Product } from '../interfaces/product';

@Injectable({
	providedIn: 'root',
})
export class ProductService {
	readonly ROOT_URL = environment.apiUrl;
	constructor(private http: HttpClient) {}

	getCatalog(
		category: string,
		page: number,
		sortBy: string,
		sortOrder: string,
		search?: string
	): Observable<Pagination> {
		const authHeaders = new HttpHeaders({
			'Content-Type': 'application/json',
		});
		let endpoint =
			this.ROOT_URL + `/catalog/?category=${category}&page=${page}&sort_by=${sortBy}&sort_order=${sortOrder}`;
		if (search) {
			endpoint += `&search=${search}`;
		}
		console.log(endpoint);
		return this.http.get<Pagination>(endpoint, { headers: authHeaders });
	}

	getProduct(id: number): Observable<Product> {
		return this.http.get<Product>(this.ROOT_URL + `/product`, {
			headers: new HttpHeaders({
				id,
			}),
		});
	}
}
