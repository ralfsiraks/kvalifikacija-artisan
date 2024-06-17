import { Routes } from '@angular/router';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { ContactPageComponent } from './components/contact-page/contact-page.component';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';
import { DeliveryPageComponent } from './components/delivery-page/delivery-page.component';
import { HelpPageComponent } from './components/help-page/help-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { PasswordModalComponent } from './components/password-modal/password-modal.component';
import { PoliciesPageComponent } from './components/policies-page/policies-page.component';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { SuccessComponent } from './components/success/success.component';
import { UserPageComponent } from './components/user-page/user-page.component';

export const routes: Routes = [
	{ path: '', title: 'Artisan - Digital Art and Design', component: HomePageComponent },
	{ path: 'cart', title: 'My Cart', component: CartPageComponent },
	{ path: 'success', title: 'Thank you!', component: SuccessComponent },
	{ path: 'auth/:method', component: LoginModalComponent, outlet: 'modals' },
	{ path: 'password', component: PasswordModalComponent, outlet: 'modals' },
	{ path: 'delete', component: DeleteModalComponent, outlet: 'modals' },
	{ path: 'catalog', title: 'Catalog', component: CatalogComponent },
	{ path: 'search/:query', title: 'Catalog', component: CatalogComponent },
	{ path: 'product/:id', component: ProductPageComponent },
	{ path: 'user/:mode', component: UserPageComponent },
	{ path: 'user/:mode/:id', component: UserPageComponent },
	{ path: 'help', title: 'Help', component: HelpPageComponent },
	{ path: 'about', title: 'About Us', component: AboutPageComponent },
	{ path: 'contact', title: 'Contact', component: ContactPageComponent },
	{ path: 'policies', title: 'Policies', component: PoliciesPageComponent },
	{ path: 'delivery', title: 'Delivery', component: DeliveryPageComponent },
	{ path: '**', redirectTo: '' },
];
