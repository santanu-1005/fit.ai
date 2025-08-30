export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

export interface Exercise {
  id: string;
  name: string;
  category: string;
  muscleGroups: string[];
  equipment: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  description: string;
}

export interface WorkoutExercise {
  exercise: Exercise;
  sets: number;
  reps: number;
  weight?: number;
  duration?: number;
  notes?: string;
}

export interface Workout {
  id: string;
  userId: string;
  name: string;
  date: Date;
  exercises: WorkoutExercise[];
  duration: number;
  notes?: string;
  aiRecommendation?: string;
}

export interface WorkoutStats {
  totalWorkouts: number;
  totalDuration: number;
  averageDuration: number;
  favoriteExercises: string[];
  weeklyProgress: number[];
}