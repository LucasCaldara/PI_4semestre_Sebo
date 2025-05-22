import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { HomeClienteComponent } from './components/home-cliente/home-cliente.component';
import { ClienteReadAllComponent } from './components/cliente/cliente-read-all/cliente-read-all.component';
import { ClienteFormComponent } from './components/cliente/cliente-form/cliente-form.component';
import { VendaReadAllComponent } from './components/venda/venda-read-all/venda-read-all.component';
import { VendaFormComponent } from './components/venda/venda-form/venda-form.component';
import { LivroFormComponent } from './components/livro/livro-form/livro-form.component';
import { LivroReadAllComponent } from './components/livro/livro-read-all/livro-read-all.component';
import { CadastroComponent} from './components/cadastro/cadastro.component';
import { LivroCompraComponent } from './components/livro/livro-compra/livro-compra.component';
import { LivroListaComponent } from './components/livro/livro-lista/livro-lista.component';

const routes: Routes = [
  // Página de cadastro como página inicial
  { path: '', component: CadastroComponent },

  { path: 'auth/login', component: LoginComponent},

  //home do adm
  { path: 'home', component: HomeComponent },
  //home do cliente
  { path: 'home/cliente', component: HomeClienteComponent },

  // Rotas para gerenciar livros, clientes e vendas
  { path: 'livros/gerenciar', component: LivroReadAllComponent },
  { path: 'clientes/gerenciar', component: ClienteReadAllComponent },
  { path: 'vendas/gerenciar', component: VendaReadAllComponent },

  // Rotas para cadastrar livros, clientes e vendas
  { path: 'livros/cadastrar', component: LivroFormComponent },
  { path: 'clientes/cadastrar', component: ClienteFormComponent },
  { path: 'vendas/cadastrar', component: VendaFormComponent },

  // Rotas para editar livros, clientes e vendas
  { path: 'livros/form/:id', component: LivroFormComponent },
  { path: 'clientes/form/:id', component: ClienteFormComponent },
  { path: 'vendas/form/:id', component: VendaFormComponent },

  // Rotas do usuário
  { path: 'clientes/lista-compra', component: LivroListaComponent },
  { path: 'livros/comprar', component: LivroCompraComponent },
    
  // Rota coringa para redirecionar para cadastro em caso de rota inválida
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
