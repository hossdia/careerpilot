package com.careerpilot.controller;

import com.careerpilot.dto.JobMatchResponse;
import com.careerpilot.model.Job;
import com.careerpilot.service.JobService;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
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

        // 1. Grab the real live skills from the CvController memory!
        List<String> cvSkills = com.careerpilot.controller.CvController.skillsSavedInMemory;

        // 2. Fetch our jobs list
        List<Job> jobs = jobService.getMockJobs();
        List<JobMatchResponse> result = new ArrayList<>();

        // 3. Programmatically calculate the score!
        for (Job job : jobs) {
            int score = com.careerpilot.core.FitScoreEngine.calculateFit(cvSkills, job.skills);

            JobMatchResponse res = new JobMatchResponse();
            res.title = job.title;
            res.company = job.company;
            res.location = job.location;
            res.fitScore = score;
            res.reason = "Matched " + score + "% skills from your real uploaded CV profile";

            result.add(res);
        }

        return result;
    }
}