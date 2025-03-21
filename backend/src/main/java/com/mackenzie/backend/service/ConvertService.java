package com.mackenzie.backend.service;

import com.mackenzie.backend.DTO.ConversionRequest;
import org.springframework.stereotype.Service;

@Service
public class ConvertService {

    public double convert(ConversionRequest request) {
        double value = request.getValue();
        String fromUnit = request.getFromUnit();
        String toUnit = request.getToUnit();

        return switch (request.getCategory()) {
            case "length" -> convertLength(value, fromUnit, toUnit);
            case "temperature" -> convertTemperature(value, fromUnit, toUnit);
            case "time" -> convertTime(value, fromUnit, toUnit);
            default -> throw new IllegalArgumentException("Invalid category: " + request.getCategory());
        };
    }

    private double convertTemperature(double value, String from, String to) {
        double celsius = switch (from) {
            case "celsius" -> value;
            case "fahrenheit" -> (value - 32) * 5 / 9;
            case "kelvin" -> value - 273.15;
            default -> throw new IllegalArgumentException("Invalid temperature unit");
        };

        return switch (to) {
            case "celsius" -> celsius;
            case "fahrenheit" -> (celsius * 9 / 5) + 32;
            case "kelvin" -> celsius + 273.15;
            default -> throw new IllegalArgumentException("Invalid temperature unit");
        };
    }

    private double convertLength(double value, String from, String to) {
        double inMeters = switch (from) {
            case "centimeters" -> value / 100;
            case "meters" -> value;
            case "kilometers" -> value * 1000;
            case "miles" -> value * 1609.34;
            case "feet" -> value * 0.3048;
            case "inches" -> value * 0.0254;
            default -> throw new IllegalArgumentException("Invalid length unit: " + from);
        };

        return switch (to) {
            case "centimeters" -> inMeters * 100;
            case "meters" -> inMeters;
            case "kilometers" -> inMeters / 1000;
            case "miles" -> inMeters / 1609.34;
            case "feet" -> inMeters / 0.3048;
            case "inches" -> inMeters / 0.0254;
            default -> throw new IllegalArgumentException("Invalid length unit: " + to);
        };
    }

    private double convertTime(double value, String from, String to) {
        // Convert everything to seconds first
        double inSeconds = switch (from) {
            case "seconds" -> value;
            case "minutes" -> value * 60;
            case "hours" -> value * 3600;
            case "days" -> value * 86400;
            default -> throw new IllegalArgumentException("Invalid time unit: " + from);
        };

        // Convert from seconds to target unit
        return switch (to) {
            case "seconds" -> inSeconds;
            case "minutes" -> inSeconds / 60;
            case "hours" -> inSeconds / 3600;
            case "days" -> inSeconds / 86400;
            default -> throw new IllegalArgumentException("Invalid time unit: " + to);
        };
    }

}
