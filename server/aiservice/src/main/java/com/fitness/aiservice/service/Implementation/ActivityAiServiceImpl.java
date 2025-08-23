package com.fitness.aiservice.service.Implementation;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fitness.aiservice.model.Activity;
import com.fitness.aiservice.model.Recomendation;
import com.fitness.aiservice.service.ActivityAiService;
import com.fitness.aiservice.service.GeminiService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class ActivityAiServiceImpl implements ActivityAiService {
    private final GeminiService geminiService;

    @Override
    public Recomendation generateRecomendation(Activity activity) {
        String prompt = createPromptForActivity(activity);
        String aiResponse = geminiService.getResponse(prompt);
        log.info("Response From Ai: {}", aiResponse);
        return processAiResponse(activity, aiResponse);
    }

    private Recomendation processAiResponse(Activity activity, String aiResponse) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode rootNode = mapper.readTree(aiResponse);
            JsonNode textNode = rootNode.path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text");
            String jsonContent = textNode.asText()
                    .replaceAll("```json\\n", "")
                    .replaceAll("\n```", "")
                    .trim();
            // log.info("Parsed Response From Ai: {}", jsonContent);
            JsonNode analysisJson = mapper.readTree(jsonContent);
            JsonNode analysisNode = analysisJson.path("analysis");

            StringBuilder fullAnalysis = new StringBuilder();
            addAnalysisSection(fullAnalysis, analysisNode, "overall", "Overall:");
            addAnalysisSection(fullAnalysis, analysisNode, "pace", "Pace:");
            addAnalysisSection(fullAnalysis, analysisNode, "heartRate", "Heart Rate:");
            addAnalysisSection(fullAnalysis, analysisNode, "caloriesBurned", "Calories Burned:");

            List<String> improvements = extractImprovements(analysisJson.path("improvements"));

            List<String> suggestions = extractSuggestions(analysisJson.path("suggestions"));

            List<String> safety = extractSafetyGuidelines(analysisJson.path("safety"));

            return Recomendation.builder()
                    .activityId(activity.getId())
                    .userId(activity.getUserId())
                    .activityType(activity.getType())
                    .recomendation(fullAnalysis.toString().trim())
                    .improvements(improvements)
                    .suggestions(suggestions)
                    .safety(safety)
                    .createdAt(LocalDateTime.now())
                    .build();

        } catch (Exception e) {
            e.printStackTrace();
            // Return a default or empty Recomendation in case of error
            return createDefaultRecomendation(activity);

        }
    }

    private Recomendation createDefaultRecomendation(Activity activity) {
        return Recomendation.builder()
                .activityId(activity.getId())
                .userId(activity.getUserId())
                .activityType(activity.getType())
                .recomendation("Error processing AI response.")
                .improvements(Collections.singletonList("No improvements available due to error."))
                .suggestions(Collections.singletonList("No suggestions available due to error."))
                .safety(Collections.singletonList("Follow general safety guidelines."))
                .createdAt(LocalDateTime.now())
                .build();
    }

    private List<String> extractSafetyGuidelines(JsonNode safetyNode) {
        List<String> safetyGuidelines = new ArrayList<>();
        if (safetyNode.isArray()) {
            safetyNode.forEach(
                    safety -> safetyGuidelines.add(safety.asText()));
        }
        return safetyGuidelines.isEmpty() ? Collections.singletonList("Follow General Safety Guidelines")
                : safetyGuidelines;
    }

    private List<String> extractSuggestions(JsonNode suggestionsNode) {
        List<String> suggestions = new ArrayList<>();
        if (suggestionsNode.isArray()) {
            suggestionsNode.forEach(
                    improvement -> {
                        String workout = improvement.path("workout").asText();
                        String description = improvement.path("description").asText();
                        suggestions.add(String.format("%s: %s", workout, description));
                    });
        }
        return suggestions.isEmpty() ? Collections.singletonList("No Specific Suggestions Provided") : suggestions;
    }

    private List<String> extractImprovements(JsonNode improvementsNode) {
        List<String> improvements = new ArrayList<>();
        if (improvementsNode.isArray()) {
            improvementsNode.forEach(
                    improvement -> {
                        String area = improvement.path("area").asText();
                        String recommendation = improvement.path("recommendation").asText();
                        improvements.add(String.format("%s: %s", area, recommendation));
                    });
        }
        return improvements.isEmpty() ? Collections.singletonList("No Specific Improvements Provided") : improvements;
    }

    private void addAnalysisSection(StringBuilder fullAnaysis, JsonNode analysisNode, String key, String prefix) {
        if (!analysisNode.path(key).isMissingNode()) {
            fullAnaysis.append(prefix)
                    .append(analysisNode.path(key).asText())
                    .append("\n\n");
        }

    }

    private String createPromptForActivity(Activity activity) {
        return String.format(
                """
                            Analyse this fitness activity and provide detailed recomendation in the following format
                            {
                                "analysis": {
                                    "overall": "Overall analysis here",
                                    "pace": "Pace analysis here",
                                    "heartRate": "Heart rate analysis here",
                                    "caloriesBurned": "Calories burned analysis here"
                                },
                                "improvements": [
                                    {
                                        "area": "Area Name",
                                        "recommendation": "Improvement recommendation here"
                                    }
                                ],
                                "suggestions": [
                                    {
                                        "workout": "Workout name",
                                        "description": "Workout description here"
                                    }
                                ],
                                "safety": [
                                    "Safety Point 1",
                                    "Safety Point 2"    
                                ]
                            }

                            Analyse the activity data and provide a comprehensive report.
                            Activity Type: %s
                            Duration: %d minutes
                            Calories Burned: %d
                            Additional Metrics: %s

                            Provide detailed analysis focusing on performance, improvements, next workout suggestions, and safety guidelines.
                            Ensure that the response follows the EXACT JSON format specified in the prompt.
                        """,
                activity.getType(),
                activity.getDuration(),
                activity.getCaloriesBurned(),
                activity.getAdditionalMetrics());
    }
}
