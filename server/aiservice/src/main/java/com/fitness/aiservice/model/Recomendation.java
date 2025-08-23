package com.fitness.aiservice.model;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "recomendations")
public class Recomendation {
    @Id
    private String id;
    private String userId;
    private String activityId;
    private String activityType;
    private String recomendation;
    private List<String> improvements;
    private List<String> suggestions;
    private List<String> safety;
    
    @CreatedDate
    private LocalDateTime createdAt;
}
