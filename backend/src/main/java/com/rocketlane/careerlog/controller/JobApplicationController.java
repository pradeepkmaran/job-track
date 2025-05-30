package com.rocketlane.careerlog.controller;

import com.rocketlane.careerlog.dto.JobApplicationDTO;
import com.rocketlane.careerlog.service.JobApplicationService;
import com.rocketlane.careerlog.service.SessionService;
import com.rocketlane.careerlog.utils.SessionInfo;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.graphql.GraphQlProperties;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;

import static java.util.Objects.nonNull;

@RestController
@RequestMapping("/api/v1/application")
public class JobApplicationController {

    JobApplicationService jobApplicationService;
    SessionService sessionService;
    @Autowired
    JobApplicationController(JobApplicationService applicationService, SessionService sessionService) {
        this.jobApplicationService = applicationService;
        this.sessionService = sessionService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<JobApplicationDTO>> getAllApplications(HttpSession session) {
        SessionInfo sessionInfo = sessionService.getSessionDetails(session);
        if(sessionInfo.getUsername()==null || sessionInfo.getEmail()==null) {
            return ResponseEntity.status(401).body(List.of());
        }
        return ResponseEntity.ok(jobApplicationService.getAllApplications(session));
    }

    @GetMapping("/page/count")
    public ResponseEntity<Integer> getPageCount(HttpSession session) {
        SessionInfo sessionInfo = sessionService.getSessionDetails(session);
        if(sessionInfo.getUsername()==null || sessionInfo.getEmail()==null) {
            return ResponseEntity.status(401).body(0);
        }
        return ResponseEntity.ok(jobApplicationService.getPageCount(sessionInfo.getUsername()));
    }

    @GetMapping("/page/{pageno}")
    public ResponseEntity<List<JobApplicationDTO>> getPagedApplications(@PathVariable int pageno, HttpSession session) {
        SessionInfo sessionInfo = sessionService.getSessionDetails(session);
        if(sessionInfo.getUsername()==null || sessionInfo.getEmail()==null) {
            return ResponseEntity.status(401).body(List.of());
        }
        return ResponseEntity.ok(jobApplicationService.getPagedApplications(pageno, sessionInfo.getUsername()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobApplicationDTO> getApplicationById(@PathVariable Long id) {
        return jobApplicationService.getApplicationById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/new")
    public ResponseEntity<JobApplicationDTO> addApplication(@RequestBody JobApplicationDTO jobApplicationDTO, HttpSession session) {
        return ResponseEntity.ok(jobApplicationService.addApplication(jobApplicationDTO, session));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<JobApplicationDTO> updateApplicationById(@PathVariable Long id, @RequestBody JobApplicationDTO jobApplicationDTO) {
        return ResponseEntity.ok(jobApplicationService.updateApplicationById(id, jobApplicationDTO));
    }
}

