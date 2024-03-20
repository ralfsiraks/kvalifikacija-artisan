import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'dateFormat',
	standalone: true,
})
export class DateFormatPipe implements PipeTransform {
	transform(value: string): string {
		if (!value) {
			return '';
		}
		const parts = value.split('-');
		if (parts.length !== 3) {
			return value;
		}
		const [year, month, day] = parts;
		return `${year}.${month}.${day}`;
	}
}
