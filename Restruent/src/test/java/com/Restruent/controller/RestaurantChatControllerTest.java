package com.Restruent.controller;

import com.Restruent.dto.ChatRequest;
import com.Restruent.dto.ChatResponse;
import com.Restruent.service.RestaurantChatService;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class RestaurantChatControllerTest {

    @Test
    void testChatWithEmptyMessageReturnsBadRequest() {
        RestaurantChatService service = mock(RestaurantChatService.class);
        RestaurantChatController controller = new RestaurantChatController(service);

        ChatRequest emptyRequest = new ChatRequest("");
        ResponseEntity<?> response = controller.chat(emptyRequest);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        verifyNoInteractions(service);
    }

    @Test
    void testChatWithNullMessageReturnsBadRequest() {
        RestaurantChatService service = mock(RestaurantChatService.class);
        RestaurantChatController controller = new RestaurantChatController(service);

        ChatRequest nullRequest = new ChatRequest(null);
        ResponseEntity<?> response = controller.chat(nullRequest);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        verifyNoInteractions(service);
    }

    @Test
    void testChatWithNullRequestBodyReturnsBadRequest() {
        RestaurantChatService service = mock(RestaurantChatService.class);
        RestaurantChatController controller = new RestaurantChatController(service);

        ResponseEntity<?> response = controller.chat(null);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        verifyNoInteractions(service);
    }

    @Test
    void testChatWithValidMessageReturnsSuccess() {
        RestaurantChatService service = mock(RestaurantChatService.class);
        RestaurantChatController controller = new RestaurantChatController(service);

        when(service.chat(any(ChatRequest.class))).thenReturn(new ChatResponse("Here are great options"));

        ChatRequest request = new ChatRequest("Find me an Indian restaurant under 500");
        ResponseEntity<?> response = controller.chat(request);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertTrue(response.getBody() instanceof ChatResponse);
        assertEquals("Here are great options", ((ChatResponse) response.getBody()).getResponse());
    }
}
