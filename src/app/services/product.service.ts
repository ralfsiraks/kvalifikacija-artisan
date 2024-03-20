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

	getCatalog(category: string, page: number, sortBy: string, sortOrder: string): Observable<Pagination> {
		console.log(`${sortBy}, ${sortOrder}`);
		return this.http.get<Pagination>(
			this.ROOT_URL + `/catalog/${category}?page=${page}&sort_by=${sortBy}&sort_order=${sortOrder}`
		);
	}

	getProduct(id: number): Observable<Product> {
		return this.http.get<Product>(this.ROOT_URL + `/product`, {
			headers: new HttpHeaders({
				id,
			}),
		});
	}
}
