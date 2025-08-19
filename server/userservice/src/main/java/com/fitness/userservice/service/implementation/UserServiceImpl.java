package com.fitness.userservice.service.implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fitness.userservice.dto.RegisterRequest;
import com.fitness.userservice.dto.UserResponse;
import com.fitness.userservice.model.User;
import com.fitness.userservice.repository.UserRepository;
import com.fitness.userservice.service.UserService;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserResponse getUserProfile(String userId) {
        try {
            User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
                
            UserResponse userResponse = new UserResponse();
            userResponse.setId(user.getId());
            userResponse.setEmail(user.getEmail());
            userResponse.setPassword(user.getPassword());
            userResponse.setFirstName(user.getFirstName());
            userResponse.setLastName(user.getLastName());
            userResponse.setCreatedAt(user.getCreatedAt());
            userResponse.setUpdatedAt(user.getUpdatedAt());

            return userResponse;
        } catch (Exception e) {
            System.err.println("Error fetching user profile: " + e.getMessage());
            throw new RuntimeException("Failed to fetch user profile");
        }
    }

    @Override
    public UserResponse registerUser(RegisterRequest request) {
        try {
            if (userRepository.existsByEmail(request.getEmail())) {
                throw new RuntimeException("User already exists");
            }

            User user = new User();
            user.setEmail(request.getEmail());
            user.setPassword(request.getPassword()); 
            user.setFirstName(request.getFirstName());
            user.setLastName(request.getLastName());

            User savedUser = userRepository.save(user);

            UserResponse userResponse = new UserResponse();
            userResponse.setId(savedUser.getId());
            userResponse.setEmail(savedUser.getEmail());
            userResponse.setPassword(savedUser.getPassword());
            userResponse.setFirstName(savedUser.getFirstName());
            userResponse.setLastName(savedUser.getLastName());
            userResponse.setCreatedAt(savedUser.getCreatedAt());
            userResponse.setUpdatedAt(savedUser.getUpdatedAt());

            return userResponse;
        } catch (Exception e) {
            System.err.println("Error during user registration: " + e.getMessage());
            throw new RuntimeException("User registration failed");
        }
    }

    @Override
    public Boolean validateUser(String userId) {
        try {
            log.info("Calling User Validation API for userId: {}", userId);
            return userRepository.existsById(userId);
        } catch (Exception e) {
            log.error("Error validating user: {}", e.getMessage()); 
            throw new RuntimeException("User validation failed");
        }
    }

}
