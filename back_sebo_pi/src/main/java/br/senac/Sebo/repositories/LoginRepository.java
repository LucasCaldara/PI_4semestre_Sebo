package br.senac.Sebo.repositories;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import br.senac.Sebo.entities.Login;

public interface LoginRepository extends JpaRepository<Login, Long> {
    Optional<Login> findByEmail(String email);
}
