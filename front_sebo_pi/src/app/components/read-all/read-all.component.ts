import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Livro } from '../../entities/livro';
import { LivroService } from '../../services/livro.service';
import{MatBadgeModule} from '@angular/material/badge';

@Component({
  selector: 'app-read-all',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule,MatBadgeModule], // Adicione MatCardModule aqui
  templateUrl: './read-all.component.html',
  styleUrls: ['./read-all.component.css'],
})

//importação da interface livro e a implementação da interface lista Livro
export class ReadAllComponent implements OnInit {
  ativo = 0; //variável para controlar o ativo
  list: Livro[] = [];
  constructor(private service: LivroService) {}
  ngOnInit(): void {
    this.findAll(); //chama o método findAll na inicialização do componente
  }
  contarAtivos(): void {
    for (let livro of this.list) {
      if (livro.ativo == true) {
        this.ativo++;
      }
    }
  }

  findAll(): void {
    this.service.findAll().subscribe((resposta) => {
      this.list = resposta;
      this.contarAtivos(); //atribuindo a nossa lista //chama o método contarAtivos após receber a resposta
   
    });

  }
}
