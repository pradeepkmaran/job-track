package com.rocketlane.careerlog.service;

import com.rocketlane.careerlog.dto.JobApplicationDTO;
import com.rocketlane.careerlog.entity.JobApplicationEntity;
import com.rocketlane.careerlog.repository.JobApplicationRepository;
import com.rocketlane.careerlog.utils.JobApplicationMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class JobApplicationService {

    private final JobApplicationRepository jobApplicationRepository;

    @Autowired
    public JobApplicationService(JobApplicationRepository jobApplicationRepository) {
        this.jobApplicationRepository = jobApplicationRepository;
    }

    public List<JobApplicationDTO> getAllApplications(String username) {
        return jobApplicationRepository.findJobApplicationsByUsername(username)
                .stream()
                .map(JobApplicationMapper::toDTO)
                .collect(Collectors.toList());
    }

    public Optional<JobApplicationDTO> getApplicationById(Long id) {
        return jobApplicationRepository.findById(id)
                .map(JobApplicationMapper::toDTO);
    }
}
