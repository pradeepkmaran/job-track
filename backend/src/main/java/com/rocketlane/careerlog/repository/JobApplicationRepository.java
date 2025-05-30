package com.rocketlane.careerlog.repository;

import com.rocketlane.careerlog.entity.JobApplicationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface JobApplicationRepository extends JpaRepository<JobApplicationEntity, Long> {

    @Query("SELECT o.jobApplication FROM OwnershipEntity o WHERE o.user.username = :username")
    List<JobApplicationEntity> findJobApplicationsByUsername(@Param("username") String username);

    @Query(value = "SELECT ja.* FROM ownership o " +
            "JOIN job_applications ja ON o.application_id = ja.id " +
            "WHERE o.username = :username " +
            "ORDER BY o.application_id " +
            "LIMIT :limit OFFSET :offset",
            nativeQuery = true)
    List<JobApplicationEntity> findJobApplicationsByUsernameWithPageno(@Param("username") String username, @Param("limit") int limit, @Param("offset") int offset
    );


    @Query("SELECT COUNT(o.jobApplication) FROM OwnershipEntity o WHERE o.user.username = :username")
    int findPageCount(@Param("username") String username);

    JobApplicationEntity findJobApplicationById(Long id);
}