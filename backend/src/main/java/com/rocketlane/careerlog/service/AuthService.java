package com.rocketlane.careerlog.service;

import com.rocketlane.careerlog.dto.UserDTO;
import com.rocketlane.careerlog.entity.UserEntity;
import com.rocketlane.careerlog.repository.UserRepository;
import com.rocketlane.careerlog.utils.LoginRequest;
import com.rocketlane.careerlog.utils.LoginResponse;
import com.rocketlane.careerlog.utils.SignupRequest;
import com.rocketlane.careerlog.utils.SignupResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    UserRepository userRepository;
    PasswordEncoder passwordEncoder;
    @Autowired
    AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public SignupResponse registerNewUser(SignupRequest signupRequest) {
        if (userRepository.findByUsername(signupRequest.getUsername()).isPresent()) {
            return new SignupResponse(false, "Username already exist", null);
        }
        if (userRepository.findByEmail(signupRequest.getEmail()).isPresent()) {
            return new SignupResponse(false, "Email already exist", null);
        }

        UserEntity user = new UserEntity();
        user.setUsername(signupRequest.getUsername());
        user.setPassword(passwordEncoder.encode(signupRequest.getPassword()));
        user.setEmail(signupRequest.getEmail());

        userRepository.save(user);
        return new SignupResponse(true, "ok", new UserDTO(user.getUsername(), user.getEmail()));
    }

    public LoginResponse authenticateUser(LoginRequest loginRequest) {
        if(loginRequest.getEmail().isEmpty() && loginRequest.getUsername().isEmpty()) {
            return new LoginResponse(false, "Both fields are empty", null);
        } else if(loginRequest.getUsername().isEmpty()) {
            return authenticateUserWithEmail(loginRequest);
        } else {
            return authenticateUserWithUsername(loginRequest);
        }
    }

    public LoginResponse authenticateUserWithUsername(LoginRequest loginRequest) {
        Optional<UserEntity> userOpt = userRepository.findByUsername(loginRequest.getUsername());
        if(userOpt.isEmpty()) {
            return new LoginResponse(false, "Username does not exist", null);
        }
        UserEntity user = userOpt.get();
        if(passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            return new LoginResponse(true, "ok", new UserDTO(user.getUsername(), user.getEmail()));
        }
        return new LoginResponse(false, "Wrong password",  null);
    }

    public LoginResponse authenticateUserWithEmail(LoginRequest loginRequest) {
        Optional<UserEntity> userOpt = userRepository.findByEmail(loginRequest.getEmail());
        if(userOpt.isEmpty()) {
            return new LoginResponse(false, "Email does not exist",  null);
        }
        UserEntity user = userOpt.get();
        if(passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            return new LoginResponse(true, "ok",  new UserDTO(user.getUsername(), user.getEmail()));
        }
        return new LoginResponse(false, "Wrong password", null);
    }
}
