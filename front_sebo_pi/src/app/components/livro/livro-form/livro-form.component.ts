import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../../../entities/livro';
import { LivroService } from '../../../services/livro.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-livro-form',
  standalone: true,
  imports: [RouterModule,FormsModule, CommonModule], // Inclua o FormsModule aqui
  templateUrl: './livro-form.component.html',
  styleUrls: ['./livro-form.component.css'],
})
export class LivroFormComponent implements OnInit {
  livro: Livro = {} as Livro;
  isEditMode = false;

  constructor(
    private livroService: LivroService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Obtém o ID da rota
    if (id) {
      this.isEditMode = true; // Define o modo de edição
      this.livroService.findById(+id).subscribe((livro) => {
        this.livro = livro; // Carrega os dados do livro no formulário
      });
    }
  }

  salvar(): void {
    if (this.isEditMode) {
      // Atualiza o livro existente
      this.livroService.update(this.livro.id, this.livro).subscribe(() => {
        alert('Livro atualizado com sucesso!');
        this.router.navigate(['/livros/gerenciar']); // Redireciona para a lista de livros
      });
    } else {
      // Cria um novo livro
      this.livroService.create(this.livro).subscribe(() => {
        alert('Livro cadastrado com sucesso!');
        this.router.navigate(['/livros/gerenciar']); // Redireciona para a lista de livros
      });
    }
  }
}