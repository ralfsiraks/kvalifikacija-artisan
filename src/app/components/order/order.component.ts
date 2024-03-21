import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { take } from 'rxjs';
import { Order } from '../../interfaces/order';
import { HistoryService } from '../../services/history.service';

@Component({
	selector: 'app-order',
	standalone: true,
	imports: [CommonModule, RouterLink],
	templateUrl: './order.component.html',
	styleUrl: './order.component.scss',
})
export class OrderComponent implements OnInit {
	orderId: number;
	order: Order;
	artworkPrice: number;
	discount: number = 0;
	finalPrice: number;

	constructor(private historyService: HistoryService, private route: ActivatedRoute) {}

	ngOnInit(): void {
		this.orderId = +this.route.snapshot.paramMap.get('id');

		this.historyService
			.getOrder(localStorage.getItem(`token`), this.orderId)
			.pipe(take(1))
			.subscribe({
				next: (value: Order) => {
					this.order = value;
					this.getPrices(value);
					console.log(value);
				},
				error: (error): any => {
					console.log(`big error`);
				},
			});
	}

	getPrices(order: Order) {
		let artwork: number = 0;
		if (order.discount_id > 0) {
			this.discount = order.discount_code.amount;
		}

		order.ordered_products.forEach((e) => {
			console.log(e.price);
			artwork += e.price;
		});

		this.artworkPrice = artwork;
		const discount: string = `0.${100 - this.discount}`;
		this.finalPrice = +((artwork + 1.45) * +discount).toFixed(2);
	}
}
