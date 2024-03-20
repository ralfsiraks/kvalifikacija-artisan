import { Component, Input } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
	selector: 'app-cart-item',
	standalone: true,
	imports: [],
	templateUrl: './cart-item.component.html',
	styleUrl: './cart-item.component.scss',
})
export class CartItemComponent {
	@Input() id: number;
	@Input() imageUrl: string;
	@Input() artworkName: string;
	@Input() size: string;
	@Input() artistName: string;
	@Input() price: number;

	constructor(private cartService: CartService) {}

	onItemRemove(bagItem: HTMLElement, id: number): void {
		this.cartService.removeItem(id);
		const hr = bagItem.parentElement.nextElementSibling;
		if (hr instanceof HTMLHRElement) {
			bagItem.parentElement.nextElementSibling.remove();
		}
		bagItem.parentElement.remove();
		this.cartService.decrementCartCount();
	}
}
