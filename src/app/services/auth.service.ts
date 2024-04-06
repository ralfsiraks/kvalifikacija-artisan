import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthObject } from '../interfaces/auth-object';
import { User } from '../interfaces/user';
import { HttpHeadersService } from './http-headers.service';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	readonly ROOT_URL = environment.apiUrl;
	private tokenSubject = new BehaviorSubject<object>(null);
	public token = this.tokenSubject.asObservable();

	constructor(private http: HttpClient, private httpHeadersService: HttpHeadersService) {}

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

	getUser(): Observable<User> {
		const headers = this.httpHeadersService.getHeaders();
		return this.http.get<User>(`${this.ROOT_URL}/user`, {
			headers,
		});
	}

	updateUser(patches: any): Observable<User['user_data']> {
		const headers = this.httpHeadersService.getHeaders();
		return this.http.patch<User['user_data']>(`${this.ROOT_URL}/user`, patches, { headers }).pipe(
			tap((res: User['user_data']) => {
				if (res.id) {
					this.tokenSubject.next({
						token: localStorage.getItem(`token`),
						name: res.name,
						surname: res.surname,
					});

					localStorage.setItem(`name`, res.name);
					localStorage.setItem(`surname`, res.surname);
				}
			})
		);
	}

	onChangePassword(oldPassword: string, newPassword: string): Observable<any> {
		const headers = this.httpHeadersService.getHeaders();
		return this.http.patch<any>(`${this.ROOT_URL}/password`, { oldPassword, newPassword }, { headers });
	}

	onDeleteAccount(password: string): Observable<any> {
		const headers = this.httpHeadersService.getHeaders();
		return this.http.delete<any>(`${this.ROOT_URL}/delete?password=${password}`, { headers });
	}
}
