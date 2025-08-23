    package com.fitness.activityservice.service.implementation;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.fitness.activityservice.dto.ActivityRequest;
import com.fitness.activityservice.dto.ActivityResponse;
import com.fitness.activityservice.model.Activity;
import com.fitness.activityservice.repository.ActivityRepository;
import com.fitness.activityservice.service.ActivityService;
import com.fitness.activityservice.service.UserValidationService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class ActivityServiceImpl implements ActivityService {
    private final ActivityRepository activityRepository;
    private final UserValidationService userValidationService;
    private final RabbitTemplate rabbitTemplate;

    @Value("${rabbitmq.exchange.name}")
    private String exchange;

    @Value("${rabbitmq.routing.key}")
    private String routingKey;

    @Override
    public ActivityResponse trackActivity(ActivityRequest request, String userId) {
        try {
            Boolean isValidUser = userValidationService.validateUser(userId);
            if(!isValidUser){
                throw new RuntimeException("Invalid User" + userId);
            }
            
            Activity activity = Activity.builder()
                    .userId(userId)
                    .type(request.getType())
                    .duration(request.getDuration())
                    .caloriesBurned(request.getCaloriesBurned())
                    .startTime(request.getStartTime())
                    .additionalMetrics(request.getAdditionalMetrics())
                    .build();

            Activity savedActivity = activityRepository.save(activity);

            // Publish to RabbitMQ for AI Processing
            publishToRabbitMQ(savedActivity);

            return convertToResponse(savedActivity);
        } catch (Exception e) {
            log.error("Error while tracking activity: {}", e.getMessage());
            throw new RuntimeException("Failed to track activity", e);
        }
    }

    @Override
    public List<ActivityResponse> getUserActivity(String userId) {
        try {
            List<Activity> activities = activityRepository.findByUserId(userId);

            return activities.stream()
                    .map(this::convertToResponse)
                    .collect(Collectors.toList());

        } catch (Exception e) {
            System.err.println("Error fetching activities for userId: " + userId + " -> " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to fetch activities for user: " + userId, e);
        }
    }

    @Override
    public ActivityResponse getActivity(String activityId) {
        try {
            return activityRepository.findById(activityId)
                    .map(this::convertToResponse)
                    .orElseThrow(() -> new RuntimeException("Activity not found with id: " + activityId));
        } catch (Exception e) {
            System.err.println("Error retrieving activity with id: " + activityId + " -> " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to fetch activity with id: " + activityId, e);
        }
    }

    private ActivityResponse convertToResponse(Activity activity) {
        ActivityResponse response = new ActivityResponse();
        response.setId(activity.getId());
        response.setUserId(activity.getUserId());
        response.setType(activity.getType());
        response.setDuration(activity.getDuration());
        response.setCaloriesBurned(activity.getCaloriesBurned());
        response.setStartTime(activity.getStartTime());
        response.setAdditionalMetrics(activity.getAdditionalMetrics());
        response.setCreatedAt(activity.getCreatedAt());
        response.setUpdatedAt(activity.getUpdatedAt());
        return response;
    }

    private void publishToRabbitMQ(Activity activity){
        try {
            rabbitTemplate.convertAndSend(exchange, routingKey, activity);
        } catch (Exception e) {
            log.error("Failed to publish activity to RabbitMQ: {}", e.getMessage());
        }
    }
}
