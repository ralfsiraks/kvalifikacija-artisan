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
import { CartItemComponent } from '../cart-item/cart-item.component';
import { DiscountCode } from '../interfaces/discount-code';
import { CartService } from '../services/cart.service';

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

  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  onSubmit() {
    this.cartService
      .checkCode(this.discountCodeForm.get('code')?.value)
      .pipe(take(1))
      .subscribe({
        next: (value: DiscountCode[]) => {
          if (value.length > 0) {
            alert(`${value[0].amount}% discount added!`);
          } else {
            alert(`Code not found :(`);
          }
        },
      });

    // if (discount === 'not found') {
    // }
  }
}
