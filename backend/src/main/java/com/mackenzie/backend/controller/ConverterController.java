package com.mackenzie.backend.controller;

import com.mackenzie.backend.DTO.ConversionRequest;
import com.mackenzie.backend.service.ConvertService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/convert")
public class ConverterController {

    private final ConvertService convertService;

    public ConverterController(ConvertService convertService) {
        this.convertService = convertService;
    }

    @PostMapping
    public double convert(@RequestBody ConversionRequest request) {
        return convertService.convert(request);
    }

}