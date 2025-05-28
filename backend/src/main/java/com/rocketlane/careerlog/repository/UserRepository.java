package com.rocketlane.careerlog.repository;

import com.rocketlane.careerlog.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity, String> { }