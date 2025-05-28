package com.rocketlane.careerlog.utils;

import com.rocketlane.careerlog.dto.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class LoginResponse {
    private boolean success;
    private String message;
    private UserDTO user;
}
