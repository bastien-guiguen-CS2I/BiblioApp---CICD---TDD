package BiblioApp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.persistence.autoconfigure.EntityScan;

@SpringBootApplication
@EntityScan(basePackages = "BiblioApp.entity")
public class BiblioBackApplication {

	public static void main(String[] args) {
		SpringApplication.run(BiblioBackApplication.class, args);
	}
}
