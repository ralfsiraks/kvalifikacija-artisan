import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'price',
	standalone: true,
})
export class PricePipe implements PipeTransform {
	transform(value: number, ...args: unknown[]): string {
		if (value == null || isNaN(value)) {
			return '';
		}
		// Convert cents to dollars
		const dollars = value / 100;
		// Format the number with two decimal places
		return dollars.toFixed(2);
	}
}
