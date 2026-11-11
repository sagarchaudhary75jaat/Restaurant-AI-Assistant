package com.Restruent.controller;

import com.Restruent.dto.ChatRequest;
import com.Restruent.dto.ChatResponse;
import com.Restruent.dto.ErrorResponse;
import com.Restruent.service.RestaurantChatService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/restaurant")
public class RestaurantChatController {

    private static final Logger log = LoggerFactory.getLogger(RestaurantChatController.class);
    private final RestaurantChatService restaurantChatService;

    public RestaurantChatController(RestaurantChatService restaurantChatService) {
        this.restaurantChatService = restaurantChatService;
    }

    @PostMapping("/chat")
    public ResponseEntity<?> chat(@RequestBody(required = false) ChatRequest request) {
        if (request == null || request.getMessage() == null || request.getMessage().trim().isEmpty()) {
            log.warn("Rejected chat request with empty message");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Bad Request", "Message cannot be empty. Please provide a valid 'message' in the JSON request body."));
        }

        try {
            ChatResponse response = restaurantChatService.chat(request);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException ex) {
            log.warn("Validation error in restaurant chat: {}", ex.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Invalid Input", ex.getMessage()));
        } catch (Exception ex) {
            log.error("AI service error in restaurant chat: {}", ex.getMessage(), ex);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("AI Service Error", "Failed to process restaurant query with AI Assistant. Please check Groq API connectivity or try again. Details: " + ex.getMessage()));
        }
    }
}
