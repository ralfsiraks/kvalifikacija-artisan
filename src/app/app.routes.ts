import { Routes } from '@angular/router';
import { CartPageComponent } from './cart-page/cart-page.component';
import { HomePageComponent } from './home-page/home-page.component';

export const routes: Routes = [
  { path: 'home', title: 'Home', component: HomePageComponent },
  { path: 'cart', title: 'My Cart', component: CartPageComponent },
  { path: '**', redirectTo: 'home' },
];
