package com.rocketlane.careerlog;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;

@SpringBootApplication
@EnableRedisHttpSession
public class CareerlogApplication {

	public static void main(String[] args) {
		SpringApplication.run(CareerlogApplication.class, args);
	}

}