package com.Restruent.tool;

import com.Restruent.model.Dish;
import com.Restruent.service.RestaurantService;
import dev.langchain4j.agent.tool.P;
import dev.langchain4j.agent.tool.Tool;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;

@Component
public class RestaurantTool {

    private static final Logger log = LoggerFactory.getLogger(RestaurantTool.class);
    private final RestaurantService restaurantService;

    public RestaurantTool(RestaurantService restaurantService) {
        this.restaurantService = restaurantService;
    }

    @Tool("Get the official name of the restaurant")
    public String getRestaurantName() {
        log.info("Tool called: getRestaurantName()");
        return restaurantService.getRestaurantName();
    }

    @Tool("Get all dishes available on Bob Restaurant's menu from the database")
    public List<Dish> getAllDishes() {
        log.info("Tool called: getAllDishes()");
        try {
            return restaurantService.getAllDishes();
        } catch (Exception e) {
            log.error("Error in getAllDishes tool: {}", e.getMessage(), e);
            return Collections.emptyList();
        }
    }

    @Tool("Get dishes for a specific meal time (BREAKFAST, LUNCH, or DINNER) from the database")
    public List<Dish> getDishesByMealTime(
            @P("The meal time to filter by: BREAKFAST, LUNCH, or DINNER") String mealTime) {
        log.info("Tool called: getDishesByMealTime(mealTime='{}')", mealTime);
        try {
            return restaurantService.getDishesByMealTime(mealTime);
        } catch (Exception e) {
            log.error("Error in getDishesByMealTime tool: {}", e.getMessage(), e);
            return Collections.emptyList();
        }
    }

    @Tool("Search for dishes on Bob Restaurant's menu by dish name or keyword from the database")
    public List<Dish> searchDishByName(
            @P("Name or keyword of the dish to search for") String dishName) {
        log.info("Tool called: searchDishByName(dishName='{}')", dishName);
        try {
            return restaurantService.searchDishByName(dishName);
        } catch (Exception e) {
            log.error("Error in searchDishByName tool: {}", e.getMessage(), e);
            return Collections.emptyList();
        }
    }

    @Tool("Get the price of a specific dish on Bob Restaurant's menu from the database")
    public String getDishPrice(
            @P("The exact or partial name of the dish") String dishName) {
        log.info("Tool called: getDishPrice(dishName='{}')", dishName);
        try {
            return restaurantService.getDishPrice(dishName);
        } catch (Exception e) {
            log.error("Error in getDishPrice tool: {}", e.getMessage(), e);
            return "Error retrieving price for dish: " + dishName;
        }
    }

    @Tool("Get the famous, signature dishes at Bob Restaurant from the database")
    public List<Dish> getFamousDishes() {
        log.info("Tool called: getFamousDishes()");
        try {
            return restaurantService.getFamousDishes();
        } catch (Exception e) {
            log.error("Error in getFamousDishes tool: {}", e.getMessage(), e);
            return Collections.emptyList();
        }
    }

    @Tool("Get all vegetarian dishes on Bob Restaurant's menu from the database")
    public List<Dish> getVegetarianDishes() {
        log.info("Tool called: getVegetarianDishes()");
        try {
            return restaurantService.getVegetarianDishes();
        } catch (Exception e) {
            log.error("Error in getVegetarianDishes tool: {}", e.getMessage(), e);
            return Collections.emptyList();
        }
    }

    @Tool("Check if a dish is currently available at Bob Restaurant from the database")
    public String checkDishAvailability(
            @P("The name of the dish to check") String dishName) {
        log.info("Tool called: checkDishAvailability(dishName='{}')", dishName);
        try {
            return restaurantService.checkDishAvailability(dishName);
        } catch (Exception e) {
            log.error("Error in checkDishAvailability tool: {}", e.getMessage(), e);
            return "Error checking availability for dish: " + dishName;
        }
    }

    @Tool("Get dishes on Bob Restaurant's menu by category from the database (e.g., Paratha, South Indian, Dal, Paneer, Rice, Breads, Biryani, Thali)")
    public List<Dish> getDishesByCategory(
            @P("The category of dishes to retrieve") String category) {
        log.info("Tool called: getDishesByCategory(category='{}')", category);
        try {
            return restaurantService.getDishesByCategory(category);
        } catch (Exception e) {
            log.error("Error in getDishesByCategory tool: {}", e.getMessage(), e);
            return Collections.emptyList();
        }
    }
}
