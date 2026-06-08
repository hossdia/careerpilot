package com.careerpilot.rag;

import java.util.List;

public class FitScoreEngine {

    public static int calculateFit(List<String> cvSkills, List<String> jobSkills) {

        if (jobSkills == null || jobSkills.isEmpty()) return 0;

        int match = 0;

        for (String skill : jobSkills) {
            if (cvSkills.stream()
                    .anyMatch(s -> s.toLowerCase().contains(skill.toLowerCase()))) {
                match++;
            }
        }

        return (int) ((double) match / jobSkills.size() * 100);
    }
}
