import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Importando RouterModule para navegação
import { CommonModule } from '@angular/common'; // Importando CommonModule para funcionalidades comuns

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule,CommonModule], 
  templateUrl: './home.component.html', // Usando o arquivo HTML externo
  styleUrls: ['./home.component.css'], // Mantendo o arquivo CSS externo
})
export class HomeComponent {}