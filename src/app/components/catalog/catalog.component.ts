import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { Pagination } from '../../interfaces/pagination';
import { Product } from '../../interfaces/product';
import { CategoryFormatPipe } from '../../pipes/category-format.pipe';
import { ProductService } from '../../services/product.service';
import { CatalogItemComponent } from '../catalog-item/catalog-item.component';
import { CatalogSkeletonComponent } from '../skeletons/catalog-skeleton/catalog-skeleton.component';

@Component({
	selector: 'app-catalog',
	standalone: true,
	imports: [CatalogItemComponent, RouterLink, CommonModule, CatalogSkeletonComponent, CategoryFormatPipe],
	templateUrl: './catalog.component.html',
	styleUrl: './catalog.component.scss',
})
export class CatalogComponent implements OnInit, OnDestroy {
	category: string = `all`;
	page: number = 2;
	lastPage: number;
	catalogItems: Product[][] = [[], [], [], []];
	loading: boolean = true;
	pagination: number[] = [];
	lastPagePagination: boolean;
	sortBy: string = `id`;
	sortOrder: string = `desc`;
	search: string;
	private routeSubscription: Subscription;

	constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) {}

	ngOnInit(): void {
		this.routeSubscription = this.route.queryParams.subscribe((params) => {
			this.category = params['category'] ? params['category'] : `all`;
			this.page = +params['page'] ? +params['page'] : 1;
			this.sortBy = params['sort_by'] ? params['sort_by'] : `id`;
			this.sortOrder = params['sort_order'] ? params['sort_order'] : `desc`;
			this.search = params['search'];
			console.log(`search: ${this.search}`);
			this.onGetCatalog();
		});
	}

	onGetCatalog() {
		this.catalogItems = [[], [], [], []];
		this.loading = true;
		this.productService
			.getCatalog(this.category, this.page, this.sortBy, this.sortOrder, this.search)
			.pipe(take(1))
			.subscribe({
				next: (value: Pagination) => {
					console.log(value);
					if (value.data.length > 0) {
						value.data.forEach((item, i) => {
							const columnIndex = i % 4;
							this.catalogItems[columnIndex].push(item);
						});
						this.onConfigurePagination(value);
					}
					window.scrollTo(0, 0);
					this.loading = false;
				},
				error: (error: any) => {
					console.log(`no product found`);
					this.loading = false;
				},
			});
	}

	onChangePage(changeTo: string | number): void {
		if (changeTo === `next`) {
			if (this.page < this.lastPage) {
				this.page++;
			}
		} else if (changeTo === `previous`) {
			if (this.page > 1) {
				this.page--;
			}
		} else {
			this.page = +changeTo;
			this.catalogItems = [[], [], [], []];
		}
		this.onChangeRouteParam([`page`], [this.page]);
	}

	onConfigurePagination(value: Pagination) {
		this.page = value.current_page;
		this.lastPage = value.last_page;

		if (this.page === 1 || this.page === 2) {
			if (this.lastPage === 1) {
				this.pagination = [1];
			} else if (this.lastPage === 2) {
				this.pagination = [1, 2];
			} else {
				this.pagination = [1, 2, 3];
			}
		} else if (this.page > 1 && this.lastPage !== this.page) {
			this.pagination = [this.page - 1, this.page, this.page + 1];
		} else if (this.page > 1 && this.lastPage === this.page) {
			this.pagination = [this.page - 2, this.page - 1, this.page];
		}
	}

	onSortChange(sort: string): void {
		if (sort === `new`) {
			this.sortBy = `id`;
			this.sortOrder = `desc`;
		} else if (sort === `a-z`) {
			this.sortBy = `title`;
			this.sortOrder = `asc`;
		} else if (sort === `z-a`) {
			this.sortBy = `title`;
			this.sortOrder = `desc`;
		} else if (sort === `low-high`) {
			this.sortBy = `price`;
			this.sortOrder = `asc`;
		} else if (sort === `high-low`) {
			this.sortBy = `price`;
			this.sortOrder = `desc`;
		}
		this.onChangeRouteParam([`sort_by`, `sort_order`], [this.sortBy, this.sortOrder]);
		// this.onChangeRouteParam(`sort_order`, this.sortOrder);
		// this.onChangeRouteParam(`page`, 1);
		// this.onGetCatalog();
	}

	onChangeRouteParam(param: string[], value: (string | number)[]) {
		const currentParams = { ...this.route.snapshot.queryParams };
		param.forEach((e, index) => {
			currentParams[e] = value[index];
		});
		this.router.navigate([], {
			relativeTo: this.route,
			queryParams: currentParams,
			queryParamsHandling: 'merge', // Preserve existing query parameters
		});
		console.log(`just set ${param}`);
	}

	ngOnDestroy(): void {
		if (this.routeSubscription) {
			this.routeSubscription.unsubscribe();
		}
	}
}
