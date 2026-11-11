package com.Restruent.repository;

import com.Restruent.model.Restaurant;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.stream.Collectors;

@Repository
public class InMemoryRestaurantRepository implements RestaurantRepository {

    private final List<Restaurant> restaurants = new CopyOnWriteArrayList<>();

    public InMemoryRestaurantRepository() {
        initSampleData();
    }

    private void initSampleData() {
        restaurants.add(new Restaurant(
                1L,
                "Spice Symphony",
                "Indian",
                "Connaught Place, Central Delhi",
                450.0,
                "₹400 - ₹500 for two",
                4.6,
                false,
                List.of("Butter Chicken", "Dal Makhani", "Garlic Naan"),
                "+91-9811002233",
                "11:00 AM - 11:00 PM"
        ));

        restaurants.add(new Restaurant(
                2L,
                "Govinda's Pure Veg",
                "Indian",
                "Indiranagar, Bangalore",
                350.0,
                "₹300 - ₹400 for two",
                4.7,
                true,
                List.of("Paneer Butter Masala", "Special Veg Thali", "Kashmiri Pulao"),
                "+91-9822003344",
                "10:30 AM - 10:30 PM"
        ));

        restaurants.add(new Restaurant(
                3L,
                "Royal Biryani Mahal",
                "Indian",
                "Bandra West, Mumbai",
                500.0,
                "₹450 - ₹550 for two",
                4.5,
                false,
                List.of("Hyderabadi Dum Biryani", "Mutton Rogan Josh", "Mirchi Ka Salan"),
                "+91-9833004455",
                "12:00 PM - 11:30 PM"
        ));

        restaurants.add(new Restaurant(
                4L,
                "Bella Italia",
                "Italian",
                "Indiranagar, Bangalore",
                850.0,
                "₹800 - ₹1000 for two",
                4.8,
                false,
                List.of("Wood-Fired Margherita Pizza", "Truffle Tagliatelle", "Classic Tiramisu"),
                "+91-9844005566",
                "12:30 PM - 11:00 PM"
        ));

        restaurants.add(new Restaurant(
                5L,
                "Pasta & Fresca",
                "Italian",
                "Connaught Place, Central Delhi",
                480.0,
                "₹400 - ₹500 for two",
                4.3,
                true,
                List.of("Creamy Penne Alfredo", "Basil Pesto Spaghetti", "Garlic Herb Bruschetta"),
                "+91-9855006677",
                "11:00 AM - 10:30 PM"
        ));

        restaurants.add(new Restaurant(
                6L,
                "Golden Dragon",
                "Chinese",
                "Park Street, Kolkata",
                600.0,
                "₹500 - ₹700 for two",
                4.4,
                false,
                List.of("Kung Pao Chicken", "Schezwan Hakka Noodles", "Steamed Chicken Dim Sum"),
                "+91-9866007788",
                "12:00 PM - 11:00 PM"
        ));

        restaurants.add(new Restaurant(
                7L,
                "Wok Express Pure Veg",
                "Chinese",
                "Sector 29, Gurgaon",
                380.0,
                "₹300 - ₹450 for two",
                4.2,
                true,
                List.of("Veg Manchurian Gravy", "Chilli Garlic Fried Rice", "Crispy Spring Rolls"),
                "+91-9877008899",
                "11:30 AM - 10:30 PM"
        ));

        restaurants.add(new Restaurant(
                8L,
                "El Sombrero",
                "Mexican",
                "Bandra West, Mumbai",
                750.0,
                "₹700 - ₹900 for two",
                4.5,
                false,
                List.of("Smoky Chicken Burrito", "Supreme Loaded Nachos", "Cinnamon Churros"),
                "+91-9888009900",
                "1:00 PM - 11:30 PM"
        ));

        restaurants.add(new Restaurant(
                9L,
                "Taco Fiesta",
                "Mexican",
                "Indiranagar, Bangalore",
                420.0,
                "₹350 - ₹500 for two",
                4.4,
                true,
                List.of("Black Bean & Corn Tacos", "Chipotle Veg Quesadillas", "Fresh Guacamole Bowl"),
                "+91-9899001122",
                "11:00 AM - 11:00 PM"
        ));

        restaurants.add(new Restaurant(
                10L,
                "The Green Platter",
                "Continental",
                "Cyber Hub, Gurgaon",
                490.0,
                "₹450 - ₹550 for two",
                4.6,
                true,
                List.of("Farmhouse Grilled Sandwich", "Mediterranean Mezze", "Wild Mushroom Risotto"),
                "+91-9811223344",
                "10:00 AM - 11:00 PM"
        ));
    }

    @Override
    public List<Restaurant> findAll() {
        return new ArrayList<>(restaurants);
    }

    @Override
    public Optional<Restaurant> findById(Long id) {
        if (id == null) return Optional.empty();
        return restaurants.stream()
                .filter(r -> id.equals(r.getId()))
                .findFirst();
    }

    @Override
    public Optional<Restaurant> findByNameIgnoreCase(String name) {
        if (name == null || name.isBlank()) return Optional.empty();
        String normalized = name.trim().toLowerCase();

        // Exact match first
        Optional<Restaurant> exact = restaurants.stream()
                .filter(r -> r.getName().equalsIgnoreCase(name.trim()))
                .findFirst();
        if (exact.isPresent()) return exact;

        // Partial match
        return restaurants.stream()
                .filter(r -> r.getName().toLowerCase().contains(normalized))
                .findFirst();
    }

    @Override
    public List<Restaurant> search(String query) {
        if (query == null || query.isBlank()) {
            return findAll();
        }
        String q = query.trim().toLowerCase();
        return restaurants.stream()
                .filter(r -> r.getName().toLowerCase().contains(q)
                        || r.getCuisine().toLowerCase().contains(q)
                        || r.getLocation().toLowerCase().contains(q))
                .collect(Collectors.toList());
    }

    @Override
    public List<Restaurant> findByCuisine(String cuisine) {
        if (cuisine == null || cuisine.isBlank()) {
            return List.of();
        }
        String c = cuisine.trim().toLowerCase();
        return restaurants.stream()
                .filter(r -> r.getCuisine().toLowerCase().contains(c))
                .collect(Collectors.toList());
    }

    @Override
    public List<Restaurant> findByBudget(double maxBudget) {
        return restaurants.stream()
                .filter(r -> r.getAveragePriceForTwo() <= maxBudget)
                .collect(Collectors.toList());
    }

    @Override
    public List<Restaurant> findVegetarian() {
        return restaurants.stream()
                .filter(Restaurant::isVegetarian)
                .collect(Collectors.toList());
    }
}
