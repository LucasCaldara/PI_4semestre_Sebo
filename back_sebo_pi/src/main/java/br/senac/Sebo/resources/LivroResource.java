package br.senac.Sebo.resources;

import br.senac.Sebo.entities.Livro;
import br.senac.Sebo.services.LivroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200/livros/gerenciar", maxAge = 33600, allowCredentials = "true")
@RestController
@RequestMapping(value = "/livros")

public class LivroResource {

    @Autowired
    private LivroService livroService;

    @GetMapping("/{id}")
    public ResponseEntity<Livro> findById(@PathVariable Integer id) {
        Livro livro = livroService.findById(id);
        return ResponseEntity.ok().body(livro);
    }

    @GetMapping
    public ResponseEntity<List<Livro>> findAll() {
        List<Livro> livros = livroService.findAll();
        return ResponseEntity.ok().body(livros);
    }

    @GetMapping("/titulo/{titulo}")
    public ResponseEntity<List<Livro>> buscarPorTitulo(@PathVariable String titulo) {
        List<Livro> livros = livroService.buscarPorTitulo(titulo);
        return ResponseEntity.ok().body(livros);
    }

    @PostMapping
    public ResponseEntity<Livro> inserir(@RequestBody Livro livro) {
        livro = livroService.inserir(livro);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(livro.getId()).toUri();
        return ResponseEntity.created(uri).body(livro);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Livro> atualizar(@PathVariable Integer id, @RequestBody Livro livro) {
        Livro atualizado = livroService.atualizar(id, livro);
        return ResponseEntity.ok().body(atualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        livroService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
