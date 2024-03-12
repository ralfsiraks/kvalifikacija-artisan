import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoryCardComponent } from '../category-card/category-card.component';
import { MainBannerComponent } from '../main-banner/main-banner.component';
import { SaleBannerComponent } from '../sale-banner/sale-banner.component';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    CategoryCardComponent,
    MainBannerComponent,
    SaleBannerComponent,
    ToastComponent,
    RouterLink,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {}
