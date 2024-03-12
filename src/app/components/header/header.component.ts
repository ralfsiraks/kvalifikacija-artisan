import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { take } from 'rxjs';
import { AuthObject } from '../../interfaces/auth-object';
import { User } from '../../interfaces/user';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { LoginModalComponent } from '../login-modal/login-modal.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, LoginModalComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  token: string = '';
  userName: string;
  userSurname: string;
  cartCount: number;
  userId: number;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.cartService.cartCount$.subscribe((data: number) => {
      this.cartCount = data;
      console.log(this.cartCount);
    });
    this.token = localStorage.getItem(`token`);
    this.authService.token.subscribe((data: AuthObject) => {
      if (data) {
        this.token = data.token;
        this.userName = data.name;
        this.userSurname = data.surname;
      }
    });
    if (this.token) {
      this.authService
        .getUser(this.token)
        .pipe(take(1))
        .subscribe({
          next: (data: User) => {
            if (data.id && data.email) {
              this.userId = data.id;
              this.userName = localStorage.getItem(`name`);
              this.userSurname = localStorage.getItem(`surname`);
            }
          },
          error: (err) => {
            console.log(err.error);
            localStorage.removeItem(`token`);
            localStorage.removeItem(`name`);
            localStorage.removeItem(`surname`);
            this.token = '';
          },
        });
    }
  }

  onAllProducts() {
    this.router.navigate(['/catalog/all/1']).then((): void => {
      window.location.reload();
    });
  }

  onLogOut() {
    localStorage.removeItem(`token`);
    localStorage.removeItem(`name`);
    localStorage.removeItem(`surname`);
    this.token = ``;
  }
}
