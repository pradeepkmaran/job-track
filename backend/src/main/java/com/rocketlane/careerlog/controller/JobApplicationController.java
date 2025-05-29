package com.rocketlane.careerlog.controller;

import com.rocketlane.careerlog.dto.JobApplicationDTO;
import com.rocketlane.careerlog.repository.JobApplicationRepository;
import com.rocketlane.careerlog.service.JobApplicationService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/application")
@CrossOrigin(origins = "http://localhost:3000/")
public class JobApplicationController {
    JobApplicationService jobApplicationService;

    @Autowired
    JobApplicationController(JobApplicationService applicationService) {
        this.jobApplicationService = applicationService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<JobApplicationDTO>> getAllApplications(@RequestParam(value = "username", required = true) String username) {
        return ResponseEntity.ok(jobApplicationService.getAllApplications(username));
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobApplicationDTO> getApplicationById(@PathVariable Long id) {
        return jobApplicationService.getApplicationById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

//    @PostMapping
//    public JobApplicationDTO addOneApplication(@RequestBody JobApplicationDTO applicationDTO) {
//        System.out.println("sadfgasdfsadf");
//        return jobApplicationService.saveApplication(applicationDTO);
//    }

    @PostMapping("/new")
    public ResponseEntity<JobApplicationDTO> addApplication(@RequestBody JobApplicationDTO jobApplicationDTO, HttpSession session) {
        return ResponseEntity.ok(jobApplicationService.addApplication(jobApplicationDTO, session));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<JobApplicationDTO> updateApplicationById(@PathVariable Long id, @RequestBody JobApplicationDTO jobApplicationDTO) {
        return ResponseEntity.ok(jobApplicationService.updateApplicationById(id, jobApplicationDTO));
    }

}
