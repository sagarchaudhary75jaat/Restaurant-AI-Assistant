package com.Restruent.repository;

import com.Restruent.model.Dish;
import com.Restruent.model.MealTime;
import com.Restruent.service.RestaurantService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class PostgreSqlRestaurantIntegrationTest {

    @Autowired
    private DishRepository dishRepository;

    @Autowired
    private RestaurantService restaurantService;

    @Test
    void testPostgreSqlContains30Dishes() {
        long count = dishRepository.count();
        assertEquals(30, count, "PostgreSQL should contain exactly 30 dish records");
    }

    @Test
    void testBreakfastContains10Dishes() {
        List<Dish> breakfastDishes = dishRepository.findByMealTime(MealTime.BREAKFAST);
        assertEquals(10, breakfastDishes.size(), "Breakfast should contain exactly 10 dishes");
    }

    @Test
    void testLunchContains10Dishes() {
        List<Dish> lunchDishes = dishRepository.findByMealTime(MealTime.LUNCH);
        assertEquals(10, lunchDishes.size(), "Lunch should contain exactly 10 dishes");
    }

    @Test
    void testDinnerContains10Dishes() {
        List<Dish> dinnerDishes = dishRepository.findByMealTime(MealTime.DINNER);
        assertEquals(10, dinnerDishes.size(), "Dinner should contain exactly 10 dishes");
    }

    @Test
    void testExactly3FamousDishes() {
        List<Dish> famous = dishRepository.findByFamousDishTrue();
        assertEquals(3, famous.size(), "Exactly 3 dishes should have famousDish = true");

        List<String> famousNames = famous.stream().map(Dish::getName).toList();
        assertTrue(famousNames.contains("Masala Dosa"));
        assertTrue(famousNames.contains("Special Veg Thali"));
        assertTrue(famousNames.contains("Special Paneer Biryani"));
    }

    @Test
    void testAllDishesAvailable() {
        List<Dish> all = dishRepository.findAll();
        assertTrue(all.stream().allMatch(Dish::getAvailable), "All sample dishes should be available");
    }

    @Test
    void testVegetarianDishes() {
        List<Dish> veg = dishRepository.findByVegetarianTrue();
        assertEquals(29, veg.size(), "All dishes except Bread Omelette should be vegetarian (29 dishes)");

        boolean hasBreadOmelette = veg.stream().anyMatch(d -> d.getName().equals("Bread Omelette"));
        assertFalse(hasBreadOmelette, "Bread Omelette is non-vegetarian and must not be in vegetarian list");
    }

    @Test
    void testRestaurantServiceQueriesPostgreSql() {
        List<Dish> dishes = restaurantService.getAllDishes();
        assertEquals(30, dishes.size());

        String price = restaurantService.getDishPrice("Masala Dosa");
        assertTrue(price.contains("120"));

        String availability = restaurantService.checkDishAvailability("Aloo Paratha");
        assertTrue(availability.contains("currently available"));
    }
}
