#  Sebo Virtual - Projeto Integrador 2025

Sistema de gerenciamento para um **sebo online**, desenvolvido como parte do Projeto Integrador. Permite o cadastro, edição e visualização de clientes, além da simulação de vendas e consulta de livros.

##  Tecnologias Utilizadas

### Backend (Java Spring Boot)
- Spring Web
- Spring Data JPA
- H2 Database (em memória)
- Maven
  
### Frontend (Angular)
- Angular 17
- TypeScript
- Angular Material
- HTML + CSS

---

## Funcionalidades Implementadas

### Cliente
- Cadastro de cliente com validação de CPF
- Edição de dados do cliente
- Exclusão com verificação de vínculo em vendas
- Listagem e busca por nome
- Validação automática de campos obrigatórios
- Notificações com Angular Material (snackbar)

### Livro
- Cadastro de livros
- Listagem

### Venda
- Registro de venda entre cliente e livro
- Validação de relacionamento

---


## Como Executar

### Backend
```bash
cd back_sebo_pi
./mvnw spring-boot:run

Acesse o banco H2 em:
http://localhost:5054/h2-console

---
### Frontend
cd front_sebo_pi
npm install
ng serve

Acesse em:
http://localhost:4200

Usuário de Teste
Email: email@qualquer.com

Senha: Teste@123

📌Autores
Lucas Passarelli Caldara
Mayra Keylla Martins da Silva
Projeto acadêmico para o curso de Análise e Desenvolvimento de Sistemas - SENAC 2025
