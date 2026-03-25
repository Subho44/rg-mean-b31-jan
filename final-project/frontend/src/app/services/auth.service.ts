import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginPayload, RegisterPayload } from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:5600/api/auth';

  register(payload: RegisterPayload): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/register`, payload);
  }

  login(payload: LoginPayload): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, payload).pipe(
      tap((response) => localStorage.setItem('token', response.token))
    );
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
