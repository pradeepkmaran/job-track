package com.rocketlane.careerlog.utils;

import com.rocketlane.careerlog.dto.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class SignupResponse {
    private boolean success;
    private String message;
    private UserDTO user;
}
