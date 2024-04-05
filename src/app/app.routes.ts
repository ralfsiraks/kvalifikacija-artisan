import { Routes } from '@angular/router';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { HelpPageComponent } from './components/help-page/help-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { PasswordModalComponent } from './components/password-modal/password-modal.component';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { UserPageComponent } from './components/user-page/user-page.component';

export const routes: Routes = [
	{
		path: '',
		title: 'Artisan - Digital Art and Design',
		component: HomePageComponent,
	},
	{ path: 'cart', title: 'My Cart', component: CartPageComponent },
	{
		path: 'auth/:method',
		component: LoginModalComponent,
		outlet: 'modals',
	},
	{
		path: 'password',
		component: PasswordModalComponent,
		outlet: 'modals',
	},
	{
		path: 'catalog',
		title: 'Catalog',
		component: CatalogComponent,
	},
	{
		path: 'search/:query',
		title: 'Catalog',
		component: CatalogComponent,
	},
	{
		path: 'product/:id',
		component: ProductPageComponent,
	},
	{
		path: 'user/:mode',
		component: UserPageComponent,
	},
	{
		path: 'user/:mode/:id',
		component: UserPageComponent,
	},
	{
		path: 'help',
		title: 'Help',
		component: HelpPageComponent,
	},
	{ path: '**', redirectTo: '' },
];
