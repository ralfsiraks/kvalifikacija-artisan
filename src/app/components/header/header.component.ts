import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { take } from 'rxjs';
import { AuthObject } from '../../interfaces/auth-object';
import { User } from '../../interfaces/user';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { ToastService } from '../../services/toast.service';
import { LoginModalComponent } from '../login-modal/login-modal.component';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [RouterLink, LoginModalComponent, CommonModule, ReactiveFormsModule],
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
	token: string = '';
	userName: string;
	userSurname: string;
	cartCount: number;
	userId: number;
	searchForm: FormGroup = new FormGroup({
		search: new FormControl('', Validators.required),
	});

	constructor(
		private authService: AuthService,
		private router: Router,
		private cartService: CartService,
		private toastService: ToastService,
		private productService: ProductService
	) {}

	ngOnInit(): void {
		this.cartService.cartCount$.subscribe((data: number) => {
			this.cartCount = data;
		});
		this.token = localStorage.getItem(`token`);
		this.authService.token.subscribe((data: AuthObject) => {
			if (data) {
				this.token = data.token;
				this.userName = data.name;
				this.userSurname = data.surname;
			}
		});
		if (this.token) {
			this.authService
				.getUser(this.token)
				.pipe(take(1))
				.subscribe({
					next: (data: User) => {
						if (data.id && data.email) {
							this.userId = data.id;
							this.userName = localStorage.getItem(`name`);
							this.userSurname = localStorage.getItem(`surname`);
						}
					},
					error: (err) => {
						console.log(err.error);
						localStorage.removeItem(`token`);
						localStorage.removeItem(`name`);
						localStorage.removeItem(`surname`);
						this.token = '';
					},
				});
		}
	}

	onSearchSubmit(): void {
		const form = this.searchForm;
		if (form.get('search').value.trim() === ``) {
			this.toastService.onShowAlert(`error`, `Please enter a query!`, `#FF8333`);
			return;
		}
		this.router.navigate([`/catalog`], {
			queryParams: {
				category: `all`,
				page: 1,
				sort_by: `id`,
				sort_order: `desc`,
				search: form.get(`search`).value,
			},
		});
		form.reset();
	}

	onLogOut(): void {
		localStorage.removeItem(`token`);
		localStorage.removeItem(`name`);
		localStorage.removeItem(`surname`);
		this.token = ``;
	}
}
