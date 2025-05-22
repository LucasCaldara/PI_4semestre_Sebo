import { Component, OnInit } from '@angular/core';
import { Venda } from '../../../entities/venda';
import { VendaService } from '../../../services/venda.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-venda-read-all',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatCardModule, RouterModule], // Importando MatIconModule aqui
  templateUrl: './venda-read-all.component.html',
  styleUrls: ['./venda-read-all.component.css'],
})
export class VendaReadAllComponent implements OnInit {
  list: Venda[] = [];
  totalVendas = 0;

  constructor(private vendaService: VendaService, private router: Router) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.vendaService.findAll().subscribe((resposta) => {
      this.list = resposta;
      this.calcularTotal();
    });
  }

  editarVenda(venda: Venda): void {
    console.log("ID da venda sendo editada:", venda.id);
    this.router.navigate([`/vendas/form/${venda.id}`]);
  }
  
  
  excluirVenda(id: number): void {
    if (confirm('Tem certeza que deseja excluir esta venda?')) {
      this.vendaService.delete(id).subscribe(() => {
        alert('Venda excluída com sucesso!');
        this.findAll(); // Atualiza a lista de vendas
      });
    }
  }
  calcularTotal(): void {
    this.totalVendas = parseFloat(
      this.list.reduce((acc, venda) => acc + venda.valorTotal, 0).toFixed(2)
    );
  }
}
