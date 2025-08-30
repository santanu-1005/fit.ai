import React from 'react';
import { Calendar, Clock, Activity, ChevronRight } from 'lucide-react';
import { Workout } from '../types';

interface WorkoutCardProps {
  workout: Workout;
  onClick: () => void;
}

export const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout, onClick }) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const getTotalSets = () => {
    return workout.exercises.reduce((acc, ex) => acc + ex.sets, 0);
  };

  const getMuscleGroups = () => {
    const groups = Array.from(new Set(workout.exercises.flatMap(ex => ex.exercise.muscleGroups)));
    return groups.slice(0, 3).join(', ');
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all duration-300 cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
          {workout.name}
        </h3>
        <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
      </div>
      
      <div className="space-y-3 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="h-4 w-4 mr-2" />
          {formatDate(workout.date)}
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="h-4 w-4 mr-2" />
          {workout.duration} minutes
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <Activity className="h-4 w-4 mr-2" />
          {workout.exercises.length} exercises, {getTotalSets()} sets
        </div>
      </div>
      
      <div className="border-t border-gray-100 pt-4">
        <p className="text-sm text-gray-500 mb-2">Muscle Groups:</p>
        <p className="text-sm font-medium text-gray-700">{getMuscleGroups()}</p>
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          AI Analysis Available
        </span>
        <button className="text-blue-600 hover:text-blue-700 transition-colors text-sm font-medium">
          View Details →
        </button>
      </div>
    </div>
  );
};