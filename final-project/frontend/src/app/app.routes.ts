import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register.component';
import { LoginComponent } from './pages/login.component';
import { HomeComponent } from './pages/home.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'register' }
];
