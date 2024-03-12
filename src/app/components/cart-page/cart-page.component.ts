import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { take } from 'rxjs';
import { DiscountCode } from '../../interfaces/discount-code';
import { Product } from '../../interfaces/product';
import { CartService } from '../../services/cart.service';
import { ToastService } from '../../services/toast.service';
import { CartItemComponent } from '../cart-item/cart-item.component';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [
    CartItemComponent,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss',
})
export class CartPageComponent implements OnInit {
  discountCodeForm: FormGroup = new FormGroup({
    code: new FormControl('', Validators.required),
  });
  readonly ROOT_URL = 'http://127.0.0.1:8000';
  itemTotal: number = 0;
  processingFee: number = 1.45;
  total: number = this.itemTotal + this.processingFee;
  discountedPrice: number = 0;
  cart: number[] = JSON.parse(localStorage.getItem(`cart`));
  cartItems: Product[];
  loading: boolean = true;

  constructor(
    private cartService: CartService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe((data: []) => {
      this.cart = JSON.parse(localStorage.getItem(`cart`));
    });

    if (this.cart?.length > 0) {
      this.loading = true;
      this.cartService
        .getCart(this.cart)
        .pipe(take(1))
        .subscribe({
          next: (value: Product[]) => {
            this.loading = false;
            this.cartItems = value;
            let arr = [];
            value.forEach((e) => {
              arr.push(e.id);
              this.itemTotal += e.price;
            });
            localStorage.setItem(`cart`, JSON.stringify(arr));
            this.total = this.itemTotal + this.processingFee;
          },
        });
    }
  }

  onDiscountCodeSubmit(): void {
    const form = this.discountCodeForm;
    if (form.get('code')?.value.trim() === ``) {
      this.toastService.onShowAlert(`error`, `Please enter a code!`, `#FF8333`);
      return;
    }
    this.cartService
      .checkCode(form.get('code')?.value)
      .pipe(take(1))
      .subscribe({
        next: (value: DiscountCode[]) => {
          form.controls[`code`].reset(``);
          if (value?.length > 0) {
            this.toastService.onShowAlert(
              `check_circle`,
              `${value[0].amount}% discount added!`,
              `#74b816`
            );
            const discount: string = `0.${100 - value[0].amount}`;
            this.discountedPrice = +(this.total * +discount).toFixed(2);
          } else {
            this.toastService.onShowAlert(
              `sentiment_dissatisfied`,
              `Code not found!`,
              `red`
            );
          }
        },
      });
  }
}
