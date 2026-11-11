package com.Restruent.service;

import com.Restruent.model.Dish;
import com.Restruent.model.MealTime;
import com.Restruent.repository.DishRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class RestaurantService {

    public static final String RESTAURANT_NAME = "Bob Restaurant";
    private static final Logger log = LoggerFactory.getLogger(RestaurantService.class);

    private final DishRepository dishRepository;

    public RestaurantService(DishRepository dishRepository) {
        this.dishRepository = dishRepository;
    }

    public String getRestaurantName() {
        return RESTAURANT_NAME;
    }

    public List<Dish> getAllDishes() {
        log.info("RestaurantService: Fetching all dishes from PostgreSQL");
        return dishRepository.findAll();
    }

    public List<Dish> getDishesByMealTime(String mealTime) {
        log.info("RestaurantService: Fetching dishes for mealTime='{}' from PostgreSQL", mealTime);
        if (mealTime == null || mealTime.isBlank()) {
            return Collections.emptyList();
        }
        MealTime mt = MealTime.fromString(mealTime);
        if (mt == null) {
            log.warn("RestaurantService: Invalid mealTime '{}', returning empty list", mealTime);
            return Collections.emptyList();
        }
        return dishRepository.findByMealTime(mt);
    }

    public List<Dish> searchDishByName(String name) {
        log.info("RestaurantService: Searching dish by name='{}' in PostgreSQL", name);
        if (name == null || name.isBlank()) {
            return Collections.emptyList();
        }
        return dishRepository.findByNameContainingIgnoreCase(name.trim());
    }

    public String getDishPrice(String name) {
        log.info("RestaurantService: Getting dish price for name='{}'", name);
        if (name == null || name.isBlank()) {
            return "Please provide a valid dish name.";
        }
        Optional<Dish> dishOpt = findBestMatch(name.trim());
        if (dishOpt.isPresent()) {
            Dish dish = dishOpt.get();
            return String.format("The price of %s is ₹%s (%s).",
                    dish.getName(),
                    dish.getPrice().toPlainString(),
                    dish.getMealTime());
        }
        return "Dish '" + name + "' is not listed in Bob Restaurant's menu.";
    }

    public List<Dish> getFamousDishes() {
        log.info("RestaurantService: Fetching famous dishes from PostgreSQL");
        return dishRepository.findByFamousDishTrue();
    }

    public List<Dish> getVegetarianDishes() {
        log.info("RestaurantService: Fetching vegetarian dishes from PostgreSQL");
        return dishRepository.findByVegetarianTrue();
    }

    public String checkDishAvailability(String name) {
        log.info("RestaurantService: Checking dish availability for name='{}'", name);
        if (name == null || name.isBlank()) {
            return "Please provide a valid dish name.";
        }
        Optional<Dish> dishOpt = findBestMatch(name.trim());
        if (dishOpt.isPresent()) {
            Dish dish = dishOpt.get();
            if (Boolean.TRUE.equals(dish.getAvailable())) {
                return String.format("%s is currently available at Bob Restaurant for ₹%s (%s).",
                        dish.getName(),
                        dish.getPrice().toPlainString(),
                        dish.getMealTime());
            } else {
                return String.format("%s is currently unavailable at Bob Restaurant.", dish.getName());
            }
        }
        return "Dish '" + name + "' is not listed in Bob Restaurant's menu.";
    }

    public List<Dish> getDishesByCategory(String category) {
        log.info("RestaurantService: Fetching dishes for category='{}' from PostgreSQL", category);
        if (category == null || category.isBlank()) {
            return Collections.emptyList();
        }
        return dishRepository.findByCategoryContainingIgnoreCase(category.trim());
    }

    private Optional<Dish> findBestMatch(String name) {
        // Exact match first
        Optional<Dish> exact = dishRepository.findFirstByNameIgnoreCase(name);
        if (exact.isPresent()) {
            return exact;
        }
        // Partial match
        List<Dish> matches = dishRepository.findByNameContainingIgnoreCase(name);
        return matches.isEmpty() ? Optional.empty() : Optional.of(matches.get(0));
    }
}
