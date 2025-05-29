package com.rocketlane.careerlog.service;

import com.rocketlane.careerlog.dto.JobApplicationDTO;
import com.rocketlane.careerlog.dto.OwnershipDTO;
import com.rocketlane.careerlog.entity.JobApplicationEntity;
import com.rocketlane.careerlog.entity.OwnershipEntity;
import com.rocketlane.careerlog.entity.UserEntity;
import com.rocketlane.careerlog.repository.JobApplicationRepository;
import com.rocketlane.careerlog.repository.OwnershipRepository;
import com.rocketlane.careerlog.repository.UserRepository;
import com.rocketlane.careerlog.utils.JobApplicationMapper;
import com.rocketlane.careerlog.utils.OwnershipMapper;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class JobApplicationService {

    private final JobApplicationRepository jobApplicationRepository;
    private final OwnershipRepository ownershipRepository;
    private final UserRepository userRepository;
    //private final SessionService sessionService;

    @Autowired
    public JobApplicationService(JobApplicationRepository jobApplicationRepository,  UserRepository userRepository, OwnershipRepository ownershipRepository) {
        this.jobApplicationRepository = jobApplicationRepository;
        //this.sessionService = sessionService;
        this.ownershipRepository = ownershipRepository;
        this.userRepository=userRepository;
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


//    public JobApplicationDTO saveApplication(JobApplicationDTO applicationDTO) {
//        JobApplicationEntity application = JobApplicationMapper.toEntity(applicationDTO);
//        JobApplicationEntity savedApplication = jobApplicationRepository.save(application);
//        OwnershipEntity owner = OwnershipRepository.save(saved)
//        return JobApplicationMapper.toDTO(savedApplication);
//    }

    public JobApplicationDTO addApplication(JobApplicationDTO jobApplicationDTO, HttpSession session) {
        JobApplicationEntity jobApplication = JobApplicationMapper.toEntity(jobApplicationDTO);
        JobApplicationEntity savedApplication = jobApplicationRepository.save(jobApplication);

//        SessionInfo sessionInfo = sessionService.getSessionDetails(session);

//        UserEntity userEntity = userRepository.findByUsername(sessionInfo.getUsername())
//                .orElseThrow(() -> new RuntimeException("User not found"));

        UserEntity userEntity = userRepository.findByUsername(jobApplicationDTO.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        OwnershipDTO ownershipDTO = new OwnershipDTO(jobApplicationDTO.getUsername(), savedApplication.getId());
        OwnershipEntity ownershipEntity = OwnershipMapper.toEntity(ownershipDTO, userEntity, savedApplication);
        ownershipRepository.save(ownershipEntity);

        return JobApplicationMapper.toDTO(savedApplication);
    }

    public JobApplicationDTO updateApplicationById(Long id, JobApplicationDTO jobApplicationDTO) {
        JobApplicationEntity oldJobApplicationEntity = jobApplicationRepository.findJobApplicationById(id);
        oldJobApplicationEntity = JobApplicationMapper.toEntity(jobApplicationDTO);
        return JobApplicationMapper.toDTO(jobApplicationRepository.save(oldJobApplicationEntity));
    }

}
