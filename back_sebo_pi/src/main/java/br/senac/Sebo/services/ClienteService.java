package br.senac.Sebo.services;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import br.senac.Sebo.entities.Cliente;
import br.senac.Sebo.entities.Login;
import br.senac.Sebo.exceptions.ObjectNotFoundException;
import br.senac.Sebo.repositories.ClienteRepository;
import br.senac.Sebo.repositories.LoginRepository;
import jakarta.persistence.Column;

@Service
public class ClienteService {

    private final ClienteRepository clienteRepo;
    private final LoginRepository   loginRepo;
    private final PasswordEncoder   encoder;

    public ClienteService(ClienteRepository clienteRepo,
                          LoginRepository   loginRepo,
                          PasswordEncoder   encoder) {
        this.clienteRepo = clienteRepo;
        this.loginRepo   = loginRepo;
        this.encoder     = encoder;
    }

    /* ---------- consultas ---------- */

    public Cliente findById(Integer id) {
        return clienteRepo.findById(id)
               .orElseThrow(() -> new ObjectNotFoundException("Cliente não encontrado"));
    }

    public List<Cliente> findAll() {
        return clienteRepo.findAll();
    }

    public Cliente findByCpf(String cpf) {
        Cliente cli = clienteRepo.findByCpf(cpf);
        if (cli == null) throw new ObjectNotFoundException("Cliente com CPF " + cpf + " não encontrado");
        return cli;
    }

    /* ---------- inserir (com criação de Login) ---------- */


    public Cliente inserir(Cliente cliente) {
    
        // salva cliente (dataCadastro e ativo podem ser preenchidos aqui)
        cliente.setDataCadastro(new Date());
        cliente.setAtivo(true);
        Cliente salvo = clienteRepo.save(cliente);
    
        // cria registro de login
        Login login = new Login(cliente.getEmail(),
                                encoder.encode(cliente.getSenha()));
        loginRepo.save(login);
    
        return salvo;
    }
    /* ---------- atualizar ---------- */

    public Cliente atualizar(Integer id, Cliente dados) {
        Cliente cli = clienteRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

        cli.setNome(dados.getNome());
        cli.setCpf(dados.getCpf());
        cli.setDataCadastro(dados.getDataCadastro());
        cli.setAtivo(dados.getAtivo());

        return clienteRepo.save(cli);
    }

    /* ---------- deletar ---------- */
    public void deletar(Integer id) {
        clienteRepo.deleteById(id);
    }
}
