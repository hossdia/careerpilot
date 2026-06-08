package com.careerpilot.controller;

import com.careerpilot.dto.JobMatchResponse;
import com.careerpilot.model.Job;
import com.careerpilot.rag.FitScoreEngine;
import com.careerpilot.service.JobService;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = "*")
public class JobController {

    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    @GetMapping("/match")
    public List<JobMatchResponse> matchJobs() {

        // MOCK CV (later replace with uploaded CV)
        List<String> cvSkills = Arrays.asList("Java", "Spring Boot", "SQL", "Machine Learning");

        List<Job> jobs = jobService.getMockJobs();

        List<JobMatchResponse> result = new ArrayList<>();

        for (Job job : jobs) {

            int score = FitScoreEngine.calculateFit(cvSkills, job.skills);

            JobMatchResponse res = new JobMatchResponse();
            res.title = job.title;
            res.company = job.company;
            res.location = job.location;
            res.fitScore = score;
            res.reason = "Matched " + score + "% skills from your CV";

            result.add(res);
        }

        return result;
    }
}
