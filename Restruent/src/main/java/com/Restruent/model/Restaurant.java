package com.Restruent.model;

import java.util.List;

public class Restaurant {

    private Long id;
    private String name;
    private String cuisine;
    private String location;
    private double averagePriceForTwo;
    private String priceRange;
    private double rating;
    private boolean isVegetarian;
    private List<String> specialties;
    private String contactNumber;
    private String openingHours;

    public Restaurant() {
    }

    public Restaurant(Long id, String name, String cuisine, String location,
                      double averagePriceForTwo, String priceRange, double rating,
                      boolean isVegetarian, List<String> specialties,
                      String contactNumber, String openingHours) {
        this.id = id;
        this.name = name;
        this.cuisine = cuisine;
        this.location = location;
        this.averagePriceForTwo = averagePriceForTwo;
        this.priceRange = priceRange;
        this.rating = rating;
        this.isVegetarian = isVegetarian;
        this.specialties = specialties;
        this.contactNumber = contactNumber;
        this.openingHours = openingHours;
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

    public String getCuisine() {
        return cuisine;
    }

    public void setCuisine(String cuisine) {
        this.cuisine = cuisine;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public double getAveragePriceForTwo() {
        return averagePriceForTwo;
    }

    public void setAveragePriceForTwo(double averagePriceForTwo) {
        this.averagePriceForTwo = averagePriceForTwo;
    }

    public String getPriceRange() {
        return priceRange;
    }

    public void setPriceRange(String priceRange) {
        this.priceRange = priceRange;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public boolean isVegetarian() {
        return isVegetarian;
    }

    public void setVegetarian(boolean vegetarian) {
        isVegetarian = vegetarian;
    }

    public List<String> getSpecialties() {
        return specialties;
    }

    public void setSpecialties(List<String> specialties) {
        this.specialties = specialties;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public String getOpeningHours() {
        return openingHours;
    }

    public void setOpeningHours(String openingHours) {
        this.openingHours = openingHours;
    }

    @Override
    public String toString() {
        return "Restaurant{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", cuisine='" + cuisine + '\'' +
                ", location='" + location + '\'' +
                ", averagePriceForTwo=" + averagePriceForTwo +
                ", priceRange='" + priceRange + '\'' +
                ", rating=" + rating +
                ", isVegetarian=" + isVegetarian +
                ", specialties=" + specialties +
                ", contactNumber='" + contactNumber + '\'' +
                ", openingHours='" + openingHours + '\'' +
                '}';
    }
}
