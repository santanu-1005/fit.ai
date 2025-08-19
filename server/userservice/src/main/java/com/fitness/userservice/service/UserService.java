package com.fitness.userservice.service;

import com.fitness.userservice.dto.RegisterRequest;
import com.fitness.userservice.dto.UserResponse;

public interface UserService {
    UserResponse getUserProfile(String userId);
    UserResponse registerUser(RegisterRequest registerRequest);
    Boolean validateUser(String userId);
}
