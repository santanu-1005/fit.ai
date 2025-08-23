package com.fitness.aiservice.service;

import com.fitness.aiservice.model.Activity;
import com.fitness.aiservice.model.Recomendation;

public interface ActivityAiService {
    Recomendation generateRecomendation(Activity activity);
}
