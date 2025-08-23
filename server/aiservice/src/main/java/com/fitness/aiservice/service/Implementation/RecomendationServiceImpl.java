package com.fitness.aiservice.service.Implementation;

import java.util.List;

import org.springframework.stereotype.Service;

import com.fitness.aiservice.model.Recomendation;
import com.fitness.aiservice.repository.RecomendationRepository;
import com.fitness.aiservice.service.RecomendationService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RecomendationServiceImpl implements RecomendationService{
    private final RecomendationRepository recomendationRepository;

    @Override
    public List<Recomendation> getUserRecomendation(String userId){
        return recomendationRepository.findByUserId(userId);
    }

    @Override
    public Recomendation getActivityRecomendation(String activityId){
        return recomendationRepository.findByActivityId(activityId).orElseThrow(() -> new RuntimeException("Recommendation not found" + activityId));
    }

}
