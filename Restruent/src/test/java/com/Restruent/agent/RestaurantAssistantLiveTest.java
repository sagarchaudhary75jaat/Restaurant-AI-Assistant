package com.Restruent.agent;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class RestaurantAssistantLiveTest {

    @Autowired
    private RestaurantAssistant restaurantAssistant;

    @Test
    void testLiveBobRestaurantBreakfastAndFamousDish() {
        assertNotNull(restaurantAssistant, "RestaurantAssistant should be injected");

        String response = restaurantAssistant.chat("test-session-bob", "Show me the breakfast menu and tell me the famous breakfast dish with its price.");
        System.out.println("=== AI Agent Response (Bob Restaurant Breakfast) ===");
        System.out.println(response);
        System.out.println("====================================================");

        assertNotNull(response);
        assertFalse(response.isBlank());
        // Verify that the answer mentions Masala Dosa (famous dish) and its price (120)
        assertTrue(response.contains("Masala Dosa"), "Should mention famous dish Masala Dosa");
        assertTrue(response.contains("120"), "Should mention price 120");
    }

    @Test
    void testLiveBobRestaurantUnknownDish() {
        assertNotNull(restaurantAssistant, "RestaurantAssistant should be injected");

        String response = restaurantAssistant.chat("test-session-bob-2", "Do you have Sushi or Pizza?");
        System.out.println("=== AI Agent Response (Unknown Dish) ===");
        System.out.println(response);
        System.out.println("=========================================");

        assertNotNull(response);
        assertFalse(response.isBlank());
        // Verify that the agent informs the customer the dish is not listed / not available
        boolean notFoundMentioned = response.toLowerCase().contains("not listed")
                || response.toLowerCase().contains("not on the menu")
                || response.toLowerCase().contains("not available")
                || response.toLowerCase().contains("do not have")
                || response.toLowerCase().contains("doesn't have");
        assertTrue(notFoundMentioned, "Should inform customer that unlisted dishes are not on Bob Restaurant's menu");
    }
}
