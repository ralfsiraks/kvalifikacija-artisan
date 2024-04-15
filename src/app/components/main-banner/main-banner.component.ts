import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-main-banner',
	standalone: true,
	imports: [RouterLink],
	templateUrl: './main-banner.component.html',
	styleUrl: './main-banner.component.scss',
})
export class MainBannerComponent {}
