package com.fitness.activityservice.service;

import java.util.List;

import com.fitness.activityservice.dto.ActivityRequest;
import com.fitness.activityservice.dto.ActivityResponse;

public interface ActivityService {
    ActivityResponse trackActivity(ActivityRequest request, String userId);
    List<ActivityResponse> getUserActivity(String userId);
    ActivityResponse getActivity(String activityId);
}
