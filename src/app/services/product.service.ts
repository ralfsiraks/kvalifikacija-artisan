import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../interfaces/pagination';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  readonly ROOT_URL = 'https://artisan-backend.frb.io/api';
  // readonly ROOT_URL = 'http://127.0.0.1:8000/api';
  constructor(private http: HttpClient) {}

  getCatalog(category: string, page: number) {
    return this.http.get<Pagination>(
      this.ROOT_URL + `/catalog/${category}?page=${page}`
    );
  }

  getProduct(id: number) {
    return this.http.get<Product>(this.ROOT_URL + `/product`, {
      headers: new HttpHeaders({
        id,
      }),
    });
  }
}
