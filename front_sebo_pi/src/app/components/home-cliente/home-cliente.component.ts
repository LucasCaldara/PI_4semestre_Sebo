import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Importando RouterModule para navegação
import { CommonModule } from '@angular/common'; // Importando CommonModule para funcionalidades comuns

@Component({
  selector: 'app-homeCliente',
  standalone: true,
  imports: [RouterModule,CommonModule], 
  templateUrl: './home-cliente.component.html',
  styleUrls: ['./home-cliente.component.css'], 
})
export class HomeClienteComponent {}