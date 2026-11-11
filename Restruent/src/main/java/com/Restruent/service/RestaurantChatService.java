package com.Restruent.service;

import com.Restruent.agent.RestaurantAssistant;
import com.Restruent.dto.ChatRequest;
import com.Restruent.dto.ChatResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class RestaurantChatService {

    private static final Logger log = LoggerFactory.getLogger(RestaurantChatService.class);
    private final RestaurantAssistant restaurantAssistant;

    public RestaurantChatService(RestaurantAssistant restaurantAssistant) {
        this.restaurantAssistant = restaurantAssistant;
    }

    public ChatResponse chat(ChatRequest request) {
        if (request == null || request.getMessage() == null || request.getMessage().trim().isEmpty()) {
            throw new IllegalArgumentException("User message cannot be empty. Please provide a question or search query.");
        }

        String sessionId = request.getSessionId();
        if (sessionId == null || sessionId.trim().isEmpty()) {
            sessionId = "default-session";
        }

        String userMessage = request.getMessage().trim();
        log.info("Processing restaurant chat request for session '{}': '{}'", sessionId, userMessage);

        try {
            String aiAnswer = restaurantAssistant.chat(sessionId, userMessage);
            return new ChatResponse(aiAnswer);
        } catch (Exception ex) {
            log.error("Error executing restaurant AI assistant for session '{}': {}", sessionId, ex.getMessage(), ex);
            throw new RuntimeException("AI Assistant encountered an error while processing your request: " + ex.getMessage(), ex);
        }
    }
}
