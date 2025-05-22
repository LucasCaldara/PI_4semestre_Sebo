export interface Livro {
    id: number;
    titulo: string;
    autor: string;
    editora: string;
    anoPublicacao: number;
    preco: number;
    estadoConservacao: string;
    ativo?: boolean;
  }
  