import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card card-shadow border-0">
            <div class="card-body p-4">
              <h2 class="text-center mb-4">Register</h2>

              <div *ngIf="message" class="alert alert-success">{{ message }}</div>
              <div *ngIf="error" class="alert alert-danger">{{ error }}</div>

              <form (ngSubmit)="register()">
                <div class="mb-3">
                  <label class="form-label">Name</label>
                  <input class="form-control" [(ngModel)]="formData.name" name="name" required />
                </div>

                <div class="mb-3">
                  <label class="form-label">Email</label>
                  <input type="email" class="form-control" [(ngModel)]="formData.email" name="email" required />
                </div>

                <div class="mb-3">
                  <label class="form-label">Password</label>
                  <input type="password" class="form-control" [(ngModel)]="formData.password" name="password" required />
                </div>

                <button class="btn btn-success w-100" type="submit">Create Account</button>
              </form>

              <p class="text-center mt-3 mb-0">
                Already have an account?
                <a routerLink="/login">Login here</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class RegisterComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  formData = {
    name: '',
    email: '',
    password: ''
  };
  message = '';
  error = '';

  register(): void {
    this.message = '';
    this.error = '';

    this.authService.register(this.formData).subscribe({
      next: (response) => {
        this.message = response.message;
        this.formData = { name: '', email: '', password: '' };
        setTimeout(() => this.router.navigate(['/login']), 1000);
      },
      error: (err) => {
        this.error = err?.error?.err || 'Registration failed';
      }
    });
  }
}
