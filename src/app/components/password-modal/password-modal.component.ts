import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';
import { ValidationService } from '../../services/validation.service';

@Component({
	selector: 'app-password-modal',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule],
	templateUrl: './password-modal.component.html',
	styleUrl: './password-modal.component.scss',
})
export class PasswordModalComponent {
	@ViewChild('modalContainer') modalContainer: ElementRef;
	passwordForm: FormGroup = new FormGroup({
		oldPassword: new FormControl('', [Validators.required, ValidationService.notOnlyWhitespace, ValidationService.passwordPattern]),
		newPassword: new FormControl('', [Validators.required, ValidationService.notOnlyWhitespace, ValidationService.passwordPattern]),
		newPasswordAgain: new FormControl('', [Validators.required, ValidationService.notOnlyWhitespace, ValidationService.passwordPattern]),
	});

	constructor(private router: Router, private authService: AuthService, private toastService: ToastService) {}

	// Aizver dialoga kasti
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

	// Veic pārbaudes un nosūta abas ievadītās paroles uz back-end pārbaudīšanai un/vai paroles maiņai
	onPasswordSubmit(): void {
		if (this.passwordForm.valid) {
			const oldPassword = this.passwordForm.get(`oldPassword`).value;
			const newPassword = this.passwordForm.get(`newPassword`).value;
			const newPasswordAgain = this.passwordForm.get(`newPasswordAgain`).value;

			if (oldPassword === newPassword) {
				this.toastService.onShowAlert(`error`, `Current and new passwords shouldn't match!`, `#FF8333`);
				return;
			}

			if (newPassword !== newPasswordAgain) {
				this.toastService.onShowAlert(`error`, `New passwords don't match!`, `#FF8333`);
			} else {
				this.authService
					.onChangePassword(oldPassword, newPassword)
					.pipe(take(1))
					.subscribe({
						next: (data: any) => {
							this.toastService.onShowAlert(`check_circle`, `Password updated!`, `#74b816`);
							this.onCloseModal(this.modalContainer.nativeElement);
						},
						error: (err) => {
							console.log(err.error);
							if (err.status === 400) {
								this.toastService.onShowAlert(`error`, `Current password is incorrect!`, `#FF8333`);
							}
						},
					});
			}
		}
	}
}
