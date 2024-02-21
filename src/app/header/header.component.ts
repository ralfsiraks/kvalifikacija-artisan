import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, LoginModalComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  token: string = '';
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.token = localStorage.getItem(`token`);
    this.authService.token.subscribe((data) => {
      this.token = data;
    });
  }

  onLogOut() {
    console.log(localStorage.getItem(`token`));
    localStorage.removeItem(`token`);
    this.token = ``;
    console.log(localStorage.getItem(`token`));
  }
}
