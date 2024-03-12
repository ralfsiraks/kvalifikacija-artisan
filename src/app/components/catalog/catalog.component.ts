import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { take } from 'rxjs';
import { Pagination } from '../../interfaces/pagination';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { CatalogItemComponent } from '../catalog-item/catalog-item.component';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CatalogItemComponent, RouterLink, CommonModule],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss',
})
export class CatalogComponent implements OnInit {
  category: string;
  page: number;
  lastPage: number;
  catalogItems: Product[][] = [[], [], [], []];
  loading: boolean = true;
  pagination: number[] = [];
  lastPagePagination: boolean;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.category = params.get('category');
      this.page = +params.get('page');
    });
    console.log(`page: ${this.page}`);

    this.onGetCatalog();
  }

  onGetCatalog() {
    this.loading = true;
    this.productService
      .getCatalog(this.category, this.page)
      .pipe(take(1))
      .subscribe({
        next: (value: Pagination) => {
          value.data.forEach((item, i) => {
            const columnIndex = i % 4;
            this.catalogItems[columnIndex].push(item);
          });
          this.onConfigurePagination(value);
          this.loading = false;
        },
      });
  }

  onChangePage(changeTo: string | number): void {
    if (changeTo === `next`) {
      if (this.page < this.lastPage) {
        this.page++;
        this.router.navigate([`/catalog/${this.category}`, this.page]);
        this.catalogItems = [[], [], [], []];
        this.onGetCatalog();
      }
    } else if (changeTo === `previous`) {
      if (this.page > 1) {
        this.page--;
        this.router.navigate([`/catalog/${this.category}`, this.page]);
        this.catalogItems = [[], [], [], []];
        this.onGetCatalog();
      }
    } else {
      this.page = +changeTo;
      this.router.navigate([`/catalog/${this.category}`, this.page]);
      this.catalogItems = [[], [], [], []];
      this.onGetCatalog();
    }
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

    console.log(this.pagination);
  }
}
