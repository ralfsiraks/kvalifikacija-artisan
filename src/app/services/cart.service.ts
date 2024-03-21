import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { DiscountCode } from '../interfaces/discount-code';
import { Product } from '../interfaces/product';
import { ToastService } from './toast.service';

@Injectable({
	providedIn: 'root',
})
export class CartService {
	readonly ROOT_URL = environment.apiUrl;
	private cartSubject = new BehaviorSubject<[]>(null);
	public cart$ = this.cartSubject.asObservable();
	private cartCountSubject = new BehaviorSubject<number>(JSON.parse(localStorage.getItem(`cart`))?.length || 0);
	public cartCount$ = this.cartCountSubject.asObservable();

	constructor(private http: HttpClient, private toastService: ToastService) {}

	checkCode(code: string): Observable<DiscountCode[]> {
		return this.http.get<DiscountCode[]>(this.ROOT_URL + '/code', {
			headers: new HttpHeaders({
				code: code,
			}),
		});
	}

	getCart(cart: number[]): Observable<Product[]> {
		return this.http.get<Product[]>(this.ROOT_URL + '/cart', {
			headers: new HttpHeaders({
				cart: JSON.stringify(cart),
			}),
		});
	}

	addItem(id: number): void {
		let cart = JSON.parse(localStorage.getItem(`cart`));
		if (cart === null) {
			cart = [];
		}
		// komentars
		const index = cart.indexOf(id);
		if (index === -1) {
			cart.push(id);
			localStorage.setItem(`cart`, JSON.stringify(cart));
			this.incrementCartCount();
			this.toastService.onShowAlert(`add_shopping_cart`, `Item added to cart!`, `#74b816`);
		} else {
			this.toastService.onShowAlert(`shopping_cart_off`, `Item is already in the cart!`, `#FF8333`);
		}
	}

	removeItem(id: number): void {
		const idArr = JSON.parse(localStorage.getItem(`cart`));
		const index = idArr.indexOf(id);
		if (index !== -1) {
			idArr.splice(index, 1);
		}
		localStorage.setItem(`cart`, JSON.stringify(idArr));
		this.cartSubject.next([]);
	}

	incrementCartCount(): void {
		const currentCount = this.cartCountSubject.getValue();
		this.cartCountSubject.next(currentCount + 1);
	}

	decrementCartCount(): void {
		const currentCount = this.cartCountSubject.getValue();
		if (currentCount > 0) {
			this.cartCountSubject.next(currentCount - 1);
		}
	}

	cartReset() {
		localStorage.setItem(`cart`, `[]`);
		this.cartCountSubject.next(0);
	}
}
