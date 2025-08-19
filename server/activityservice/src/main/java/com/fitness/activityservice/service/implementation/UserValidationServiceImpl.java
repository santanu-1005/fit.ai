package com.fitness.activityservice.service.implementation;

import org.apache.hc.core5.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import com.fitness.activityservice.service.UserValidationService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserValidationServiceImpl implements UserValidationService{
    private final WebClient userServiceWebClient;

    @Override
    public Boolean validateUser(String userId){
        log.info("Calling User Validation API for userId: {}", userId); 
        try {
            return userServiceWebClient
                    .get()
                    .uri("/api/users/{userId}/validate", userId)
                    .retrieve()
                    .bodyToMono(Boolean.class)
                    .block();

        } catch (WebClientResponseException e) {
            if(e.getStatusCode().value() == HttpStatus.SC_NOT_FOUND){
                throw new RuntimeException("User Not Found" + userId);
            }else if(e.getStatusCode().value() == HttpStatus.SC_FORBIDDEN){
                throw new RuntimeException("Invalid Request" + userId);
            }
            return false;
        }
    }
    
}
