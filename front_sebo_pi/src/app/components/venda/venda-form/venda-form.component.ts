import { Component, OnInit } from '@angular/core';
import { Venda } from '../../../entities/venda';
import { VendaService } from '../../../services/venda.service';
import { Cliente } from '../../../entities/cliente';
import { Livro } from '../../../entities/livro';
import { ClienteService } from '../../../services/cliente.service';
import { LivroService } from '../../../services/livro.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-venda-form',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './venda-form.component.html',
  styleUrls: ['./venda-form.component.css'],
})
export class VendaFormComponent implements OnInit {
  venda: Venda = { id: 0, cliente: {} as Cliente, livros: [], dataVenda: new Date(), valorTotal: 0 };  clientes: Cliente[] = []; // Lista de clientes carregados do endpoint
  livros: Livro[] = []; // Lista de livros carregados do endpoint
  livrosSelecionados: Livro[] = []; // Livros selecionados no formulário
  isEditMode: boolean = false;

  constructor(
    private vendaService: VendaService,
    private clienteService: ClienteService,
    private livroService: LivroService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log("ID capturado:", id); // Log para depuração
  
    if (id) {
      this.isEditMode = true;
      this.vendaService.findById(+id).subscribe((venda) => {
        this.venda = venda;
        this.venda.dataVenda = new Date(venda.dataVenda).toISOString().split('T')[0] as any;
      });
    } else {
      this.venda.dataVenda = new Date().toISOString().split('T')[0] as any;
    }
    this.carregarClientes();
    this.carregarLivros();
  }

  carregarClientes(): void {
    this.clienteService.findAll().subscribe((resposta) => {
      this.clientes = resposta; // Armazena os clientes retornados pelo endpoint
    });
  }

  carregarLivros(): void {
    this.livroService.findAll().subscribe((resposta) => {
      this.livros = resposta; // Armazena os livros retornados pelo endpoint
    });
  }
  carregarVenda(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.vendaService.findById(id).subscribe((resposta) => {
        this.venda = resposta;
        this.carregarClientes();
      });
    }
  }
  
  onLivroSelecionado(event: any, livro: Livro): void {
    if (event.target.checked) {
      this.livrosSelecionados.push(livro);
    } else {
      this.livrosSelecionados = this.livrosSelecionados.filter((l) => l.id !== livro.id);
    }

    this.venda.valorTotal = this.livrosSelecionados.reduce((acc, l) => acc + l.preco, 0);
  }
  isLivroSelecionado(livro: Livro): boolean {
    return this.livrosSelecionados.some((l) => l.id === livro.id);
  }
  salvar(): void {
    console.log("ID da venda antes de atualizar:", this.venda.id);
    console.log("Dados enviados para atualização:", this.venda);
  
    this.venda.dataVenda = new Date(this.venda.dataVenda);
    this.venda.livros = this.livrosSelecionados;
  
    if (this.isEditMode) {
      this.vendaService.update(this.venda.id, this.venda).subscribe(() => {
        alert("Venda atualizada com sucesso!");
        this.router.navigate(["/vendas/gerenciar"]);
      }, error => {
        console.error("Erro ao atualizar venda:", error);
      });
    } else {
      this.vendaService.create(this.venda).subscribe(() => {
        alert("Venda cadastrada com sucesso!");
        this.router.navigate(["/vendas/gerenciar"]);
      });
    }
  }
}