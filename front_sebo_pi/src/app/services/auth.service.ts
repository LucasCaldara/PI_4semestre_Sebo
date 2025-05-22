// src/app/core/auth/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

interface LoginRequest {
  email: string;
  senha: string;
}

interface LoginResponse {
  token: string;      // JWT devolvido pelo backend
  tipo?: string;      // opcional: “Bearer”
  expiraEm?: number;  // opcional: timestamp de expiração
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'token';
  private authUrl = `${environment.baseUrl}/login`;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(cred: { email: string; password: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${environment.baseUrl}/auth/login`, cred)
      .pipe(
        tap(res => {
          localStorage.setItem('token', res.token);
        })
      );
  }

  /** Remove token e navega para a página de login (opcional). */
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/login']);
  }

  /** Retorna verdadeiro se tiver um token armazenado (não valida expiração). */
  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  /** Lê o token para o AuthInterceptor. */
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // ---------- privados ----------

  private setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }
}
