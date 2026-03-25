import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card card-shadow border-0">
            <div class="card-body p-4">
              <h2 class="text-center mb-4">Login</h2>

              <div *ngIf="error" class="alert alert-danger">{{ error }}</div>

              <form (ngSubmit)="login()">
                <div class="mb-3">
                  <label class="form-label">Email</label>
                  <input type="email" class="form-control" [(ngModel)]="formData.email" name="email" required />
                </div>

                <div class="mb-3">
                  <label class="form-label">Password</label>
                  <input type="password" class="form-control" [(ngModel)]="formData.password" name="password" required />
                </div>

                <button class="btn btn-dark w-100" type="submit">Login</button>
              </form>

              <p class="text-center mt-3 mb-0">
                New user?
                <a routerLink="/register">Register here</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  formData = {
    email: '',
    password: ''
  };
  error = '';

  login(): void {
    this.error = '';

    this.authService.login(this.formData).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.error = err?.error?.err || 'Login failed';
      }
    });
  }
}
