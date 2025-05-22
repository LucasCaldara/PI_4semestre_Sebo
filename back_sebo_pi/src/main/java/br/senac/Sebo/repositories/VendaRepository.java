package br.senac.Sebo.repositories;

import br.senac.Sebo.entities.Venda;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.EntityGraph;

import java.util.List;

@Repository
public interface VendaRepository extends JpaRepository<Venda, Integer> {

    // Carrega cliente e livros associados ao buscar todas as vendas
    @EntityGraph(attributePaths = { "cliente", "livros" })
    List<Venda> findAll();

    // Busca vendas pelo ID do cliente
    List<Venda> findByClienteId(Integer clienteId);
}