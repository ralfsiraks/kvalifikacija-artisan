import { TitleCasePipe } from '@angular/common';
import { Inject, Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'categoryFormat',
	standalone: true,
})
export class CategoryFormatPipe implements PipeTransform {
	constructor(@Inject(TitleCasePipe) private titleCasePipe: TitleCasePipe) {}

	transform(value: string): string {
		if (!value) return ''; // If value is falsy, return empty string

		// Replace underscores with spaces
		let transformedValue = value.replace(/_/g, ' ');

		transformedValue = this.titleCasePipe.transform(transformedValue);

		// If value is 'all', return 'all products'
		if (transformedValue.toLowerCase() === 'all') {
			return 'All Products';
		} else if (transformedValue.toLowerCase() === 'ai art') {
			return `AI Art`;
		}

		// Use Angular's built-in title case pipe for capitalization
		return transformedValue;
	}
}
