package com.Restruent.model;

public enum MealTime {
    BREAKFAST,
    LUNCH,
    DINNER;

    public static MealTime fromString(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }
        for (MealTime mt : values()) {
            if (mt.name().equalsIgnoreCase(value.trim())) {
                return mt;
            }
        }
        return null;
    }
}
