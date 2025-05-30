package com.rocketlane.careerlog.service;

import com.rocketlane.careerlog.dto.JobApplicationDTO;
import com.rocketlane.careerlog.dto.OwnershipDTO;
import com.rocketlane.careerlog.dto.UserDTO;
import com.rocketlane.careerlog.entity.JobApplicationEntity;
import com.rocketlane.careerlog.entity.OwnershipEntity;
import com.rocketlane.careerlog.entity.UserEntity;
import com.rocketlane.careerlog.repository.JobApplicationRepository;
import com.rocketlane.careerlog.repository.OwnershipRepository;
import com.rocketlane.careerlog.repository.UserRepository;
import com.rocketlane.careerlog.utils.JobApplicationMapper;
import com.rocketlane.careerlog.utils.OwnershipId;
import com.rocketlane.careerlog.utils.OwnershipMapper;
import com.rocketlane.careerlog.utils.SessionInfo;
import jakarta.servlet.http.HttpSession;
import org.apache.catalina.User;
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
    private final SessionService sessionService;

    @Autowired
    public JobApplicationService(JobApplicationRepository jobApplicationRepository, SessionService sessionService, UserRepository userRepository, OwnershipRepository ownershipRepository) {
        this.jobApplicationRepository = jobApplicationRepository;
        this.sessionService = sessionService;
        this.ownershipRepository = ownershipRepository;
        this.userRepository=userRepository;
    }

    public List<JobApplicationDTO> getAllApplications(HttpSession session) {
        SessionInfo sessionInfo = sessionService.getSessionDetails(session);
        return jobApplicationRepository.findJobApplicationsByUsername(sessionInfo.getUsername())
                .stream()
                .map(JobApplicationMapper::toDTO)
                .collect(Collectors.toList());
    }

    public int getPageCount(String username) {
        int applicationsCount = jobApplicationRepository.findPageCount(username);
        int pageCount = (applicationsCount+9)/10;
        return pageCount;
    }

    public List<JobApplicationDTO> getPagedApplications(int pageno, String username) {
        return jobApplicationRepository.findJobApplicationsByUsernameWithPageno(username, 10, ((pageno-1)*10))
                .stream()
                .map(JobApplicationMapper::toDTO)
                .collect(Collectors.toList());
    }

    public Optional<JobApplicationDTO> getApplicationById(Long id) {
        return jobApplicationRepository.findById(id)
                .map(JobApplicationMapper::toDTO);
    }

    public JobApplicationDTO updateApplicationById(Long id, JobApplicationDTO jobApplicationDTO) {
        JobApplicationEntity oldJobApplicationEntity = jobApplicationRepository.findJobApplicationById(id);
        oldJobApplicationEntity = JobApplicationMapper.toEntity(jobApplicationDTO);
        return JobApplicationMapper.toDTO(jobApplicationRepository.save(oldJobApplicationEntity));
    }

    public JobApplicationDTO addApplication(JobApplicationDTO jobApplicationDTO, HttpSession session) {
        JobApplicationEntity jobApplication = JobApplicationMapper.toEntity(jobApplicationDTO);
        JobApplicationEntity savedApplication = jobApplicationRepository.save(jobApplication);

       SessionInfo sessionInfo = sessionService.getSessionDetails(session);

       UserEntity userEntity = userRepository.findByUsername(sessionInfo.getUsername())
               .orElseThrow(() -> new RuntimeException("User not found"));

        OwnershipDTO ownershipDTO = new OwnershipDTO(sessionInfo.getUsername(), savedApplication.getId());
        OwnershipEntity ownershipEntity = OwnershipMapper.toEntity(ownershipDTO, userEntity, savedApplication);
        ownershipRepository.save(ownershipEntity);

        return JobApplicationMapper.toDTO(savedApplication);
    }

    public List<String> getApplicationSources() {
        return jobApplicationRepository.findApplicationSources();
    }

    public List<String> getApplicationStatuses() {
        return jobApplicationRepository.findApplicationStatuses();
    }
}
