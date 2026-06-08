package com.careerpilot.controller;

import com.careerpilot.model.CvData;
import com.careerpilot.service.CvService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cv")
public class CvController {

    private final CvService cvService;

    public CvController(CvService cvService) {
        this.cvService = cvService;
    }

    @PostMapping("/upload")
    public CvData upload(@RequestParam String userId,
                         @RequestBody String text) {
        return cvService.uploadCv(userId, text);
    }

    @GetMapping("/{userId}")
    public CvData get(@PathVariable String userId) {
        return cvService.getCv(userId);
    }
}
