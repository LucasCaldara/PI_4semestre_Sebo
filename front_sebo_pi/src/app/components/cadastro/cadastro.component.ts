import { Component } from '@angular/core';
import { Router }   from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cliente } from '../../entities/cliente';
import { ClienteService } from '../../services/cliente.service';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-cadastro',
  imports: [FormsModule, CommonModule],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {

    /** objeto ligado ao template  */
    cliente: Cliente = {
      id: 0,
      nome: '',
      cpf: '',
      email: '',
      senha: '',
      dataCadastro: new Date,
      ativo: true
    };
  
    cpfDuplicado = false;
    errorMessage = '';
  
    constructor(
      private clienteService: ClienteService,
      private snackBar: MatSnackBar,
      private router: Router
    ) {}
  
    /* ---------- BOTÃO CADASTRAR ---------- */
    salvar(): void {
  
      this.cpfDuplicado = false;
  
      // valida campos obrigatórios
      if (!this.cliente.nome || !this.cliente.cpf || !this.cliente.email || !this.cliente.senha) {
        this.snackBar.open('Todos os campos são obrigatórios!', 'Fechar', { duration: 3000 });
        return;
      }
  
      // valida CPF
      if (!this.validarCPF(this.cliente.cpf)) {
        this.snackBar.open('CPF inválido!', 'Fechar', { duration: 3000 });
        return;
      }
  
      // preenche automáticos
      this.cliente.dataCadastro = new Date();
      this.cliente.ativo = true;
  
      /* cria no backend */
      this.clienteService.create(this.cliente).subscribe({
        next: () => {
          this.snackBar.open('Cliente cadastrado com sucesso!', 'Fechar', { duration: 3000 });
          this.router.navigate(['/home/cliente']);   // redireciona para home
        },
        error: err => {
          if (err.status === 409) {
            this.cpfDuplicado = true;
            this.snackBar.open('Erro: CPF já cadastrado!', 'Fechar', { duration: 3000 });
          } else {
            this.snackBar.open('Erro ao salvar cliente!', 'Fechar', { duration: 3000 });
          }
        }
      });
    }
  
    /* ---------- BOTÃO “JÁ TENHO UMA CONTA” ---------- */
    irParaLogin(): void {
      this.router.navigate(['/auth/login']);
    }
  
    /* ---------- VALIDAR CPF ---------- */
    validarCPF(cpf: string): boolean {
      cpf = cpf.replace(/\D/g, '');
      if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  
      let soma = 0, resto = 0;
      for (let i = 1; i <= 9; i++) soma += +cpf[i - 1] * (11 - i);
      resto = (soma * 10) % 11;
      if (resto === 10 || resto === 11) resto = 0;
      if (resto !== +cpf[9]) return false;
  
      soma = 0;
      for (let i = 1; i <= 10; i++) soma += +cpf[i - 1] * (12 - i);
      resto = (soma * 10) % 11;
      if (resto === 10 || resto === 11) resto = 0;
      return resto === +cpf[10];
    }
  }