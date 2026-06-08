package com.careerpilot.controller;

import com.careerpilot.model.*;
import com.careerpilot.service.*;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    private final JobService jobService;
    private final CvService cvService;
    private final FitScoreService fitScoreService;

    public JobController(JobService jobService,
                         CvService cvService,
                         FitScoreService fitScoreService) {
        this.jobService = jobService;
        this.cvService = cvService;
        this.fitScoreService = fitScoreService;
    }

    @GetMapping("/{userId}")
    public List<FitResult> getJobs(@PathVariable String userId) {

        CvData cv = cvService.getCv(userId);
        List<Job> jobs = jobService.getMockJobs();

        List<FitResult> results = new ArrayList<>();

        for (Job job : jobs) {
            results.add(fitScoreService.calculateFit(cv, job));
        }

        return results;
    }
}
