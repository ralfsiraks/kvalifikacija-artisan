import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { take } from 'rxjs';
import { User } from '../../interfaces/user';
import { UserInit } from '../../interfaces/user-init';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';
import { ValidationService } from '../../services/validation.service';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { UserInfoSkeletonComponent } from '../skeletons/user-info-skeleton/user-info-skeleton.component';

@Component({
	selector: 'app-user-info',
	standalone: true,
	imports: [ReactiveFormsModule, CommonModule, UserInfoSkeletonComponent, RouterLink, LoginModalComponent],
	templateUrl: './user-info.component.html',
	styleUrl: './user-info.component.scss',
})
export class UserInfoComponent implements OnInit {
	userToken: string = localStorage.getItem(`token`);
	userId: number;
	userName: string;
	userSurname: string;
	userEmail: string;
	userForm: FormGroup = new FormGroup({
		name: new FormControl(``, [Validators.required, ValidationService.notOnlyWhitespace]),
		surname: new FormControl(``, [Validators.required, ValidationService.notOnlyWhitespace]),
		email: new FormControl(``, [Validators.required, Validators.email, ValidationService.notOnlyWhitespace]),
	});
	initValues: UserInit;
	loading: boolean = false;

	constructor(private authService: AuthService, private router: Router, private toastService: ToastService) {}

	ngOnInit(): void {
		this.getUserInfo();
	}

	onSetFormValues(data: any): void {
		this.userForm.setValue({
			name: data.user_data.name,
			surname: data.user_data.surname,
			email: data.email,
		});

		this.initValues = { name: data.user_data.name, surname: data.user_data.surname, email: data.email };
	}

	getUserInfo(): void {
		this.loading = true;
		this.authService
			.getUser()
			.pipe(take(1))
			.subscribe({
				next: (data: User) => {
					if (data.id && data.email) {
						this.userId = data.id;
						this.userName = data.user_data.name;
						this.userSurname = data.user_data.surname;
						this.userEmail = data.email;
						this.onSetFormValues(data);
					}
					this.loading = false;
				},
				error: (err) => {
					console.log(err.error.status);
					localStorage.removeItem(`token`);
					localStorage.removeItem(`name`);
					localStorage.removeItem(`surname`);
					this.userToken = '';
					if (err.status === 401) {
						this.router.navigate(['/']);
						this.toastService.onShowAlert(`error`, `Please log in!`, `#FF8333`);
					}
					this.loading = false;
				},
			});
	}

	onUserFormSubmit(): void {
		if (this.userForm.valid) {
			const currentValues: UserInit = {
				name: this.userForm.get(`name`).value.trim(),
				surname: this.userForm.get(`surname`).value.trim(),
				email: this.userForm.get(`email`).value.trim(),
			};
			// Check if submitted values are different from initial ones
			if (JSON.stringify(currentValues) !== JSON.stringify(this.initValues)) {
				const patches: any = {};
				Object.entries(currentValues).forEach(([paramName, paramValue]) => {
					if (paramValue !== this.initValues[paramName]) {
						patches[paramName] = paramValue;
					}
				});

				this.authService
					.updateUser(patches)
					.pipe(take(1))
					.subscribe({
						next: (data: any) => {
							this.toastService.onShowAlert(`check_circle`, `Profile updated!`, `#74b816`);
							this.initValues = {
								name: currentValues.name,
								surname: currentValues.surname,
								email: currentValues.email,
							};
						},
						error: (err) => {
							console.log(err.error);
							this.userToken = '';
							if (err.status === 401) {
								this.router.navigate(['/']);
								this.toastService.onShowAlert(`error`, `Please log in!`, `#FF8333`);
							} else if (err.error.message.includes(`SQLSTATE[23000]`)) {
								this.toastService.onShowAlert(`error`, `This email is already registered!`, `#FF8333`);
							}
						},
					});
			}
		}
	}
}
