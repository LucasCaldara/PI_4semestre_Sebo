package br.senac.Sebo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

import br.senac.Sebo.entities.Login;
import br.senac.Sebo.repositories.LoginRepository;

@SpringBootApplication
public class SeboApplication implements CommandLineRunner {

    @Autowired private LoginRepository  loginRepo;
    @Autowired private PasswordEncoder  encoder;

    public static void main(String[] args) {
        SpringApplication.run(SeboApplication.class, args);
    }

    @Override
    public void run(String... args) {
        loginRepo.findByEmail("usuario@email.com")
                 .orElseGet(() -> loginRepo.save(
                     new Login("usuario@email.com",
                               encoder.encode("123456"))
                 ));
        System.out.println("Seed de login pronto.");
    }
}
