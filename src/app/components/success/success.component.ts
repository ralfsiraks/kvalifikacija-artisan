import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { take } from 'rxjs';
import { StripeSession } from '../../interfaces/stripe-session';
import { PricePipe } from '../../pipes/price.pipe';
import { CartService } from '../../services/cart.service';
import { CheckoutService } from '../../services/checkout.service';
import { ToastService } from '../../services/toast.service';

@Component({
	selector: 'app-success',
	standalone: true,
	imports: [CommonModule, PricePipe, RouterLink],
	templateUrl: './success.component.html',
	styleUrl: './success.component.scss',
})
export class SuccessComponent implements OnInit {
	sessionId: string;
	loading: boolean = false;
	session: StripeSession;

	constructor(
		private checkoutService: CheckoutService,
		private route: ActivatedRoute,
		private router: Router,
		private cartService: CartService,
		private toastService: ToastService
	) {}

	ngOnInit(): void {
		this.sessionId = this.route.snapshot.queryParams['session'];
		if (!this.sessionId) {
			this.router.navigate(['/']);
		} else {
			this.getSession();
		}
	}

	getSession(): void {
		this.loading = true;
		this.checkoutService
			.onGetSession(this.sessionId)
			.pipe(take(1))
			.subscribe({
				next: (data: StripeSession) => {
					console.log(data);
					this.session = data;
					this.loading = false;
					this.cartService.cartReset();
				},
				error: (err) => {
					if (err.status === 401) {
						this.toastService.onShowAlert(`error`, `Please log in!`, `#FF8333`);
					} else if (err.status === 500) {
						this.toastService.onShowAlert(`dns`, `There's been a server error!`, `red`);
					}
					console.log(err.error);
					this.loading = false;
				},
			});
	}
}
