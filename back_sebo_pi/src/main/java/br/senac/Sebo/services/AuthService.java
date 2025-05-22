package br.senac.Sebo.services;

import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import br.senac.Sebo.entities.Login;
import br.senac.Sebo.repositories.LoginRepository;

@Service
public class AuthService {

    private final LoginRepository loginRepo;
    private final PasswordEncoder passwordEncoder;

    public AuthService(LoginRepository loginRepo, PasswordEncoder passwordEncoder) {
        this.loginRepo  = loginRepo;
        this.passwordEncoder = passwordEncoder;
    }

    public boolean autenticar(String email, String rawPassword) {
        Optional<Login> opt = loginRepo.findByEmail(email);
        return opt.map(u -> passwordEncoder.matches(rawPassword, u.getPassword()))
                  .orElse(false);
    }

    public Login cadastrar(String email, String rawPassword) {
        String hash = passwordEncoder.encode(rawPassword);
        return loginRepo.save(new Login(email, hash));
    }
}
