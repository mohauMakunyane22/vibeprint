// src/components/VibeResult.jsx
import React from 'react';
import { Heart, Sparkles, MapPin, Download, ArrowLeft } from 'lucide-react';

const VibeResult = ({ mode, result, onBack, onRestart }) => {
  const handleExport = () => {
    // Mock PDF export functionality - replace with actual implementation
    alert('PDF export feature coming soon!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-teal-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onBack}
            className="flex items-center text-purple-700 hover:text-purple-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to form
          </button>
          <button
            onClick={onRestart}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Start Over
          </button>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-purple-200">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Heart className="h-12 w-12 text-rose-500 mr-2" />
              <Sparkles className="h-12 w-12 text-purple-600" />
            </div>
            <h2 className="text-3xl font-bold text-purple-900 mb-2">
              {mode === 'individual' ? 'Your Vibe Profile' : 'Your Brand Vibe Analysis'}
            </h2>
            <p className="text-purple-700">
              {mode === 'individual' 
                ? 'Here\'s what we discovered about your taste'
                : 'Here\'s your brand personality breakdown'
              }
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-purple-900 mb-3">
                  {mode === 'individual' ? 'Your Vibe Summary' : 'Brand Essence'}
                </h3>
                <p className="text-purple-800 leading-relaxed">
                  {result.summary}
                </p>
              </div>

              <div className="bg-gradient-to-r from-teal-100 to-blue-100 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-teal-900 mb-3">
                  {mode === 'individual' ? 'Personality Traits' : 'Brand Values'}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.traits.map((trait, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-white/70 rounded-full text-sm text-teal-800 font-medium"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-rose-100 to-orange-100 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-rose-900 mb-3 flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  {mode === 'individual' ? 'Perfect Places' : 'Target Venues'}
                </h3>
                <ul className="space-y-2">
                  {result.recommendations.map((rec, index) => (
                    <li key={index} className="text-rose-800">
                      <span className="font-medium">{rec.name}</span>
                      <p className="text-sm text-rose-700">{rec.description}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {mode === 'brand' && (
                <div className="bg-gradient-to-r from-amber-100 to-yellow-100 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-amber-900 mb-3">
                    Marketing Insights
                  </h3>
                  <ul className="space-y-2 text-amber-800">
                    <li>• Focus on authenticity and sustainability messaging</li>
                    <li>• Target creative professionals aged 25-40</li>
                    <li>• Emphasize quality and craftsmanship</li>
                    <li>• Use warm, approachable visual language</li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 flex justify-center space-x-4">
            {mode === 'brand' && (
              <button
                onClick={handleExport}
                className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-rose-600 text-white rounded-xl hover:scale-105 transition-transform shadow-lg"
              >
                <Download className="h-5 w-5 mr-2" />
                Export PDF Report
              </button>
            )}
            <button
              onClick={onRestart}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-xl hover:scale-105 transition-transform shadow-lg"
            >
              <Sparkles className="h-5 w-5 mr-2" />
              Discover Another Vibe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VibeResult;