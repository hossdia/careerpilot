package com.careerpilot.service;

import com.careerpilot.model.Job;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class JobService {

    public List<Job> getMockJobs() {

        List<Job> jobs = new ArrayList<>();

        Job j1 = new Job();
        j1.title = "ML Intern";
        j1.company = "TechBD";
        j1.location = "Dhaka";
        j1.skills = Arrays.asList("Python", "Machine Learning", "Pandas");

        Job j2 = new Job();
        j2.title = "Backend Intern";
        j2.company = "StartupX";
        j2.location = "Remote";
        j2.skills = Arrays.asList("Java", "Spring Boot", "SQL");

        jobs.add(j1);
        jobs.add(j2);

        return jobs;
    }
}
