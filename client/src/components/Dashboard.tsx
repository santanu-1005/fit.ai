import React, { useState, useEffect } from 'react';
import { Dumbbell, Plus, Calendar, Clock, TrendingUp, Target, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Workout, WorkoutStats } from '../types';
import { WorkoutCard } from './WorkoutCard';
import { WorkoutModal } from './WorkoutModal';
import { AIRecommendationModal } from './AIRecommendationModal';

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [stats, setStats] = useState<WorkoutStats | null>(null);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [showWorkoutModal, setShowWorkoutModal] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);

  useEffect(() => {
    // Load mock workout data
    const mockWorkouts: Workout[] = [
      {
        id: '1',
        userId: user?.id || '1',
        name: 'Upper Body Strength',
        date: new Date(Date.now() - 86400000), // Yesterday
        exercises: [
          {
            exercise: {
              id: '1',
              name: 'Push-ups',
              category: 'Strength',
              muscleGroups: ['Chest', 'Shoulders', 'Triceps'],
              equipment: ['Bodyweight'],
              difficulty: 'beginner',
              description: 'Classic bodyweight exercise'
            },
            sets: 3,
            reps: 15,
            weight: 0
          },
          {
            exercise: {
              id: '3',
              name: 'Pull-ups',
              category: 'Strength',
              muscleGroups: ['Back', 'Biceps'],
              equipment: ['Pull-up bar'],
              difficulty: 'intermediate',
              description: 'Upper body pulling exercise'
            },
            sets: 3,
            reps: 8,
            weight: 0
          }
        ],
        duration: 45,
        notes: 'Great upper body session!'
      },
      {
        id: '2',
        userId: user?.id || '1',
        name: 'Leg Day Power',
        date: new Date(Date.now() - 172800000), // 2 days ago
        exercises: [
          {
            exercise: {
              id: '2',
              name: 'Squats',
              category: 'Strength',
              muscleGroups: ['Quadriceps', 'Glutes'],
              equipment: ['Bodyweight'],
              difficulty: 'beginner',
              description: 'Lower body strength exercise'
            },
            sets: 4,
            reps: 20,
            weight: 0
          }
        ],
        duration: 30,
        notes: 'Focused on form and control'
      }
    ];

    const mockStats: WorkoutStats = {
      totalWorkouts: mockWorkouts.length,
      totalDuration: mockWorkouts.reduce((acc, w) => acc + w.duration, 0),
      averageDuration: mockWorkouts.reduce((acc, w) => acc + w.duration, 0) / mockWorkouts.length,
      favoriteExercises: ['Push-ups', 'Squats', 'Pull-ups'],
      weeklyProgress: [3, 4, 2, 5, 3, 4, 6]
    };

    setWorkouts(mockWorkouts);
    setStats(mockStats);
  }, [user]);

  const handleWorkoutClick = (workout: Workout) => {
    setSelectedWorkout(workout);
    setShowAIModal(true);
  };

  const addNewWorkout = (workout: Workout) => {
    setWorkouts(prev => [workout, ...prev]);
    setShowWorkoutModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Dumbbell className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">FitAI</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user?.name}!</span>
              <button
                onClick={logout}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Workouts</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalWorkouts}</p>
                </div>
                <Target className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Time</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalDuration}m</p>
                </div>
                <Clock className="h-8 w-8 text-green-600" />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Duration</p>
                  <p className="text-3xl font-bold text-gray-900">{Math.round(stats.averageDuration)}m</p>
                </div>
                <Calendar className="h-8 w-8 text-purple-600" />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">This Week</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.weeklyProgress[6]}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-600" />
              </div>
            </div>
          </div>
        )}

        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Workouts</h1>
            <p className="text-gray-600">Track your progress and get AI-powered insights</p>
          </div>
          <button
            onClick={() => setShowWorkoutModal(true)}
            className="mt-4 sm:mt-0 bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>New Workout</span>
          </button>
        </div>

        {/* Workouts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workouts.map((workout) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
              onClick={() => handleWorkoutClick(workout)}
            />
          ))}
        </div>

        {workouts.length === 0 && (
          <div className="text-center py-12">
            <Dumbbell className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No workouts yet</h3>
            <p className="text-gray-500 mb-6">Start your fitness journey by creating your first workout</p>
            <button
              onClick={() => setShowWorkoutModal(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Create First Workout
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      <WorkoutModal
        isOpen={showWorkoutModal}
        onClose={() => setShowWorkoutModal(false)}
        onSave={addNewWorkout}
      />
      
      {selectedWorkout && (
        <AIRecommendationModal
          isOpen={showAIModal}
          onClose={() => setShowAIModal(false)}
          workout={selectedWorkout}
        />
      )}
    </div>
  );
};