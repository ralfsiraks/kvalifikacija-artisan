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
  sortBy: string = `id`;
  sortOrder: string = `desc`;

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
    this.catalogItems = [[], [], [], []];
    this.loading = true;
    this.productService
      .getCatalog(this.category, this.page, this.sortBy, this.sortOrder)
      .pipe(take(1))
      .subscribe({
        next: (value: Pagination) => {
          if (value.data.length > 0) {
            value.data.forEach((item, i) => {
              const columnIndex = i % 4;
              this.catalogItems[columnIndex].push(item);
            });
            this.onConfigurePagination(value);
            console.log(`happens`);
          } else {
            console.log(`no product found`);
          }

          this.loading = false;
        },
      });
  }

  onChangePage(changeTo: string | number): void {
    if (changeTo === `next`) {
      if (this.page < this.lastPage) {
        this.page++;
        this.router.navigate([`/catalog/${this.category}`, this.page]);
        this.onGetCatalog();
      }
    } else if (changeTo === `previous`) {
      if (this.page > 1) {
        this.page--;
        this.router.navigate([`/catalog/${this.category}`, this.page]);
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

  onSortChange(sort: string) {
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

    console.log(`${this.sortBy}, ${this.sortOrder}`);
    this.onGetCatalog();
  }
}
