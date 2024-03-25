import { TitleCasePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { ToastComponent } from './components/toast/toast.component';
import { AuthService } from './services/auth.service';
import { CartService } from './services/cart.service';
import { CheckoutService } from './services/checkout.service';
import { HistoryService } from './services/history.service';
import { ProductService } from './services/product.service';
import { ToastService } from './services/toast.service';

@Component({
	selector: 'app-root',
	standalone: true,
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	encapsulation: ViewEncapsulation.Emulated,
	imports: [
		RouterOutlet,
		RouterLink,
		HeaderComponent,
		FooterComponent,
		LoginModalComponent,
		HttpClientModule,
		ToastComponent,
	],
	providers: [
		CookieService,
		CartService,
		AuthService,
		ToastService,
		ProductService,
		CheckoutService,
		HistoryService,
		TitleCasePipe,
	],
})
export class AppComponent {
	title = 'artisan';
}
