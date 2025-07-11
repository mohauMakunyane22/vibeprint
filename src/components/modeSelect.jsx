// src/components/ModeSelect.jsx
import React from 'react';
import { ChevronRight, User, Building2, Sparkles } from 'lucide-react';

const ModeSelect = ({ onSelect }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-teal-50 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <Sparkles className="h-16 w-16 text-purple-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-purple-900 mb-2">
            Discover Your Vibe
          </h1>
          <p className="text-purple-700 text-lg">
            Find your perfect taste match in seconds
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <button
            onClick={() => onSelect('individual')}
            className="group p-8 bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-purple-200 hover:border-purple-400 hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
          >
            <User className="h-12 w-12 text-purple-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-semibold text-purple-900 mb-2">
              Individual Discovery
            </h3>
            <p className="text-purple-700">
              Get personalized recommendations based on your unique taste profile
            </p>
            <ChevronRight className="h-5 w-5 text-purple-600 mx-auto mt-4 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button
            onClick={() => onSelect('brand')}
            className="group p-8 bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-rose-200 hover:border-rose-400 hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
          >
            <Building2 className="h-12 w-12 text-rose-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-semibold text-rose-900 mb-2">
              Brand Analysis
            </h3>
            <p className="text-rose-700">
              Understand your brand's vibe and target audience preferences
            </p>
            <ChevronRight className="h-5 w-5 text-rose-600 mx-auto mt-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModeSelect;