import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Cliente } from '../entities/cliente';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private baseUrl = `${environment.baseUrl}/clientes`; //'http://localhost:5054/clientes'

  constructor(private http: HttpClient) {}

  findAll(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${environment.baseUrl}/clientes`);
  }

  findById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.baseUrl}/${id}`);
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.baseUrl, cliente);
  }

  deleteCliente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`); // Exclui um cliente pelo ID
  }
  update(id: number, cliente: Cliente): Observable<any> {
    const endpoint = `http://localhost:5054/clientes/${id}`;
    return this.http.put(endpoint, cliente);
  }

  deleteVendasByClienteId(clienteId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/clientes/${clienteId}/vendas`
    );
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
