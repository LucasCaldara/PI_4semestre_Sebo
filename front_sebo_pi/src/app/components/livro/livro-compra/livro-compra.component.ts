import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router'; 

import { LivroService } from '../../../services/livro.service';
import { InscricaoLivroService } from '../../../services/inscricao-livro.service';
import { Livro } from '../../../entities/livro';

@Component({
  selector: 'app-livro-compra',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './livro-compra.component.html',
  styleUrls: ['./livro-compra.component.css'],
})
export class LivroCompraComponent implements OnInit {
  livros: Livro[] = [];
  idsInscritos = new Set<number>();

  constructor(
    private livroService: LivroService,
    private inscricaoSrv: InscricaoLivroService
  ) {}

  ngOnInit(): void {
    this.livroService.findAll().subscribe(l => (this.livros = l));
    this.inscricaoSrv.getInscritos().subscribe(lista => {
      this.idsInscritos = new Set(lista.map(l => l.id));
    });
  }

  inscrever(livro: Livro): void {
    this.inscricaoSrv.inscrever(livro);
  }

  estaInscrito(id: number): boolean {
    return this.idsInscritos.has(id);
  }
}
