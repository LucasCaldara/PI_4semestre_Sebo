import { Cliente } from './cliente';
import { Livro } from './livro';

export interface Venda {
  id: number;
  cliente: Cliente;
  livros: Livro[];
  dataVenda: Date;
  valorTotal: number;
}