import { Exercise } from '../types';

export const exercises: Exercise[] = [
  {
    id: '1',
    name: 'Push-ups',
    category: 'Strength',
    muscleGroups: ['Chest', 'Shoulders', 'Triceps'],
    equipment: ['Bodyweight'],
    difficulty: 'beginner',
    description: 'Classic bodyweight exercise targeting chest, shoulders, and triceps'
  },
  {
    id: '2',
    name: 'Squats',
    category: 'Strength',
    muscleGroups: ['Quadriceps', 'Glutes', 'Hamstrings'],
    equipment: ['Bodyweight'],
    difficulty: 'beginner',
    description: 'Fundamental lower body movement targeting legs and glutes'
  },
  {
    id: '3',
    name: 'Deadlifts',
    category: 'Strength',
    muscleGroups: ['Hamstrings', 'Glutes', 'Back', 'Traps'],
    equipment: ['Barbell'],
    difficulty: 'intermediate',
    description: 'Compound movement targeting posterior chain muscles'
  },
  {
    id: '4',
    name: 'Running',
    category: 'Cardio',
    muscleGroups: ['Legs', 'Core'],
    equipment: ['None'],
    difficulty: 'beginner',
    description: 'Cardiovascular exercise improving endurance and stamina'
  },
  {
    id: '5',
    name: 'Pull-ups',
    category: 'Strength',
    muscleGroups: ['Back', 'Biceps', 'Shoulders'],
    equipment: ['Pull-up bar'],
    difficulty: 'intermediate',
    description: 'Upper body pulling exercise targeting back and arms'
  },
  {
    id: '6',
    name: 'Plank',
    category: 'Core',
    muscleGroups: ['Core', 'Shoulders'],
    equipment: ['Bodyweight'],
    difficulty: 'beginner',
    description: 'Isometric core exercise building stability and strength'
  }
];