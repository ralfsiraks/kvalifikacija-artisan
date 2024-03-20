import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { User } from '../../interfaces/user';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-user-info',
	standalone: true,
	imports: [ReactiveFormsModule],
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
		name: new FormControl(`loading`, [Validators.required]),
		surname: new FormControl(`loading`, [Validators.required]),
		email: new FormControl(`loading`, [Validators.required, Validators.email]),
	});

	constructor(private authService: AuthService) {}

	ngOnInit(): void {
		this.authService
			.getUser(this.userToken)
			.pipe(take(1))
			.subscribe({
				next: (data: User) => {
					if (data.id && data.email) {
						this.userId = data.id;
						this.userName = data.user_data.name;
						this.userSurname = data.user_data.surname;
						this.userEmail = data.email;
						console.log(`happens`);
						this.onSetFormValues(data);
					}
				},
				error: (err) => {
					console.log(err.error);
					localStorage.removeItem(`token`);
					localStorage.removeItem(`name`);
					localStorage.removeItem(`surname`);
					this.userToken = '';
				},
			});
	}

	onSetFormValues(data: any): void {
		console.log(data);
		this.userForm.setValue({
			name: data.user_data.name,
			surname: data.user_data.surname,
			email: data.email,
		});
	}

	onUserFormSubmit() {}
}
