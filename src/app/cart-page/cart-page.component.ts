import { Component } from '@angular/core';
import { CartItemComponent } from '../cart-item/cart-item.component';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CartItemComponent],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss',
})
export class CartPageComponent {}
