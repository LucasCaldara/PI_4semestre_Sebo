package br.senac.Sebo.services;

import br.senac.Sebo.entities.Cliente;
import br.senac.Sebo.entities.Venda;
import br.senac.Sebo.exceptions.ObjectNotFoundException;
import br.senac.Sebo.repositories.ClienteRepository;
import br.senac.Sebo.repositories.VendaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class VendaService {

    @Autowired
    private VendaRepository vendaRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    public Venda findById(Integer id) {
        Optional<Venda> venda = vendaRepository.findById(id);
        return venda.orElseThrow(() -> new ObjectNotFoundException("Venda não encontrada"));
    }

    public List<Venda> findAll() {
        // O método findAll agora carrega cliente e livros automaticamente
        return vendaRepository.findAll();
    }

    public List<Venda> findByCliente(Integer clienteId) {
        return vendaRepository.findByClienteId(clienteId);
    }

    public Venda registrarVenda(Venda venda) {
        Cliente cliente = clienteRepository.findById(venda.getCliente().getId())
                .orElseThrow(() -> new ObjectNotFoundException("Cliente não encontrado para esta venda"));

        venda.setCliente(cliente);
        venda.setDataVenda(new Date());
        return vendaRepository.save(venda);
    }

    public Venda atualizar(Integer id, Venda venda) {
        System.out.println("ID recebido para atualização: " + id);
        Venda vendaExistente = vendaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Venda não encontrada"));
        
        vendaExistente.setCliente(venda.getCliente());
        vendaExistente.setDataVenda(venda.getDataVenda());
        vendaExistente.setValorTotal(venda.getValorTotal());
        vendaExistente.setLivros(venda.getLivros());

        return vendaRepository.save(vendaExistente);
    }

    public void deletar(Integer id) {
        vendaRepository.deleteById(id);
    }
}
