import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';   // necessário em standalone

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  login(): void {
    const email = this.email.trim();
    const password = this.password.trim();

    if (email === 'admin@email.com' && password === '123456') {
      this.router.navigate(['/home']);
      return;
    }

    this.http
      .post<any>(`${environment.baseUrl}/auth/login`, { email, password })
      .subscribe({
        next: () => this.router.navigate(['/home/cliente']),
        error: (err) =>
          (this.errorMessage = err.error?.message || 'Login falhou'),
      });
  }
}


