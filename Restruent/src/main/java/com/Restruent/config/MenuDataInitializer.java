package com.Restruent.config;

import com.Restruent.model.Dish;
import com.Restruent.model.MealTime;
import com.Restruent.repository.DishRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
public class MenuDataInitializer implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(MenuDataInitializer.class);
    private final DishRepository dishRepository;

    public MenuDataInitializer(DishRepository dishRepository) {
        this.dishRepository = dishRepository;
    }

    @Override
    public void run(String... args) {
        long count = dishRepository.count();
        if (count == 0) {
            log.info("No dishes found in PostgreSQL database. Seeding 30 sample dishes for Bob Restaurant...");
            seedDishes();
            log.info("Successfully seeded {} dishes into PostgreSQL database.", dishRepository.count());
        } else {
            log.info("PostgreSQL database already contains {} dishes. Skipping data seeding.", count);
        }
    }

    private void seedDishes() {
        List<Dish> initialDishes = List.of(
                // BREAKFAST (10 dishes)
                new Dish("Aloo Paratha", "", MealTime.BREAKFAST, "Paratha", new BigDecimal("80.00"), true, false, true),
                new Dish("Paneer Paratha", "", MealTime.BREAKFAST, "Paratha", new BigDecimal("100.00"), true, false, true),
                new Dish("Masala Dosa", "", MealTime.BREAKFAST, "South Indian", new BigDecimal("120.00"), true, true, true),
                new Dish("Plain Dosa", "", MealTime.BREAKFAST, "South Indian", new BigDecimal("90.00"), true, false, true),
                new Dish("Idli Sambar", "", MealTime.BREAKFAST, "South Indian", new BigDecimal("60.00"), true, false, true),
                new Dish("Poha", "", MealTime.BREAKFAST, "Breakfast", new BigDecimal("50.00"), true, false, true),
                new Dish("Chole Bhature", "", MealTime.BREAKFAST, "Main", new BigDecimal("100.00"), true, false, true),
                new Dish("Bread Omelette", "", MealTime.BREAKFAST, "Egg", new BigDecimal("70.00"), false, false, true),
                new Dish("Veg Sandwich", "", MealTime.BREAKFAST, "Sandwich", new BigDecimal("80.00"), true, false, true),
                new Dish("Poori Sabzi", "", MealTime.BREAKFAST, "Breakfast", new BigDecimal("80.00"), true, false, true),

                // LUNCH (10 dishes)
                new Dish("Dal Tadka", "", MealTime.LUNCH, "Dal", new BigDecimal("120.00"), true, false, true),
                new Dish("Shahi Paneer", "", MealTime.LUNCH, "Paneer", new BigDecimal("180.00"), true, false, true),
                new Dish("Kadai Paneer", "", MealTime.LUNCH, "Paneer", new BigDecimal("180.00"), true, false, true),
                new Dish("Chole Rice", "", MealTime.LUNCH, "Rice", new BigDecimal("120.00"), true, false, true),
                new Dish("Rajma Rice", "", MealTime.LUNCH, "Rice", new BigDecimal("120.00"), true, false, true),
                new Dish("Veg Pulao", "", MealTime.LUNCH, "Rice", new BigDecimal("130.00"), true, false, true),
                new Dish("Jeera Rice", "", MealTime.LUNCH, "Rice", new BigDecimal("90.00"), true, false, true),
                new Dish("Mix Veg", "", MealTime.LUNCH, "Vegetables", new BigDecimal("140.00"), true, false, true),
                new Dish("Dal Makhani", "", MealTime.LUNCH, "Dal", new BigDecimal("160.00"), true, false, true),
                new Dish("Special Veg Thali", "", MealTime.LUNCH, "Thali", new BigDecimal("200.00"), true, true, true),

                // DINNER (10 dishes)
                new Dish("Paneer Butter Masala", "", MealTime.DINNER, "Paneer", new BigDecimal("190.00"), true, false, true),
                new Dish("Butter Naan", "", MealTime.DINNER, "Breads", new BigDecimal("40.00"), true, false, true),
                new Dish("Tandoori Roti", "", MealTime.DINNER, "Breads", new BigDecimal("20.00"), true, false, true),
                new Dish("Garlic Naan", "", MealTime.DINNER, "Breads", new BigDecimal("60.00"), true, false, true),
                new Dish("Malai Kofta", "", MealTime.DINNER, "Main Course", new BigDecimal("180.00"), true, false, true),
                new Dish("Veg Biryani", "", MealTime.DINNER, "Biryani", new BigDecimal("160.00"), true, false, true),
                new Dish("Special Paneer Biryani", "", MealTime.DINNER, "Biryani", new BigDecimal("220.00"), true, true, true),
                new Dish("Mushroom Masala", "", MealTime.DINNER, "Main Course", new BigDecimal("180.00"), true, false, true),
                new Dish("Kadai Paneer", "", MealTime.DINNER, "Paneer", new BigDecimal("180.00"), true, false, true),
                new Dish("Dal Makhani", "", MealTime.DINNER, "Dal", new BigDecimal("160.00"), true, false, true)
        );

        dishRepository.saveAll(initialDishes);
    }
}
