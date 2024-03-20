import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastService } from '../../services/toast.service';

@Component({
	selector: 'app-toast',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './toast.component.html',
	styleUrl: './toast.component.scss',
})
export class ToastComponent implements OnInit {
	icon: string = ``;
	message: string = ``;
	color: string = ``;
	timer: any;
	@ViewChild('toast') toastElement: ElementRef;

	constructor(private toastService: ToastService) {}

	ngOnInit() {
		this.toastService.toast.subscribe((toastArray) => {
			this.icon = toastArray[0];
			this.message = toastArray[1];
			this.color = toastArray[2];
			if (this.icon && this.message && this.color) {
				this.onPlayAlert();
			}
		});
	}

	onPlayAlert() {
		const classes: Array<string> = [...this.toastElement.nativeElement.classList];
		if (classes.includes(`toast-fade`)) {
			this.toastElement.nativeElement.classList.add(`text-${this.color}`);
			this.toastElement.nativeElement.style.animation = 'none';
			this.toastElement.nativeElement.offsetHeight;
			this.toastElement.nativeElement.style.animation = null;
		} else {
			this.toastElement.nativeElement.classList.add(`toast-fade`);
		}
	}
}
