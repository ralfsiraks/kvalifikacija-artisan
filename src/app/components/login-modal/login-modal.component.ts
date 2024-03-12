import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { take } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

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
    name: new FormControl('Deez', [Validators.required]),
    surname: new FormControl('Nuts', [Validators.required]),
    email: new FormControl('random@email.com', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('randompass123', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('random@email.com', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('randompass123', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  @ViewChild('modalContainer') modalContainer: ElementRef;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.method = params.get('method');
    });
  }

  onCloseModal(container: HTMLDivElement) {
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
        this.registerForm.get('name')?.value,
        this.registerForm.get('surname')?.value,
        this.registerForm.get('email')?.value,
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
            this.toastService.onShowAlert(
              `person`,
              `This email is already registered!`,
              `#FF8333`
            );
          } else if (error.status === 0) {
            this.toastService.onShowAlert(
              `dns`,
              `The server gave no response!`,
              `red`
            );
          } else if (error.status === 500) {
            this.toastService.onShowAlert(
              `dns`,
              `There's been a server error!`,
              `red`
            );
          }
          console.error('Registering failed:', error.status);
        },
      });
  }

  onLoginSubmit() {
    if (this.loginForm.valid) {
      this.authService
        .onLogin(
          this.loginForm.get('email')?.value,
          this.loginForm.get('password')?.value
        )
        .pipe(take(1))
        .subscribe({
          next: (res: any) => {
            this.onCloseModal(this.modalContainer.nativeElement);
            this.loginForm.reset();
          },
          error: (error: any) => {
            if (error.status === 401) {
              this.toastService.onShowAlert(
                `person_cancel`,
                `Email and/or password incorrect!`,
                `#FF8333`
              );
            } else if (error.status === 0) {
              this.toastService.onShowAlert(
                `dns`,
                `The server gave no response!`,
                `red`
              );
            } else if (error.status === 500) {
              this.toastService.onShowAlert(
                `dns`,
                `There's been a server error!`,
                `red`
              );
            }
            console.error('Login failed:', error.status);
          },
        });
    }
  }
}
