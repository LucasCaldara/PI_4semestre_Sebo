export interface Cliente {
    senha: any;
    email: any;
    id: number; // Opcional para novos registros
    nome: string;
    cpf: string;
    dataCadastro: Date; // Date no front para refletir o Java Date
    ativo: boolean; // Indica se o cliente está ativo
  }
  