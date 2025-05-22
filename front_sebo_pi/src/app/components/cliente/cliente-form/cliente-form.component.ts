import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../../entities/cliente';
import { ClienteService } from '../../../services/cliente.service';
import { FormsModule } from '@angular/forms'; // Importação necessária
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  imports: [RouterModule, FormsModule, CommonModule], // Incluindo FormsModule aqui
  styleUrls: ['./cliente-form.component.css'],
})
export class ClienteFormComponent implements OnInit {
  cliente: Cliente = {} as Cliente;
  isEditMode = false; // Indica se o formulário está no modo de edição
  cpfDuplicado: boolean = false; // Variável para controlar a mensagem de erro

  constructor(
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Verifica se há um ID na rota
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true; // Define o modo de edição
      this.clienteService.findById(+id).subscribe((cliente) => {
        this.cliente = cliente; // Carrega os dados do cliente no formulário
      });
    }
  }

salvar(): void {
  this.cpfDuplicado = false; // Sempre reinicia a variável antes de salvar

  // Verificar se todos os campos estão preenchidos
  if (!this.cliente.nome || !this.cliente.cpf || !this.cliente.dataCadastro || this.cliente.ativo === undefined) {
    this.snackBar.open('Todos os campos são obrigatórios!', 'Fechar', {
      duration: 3000,
    });
    return;
  }

  if (!this.validarCPF(this.cliente.cpf)) {
    this.snackBar.open('CPF inválido!', 'Fechar', {
      duration: 3000,
    });
    return;
  }

  const operacao = this.isEditMode
    ? this.clienteService.update(this.cliente.id, this.cliente)
    : this.clienteService.create(this.cliente);

  operacao.subscribe({
    next: () => {
      const mensagem = this.isEditMode
        ? 'Cliente atualizado com sucesso!'
        : 'Cliente cadastrado com sucesso!';
      this.snackBar.open(mensagem, 'Fechar', {
        duration: 3000,
      });
      this.router.navigate(['/clientes/gerenciar']);
    },
    error: (error) => {
      if (error.status === 409) {
        this.cpfDuplicado = true;
        this.snackBar.open('Erro: CPF já cadastrado!', 'Fechar', {
          duration: 3000,
        });
      } else {
        this.snackBar.open('Erro ao salvar cliente!', 'Fechar', {
          duration: 3000,
        });
      }
    },
  });
}



  validarCPF(cpf: string): boolean {
    cpf = cpf.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
      return false; // Verifica se o CPF tem 11 dígitos e não é uma sequência repetida
    }

    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;

    return true;
  }
}
//Se o cliente tiver um id faz a edição, chama o método update.
//se não, o cliente é criado com o método create.
