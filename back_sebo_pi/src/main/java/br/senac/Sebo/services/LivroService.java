package br.senac.Sebo.services;

import br.senac.Sebo.entities.Livro;
import br.senac.Sebo.exceptions.ObjectNotFoundException;
import br.senac.Sebo.repositories.LivroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class LivroService {

    @Autowired
    private LivroRepository livroRepository;

    public Livro findById(Integer id) {
        Optional<Livro> livro = livroRepository.findById(id);
        return livro.orElseThrow(() -> new ObjectNotFoundException("Livro não encontrado"));
    }

    public List<Livro> findAll() {
        return livroRepository.findAll();
    }

    public List<Livro> buscarPorTitulo(String titulo) {
        return livroRepository.findByTituloContainingIgnoreCase(titulo);
    }

    public Livro inserir(Livro livro) {
        return livroRepository.save(livro);
    }

    public Livro atualizar(Integer id, Livro livro) {
        Livro atualizado = findById(id);
        atualizado.setTitulo(livro.getTitulo());
        atualizado.setAutor(livro.getAutor());
        atualizado.setEditora(livro.getEditora());
        atualizado.setAnoPublicacao(livro.getAnoPublicacao());
        atualizado.setPreco(livro.getPreco());
        atualizado.setEstadoConservacao(livro.getEstadoConservacao());
        atualizado.setAtivo(livro.isAtivo());
        return livroRepository.save(atualizado);
    }

    public void deletar(Integer id) {
        livroRepository.deleteById(id);
    }
}
