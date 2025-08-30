import React from 'react';
import { Dumbbell, Target, TrendingUp, Users, ArrowRight, CheckCircle } from 'lucide-react';

interface LandingPageProps {
  onSignup: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onSignup }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Dumbbell className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">FitAI</span>
          </div>
          <button
            onClick={onSignup}
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            Get Started
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">AI-Powered</span> Fitness Journey Starts Here
          </h1>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            Transform your fitness routine with personalized AI recommendations, 
            intelligent workout tracking, and data-driven insights that adapt to your progress.
          </p>
          <button
            onClick={onSignup}
            className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 inline-flex items-center space-x-2"
          >
            <span>Start Your Journey</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Intelligent Fitness Features</h2>
          <p className="text-xl text-gray-600">Experience the future of personalized fitness training</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
            <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <Target className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">AI Recommendations</h3>
            <p className="text-gray-600 leading-relaxed">
              Get personalized workout suggestions based on your fitness level, goals, and past performance using advanced AI algorithms.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
            <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Smart Tracking</h3>
            <p className="text-gray-600 leading-relaxed">
              Automatically track your progress, analyze patterns, and receive insights to optimize your training for maximum results.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
            <div className="bg-orange-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <Users className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Community Support</h3>
            <p className="text-gray-600 leading-relaxed">
              Join a community of fitness enthusiasts and share your progress while staying motivated on your journey.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">
                Why Choose FitAI?
              </h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-300" />
                  <span className="text-white text-lg">Personalized AI workout recommendations</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-300" />
                  <span className="text-white text-lg">Real-time progress tracking and analytics</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-300" />
                  <span className="text-white text-lg">Adaptive training plans that evolve with you</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-300" />
                  <span className="text-white text-lg">Expert guidance powered by machine learning</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm p-8 rounded-2xl">
                <h3 className="text-2xl font-bold text-white mb-4">Ready to Transform?</h3>
                <p className="text-blue-100 mb-6">Join thousands of users achieving their fitness goals</p>
                <button
                  onClick={onSignup}
                  className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200"
                >
                  Start Free Today
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Dumbbell className="h-6 w-6" />
            <span className="text-xl font-bold">FitAI</span>
          </div>
          <p className="text-gray-400">
            © 2025 FitAI. Empowering your fitness journey with artificial intelligence.
          </p>
        </div>
      </footer>
    </div>
  );
};