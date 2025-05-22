import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { LivroService } from '../../../services/livro.service';
import { Livro } from '../../../entities/livro';
import { MatBadgeModule } from '@angular/material/badge';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-livro-read-all',
  standalone: true,
  imports: [RouterModule,CommonModule, MatCardModule, MatIconModule, MatBadgeModule],
  templateUrl: './livro-read-all.component.html',
  styleUrls: ['./livro-read-all.component.css'],
})
export class LivroReadAllComponent implements OnInit {
  livros: Livro[] = [];
  ativo = 0;

  constructor(private livroService: LivroService, private router: Router) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.livroService.findAll().subscribe((resposta) => {
      this.livros = resposta;
      this.contarAtivos();
    });
  }

  contarAtivos(): void {
    this.ativo = this.livros.filter((livro) => livro.ativo).length;
  }

  marcarComoAtivo(livro: Livro): void {
    if (!livro.ativo) { // Apenas atualiza se o livro não estiver ativo
      livro.ativo = true;
      this.livroService.update(livro.id, livro).subscribe(() => {
        alert('Livro marcado como ativo!');
        this.findAll(); // Atualiza a lista
      });
    } else {
      alert('O livro já está ativo!');
    }
  }

  editarLivro(livro: Livro): void {
    this.router.navigate([`/livros/form/${livro.id}`]); // Redireciona para o formulário de edição
  }

  excluirLivro(id: number): void {
    if (confirm('Tem certeza que deseja excluir este livro?')) {
      this.livroService.delete(id).subscribe(() => {
        alert('Livro excluído com sucesso!');
        this.findAll(); // Atualiza a lista
      });
    }
  }
}