import { Workout, WorkoutExercise } from '../types';

export class AIRecommendationService {
  static generateWorkoutRecommendation(workout: Workout): string {
    const { exercises, duration } = workout;
    const totalSets = exercises.reduce((acc, ex) => acc + ex.sets, 0);
    const muscleGroups = Array.from(new Set(exercises.flatMap(ex => ex.exercise.muscleGroups)));
    
    // Analyze workout intensity
    const intensity = this.calculateIntensity(exercises, duration);
    
    // Generate personalized recommendation
    let recommendation = `Great work on your ${workout.name}! `;
    
    if (intensity === 'high') {
      recommendation += `That was an intense session targeting ${muscleGroups.join(', ')}. `;
      recommendation += `Consider taking a rest day or doing light cardio tomorrow to allow for proper recovery. `;
      recommendation += `Focus on hydration and protein intake for optimal muscle repair.`;
    } else if (intensity === 'moderate') {
      recommendation += `Nice balanced workout! You worked ${muscleGroups.length} muscle groups effectively. `;
      recommendation += `Tomorrow you could complement this with exercises targeting different muscle groups, `;
      recommendation += `or add some cardio for improved cardiovascular health.`;
    } else {
      recommendation += `Good start! This was a lighter session. `;
      recommendation += `Consider gradually increasing the intensity by adding more sets, reps, or weight. `;
      recommendation += `You could also extend the duration or add more exercises to maximize benefits.`;
    }
    
    // Add specific recommendations
    recommendation += this.getSpecificRecommendations(muscleGroups, exercises);
    
    return recommendation;
  }
  
  private static calculateIntensity(exercises: WorkoutExercise[], duration: number): 'low' | 'moderate' | 'high' {
    const totalVolume = exercises.reduce((acc, ex) => acc + (ex.sets * ex.reps), 0);
    const exerciseCount = exercises.length;
    
    if (totalVolume > 100 && duration > 60 && exerciseCount >= 6) return 'high';
    if (totalVolume > 50 && duration > 30 && exerciseCount >= 4) return 'moderate';
    return 'low';
  }
  
  private static getSpecificRecommendations(muscleGroups: string[], exercises: WorkoutExercise[]): string {
    let recommendations = '\n\n🎯 Specific Recommendations:\n';
    
    // Muscle group balance
    if (!muscleGroups.includes('Core')) {
      recommendations += '• Add core exercises like planks or mountain climbers\n';
    }
    
    if (muscleGroups.includes('Chest') && !muscleGroups.includes('Back')) {
      recommendations += '• Balance chest work with back exercises to maintain posture\n';
    }
    
    // Exercise variety
    const categories = Array.from(new Set(exercises.map(ex => ex.exercise.category)));
    if (categories.length === 1) {
      recommendations += '• Mix in different exercise categories for well-rounded fitness\n';
    }
    
    // Progressive overload
    recommendations += '• Track your weights and aim to progressively increase load\n';
    recommendations += '• Consider adding 5-10 minutes of stretching post-workout';
    
    return recommendations;
  }
  
  static generateWorkoutPlan(userLevel: string, preferences: string[]): Workout {
    // Generate AI-powered workout plan
    const baseWorkouts = [
      'Full Body Strength',
      'Upper Body Focus',
      'Lower Body Power',
      'Cardio & Core',
      'Functional Training'
    ];
    
    const selectedWorkout = baseWorkouts[Math.floor(Math.random() * baseWorkouts.length)];
    
    return {
      id: Math.random().toString(36).substr(2, 9),
      userId: '1',
      name: selectedWorkout,
      date: new Date(),
      exercises: this.generateExercisePlan(selectedWorkout, userLevel),
      duration: 45,
      notes: 'AI-generated workout plan',
      aiRecommendation: `This ${selectedWorkout.toLowerCase()} workout is tailored for your ${userLevel} fitness level. Focus on proper form and listen to your body!`
    };
  }
  
  private static generateExercisePlan(workoutType: string, level: string): WorkoutExercise[] {
    // Mock exercise generation based on workout type and level
    const baseExercises = [
      { id: '1', name: 'Push-ups', category: 'Strength', muscleGroups: ['Chest', 'Shoulders', 'Triceps'], equipment: ['Bodyweight'], difficulty: 'beginner' as const, description: 'Classic bodyweight exercise' },
      { id: '2', name: 'Squats', category: 'Strength', muscleGroups: ['Quadriceps', 'Glutes'], equipment: ['Bodyweight'], difficulty: 'beginner' as const, description: 'Lower body strength exercise' },
      { id: '3', name: 'Plank', category: 'Core', muscleGroups: ['Core'], equipment: ['Bodyweight'], difficulty: 'beginner' as const, description: 'Core stability exercise' }
    ];
    
    return baseExercises.map(exercise => ({
      exercise,
      sets: level === 'beginner' ? 3 : level === 'intermediate' ? 4 : 5,
      reps: level === 'beginner' ? 10 : level === 'intermediate' ? 12 : 15,
      weight: 0
    }));
  }
}