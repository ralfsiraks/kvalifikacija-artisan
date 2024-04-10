import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { take } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';

@Component({
	selector: 'app-product-page',
	standalone: true,
	imports: [CommonModule, RouterLink],
	templateUrl: './product-page.component.html',
	styleUrl: './product-page.component.scss',
})
export class ProductPageComponent implements OnInit {
	productId: number;
	error: string;
	title: string;
	artist: string;
	height: number;
	width: number;
	category: string;
	desc: string;
	imageUrl: string;
	price: number;
	oldPrice: number;
	loading: boolean;

	constructor(
		private route: ActivatedRoute,
		private productService: ProductService,
		private cartService: CartService
	) {}

	ngOnInit(): void {
		this.productId = +this.route.snapshot.paramMap.get('id');
		this.loading = true;
		this.productService
			.getProduct(this.productId)
			.pipe(take(1))
			.subscribe({
				next: (value) => {
					this.title = value.title;
					this.artist = value.artist;
					this.width = value.width;
					this.height = value.height;
					this.desc = value.description;
					this.imageUrl = value.image_url;
					this.category = value.category_title;
					this.price = value.price;
					this.oldPrice = value.old_price;
					window.scrollTo(0, 0);
					this.loading = false;
				},
				error: (err) => {
					console.log(err.error);
					this.error = err.error;
					this.loading = false;
				},
			});
	}

	onAddToCart(): void {
		this.cartService.addItem(this.productId);
	}
}
