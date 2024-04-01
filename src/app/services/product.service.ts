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
		search: string,
		minP: number,
		maxP: number,
		h: string,
		w: string
	): Observable<Pagination> {
		const paramObj = { search, minP, maxP, h, w };

		let endpoint = this.ROOT_URL + `/catalog?category=${category}&page=${page}&sort=${sortBy}`;
		Object.entries(paramObj).forEach(([paramName, paramValue]) => {
			if (paramValue) {
				endpoint += `&${paramName}=${paramValue}`;
			}
		});
		console.log(endpoint);
		return this.http.get<Pagination>(endpoint);
	}

	getProduct(id: number): Observable<Product> {
		return this.http.get<Product>(this.ROOT_URL + `/product`, {
			headers: new HttpHeaders({
				id,
			}),
		});
	}
}
