package org.example.movita_backend;

import org.example.movita_backend.model.User;
import org.example.movita_backend.persistence.DBManager;
import org.example.movita_backend.persistence.dao.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class    MoVitaBackEndApplication implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(MoVitaBackEndApplication.class, args);
    }

    public void run(String... args) {
        //appena parte l'applicazione, verifico se è presente nel DB l'account ADMIN.
        User adminAccount = DBManager.getInstance().getUserDAO().findAdmin();

        //se non presente, allora lo creo.
        if(null == adminAccount){
            User user = new User();

            //aggiungo i dettagli per l'admin
            user.setUsername("ADMIN");
            user.setEmail("admin@gmail.com");
            user.setPassword(new BCryptPasswordEncoder().encode("TheAdmin69!"));
            user.setNome("Admin");
            user.setCitta("none");
            user.setAzienda(false);
            user.setPremium(false);
            user.setAdmin(true);
            user.setMostraConsigliEventi(false);

            //creo l'admin
            DBManager.getInstance().getUserDAO().createAdmin(user);
        }
    }
}
