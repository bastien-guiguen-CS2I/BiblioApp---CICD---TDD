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
			repository.save(new Livre("Clean Code", "LIVRE", 1, 40, "Rayon 1, Étagère A", LocalDate.of(2008, 8, 11),
					"Robert C. Martin", "978-0132350884"));
			repository.save(new Livre("Design Patterns", "LIVRE", 1, 45, "Rayon 1, Étagère A",
					LocalDate.of(1994, 11, 10), "Erich Gamma", "978-0201633610"));
			repository.save(new Livre("L'Étranger", "LIVRE", 3, 15, "Rayon 3, Étagère C", LocalDate.of(1942, 6, 15),
					"Albert Camus", "978-2070360024"));
			repository.save(new Livre("Le Crime de l'Orient-Express", "LIVRE", 4, 20, "Rayon 4, Étagère A",
					LocalDate.of(1934, 1, 1), "Agatha Christie", "978-2253010425"));
			repository.save(new Livre("Une brève histoire du temps", "LIVRE", 2, 30, "Rayon 2, Étagère B",
					LocalDate.of(1988, 4, 1), "Stephen Hawking", "978-2081422000"));
			repository.save(
					new Revue("Science & Vie", "REVUE", 2, 10, "Rayon 2, Étagère B", LocalDate.of(2023, 10, 1), 1250));
			repository
					.save(new Revue("L'Histoire", "REVUE", 5, 10, "Rayon 5, Étagère A", LocalDate.of(2023, 9, 1), 500));
		};
	}
}
