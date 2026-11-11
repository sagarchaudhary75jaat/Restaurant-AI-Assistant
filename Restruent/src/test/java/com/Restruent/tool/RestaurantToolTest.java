package com.Restruent.tool;

import com.Restruent.model.Dish;
import com.Restruent.model.MealTime;
import com.Restruent.repository.DishRepository;
import com.Restruent.service.RestaurantService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class RestaurantToolTest {

    private DishRepository dishRepository;
    private RestaurantService restaurantService;
    private RestaurantTool restaurantTool;

    @BeforeEach
    void setUp() {
        dishRepository = mock(DishRepository.class);
        restaurantService = new RestaurantService(dishRepository);
        restaurantTool = new RestaurantTool(restaurantService);
    }

    @Test
    void testGetRestaurantName() {
        assertEquals("Bob Restaurant", restaurantTool.getRestaurantName());
    }

    @Test
    void testGetAllDishes() {
        Dish d1 = new Dish("Masala Dosa", "", MealTime.BREAKFAST, "South Indian", new BigDecimal("120.00"), true, true, true);
        when(dishRepository.findAll()).thenReturn(List.of(d1));

        List<Dish> dishes = restaurantTool.getAllDishes();
        assertEquals(1, dishes.size());
        assertEquals("Masala Dosa", dishes.get(0).getName());
        verify(dishRepository, times(1)).findAll();
    }

    @Test
    void testGetDishesByMealTime() {
        Dish d1 = new Dish("Poha", "", MealTime.BREAKFAST, "Breakfast", new BigDecimal("50.00"), true, false, true);
        when(dishRepository.findByMealTime(MealTime.BREAKFAST)).thenReturn(List.of(d1));

        List<Dish> breakfastDishes = restaurantTool.getDishesByMealTime("BREAKFAST");
        assertEquals(1, breakfastDishes.size());
        assertEquals("Poha", breakfastDishes.get(0).getName());
        verify(dishRepository, times(1)).findByMealTime(MealTime.BREAKFAST);
    }

    @Test
    void testSearchDishByName() {
        Dish d1 = new Dish("Paneer Paratha", "", MealTime.BREAKFAST, "Paratha", new BigDecimal("100.00"), true, false, true);
        when(dishRepository.findByNameContainingIgnoreCase("Paneer")).thenReturn(List.of(d1));

        List<Dish> results = restaurantTool.searchDishByName("Paneer");
        assertEquals(1, results.size());
        assertEquals("Paneer Paratha", results.get(0).getName());
    }

    @Test
    void testGetDishPrice() {
        Dish d1 = new Dish("Special Veg Thali", "", MealTime.LUNCH, "Thali", new BigDecimal("200.00"), true, true, true);
        when(dishRepository.findFirstByNameIgnoreCase("Special Veg Thali")).thenReturn(Optional.of(d1));

        String priceStr = restaurantTool.getDishPrice("Special Veg Thali");
        assertTrue(priceStr.contains("₹200.00"));
        assertTrue(priceStr.contains("Special Veg Thali"));

        when(dishRepository.findFirstByNameIgnoreCase("Burger")).thenReturn(Optional.empty());
        when(dishRepository.findByNameContainingIgnoreCase("Burger")).thenReturn(List.of());

        String notFound = restaurantTool.getDishPrice("Burger");
        assertTrue(notFound.contains("not listed in Bob Restaurant's menu"));
    }

    @Test
    void testGetFamousDishes() {
        Dish d1 = new Dish("Special Paneer Biryani", "", MealTime.DINNER, "Biryani", new BigDecimal("220.00"), true, true, true);
        when(dishRepository.findByFamousDishTrue()).thenReturn(List.of(d1));

        List<Dish> famous = restaurantTool.getFamousDishes();
        assertEquals(1, famous.size());
        assertTrue(famous.get(0).getFamousDish());
    }

    @Test
    void testGetVegetarianDishes() {
        Dish d1 = new Dish("Dal Tadka", "", MealTime.LUNCH, "Dal", new BigDecimal("120.00"), true, false, true);
        when(dishRepository.findByVegetarianTrue()).thenReturn(List.of(d1));

        List<Dish> veg = restaurantTool.getVegetarianDishes();
        assertEquals(1, veg.size());
        assertTrue(veg.get(0).getVegetarian());
    }

    @Test
    void testCheckDishAvailability() {
        Dish d1 = new Dish("Aloo Paratha", "", MealTime.BREAKFAST, "Paratha", new BigDecimal("80.00"), true, false, true);
        when(dishRepository.findFirstByNameIgnoreCase("Aloo Paratha")).thenReturn(Optional.of(d1));

        String availability = restaurantTool.checkDishAvailability("Aloo Paratha");
        assertTrue(availability.contains("currently available"));
        assertTrue(availability.contains("₹80.00"));
    }

    @Test
    void testGetDishesByCategory() {
        Dish d1 = new Dish("Butter Naan", "", MealTime.DINNER, "Breads", new BigDecimal("40.00"), true, false, true);
        when(dishRepository.findByCategoryContainingIgnoreCase("Breads")).thenReturn(List.of(d1));

        List<Dish> breads = restaurantTool.getDishesByCategory("Breads");
        assertEquals(1, breads.size());
        assertEquals("Butter Naan", breads.get(0).getName());
    }
}
