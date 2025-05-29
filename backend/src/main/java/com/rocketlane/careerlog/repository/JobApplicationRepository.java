package com.rocketlane.careerlog.repository;

import com.rocketlane.careerlog.entity.JobApplicationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface JobApplicationRepository extends JpaRepository<JobApplicationEntity, Long> {

    @Query("SELECT o.jobApplication FROM OwnershipEntity o WHERE o.user.username = :username")
    List<JobApplicationEntity> findJobApplicationsByUsername(@Param("username") String username);

    JobApplicationEntity findJobApplicationById(Long id);
}
