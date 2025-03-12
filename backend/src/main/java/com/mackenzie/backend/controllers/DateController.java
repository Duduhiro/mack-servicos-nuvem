package com.mackenzie.backend.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/date")
public class DateController {

    @GetMapping
    public String getDate() {
        LocalDateTime date = LocalDateTime.now();
        return date.toString();
    }

}
