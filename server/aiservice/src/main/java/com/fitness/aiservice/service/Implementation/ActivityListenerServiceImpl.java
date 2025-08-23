package com.fitness.aiservice.service.Implementation;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

import com.fitness.aiservice.model.Activity;
import com.fitness.aiservice.model.Recomendation;
import com.fitness.aiservice.repository.RecomendationRepository;
import com.fitness.aiservice.service.ActivityAiService;
import com.fitness.aiservice.service.ActivityListenerService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class ActivityListenerServiceImpl implements ActivityListenerService{
    private final ActivityAiService aiService;
    private final RecomendationRepository recomendationRepository;

    @Override
    @RabbitListener(queues = "${rabbitmq.queue.name}")
    public void processActivity(Activity activity){
        log.info("Received activity for processing: {}", activity.getId());
        // log.info("Generated Recomendation: {}", aiService.generateRecomendation(activity));
        Recomendation recomendation = aiService.generateRecomendation(activity);
        recomendationRepository.save(recomendation);
    }
}
