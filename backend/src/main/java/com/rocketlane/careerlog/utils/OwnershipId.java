package com.rocketlane.careerlog.utils;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class OwnershipId implements Serializable {
    private String username;
    private Long applicationId;
}