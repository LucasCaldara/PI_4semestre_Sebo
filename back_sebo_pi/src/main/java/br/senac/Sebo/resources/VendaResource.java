package br.senac.Sebo.resources;

import br.senac.Sebo.entities.Venda;
import br.senac.Sebo.services.VendaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
@CrossOrigin(origins = "http://localhost:4200")

@RestController
@RequestMapping(value = "/vendas")
public class VendaResource {

    @Autowired
    private VendaService vendaService;

    @GetMapping("/{id}")
    public ResponseEntity<Venda> findById(@PathVariable Integer id) {
        Venda venda = vendaService.findById(id);
        return ResponseEntity.ok().body(venda);
    }

    @GetMapping
    public ResponseEntity<List<Venda>> findAll() {
        List<Venda> vendas = vendaService.findAll();
        return ResponseEntity.ok().body(vendas);
    }

    @GetMapping("/cliente/{idCliente}")
    public ResponseEntity<List<Venda>> findByCliente(@PathVariable Integer idCliente) {
        List<Venda> vendas = vendaService.findByCliente(idCliente);
        return ResponseEntity.ok().body(vendas);
    }

    @PostMapping
    public ResponseEntity<Venda> registrarVenda(@RequestBody Venda venda) {
        venda = vendaService.registrarVenda(venda);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(venda.getId()).toUri();
        return ResponseEntity.created(uri).body(venda);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Venda> atualizarVenda(@PathVariable Integer id, @RequestBody Venda venda) {
        Venda vendaAtualizada = vendaService.atualizar(id, venda);
        return ResponseEntity.ok().body(vendaAtualizada);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        vendaService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
