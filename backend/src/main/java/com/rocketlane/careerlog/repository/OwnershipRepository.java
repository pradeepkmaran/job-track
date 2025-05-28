package com.rocketlane.careerlog.repository;

import com.rocketlane.careerlog.entity.OwnershipEntity;
import com.rocketlane.careerlog.utils.OwnershipId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OwnershipRepository extends JpaRepository<OwnershipEntity, OwnershipId> {
    List<OwnershipEntity> findByUserUsername(String username);
    List<OwnershipEntity> findByJobApplicationId(Long applicationId);
}