package BiblioApp;

import BiblioApp.entity.Livre;
import BiblioApp.entity.Revue;
import BiblioApp.repository.RessourceRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.persistence.autoconfigure.EntityScan;
import org.springframework.context.annotation.Bean;
import java.time.LocalDate;

@SpringBootApplication
@EntityScan(basePackages = "BiblioApp.entity")
public class BiblioBackApplication {

	public static void main(String[] args) {
		SpringApplication.run(BiblioBackApplication.class, args);
	}

	@Bean
	public CommandLineRunner initializeData(RessourceRepository repository) {
		return (args) -> {
			repository.save(new Livre("Clean Code", "LIVRE", 1, "Robert C. Martin", "978-0132350884"));
			repository.save(new Livre("Design Patterns", "LIVRE", 2, "Gang of Four", "978-0201633610"));
			repository.save(new Livre("The Pragmatic Programmer", "LIVRE", 3, "David Thomas", "978-0135957059"));
			repository.save(new Revue("Science & Nature", "REVUE", 4, 15, LocalDate.of(2024, 3, 15)));
			repository.save(new Revue("Tech Weekly", "REVUE", 5, 22, LocalDate.of(2024, 3, 20)));
		};
	}
}
