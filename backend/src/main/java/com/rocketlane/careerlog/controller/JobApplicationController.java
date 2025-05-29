package com.rocketlane.careerlog.controller;

import com.rocketlane.careerlog.dto.JobApplicationDTO;
import com.rocketlane.careerlog.service.JobApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/application")
public class JobApplicationController {
    JobApplicationService jobApplicationService;

    @Autowired
    JobApplicationController(JobApplicationService applicationService) {
        this.jobApplicationService = applicationService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<JobApplicationDTO>> getAllApplications(@RequestParam(value = "username", required = true) String username) {

        System.out.println(username);
        System.out.println(jobApplicationService.getAllApplications(username));
        return ResponseEntity.ok(jobApplicationService.getAllApplications(username));
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobApplicationDTO> getApplicationById(@PathVariable Long id) {
        return jobApplicationService.getApplicationById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
