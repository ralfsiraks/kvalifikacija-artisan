import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class HttpHeadersService {
	constructor() {}

	getHeaders(): HttpHeaders {
		// Get the bearer token from local storage
		const token = localStorage.getItem('token');

		// Set up the headers with Content-Type: application/json and Authorization header with the bearer token
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		});

		return headers;
	}
}
