package com.rocketlane.careerlog.utils;

import com.rocketlane.careerlog.dto.OwnershipDTO;
import com.rocketlane.careerlog.entity.JobApplicationEntity;
import com.rocketlane.careerlog.entity.OwnershipEntity;
import com.rocketlane.careerlog.entity.UserEntity;

public class OwnershipMapper {
    public static OwnershipDTO toDTO(OwnershipEntity entity) {
        return new OwnershipDTO(
                entity.getUser().getUsername(),
                entity.getJobApplication().getId()
        );
    }

    public static OwnershipEntity toEntity(OwnershipDTO dto, UserEntity user, JobApplicationEntity jobApplication) {
        OwnershipEntity entity = new OwnershipEntity();

        OwnershipId id = new OwnershipId(dto.getUsername(), dto.getApplicationId());
        entity.setId(id);
        entity.setUser(user);
        entity.setJobApplication(jobApplication);
        return entity;
    }
}

