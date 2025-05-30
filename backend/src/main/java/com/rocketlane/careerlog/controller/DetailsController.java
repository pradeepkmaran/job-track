package com.rocketlane.careerlog.controller;

import com.rocketlane.careerlog.service.JobApplicationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/details")
public class DetailsController {

    JobApplicationService jobApplicationService;
    DetailsController(JobApplicationService jobApplicationService) {
        this.jobApplicationService = jobApplicationService;
    }

    @GetMapping("/application/sources")
    public ResponseEntity<List<String>> getApplicationSources() {
        return ResponseEntity.ok(jobApplicationService.getApplicationSources());
    }

    @GetMapping("/application/statuses")
    public ResponseEntity<List<String>> getApplicationStatuses() {
        return ResponseEntity.ok(jobApplicationService.getApplicationStatuses());
    }
}
