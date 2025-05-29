package com.rocketlane.careerlog.utils;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class LogoutResponse {
    private String username;
    private String email;
}
