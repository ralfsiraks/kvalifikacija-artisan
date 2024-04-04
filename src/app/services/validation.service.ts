import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
	providedIn: 'root',
})
export class ValidationService {
	constructor() {}

	static notOnlyWhitespace(control: AbstractControl): { [key: string]: boolean } | null {
		if (control.value && control.value.trim().length === 0) {
			return { whitespace: true };
		}
		return null;
	}

	static passwordPattern(control: AbstractControl): { [key: string]: boolean } | null {
		// Regular expression for password pattern: At least one lowercase, one uppercase, one digit, and 8 or more characters
		if (control.value && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(control.value)) {
			return { invalidPassword: true };
		}
		return null;
	}
}
