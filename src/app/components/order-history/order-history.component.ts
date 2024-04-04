import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { take } from 'rxjs';
import { OrderHistory } from '../../interfaces/order-history';
import { DateFormatPipe } from '../../pipes/date-format.pipe';
import { HistoryService } from '../../services/history.service';
import { ToastService } from '../../services/toast.service';

@Component({
	selector: 'app-order-history',
	standalone: true,
	imports: [DateFormatPipe, RouterLink, CommonModule],
	templateUrl: './order-history.component.html',
	styleUrl: './order-history.component.scss',
})
export class OrderHistoryComponent implements OnInit {
	orders: OrderHistory[] = [];
	orderPrices: number[] = [];
	loading: boolean;

	constructor(private historyService: HistoryService, private toastService: ToastService, private router: Router) {}

	ngOnInit(): void {
		this.loading = true;
		this.historyService
			.getOrderHistory(localStorage.getItem(`token`))
			.pipe(take(1))
			.subscribe({
				next: (data: any) => {
					this.orders = data;
					this.getOrderPrices(data);
					this.loading = false;
				},
				error: (err: any) => {
					if (err.status === 401) {
						this.router.navigate(['/']);
						this.toastService.onShowAlert(`error`, `Please log in!`, `#FF8333`);
					}
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
			}
		});
	}
}
