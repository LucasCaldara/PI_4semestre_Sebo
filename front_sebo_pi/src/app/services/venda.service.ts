import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Venda } from '../entities/venda';

@Injectable({
  providedIn: 'root'
})
export class VendaService {
  private baseUrl = `${environment.baseUrl}/vendas`;

  constructor(private http: HttpClient) {}

  findAll(): Observable<Venda[]> {
    return this.http.get<Venda[]>(this.baseUrl);
  }

  create(venda: Venda): Observable<Venda> {
    return this.http.post<Venda>(this.baseUrl, venda);
  }
  findById(id: number): Observable<Venda> {
    return this.http.get<Venda>(`${this.baseUrl}/vendas/${id}`);
  }
  
  update(id: number, venda: Venda): Observable<Venda> {
    console.log("Enviando atualização para ID:", id, "Venda:", venda);
    return this.http.put<Venda>(`${this.baseUrl}/${id}`, venda);
  }
  
  
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}