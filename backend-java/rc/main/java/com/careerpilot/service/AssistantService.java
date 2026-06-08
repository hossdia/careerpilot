package com.careerpilot.service;

import com.careerpilot.model.CvData;
import org.springframework.stereotype.Service;

@Service
public class AssistantService {

    public String answer(String message, CvData cv) {

        if (cv == null) {
            return "Upload your CV first so I can analyze your career profile.";
        }

        if (message.toLowerCase().contains("ready")) {
            return "Based on your CV skills: " + cv.skills +
                    ". You are partially ready. Focus on missing advanced system design + DSA.";
        }

        if (message.toLowerCase().contains("missing skills")) {
            return "You already know: " + cv.skills +
                    ". You should improve system design, cloud (AWS), and advanced SQL.";
        }

        return "I analyzed your CV. You currently have: " + cv.skills;
    }
}
