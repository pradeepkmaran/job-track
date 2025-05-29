package com.rocketlane.careerlog.controller;

import com.rocketlane.careerlog.service.SessionService;
import com.rocketlane.careerlog.utils.SessionInfo;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/session")
public class  SessionController {
    private final SessionService sessionService;

    @Autowired
    SessionController(SessionService sessionService) {
        this.sessionService = sessionService;
    }

    @GetMapping("/me")
    public ResponseEntity<?> getSessionDetails(HttpSession session) {
        return ResponseEntity.ok(sessionService.getSessionDetails(session));
    }

    @PostMapping("/destroy")
    public ResponseEntity<?> invalidateSession(HttpSession session) {
        return ResponseEntity.ok(sessionService.invalidateSession(session));
    }
}
