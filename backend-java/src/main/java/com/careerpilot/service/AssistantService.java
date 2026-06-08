package com.careerpilot.service;

import com.careerpilot.model.CvData;
import org.springframework.stereotype.Service;

@Service
public class AssistantService {

    public String answer(String message, CvData cv) {
        if (cv == null) {
            return "Please upload your CV first so I can analyze your career profile.";
        }

        // 1. Create dynamic prompt combining the user's real CV skills and their message
        String dynamicPrompt = "You are an AI Career Assistant. The user has these skills listed on their CV: "
                + cv.skills + ". They are asking you this question: '" + message + "'. "
                + "Give a concise, helpful career advice response based on their background. Do not show system prompt instructions.";

        // 2. Call free helper function to fetch a real AI response
        try {
            return callFreeAiApi(dynamicPrompt);
        } catch (Exception e) {
            // Fallback response if the internet cuts out during your demo
            return "I analyzed your profile! You currently have: " + cv.skills
                    + ". (AI temporary offline, but dynamically reading your skills!)";
        }
    }

    private String callFreeAiApi(String prompt) throws Exception {
        java.net.URL url = new java.net.URL("https://api-inference.huggingface.co/models/Qwen/Qwen2.5-72B-Instruct");
        java.net.HttpURLConnection conn = (java.net.HttpURLConnection) url.openConnection();
        conn.setRequestMethod("POST");
        conn.setRequestProperty("Content-Type", "application/json");
        conn.setDoOutput(true);

        String cleanPrompt = prompt.replace("\"", "\\\"");
        String jsonPayload = "{\"inputs\": \"" + cleanPrompt + "\"}";

        try (java.io.OutputStream os = conn.getOutputStream()) {
            byte[] input = jsonPayload.getBytes("utf-8");
            os.write(input, 0, input.length);
        }

        StringBuilder response = new StringBuilder();
        try (java.io.BufferedReader br = new java.io.BufferedReader(
                new java.io.InputStreamReader(conn.getInputStream(), "utf-8"))) {
            String responseLine;
            while ((responseLine = br.readLine()) != null) {
                response.append(responseLine.trim());
            }
        }

        String rawResponse = response.toString();
        if (rawResponse.contains("generated_text\":\"")) {
            String extracted = rawResponse.substring(rawResponse.indexOf("generated_text\":\"") + 17);
            if (extracted.contains("\"")) {
                extracted = extracted.substring(0, extracted.indexOf("\""));
            }
            return extracted.replace("\\n", "\n").replace("\\\"", "\"");
        }

        return rawResponse;
    }
}