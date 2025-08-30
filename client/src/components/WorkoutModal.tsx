import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { Workout, WorkoutExercise } from '../types';
import { exercises } from '../data/exercises';
import { useAuth } from '../context/AuthContext';

interface WorkoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (workout: Workout) => void;
}

export const WorkoutModal: React.FC<WorkoutModalProps> = ({ isOpen, onClose, onSave }) => {
  const { user } = useAuth();
  const [workoutName, setWorkoutName] = useState('');
  const [workoutExercises, setWorkoutExercises] = useState<WorkoutExercise[]>([]);
  const [selectedExerciseId, setSelectedExerciseId] = useState('');

  if (!isOpen) return null;

  const addExercise = () => {
    if (!selectedExerciseId) return;
    
    const exercise = exercises.find(ex => ex.id === selectedExerciseId);
    if (!exercise) return;

    const newWorkoutExercise: WorkoutExercise = {
      exercise,
      sets: 3,
      reps: 10,
      weight: 0
    };

    setWorkoutExercises(prev => [...prev, newWorkoutExercise]);
    setSelectedExerciseId('');
  };

  const removeExercise = (index: number) => {
    setWorkoutExercises(prev => prev.filter((_, i) => i !== index));
  };

  const updateExercise = (index: number, field: keyof WorkoutExercise, value: any) => {
    setWorkoutExercises(prev => prev.map((ex, i) => 
      i === index ? { ...ex, [field]: value } : ex
    ));
  };

  const handleSave = () => {
    if (!workoutName.trim() || workoutExercises.length === 0) return;

    const newWorkout: Workout = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user?.id || '1',
      name: workoutName,
      date: new Date(),
      exercises: workoutExercises,
      duration: 45, // Default duration
      notes: ''
    };

    onSave(newWorkout);
    
    // Reset form
    setWorkoutName('');
    setWorkoutExercises([]);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Create New Workout</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Workout Name
            </label>
            <input
              type="text"
              value={workoutName}
              onChange={(e) => setWorkoutName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Upper Body Strength"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Add Exercises
            </label>
            <div className="flex space-x-2 mb-4">
              <select
                value={selectedExerciseId}
                onChange={(e) => setSelectedExerciseId(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select an exercise</option>
                {exercises.map(exercise => (
                  <option key={exercise.id} value={exercise.id}>
                    {exercise.name} ({exercise.category})
                  </option>
                ))}
              </select>
              <button
                onClick={addExercise}
                className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>

            {/* Exercise List */}
            <div className="space-y-3">
              {workoutExercises.map((workoutEx, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900">{workoutEx.exercise.name}</h4>
                    <button
                      onClick={() => removeExercise(index)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Sets</label>
                      <input
                        type="number"
                        value={workoutEx.sets}
                        onChange={(e) => updateExercise(index, 'sets', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 text-sm"
                        min="1"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Reps</label>
                      <input
                        type="number"
                        value={workoutEx.reps}
                        onChange={(e) => updateExercise(index, 'reps', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 text-sm"
                        min="1"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Weight (lbs)</label>
                      <input
                        type="number"
                        value={workoutEx.weight || 0}
                        onChange={(e) => updateExercise(index, 'weight', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 text-sm"
                        min="0"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!workoutName.trim() || workoutExercises.length === 0}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save Workout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};