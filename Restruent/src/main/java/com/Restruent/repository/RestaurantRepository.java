package com.Restruent.repository;

import com.Restruent.model.Restaurant;

import java.util.List;
import java.util.Optional;

public interface RestaurantRepository {

    List<Restaurant> findAll();

    Optional<Restaurant> findById(Long id);

    Optional<Restaurant> findByNameIgnoreCase(String name);

    List<Restaurant> search(String query);

    List<Restaurant> findByCuisine(String cuisine);

    List<Restaurant> findByBudget(double maxBudget);

    List<Restaurant> findVegetarian();
}
