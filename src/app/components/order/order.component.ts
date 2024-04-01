import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { take } from 'rxjs';
import { Order } from '../../interfaces/order';
import { DateFormatPipe } from '../../pipes/date-format.pipe';
import { HistoryService } from '../../services/history.service';
import { OrderSkeletonComponent } from '../skeletons/order-skeleton/order-skeleton.component';

@Component({
	selector: 'app-order',
	standalone: true,
	imports: [CommonModule, RouterLink, DateFormatPipe, OrderSkeletonComponent],
	templateUrl: './order.component.html',
	styleUrl: './order.component.scss',
})
export class OrderComponent implements OnInit {
	orderId: number;
	order: Order;
	artworkPrice: number;
	discount: number = 0;
	finalPrice: number;
	loading: boolean;

	constructor(private historyService: HistoryService, private route: ActivatedRoute) {}

	ngOnInit(): void {
		this.orderId = +this.route.snapshot.paramMap.get('id');

		this.loading = true;
		this.historyService
			.getOrder(localStorage.getItem(`token`), this.orderId)
			.pipe(take(1))
			.subscribe({
				next: (value: Order) => {
					this.order = value;
					this.getPrices(value);
					this.loading = false;
				},
				error: (error): any => {
					this.loading = false;
				},
			});
	}

	getPrices(order: Order) {
		let artwork: number = 0;

		order.ordered_products.forEach((e) => {
			artwork += e.price;
		});

		if (order.discount_id > 0) {
			this.discount = order.discount_code.amount;
			const discount: string = `0.${100 - this.discount}`;
			this.finalPrice = +((artwork + 1.45) * +discount).toFixed(2);
		} else {
			this.finalPrice = artwork + 1.45;
		}

		this.artworkPrice = artwork;
	}
}
