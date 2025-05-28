package com.rocketlane.careerlog.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobApplicationDTO {
    private Long id;
    private String companyName;
    private String location;
    private LocalDate dateApplied;
    private String status;
    private String role;
    private String careerSiteLink;
    private Double pay;
    private LocalDate deadlineToApply;
    private String notes;
    private String source;
    private String username;
}
