package com.careerpilot.controller;

import com.careerpilot.model.ChatRequest;
import com.careerpilot.model.ChatResponse;
import com.careerpilot.service.AssistantService;
import com.careerpilot.service.CvService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/assistant")
public class AssistantController {

    private final AssistantService assistantService;
    private final CvService cvService;

    public AssistantController(AssistantService assistantService,
                               CvService cvService) {
        this.assistantService = assistantService;
        this.cvService = cvService;
    }

    @PostMapping("/chat")
    public ChatResponse chat(@RequestBody ChatRequest req) {

        var cv = cvService.getCv(req.userId);

        String answer = assistantService.answer(req.message, cv);

        return new ChatResponse(answer);
    }
}
