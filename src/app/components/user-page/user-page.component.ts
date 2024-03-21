import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OrderHistoryComponent } from '../order-history/order-history.component';
import { OrderComponent } from '../order/order.component';
import { UserInfoComponent } from '../user-info/user-info.component';

@Component({
	selector: 'app-user-page',
	standalone: true,
	imports: [CommonModule, UserInfoComponent, OrderHistoryComponent, OrderComponent, RouterLink],
	templateUrl: './user-page.component.html',
	styleUrl: './user-page.component.scss',
})
export class UserPageComponent implements OnInit {
	mode: string;
	orderId: number;

	constructor(private route: ActivatedRoute) {}

	ngOnInit(): void {
		this.mode = this.route.snapshot.paramMap.get('mode');
		this.orderId = +this.route.snapshot.paramMap.get('id');
	}
}
