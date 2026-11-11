package com.Restruent;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class RestruentApplication {

    public static void main(String[] args) {
        // Load .env variables into System properties if not already present in environment
        Dotenv dotenv = Dotenv.configure()
                .directory("./Restruent")
                .ignoreIfMissing()
                .load();

        if (dotenv.get("DB_URL") == null && dotenv.get("GROQ_API_KEY") == null) {
            dotenv = Dotenv.configure().ignoreIfMissing().load();
        }

        dotenv.entries().forEach(entry -> {
            if (System.getProperty(entry.getKey()) == null && System.getenv(entry.getKey()) == null) {
                System.setProperty(entry.getKey(), entry.getValue());
            }
        });

        SpringApplication.run(RestruentApplication.class, args);
    }
}
