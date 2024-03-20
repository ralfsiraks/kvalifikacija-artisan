import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ToastService {
	private toastSubject = new BehaviorSubject<[string, string, string]>([``, ``, ``]);
	public toast = this.toastSubject.asObservable();

	constructor() {}

	onShowAlert(icon: string, message: string, color: string): void {
		this.toastSubject.next([icon, message, color]);
	}
}
