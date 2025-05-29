package com.rocketlane.careerlog.utils;

import com.rocketlane.careerlog.dto.JobApplicationDTO;
import com.rocketlane.careerlog.entity.JobApplicationEntity;

public class JobApplicationMapper {

    public static JobApplicationDTO toDTO(JobApplicationEntity model) {
        return JobApplicationDTO.builder()
                .id(model.getId())
                .companyName(model.getCompanyName())
                .location(model.getLocation())
                .dateApplied(model.getDateApplied())
                .status(model.getStatus())
                .role(model.getRole())
                .careerSiteLink(model.getCareerSiteLink())
                .pay(model.getPay())
                .deadlineToApply(model.getDeadlineToApply())
                .notes(model.getNotes())
                .source(model.getSource())
                .build();
    }

    public static JobApplicationEntity toEntity(JobApplicationDTO dto) {
        return JobApplicationEntity.builder()
                .id(dto.getId())
                .companyName(dto.getCompanyName())
                .location(dto.getLocation())
                .dateApplied(dto.getDateApplied())
                .status(dto.getStatus())
                .role(dto.getRole())
                .careerSiteLink(dto.getCareerSiteLink())
                .pay(dto.getPay())
                .deadlineToApply(dto.getDeadlineToApply())
                .notes(dto.getNotes())
                .source(dto.getSource())
                .build();
    }
}