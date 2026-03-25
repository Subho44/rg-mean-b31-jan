import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar navbar-expand-lg bg-dark navbar-dark shadow-sm">
      <div class="container">
        <a class="navbar-brand fw-bold" routerLink="/home">E-shop</a>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navMenu">
          <ul class="navbar-nav ms-auto align-items-lg-center gap-lg-2">
            <li class="nav-item">
              <a class="nav-link" routerLink="/register" routerLinkActive="active">Register</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/login" routerLinkActive="active">Login</a>
            </li>
            <li class="nav-item" *ngIf="authService.isLoggedIn()">
              <a class="nav-link" routerLink="/home" routerLinkActive="active">Home</a>
            </li>
            <li class="nav-item" *ngIf="authService.isLoggedIn()">
              <button class="btn btn-warning btn-sm" (click)="logout()">Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="py-4">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
  readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
