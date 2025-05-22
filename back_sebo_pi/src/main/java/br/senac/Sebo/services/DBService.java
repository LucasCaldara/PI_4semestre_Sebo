package br.senac.Sebo.services;

import br.senac.Sebo.entities.*;
import br.senac.Sebo.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import org.springframework.boot.CommandLineRunner;

import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;

@Service
public class DBService {

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private LivroRepository livroRepository;

    @Autowired
    private VendaRepository vendaRepository;

    @Bean
    public CommandLineRunner instanciarDB() {
        return args -> {
            SimpleDateFormat formato = new SimpleDateFormat("dd/MM/yyyy");
            
            try {
                Cliente c1 = new Cliente("Lucas Passarelli Caldara", "12345678900", formato.parse("01/01/2024"));
                Cliente c2 = new Cliente("Maria Costa", "98765432100", formato.parse("05/01/2024"));

                clienteRepository.saveAll(Arrays.asList(c1, c2));

                Livro l1 = new Livro("O Hobbit", "J.R.R. Tolkien", "HarperCollins", 1937, 29.90, "BOM");
                Livro l2 = new Livro("Dom Casmurro", "Machado de Assis", "Nova Fronteira", 1899, 19.90, "USADO");
                Livro l3 = new Livro("1984", "George Orwell", "Companhia das Letras", 1949, 39.90, "MUITO BOM");

                livroRepository.saveAll(Arrays.asList(l1, l2, l3));

                Venda v1 = new Venda(c1, Arrays.asList(l1, l2), new Date(), l1.getPreco() + l2.getPreco());
                Venda v2 = new Venda(c2, Arrays.asList(l3), new Date(), l3.getPreco());

                vendaRepository.saveAll(Arrays.asList(v1, v2));

            } catch (Exception e) {
                e.printStackTrace();
            }
        };
    }
}
