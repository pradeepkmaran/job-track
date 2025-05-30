package com.rocketlane.careerlog.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "job_applications")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class JobApplicationEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "company_name", nullable = false)
    private String companyName;

    private String location;

    @Column(name = "date_applied")
    private LocalDate dateApplied;

    private String status;

    private String role;

    @Column(name = "career_site_link", columnDefinition = "TEXT")
    private String careerSiteLink;

    private Double pay;

    @Column(name = "deadline_to_apply")
    private LocalDate deadlineToApply;

    @Column(columnDefinition = "TEXT")
    private String notes;

    private String source;

    @ManyToOne
    @JoinColumn(name = "username", referencedColumnName = "username")
    private UserEntity user;
}
