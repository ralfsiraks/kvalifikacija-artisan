import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-category-card',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './category-card.component.html',
	styleUrl: './category-card.component.scss',
})
export class CategoryCardComponent {
	@Input() imageUrl: string = ``;
	@Input() category: string = ``;
}
