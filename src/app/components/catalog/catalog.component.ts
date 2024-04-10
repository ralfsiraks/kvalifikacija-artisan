import { CommonModule } from '@angular/common';
import {
	AfterViewInit,
	Component,
	ElementRef,
	OnDestroy,
	OnInit,
	QueryList,
	ViewChild,
	ViewChildren,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { Pagination } from '../../interfaces/pagination';
import { Product } from '../../interfaces/product';
import { CategoryFormatPipe } from '../../pipes/category-format.pipe';
import { ProductService } from '../../services/product.service';
import { ToastService } from '../../services/toast.service';
import { CatalogItemComponent } from '../catalog-item/catalog-item.component';
import { CatalogSkeletonComponent } from '../skeletons/catalog-skeleton/catalog-skeleton.component';

@Component({
	selector: 'app-catalog',
	standalone: true,
	imports: [CatalogItemComponent, RouterLink, CommonModule, CatalogSkeletonComponent, CategoryFormatPipe],
	templateUrl: './catalog.component.html',
	styleUrl: './catalog.component.scss',
})
export class CatalogComponent implements OnInit, OnDestroy, AfterViewInit {
	category: string = `all`;
	page: number = 1;
	lastPage: number;
	catalogItems: Product[][] = [[], [], [], []];
	loading: boolean = true;
	pagination: number[] = [];
	lastPagePagination: boolean;
	sortBy: string = `id_desc`;
	search: string;
	minP: number;
	maxP: number;
	height: string;
	width: string;
	@ViewChild('minprice') minPRef: ElementRef;
	@ViewChild('maxprice') maxPRef: ElementRef;
	@ViewChild('sort_by') sortByRef: ElementRef;
	@ViewChildren(`mheight, sheight, lheight, xlheight`) heightRefs: QueryList<ElementRef>;
	@ViewChildren(`mwidth, swidth, lwidth, xlwidth`) widthRefs: QueryList<ElementRef>;

	private routeSubscription: Subscription;

	constructor(
		private productService: ProductService,
		private router: Router,
		private route: ActivatedRoute,
		private toastService: ToastService
	) {}

	ngOnInit(): void {
		this.routeSubscription = this.route.queryParams.subscribe((params) => {
			this.category = params['category'] ? params['category'] : `all`;
			this.page = +params['page'] ? +params['page'] : 1;
			this.sortBy = params['sort'] ? params['sort'] : `id_desc`;
			this.search = params['search'];
			if (/^[1-9]\d*$/.test(params[`minP`])) {
				this.minP = params['minP'];
			} else if (/^[1-9]\d*$/.test(params[`maxP`])) {
				this.maxP = params['maxP'];
			}
			this.height = params['h'];
			this.width = params['w'];
			this.onGetCatalog();
		});
	}

	ngAfterViewInit(): void {
		// Set filter values from URL
		if (this.minP) {
			this.minPRef.nativeElement.value = this.minP;
			this.onPriceParams(`minP`, this.minPRef.nativeElement);
		}
		if (this.maxP) {
			this.maxPRef.nativeElement.value = this.maxP;
			this.onPriceParams(`maxP`, this.maxPRef.nativeElement);
		}

		this.onSortChange(this.sortBy);

		this.heightRefs.forEach((e) => {
			if (e.nativeElement.value === this.height) {
				e.nativeElement.checked = true;
			}
		});

		this.widthRefs.forEach((e) => {
			if (e.nativeElement.value === this.width) {
				e.nativeElement.checked = true;
			}
		});
	}

	onGetCatalog(): void {
		this.catalogItems = [[], [], [], []];
		this.loading = true;
		this.productService
			.getCatalog(this.category, this.page, this.sortBy, this.search, this.minP, this.maxP, this.height, this.width)
			.pipe(take(1))
			.subscribe({
				next: (value: Pagination) => {
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
					console.log(`no product found error`);
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

	onConfigurePagination(value: Pagination): void {
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
		this.sortBy = sort;
		this.sortByRef.nativeElement.value = sort;
		console.log(this.sortBy);
		this.onChangeRouteParam([`sort`, `page`], [this.sortBy, 1]);
	}

	onChangeRouteParam(params: string[], value: (string | number)[]): void {
		const currentParams = { ...this.route.snapshot.queryParams };
		params.forEach((e, index) => {
			currentParams[e] = value[index];
		});
		this.router.navigate([], {
			relativeTo: this.route,
			queryParams: currentParams,
			queryParamsHandling: 'merge', // Preserve existing query parameters
		});
	}

	onDeleteRouteParam(params: string[]): void {
		const currentParams = { ...this.route.snapshot.queryParams };
		params.forEach((e) => {
			delete currentParams[e];
		});

		this.router.navigate([], {
			relativeTo: this.route,
			queryParams: currentParams,
			queryParamsHandling: '',
		});
	}

	onPriceParams(param: string, input: HTMLInputElement): void {
		const val = input.value;

		if (!/^[1-9]\d*$/.test(val)) {
			input.value = '';
			this.toastService.onShowAlert(`error`, `Invalid number entered!`, `#FF8333`);
			this.onDeleteRouteParam([param]);
			this[param] = 0;
			return;
		}

		if (+val !== this[param]) {
			this[param] = +val;
			this.onChangeRouteParam([param], [this[param]]);
			input.value = val;
		}
	}

	onChangeSize(param: string, input: HTMLInputElement): void {
		const val = input.value;

		if (val === `off`) {
			this.onDeleteRouteParam([param]);
		} else {
			if (param === `h`) {
				if (val !== this.height) {
					this.height = val;
					this.onChangeRouteParam([param], [this.height]);
				}
			} else if (param === `w`) {
				if (val !== this.width) {
					this.width = val;
					this.onChangeRouteParam([param], [this.width]);
				}
			}
		}
	}

	ngOnDestroy(): void {
		if (this.routeSubscription) {
			this.routeSubscription.unsubscribe();
		}
	}
}
