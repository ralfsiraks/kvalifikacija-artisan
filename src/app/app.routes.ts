import { Routes } from '@angular/router';
import { CartPageComponent } from './cart-page/cart-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginModalComponent } from './login-modal/login-modal.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Artisan - digital art and design',
    component: HomePageComponent,
  },
  { path: 'cart', title: 'My Cart', component: CartPageComponent },
  {
    path: 'auth/:method',
    component: LoginModalComponent,
    outlet: 'modals',
  },
  { path: '**', redirectTo: '' },
];
