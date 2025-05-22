package br.senac.Sebo.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.senac.Sebo.services.AuthService;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /** DTO simples */
    public static record Credenciais(String email, String password) {}

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Credenciais cred) {

        if (cred == null || cred.email() == null || cred.password() == null ||
            cred.email().isBlank() || cred.password().isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email e senha são obrigatórios"));
        }

        boolean ok = authService.autenticar(cred.email(), cred.password());
        if (ok) {
            return ResponseEntity.ok(Map.of("message", "Login OK"));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                             .body(Map.of("message", "Credenciais inválidas"));
    }
}

