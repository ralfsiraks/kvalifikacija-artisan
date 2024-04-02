import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthObject } from '../interfaces/auth-object';
import { User } from '../interfaces/user';
import { CartService } from './cart.service';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	readonly ROOT_URL = environment.apiUrl;
	private tokenSubject = new BehaviorSubject<object>(null);
	public token = this.tokenSubject.asObservable();
	headers = new HttpHeaders({
		'Content-Type': 'application/json',
	});

	constructor(private http: HttpClient, private cartService: CartService) {}

	onLogin(email: string, password: string): Observable<AuthObject> {
		return this.http
			.post<any>(`${this.ROOT_URL}/login`, {
				email: email,
				password: password,
			})
			.pipe(
				tap((res: AuthObject) => {
					if (res.token) {
						localStorage.setItem('token', res.token);
						localStorage.setItem('name', res.name);
						localStorage.setItem('surname', res.surname);
						this.tokenSubject.next(res);
					} else {
						console.log(res);
					}
				})
			);
	}

	onRegister(name: string, surname: string, email: string, password: string): Observable<AuthObject> {
		return this.http
			.post<AuthObject>(`${this.ROOT_URL}/register`, {
				name: name,
				surname: surname,
				email: email,
				password: password,
			})
			.pipe(
				tap((res: any) => {
					if (res.token) {
						localStorage.setItem('token', res.token);
						localStorage.setItem('name', res.name);
						localStorage.setItem('surname', res.surname);
						this.tokenSubject.next(res);
					} else {
						console.log(`error:` + res);
					}
				})
			);
	}

	getUser(token: string): Observable<User> {
		const authHeaders = new HttpHeaders({
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		});
		return this.http.get<User>(`${this.ROOT_URL}/user`, {
			headers: authHeaders,
		});
	}
}
