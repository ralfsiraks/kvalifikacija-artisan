import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { take } from 'rxjs';
import { OrderHistory } from '../../interfaces/order-history';
import { User } from '../../interfaces/user';
import { AuthService } from '../../services/auth.service';
import { HistoryService } from '../../services/history.service';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss',
})
export class UserPageComponent implements OnInit {
  userToken: string = localStorage.getItem(`token`);
  userId: number;
  userName: string;
  userSurname: string;
  userEmail: string;
  mode: string = `profile`;
  userForm: FormGroup = new FormGroup({
    name: new FormControl(``, [Validators.required]),
    surname: new FormControl(``, [Validators.required]),
    email: new FormControl(``, [Validators.required, Validators.email]),
  });
  orders: OrderHistory[];
  orderPrices: number[] = [];

  constructor(
    private authService: AuthService,
    private historyService: HistoryService
  ) {}

  ngOnInit(): void {
    if (this.mode === `profile`) {
    }
    this.authService
      .getUser(this.userToken)
      .pipe(take(1))
      .subscribe({
        next: (data: User) => {
          if (data.id && data.email) {
            this.userId = data.id;
            this.userName = data.user_data.name;
            this.userSurname = data.user_data.surname;
            this.userEmail = data.email;
            console.log(`happens`);
            this.onSetFormValues(data);
          }
        },
        error: (err) => {
          console.log(err.error);
          localStorage.removeItem(`token`);
          localStorage.removeItem(`name`);
          localStorage.removeItem(`surname`);
          this.userToken = '';
        },
      });
  }

  onSetFormValues(data: any) {
    console.log(data);
    this.userForm.setValue({
      name: data.user_data.name,
      surname: data.user_data.surname,
      email: data.email,
    });
  }

  onUserFormSubmit() {}

  onOrderHistory() {
    this.mode = `history`;
    this.historyService
      .getOrderHistory(localStorage.getItem(`token`))
      .pipe(take(1))
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.orders = data;
          this.getOrderPrices(data);
        },
        error: (error: any) => {},
      });
  }

  getOrderPrices(orders: OrderHistory[]) {
    orders.forEach((e) => {
      let totalPrice: number = 0;
      e.ordered_products.forEach((e) => {
        totalPrice += e.price;
      });
      this.orderPrices.push(totalPrice);
    });
    console.log(this.orderPrices);
  }
}
