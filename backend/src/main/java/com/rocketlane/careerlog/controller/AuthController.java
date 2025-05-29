package com.rocketlane.careerlog.controller;

import com.rocketlane.careerlog.service.AuthService;
import com.rocketlane.careerlog.service.SessionService;
import com.rocketlane.careerlog.utils.*;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;

    @Autowired
    public AuthController(AuthService signupService) {
        this.authService = signupService;
    }

    @PostMapping("/signup/new")
    public ResponseEntity<SignupResponse> registerNewUser(@RequestBody SignupRequest request, HttpSession session) {
        SignupResponse response = authService.registerNewUser(request);
        if (response.isSuccess()) {
            session.setAttribute("username", response.getUser().getUsername());
            session.setAttribute("email", response.getUser().getEmail());
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(400).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticateUser(@RequestBody LoginRequest request, HttpSession session) {
        LoginResponse response = authService.authenticateUser(request);
        if (response.isSuccess()) {
            session.setAttribute("username", response.getUser().getUsername());
            session.setAttribute("email", response.getUser().getEmail());
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(400).body(response);
    }

    @PostMapping("/logout")
    public ResponseEntity<LogoutResponse> logoutUser(HttpSession session) {
        return ResponseEntity.ok(authService.logoutUser(session));
    }
}
