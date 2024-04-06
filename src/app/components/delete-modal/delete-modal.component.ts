import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';
import { ValidationService } from '../../services/validation.service';

@Component({
	selector: 'app-delete-modal',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule],
	templateUrl: './delete-modal.component.html',
	styleUrl: './delete-modal.component.scss',
})
export class DeleteModalComponent {
	@ViewChild('modalContainer') modalContainer: ElementRef;
	deleteForm: FormGroup = new FormGroup({
		password: new FormControl('', [Validators.required, ValidationService.notOnlyWhitespace]),
	});

	constructor(private router: Router, private authService: AuthService, private toastService: ToastService) {}

	onCloseModal(container: HTMLDivElement): void {
		container.classList.add(`fade-out`);
		setTimeout(() => {
			const urlTree = this.router.parseUrl(this.router.url);

			// Remove the named outlet segment from the URL tree
			delete urlTree.root.children['modals'];

			// Serialize the modified URL tree back to a string URL
			const url = this.router.serializeUrl(urlTree);

			// Navigate to the modified URL
			this.router.navigateByUrl(url);
		}, 400);
	}

	onDeleteSubmit() {
		if (this.deleteForm.valid) {
			const password = this.deleteForm.get(`password`).value;
			this.authService
				.onDeleteAccount(password)
				.pipe(take(1))
				.subscribe({
					next: (data: any) => {
						console.log(data);
						// this.toastService.onShowAlert(`check_circle`, `Account deleted`, `#74b816`);
						// this.onCloseModal(this.modalContainer.nativeElement);
					},
					error: (err) => {
						console.log(err.error);
						if (err.status === 400) {
							this.toastService.onShowAlert(`error`, `Password is incorrect!`, `#FF8333`);
						}
					},
				});
		}
	}
}
