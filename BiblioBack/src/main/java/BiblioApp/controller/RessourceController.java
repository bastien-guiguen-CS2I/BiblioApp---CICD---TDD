package BiblioApp.controller;

import BiblioApp.entity.Ressource;
import BiblioApp.repository.RessourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ressources")
public class RessourceController {

    @Autowired
    private RessourceRepository ressourceRepository;

    @GetMapping
    public ResponseEntity<List<Ressource>> getAll() {
        List<Ressource> ressources = ressourceRepository.findAll();
        return ResponseEntity.ok(ressources);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ressource> getById(@PathVariable Integer id) {
        return ressourceRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Ressource> create(@RequestBody Ressource ressource) {
        Ressource saved = ressourceRepository.save(ressource);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Ressource> update(@PathVariable Integer id, @RequestBody Ressource ressource) {
        return ressourceRepository.findById(id)
                .map(existing -> {
                    ressource.setId(id);
                    Ressource updated = ressourceRepository.save(ressource);
                    return ResponseEntity.ok(updated);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        return ressourceRepository.findById(id)
                .map(existing -> {
                    ressourceRepository.deleteById(id);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
