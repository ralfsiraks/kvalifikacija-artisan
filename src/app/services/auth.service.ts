import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly ROOT_URL = 'https://artisan-backend.frb.io/api';
  // readonly ROOT_URL = 'http://127.0.0.1:8000/api';
  private tokenSubject = new BehaviorSubject<string>(``);
  public token = this.tokenSubject.asObservable();
  headers: object = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  onLogin(email: string, password: string): any {
    return this.http
      .post<any>(
        `${this.ROOT_URL}/login`,
        {
          email: email,
          password: password,
        },
        this.headers
      )
      .pipe(
        tap((res: any) => {
          if (res.token) {
            localStorage.setItem('token', res.token);
            this.tokenSubject.next(res.token);
          } else {
            console.log(res);
          }
        })
      );
  }

  onRegister(name: string, surname: string, email: string, password: string) {
    return this.http
      .post<any>(
        `${this.ROOT_URL}/register`,
        {
          name: name,
          surname: surname,
          email: email,
          password: password,
        },
        this.headers
      )
      .pipe(
        tap((res: any) => {
          if (res.token) {
            localStorage.setItem('token', res.token);
            this.tokenSubject.next(res.token);
          } else {
            console.log(`error:` + res);
          }
        })
      );
  }
}
