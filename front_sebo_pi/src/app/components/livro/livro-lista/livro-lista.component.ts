import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

import { InscricaoLivroService } from '../../../services/inscricao-livro.service';
import { Livro } from '../../../entities/livro';

@Component({
  selector: 'app-livro-lista',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule],
  templateUrl: './livro-lista.component.html',
  styleUrls: ['./livro-lista.component.css'],
})
export class LivroListaComponent implements OnInit {
  /** Observable populado no ngOnInit */
  inscritos$!: Observable<Livro[]>;

  constructor(private inscricaoSrv: InscricaoLivroService) {}

  ngOnInit(): void {
    this.inscritos$ = this.inscricaoSrv.getInscritos();
  }

}
