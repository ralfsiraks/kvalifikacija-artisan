import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { take } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';
import { ValidationService } from '../../services/validation.service';

@Component({
	selector: 'app-login-modal',
	standalone: true,
	imports: [RouterLink, ReactiveFormsModule, CommonModule, HttpClientModule],
	templateUrl: './login-modal.component.html',
	styleUrl: './login-modal.component.scss',
})
export class LoginModalComponent implements OnInit {
	method: string = ``;

	registerForm: FormGroup = new FormGroup({
		name: new FormControl('', [Validators.required, ValidationService.notOnlyWhitespace]),
		surname: new FormControl('', [Validators.required, ValidationService.notOnlyWhitespace]),
		email: new FormControl('', [Validators.required, Validators.email, ValidationService.notOnlyWhitespace]),
		password: new FormControl('', [
			Validators.required,
			ValidationService.notOnlyWhitespace,
			ValidationService.passwordPattern,
		]),
	});

	loginForm: FormGroup = new FormGroup({
		email: new FormControl('', [Validators.required, Validators.email, ValidationService.notOnlyWhitespace]),
		password: new FormControl('', [Validators.required, ValidationService.notOnlyWhitespace]),
	});

	@ViewChild('modalContainer') modalContainer: ElementRef;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private authService: AuthService,
		private toastService: ToastService
	) {}

	ngOnInit() {
		this.route.params.subscribe((params) => {
			this.method = params[`method`];
		});
	}

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

	onChangeMethod(method: string): void {
		const urlTree = this.router.parseUrl(this.router.url);
		delete urlTree.root.children['modals'];
		const url = this.router.serializeUrl(urlTree) + `(modals:auth/${method})`;
		this.router.navigateByUrl(url);
	}

	onRegisterSubmit(): void {
		this.authService
			.onRegister(
				this.registerForm.get('name')?.value.trim(),
				this.registerForm.get('surname')?.value.trim(),
				this.registerForm.get('email')?.value.trim(),
				this.registerForm.get('password')?.value
			)
			.pipe(take(1))
			.subscribe({
				next: (res: any) => {
					this.onCloseModal(this.modalContainer.nativeElement);
					this.registerForm.reset();
				},
				error: (error: any) => {
					if (error.status === 409) {
						this.toastService.onShowAlert(`person`, `This email is already registered!`, `#FF8333`);
					} else if (error.status === 0) {
						this.toastService.onShowAlert(`dns`, `The server gave no response!`, `red`);
					} else if (error.status === 500) {
						this.toastService.onShowAlert(`dns`, `There's been a server error!`, `red`);
					}
					console.error('Registering failed:', error.status);
				},
			});
	}

	onLoginSubmit(): void {
		if (this.loginForm.valid) {
			this.authService
				.onLogin(this.loginForm.get('email')?.value.trim(), this.loginForm.get('password')?.value)
				.pipe(take(1))
				.subscribe({
					next: (res: any) => {
						this.onCloseModal(this.modalContainer.nativeElement);
						this.loginForm.reset();
					},
					error: (error: any) => {
						if (error.status === 401) {
							this.toastService.onShowAlert(`person_cancel`, `Email and/or password incorrect!`, `#FF8333`);
						} else if (error.status === 0) {
							this.toastService.onShowAlert(`dns`, `The server gave no response!`, `red`);
						} else if (error.status === 500) {
							this.toastService.onShowAlert(`dns`, `There's been a server error!`, `red`);
						}
						console.error('Login failed:', error.status);
					},
				});
		}
	}
}
