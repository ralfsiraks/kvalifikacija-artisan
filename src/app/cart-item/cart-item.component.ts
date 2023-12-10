import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss',
})
export class CartItemComponent {
  @Input() imageUrl: string = ``;
  @Input() artworkName: string = ``;
  @Input() size: string = ``;
  @Input() artistName: string = ``;
  @Input() price: string = ``;
}
