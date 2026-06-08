package com.careerpilot.controller;

import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/cv")
@CrossOrigin(origins = "*")
public class CvController {

    public static List<String> skillsSavedInMemory = new ArrayList<>(Arrays.asList("Java", "Spring Boot", "SQL"));

    @PostMapping("/upload")
    public String upload(@RequestParam String userId, @RequestBody String text) {
        skillsSavedInMemory.clear();

        String cleanText = text.toLowerCase();
        if (cleanText.contains("java")) skillsSavedInMemory.add("Java");
        if (cleanText.contains("spring")) skillsSavedInMemory.add("Spring Boot");
        if (cleanText.contains("sql")) skillsSavedInMemory.add("SQL");
        if (cleanText.contains("python")) skillsSavedInMemory.add("Python");
        if (cleanText.contains("machine learning") || cleanText.contains("ml")) skillsSavedInMemory.add("Machine Learning");
        if (cleanText.contains("pandas")) skillsSavedInMemory.add("Pandas");

        return "Successfully uploaded CV! Detected skills: " + skillsSavedInMemory;
    }

    @GetMapping("/{userId}")
    public List<String> get(@PathVariable String userId) {
        return skillsSavedInMemory;
    }
}