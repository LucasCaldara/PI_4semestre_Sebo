import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from '../../../entities/cliente';
import { MatBadgeModule } from '@angular/material/badge';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cliente-read-all',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatBadgeModule, RouterModule], // Incluído MatIconModule
  templateUrl: './cliente-read-all.component.html',
  styleUrls: ['./cliente-read-all.component.css'],
})
export class ClienteReadAllComponent implements OnInit {
  clientes: Cliente[] = [];
  ativo = 0;

  constructor(private clienteService: ClienteService, private router: Router) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.clienteService.findAll().subscribe((resposta) => {
      this.clientes = resposta;
      this.contarAtivos();
    });
  }

  contarAtivos(): void {
    this.ativo = this.clientes.filter((cliente) => cliente.ativo).length;
  }
  marcarComoAtivo(cliente: Cliente): void {
    cliente.ativo = true;
    this.clienteService.update(cliente.id, cliente).subscribe(() => {
      alert('Cliente marcado como ativo!');
      this.findAll(); // Atualiza a lista
    });
  }

  editarCliente(cliente: Cliente): void {
    this.router.navigate([`/clientes/form/${cliente.id}`]); // Redireciona para o formulário de edição
  }

  excluirCliente(id: number): void {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
      this.clienteService.delete(id).subscribe(() => {
        alert('Cliente excluído com sucesso!');
        this.findAll(); // Atualiza a lista
      });
    }
  }
}
