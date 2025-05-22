import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livro } from '../entities/livro';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class LivroService {
  private baseUrl = 'http://localhost:5054/livros'; // Endereço para o endpoint de livros

  constructor(private http: HttpClient) {}

  findAll(): Observable<Livro[]> {
    return this.http.get<Livro[]>(`${environment.baseUrl}/livros`);
  }

  findById(id: number): Observable<Livro> {
    return this.http.get<Livro>(`${this.baseUrl}/${id}`);
  }

  create(livro: Livro): Observable<Livro> {
    return this.http.post<Livro>(this.baseUrl, livro);
  }

  update(id: number, livro: Livro): Observable<Livro> {
    return this.http.put<Livro>(`${this.baseUrl}/${id}`, livro);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
