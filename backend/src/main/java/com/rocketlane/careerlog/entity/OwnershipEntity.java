package com.rocketlane.careerlog.entity;

import com.rocketlane.careerlog.utils.OwnershipId;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "ownership", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"username", "application_id"})
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OwnershipEntity {
    @EmbeddedId
    private OwnershipId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("username")
    @JoinColumn(name = "username")
    private UserEntity user;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("applicationId")
    @JoinColumn(name = "application_id")
    private JobApplicationEntity jobApplication;
}
