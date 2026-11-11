package com.Restruent.config;

import dev.langchain4j.model.chat.ChatModel;
import dev.langchain4j.model.googleai.GoogleAiGeminiChatModel;
import dev.langchain4j.model.openai.OpenAiChatModel;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.Duration;

@Configuration
public class GeminiConfig {

    @Bean
    public ChatModel chatModel() {
        Dotenv dotenv = Dotenv.configure()
                .directory("./Restruent")
                .ignoreIfMissing()
                .load();

        String apiKey = dotenv.get("GROQ_API_KEY");
        if (apiKey == null || apiKey.isBlank()) {
            Dotenv localDotenv = Dotenv.configure().ignoreIfMissing().load();
            apiKey = localDotenv.get("GROQ_API_KEY");
        }
        if (apiKey == null || apiKey.isBlank()) {
            apiKey = System.getenv("GROQ_API_KEY");
        }

        return OpenAiChatModel.builder()
                .apiKey(apiKey)
                .baseUrl("https://api.groq.com/openai/v1")
                .modelName("openai/gpt-oss-120b")
                .timeout(Duration.ofSeconds(60))
                .build();
    }
}