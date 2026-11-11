package com.Restruent.repository;

import com.Restruent.model.Dish;
import com.Restruent.model.MealTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DishRepository extends JpaRepository<Dish, Long> {

    List<Dish> findByMealTime(MealTime mealTime);

    List<Dish> findByNameContainingIgnoreCase(String name);

    Optional<Dish> findFirstByNameIgnoreCase(String name);

    List<Dish> findByCategoryContainingIgnoreCase(String category);

    List<Dish> findByFamousDishTrue();

    List<Dish> findByVegetarianTrue();
}
