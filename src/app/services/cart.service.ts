import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DiscountCode } from '../interfaces/discount-code';
import { Product } from '../interfaces/product';
import { ToastService } from './toast.service';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  readonly ROOT_URL = environment.apiUrl;
  private cartSubject = new BehaviorSubject<[]>(null);
  public cart$ = this.cartSubject.asObservable();
  private cartCountSubject = new BehaviorSubject<number>(
    JSON.parse(localStorage.getItem(`cart`))?.length
  );
  public cartCount$ = this.cartCountSubject.asObservable();

  constructor(private http: HttpClient, private toastService: ToastService) {}

  checkCode(code: string): Observable<object> {
    return this.http.get<DiscountCode[]>(this.ROOT_URL + '/code', {
      headers: new HttpHeaders({
        code: code,
      }),
    });
  }

  getCart(cart: number[]): Observable<object> {
    return this.http.get<Product[]>(this.ROOT_URL + '/cart', {
      headers: new HttpHeaders({
        cart: JSON.stringify(cart),
      }),
    });
  }

  addItem(id: number) {
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
      this.toastService.onShowAlert(
        `add_shopping_cart`,
        `Item added to cart!`,
        `#74b816`
      );
    } else {
      this.toastService.onShowAlert(
        `shopping_cart_off`,
        `Item is already in the cart!`,
        `#FF8333`
      );
    }
  }

  removeItem(id: number) {
    const idArr = JSON.parse(localStorage.getItem(`cart`));
    const index = idArr.indexOf(id);
    if (index !== -1) {
      idArr.splice(index, 1);
    }
    localStorage.setItem(`cart`, JSON.stringify(idArr));
    this.cartSubject.next([]);
  }

  incrementCartCount() {
    const currentCount = this.cartCountSubject.getValue();
    this.cartCountSubject.next(currentCount + 1);
  }

  decrementCartCount() {
    const currentCount = this.cartCountSubject.getValue();
    if (currentCount > 0) {
      this.cartCountSubject.next(currentCount - 1);
    }
  }
}
