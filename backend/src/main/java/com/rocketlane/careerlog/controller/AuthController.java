package com.rocketlane.careerlog.controller;

import com.rocketlane.careerlog.service.AuthService;
import com.rocketlane.careerlog.utils.LoginRequest;
import com.rocketlane.careerlog.utils.LoginResponse;
import com.rocketlane.careerlog.utils.SignupRequest;
import com.rocketlane.careerlog.utils.SignupResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    AuthService authService;
    @Autowired
    AuthController(AuthService signupService) {
        this.authService = signupService;
    }

    @PostMapping("/signup/new")
    public ResponseEntity<SignupResponse> registerNewUser(@RequestBody SignupRequest request) {
        SignupResponse response = authService.registerNewUser(request);
        if(response.isSuccess()) {
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(400).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticateUser(@RequestBody LoginRequest request) {
        LoginResponse response = authService.authenticateUser(request);
        if(response.isSuccess()) {
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(400).body(response);
    }
}
