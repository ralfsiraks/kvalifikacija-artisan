import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { OrderHistory } from '../../interfaces/order-history';
import { DateFormatPipe } from '../../pipes/date-format.pipe';
import { HistoryService } from '../../services/history.service';

@Component({
	selector: 'app-order-history',
	standalone: true,
	imports: [DateFormatPipe],
	templateUrl: './order-history.component.html',
	styleUrl: './order-history.component.scss',
})
export class OrderHistoryComponent implements OnInit {
	orders: OrderHistory[] = [];
	orderPrices: number[] = [];
	loading: boolean;

	constructor(private historyService: HistoryService) {}

	ngOnInit(): void {
		this.loading = true;
		this.historyService
			.getOrderHistory(localStorage.getItem(`token`))
			.pipe(take(1))
			.subscribe({
				next: (data: any) => {
					console.log(data);
					this.orders = data;
					this.getOrderPrices(data);
					this.loading = false;
				},
				error: (error: any) => {
					this.loading = false;
				},
			});
	}

	getOrderPrices(orders: OrderHistory[]): void {
		orders.forEach((e) => {
			let totalPrice: number = 1.45;
			e.ordered_products.forEach((e) => {
				totalPrice += e.price;
			});
			if (e.discount_amount === 0) {
				this.orderPrices.push(+totalPrice.toFixed(2));
			} else {
				const discount: string = `0.${100 - e.discount_amount}`;
				const discountedPrice = +(totalPrice * +discount).toFixed(2);
				this.orderPrices.push(discountedPrice);
				console.log(`before discount: ${totalPrice}`);
				console.log(`discounted: ${discountedPrice}`);
			}
		});
		console.log(this.orderPrices);
	}
}
