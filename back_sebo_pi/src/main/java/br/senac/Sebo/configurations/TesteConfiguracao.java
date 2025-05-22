package br.senac.Sebo.configurations;

//import java.text.ParseException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import br.senac.Sebo.services.DBService;

@Configuration
@Profile("teste")
public class TesteConfiguracao {
    @Autowired
    DBService dbService;
    /*
     * private boolean instaciar() throws ParseException {
     * this.dbService.instanciarDB();
     * return true;
     * }
     */
}