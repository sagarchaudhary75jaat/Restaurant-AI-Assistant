package com.Restruent.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "dishes")
public class Dish {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(length = 500)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "meal_time", nullable = false)
    private MealTime mealTime;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @Column(nullable = false)
    private Boolean vegetarian;

    @Column(name = "famous_dish", nullable = false)
    private Boolean famousDish;

    @Column(nullable = false)
    private Boolean available;

    public Dish() {
    }

    public Dish(String name, String description, MealTime mealTime,
                String category, BigDecimal price, Boolean vegetarian,
                Boolean famousDish, Boolean available) {
        this.name = name;
        this.description = description;
        this.mealTime = mealTime;
        this.category = category;
        this.price = price;
        this.vegetarian = vegetarian;
        this.famousDish = famousDish;
        this.available = available;
    }

    public Dish(Long id, String name, String description, MealTime mealTime,
                String category, BigDecimal price, Boolean vegetarian,
                Boolean famousDish, Boolean available) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.mealTime = mealTime;
        this.category = category;
        this.price = price;
        this.vegetarian = vegetarian;
        this.famousDish = famousDish;
        this.available = available;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public MealTime getMealTime() {
        return mealTime;
    }

    public void setMealTime(MealTime mealTime) {
        this.mealTime = mealTime;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Boolean isVegetarian() {
        return vegetarian;
    }

    public Boolean getVegetarian() {
        return vegetarian;
    }

    public void setVegetarian(Boolean vegetarian) {
        this.vegetarian = vegetarian;
    }

    public Boolean isFamousDish() {
        return famousDish;
    }

    public Boolean getFamousDish() {
        return famousDish;
    }

    public void setFamousDish(Boolean famousDish) {
        this.famousDish = famousDish;
    }

    public Boolean isAvailable() {
        return available;
    }

    public Boolean getAvailable() {
        return available;
    }

    public void setAvailable(Boolean available) {
        this.available = available;
    }

    @Override
    public String toString() {
        return "Dish{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", mealTime=" + mealTime +
                ", category='" + category + '\'' +
                ", price=₹" + price +
                ", vegetarian=" + vegetarian +
                ", famousDish=" + famousDish +
                ", available=" + available +
                '}';
    }
}
