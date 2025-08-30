import React, { useState, useEffect } from 'react';
import { X, Brain, Sparkles, TrendingUp, Target, Clock, Activity } from 'lucide-react';
import { Workout } from '../types';
import { AIRecommendationService } from '../services/aiService';

interface AIRecommendationModalProps {
  isOpen: boolean;
  onClose: () => void;
  workout: Workout;
}

export const AIRecommendationModal: React.FC<AIRecommendationModalProps> = ({
  isOpen,
  onClose,
  workout
}) => {
  const [recommendation, setRecommendation] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (isOpen && workout) {
      generateRecommendation();
    }
  }, [isOpen, workout]);

  const generateRecommendation = async () => {
    setIsGenerating(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const aiRecommendation = AIRecommendationService.generateWorkoutRecommendation(workout);
    setRecommendation(aiRecommendation);
    setIsGenerating(false);
  };

  if (!isOpen) return null;

  const getTotalSets = () => workout.exercises.reduce((acc, ex) => acc + ex.sets, 0);
  const getTotalReps = () => workout.exercises.reduce((acc, ex) => acc + (ex.sets * ex.reps), 0);
  const getMuscleGroups = () => Array.from(new Set(workout.exercises.flatMap(ex => ex.exercise.muscleGroups)));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">AI Workout Analysis</h2>
              <p className="text-gray-600">{workout.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Workout Summary */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Activity className="h-5 w-5 mr-2 text-blue-600" />
            Workout Summary
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{workout.exercises.length}</div>
              <div className="text-sm text-gray-600">Exercises</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{getTotalSets()}</div>
              <div className="text-sm text-gray-600">Total Sets</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{getTotalReps()}</div>
              <div className="text-sm text-gray-600">Total Reps</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{workout.duration}m</div>
              <div className="text-sm text-gray-600">Duration</div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-white border-opacity-50">
            <p className="text-sm text-gray-600 mb-1">Muscle Groups Targeted:</p>
            <div className="flex flex-wrap gap-2">
              {getMuscleGroups().map(group => (
                <span key={group} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white bg-opacity-70 text-gray-700">
                  {group}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* AI Recommendation */}
        <div className="bg-white border-2 border-gray-100 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-yellow-500" />
            AI Recommendation & Analysis
          </h3>
          
          {isGenerating ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Analyzing your workout...</p>
                <p className="text-sm text-gray-500 mt-1">Generating personalized insights</p>
              </div>
            </div>
          ) : (
            <div className="prose prose-gray max-w-none">
              <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg border-l-4 border-blue-500">
                <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                  {recommendation}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Exercise Details */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Target className="h-5 w-5 mr-2 text-green-600" />
            Exercise Breakdown
          </h3>
          
          <div className="space-y-3">
            {workout.exercises.map((workoutEx, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">{workoutEx.exercise.name}</h4>
                    <p className="text-sm text-gray-600">{workoutEx.exercise.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {workoutEx.sets} sets × {workoutEx.reps} reps
                    </p>
                    {workoutEx.weight && workoutEx.weight > 0 && (
                      <p className="text-sm text-gray-600">{workoutEx.weight} lbs</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
};