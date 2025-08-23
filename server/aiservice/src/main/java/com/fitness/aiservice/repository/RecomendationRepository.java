package com.fitness.aiservice.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.fitness.aiservice.model.Recomendation;

@Repository
public interface RecomendationRepository extends MongoRepository<Recomendation, String> {
    List<Recomendation> findByUserId(String userId);
    Optional<Recomendation> findByActivityId(String activityId);
}
