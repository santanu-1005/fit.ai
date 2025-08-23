package com.fitness.aiservice.service;

import java.util.List;

import com.fitness.aiservice.model.Recomendation;

public interface RecomendationService {
    List<Recomendation> getUserRecomendation(String userId);
    Recomendation getActivityRecomendation(String activityId);
}
