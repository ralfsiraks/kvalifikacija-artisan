import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-catalog-item',
	standalone: true,
	imports: [CommonModule, RouterLink],
	templateUrl: './catalog-item.component.html',
	styleUrl: './catalog-item.component.scss',
})
export class CatalogItemComponent {
	@Input() title: string = `title`;
	@Input() height: number = 0.0;
	@Input() width: number = 0.0;
	@Input() price: number = 0.0;
	@Input() imageUrl: string;
	@Input() id: number;
	@Input() category: string;
	@Input() artist: string;

	constructor() {}
}
