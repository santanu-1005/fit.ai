package com.fitness.gateway.user;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {
     private final WebClient userServiceWebClient;

    public Mono<Boolean> validateUser(String userId){
        log.info("Calling User Validation API for userId: {}", userId);     
        return userServiceWebClient
                .get()
                .uri("/api/users/{userId}/validate", userId)
                .retrieve()
                .bodyToMono(Boolean.class)
                .onErrorResume(WebClientResponseException.class, e -> {
                    if(e.getStatusCode() == HttpStatus.NOT_FOUND){
                        return Mono.error(new RuntimeException("User not found" + userId));
                    }
                    else if(e.getStatusCode() == HttpStatus.BAD_REQUEST){
                        return Mono.error(new RuntimeException("Bad request for user validation: " + userId));
                    }
                    return Mono.error(new RuntimeException("Unexpected error " + userId));
                });     
    }
    
    public Mono<UserResponse> registerUser(RegisterRequest request){
        log.info("Calling User Register API for email: {}", request.getEmail());
        return userServiceWebClient
                .post()
                .uri("/api/users/register")
                .bodyValue(request)
                .retrieve()
                .bodyToMono(UserResponse.class)
                .onErrorResume(WebClientResponseException.class, e -> {
                    if(e.getStatusCode() == HttpStatus.BAD_REQUEST){
                        return Mono.error(new RuntimeException("Bad request for user validation: " + e.getMessage()));
                    }
                    else if(e.getStatusCode() == HttpStatus.INTERNAL_SERVER_ERROR){
                        return Mono.error(new RuntimeException("Internal Server Error " + e.getMessage()));
                    }
                    return Mono.error(new RuntimeException("Unexpected error " + e.getMessage()));
                });
    }
}
