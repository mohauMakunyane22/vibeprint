// src/components/InputForm.jsx
import React, { useState } from 'react';
import { User, Building2, Sparkles, ArrowLeft } from 'lucide-react';

const InputForm = ({ mode, onSubmit, onBack, isLoading }) => {
  const [formData, setFormData] = useState({
    taste: '',
    age: '',
    location: '',
    brandName: '',
    industry: '',
    targetAudience: ''
  });

  const handleSubmit = () => {
    // Validate required fields based on mode
    const isIndividualValid = mode === 'individual' && formData.taste && formData.age && formData.location;
    const isBrandValid = mode === 'brand' && formData.taste && formData.brandName && formData.industry && formData.targetAudience;
    
    if (isIndividualValid || isBrandValid) {
      onSubmit(formData);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-teal-50 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        <button
          onClick={onBack}
          className="mb-6 flex items-center text-purple-700 hover:text-purple-900 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to mode selection
        </button>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-purple-200">
          <div className="text-center mb-8">
            {mode === 'individual' ? (
              <User className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            ) : (
              <Building2 className="h-12 w-12 text-rose-600 mx-auto mb-4" />
            )}
            <h2 className="text-3xl font-bold text-purple-900 mb-2">
              {mode === 'individual' ? 'Tell Us About Yourself' : 'Tell Us About Your Brand'}
            </h2>
            <p className="text-purple-700">
              {mode === 'individual' 
                ? 'Help us understand your taste preferences'
                : 'Help us analyze your brand vibe and audience'
              }
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-purple-900 font-semibold mb-2">
                {mode === 'individual' ? 'Describe your taste in music, food, or style' : 'What does your brand represent?'}
              </label>
              <textarea
                value={formData.taste}
                onChange={(e) => handleChange('taste', e.target.value)}
                placeholder={mode === 'individual' 
                  ? 'e.g., I love indie rock, artisanal coffee, vintage clothing...'
                  : 'e.g., We create sustainable fashion for conscious consumers...'
                }
                className="w-full p-4 rounded-xl border-2 border-purple-200 focus:border-purple-400 focus:outline-none bg-white/50 backdrop-blur-sm resize-none"
                rows="4"
              />
            </div>

            {mode === 'individual' ? (
              <>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-purple-900 font-semibold mb-2">Age Range</label>
                    <select
                      value={formData.age}
                      onChange={(e) => handleChange('age', e.target.value)}
                      className="w-full p-4 rounded-xl border-2 border-purple-200 focus:border-purple-400 focus:outline-none bg-white/50 backdrop-blur-sm"
                    >
                      <option value="">Select age range</option>
                      <option value="18-24">18-24</option>
                      <option value="25-34">25-34</option>
                      <option value="35-44">35-44</option>
                      <option value="45-54">45-54</option>
                      <option value="55+">55+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-purple-900 font-semibold mb-2">Location</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => handleChange('location', e.target.value)}
                      placeholder="City, Country"
                      className="w-full p-4 rounded-xl border-2 border-purple-200 focus:border-purple-400 focus:outline-none bg-white/50 backdrop-blur-sm"
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-rose-900 font-semibold mb-2">Brand Name</label>
                    <input
                      type="text"
                      value={formData.brandName}
                      onChange={(e) => handleChange('brandName', e.target.value)}
                      placeholder="Your brand name"
                      className="w-full p-4 rounded-xl border-2 border-rose-200 focus:border-rose-400 focus:outline-none bg-white/50 backdrop-blur-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-rose-900 font-semibold mb-2">Industry</label>
                    <input
                      type="text"
                      value={formData.industry}
                      onChange={(e) => handleChange('industry', e.target.value)}
                      placeholder="e.g., Fashion, Tech, Food"
                      className="w-full p-4 rounded-xl border-2 border-rose-200 focus:border-rose-400 focus:outline-none bg-white/50 backdrop-blur-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-rose-900 font-semibold mb-2">Target Audience</label>
                  <textarea
                    value={formData.targetAudience}
                    onChange={(e) => handleChange('targetAudience', e.target.value)}
                    placeholder="Describe your ideal customers..."
                    className="w-full p-4 rounded-xl border-2 border-rose-200 focus:border-rose-400 focus:outline-none bg-white/50 backdrop-blur-sm resize-none"
                    rows="3"
                  />
                </div>
              </>
            )}

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className={`w-full p-4 rounded-xl font-semibold text-white transition-all duration-300 ${
                mode === 'individual'
                  ? 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800'
                  : 'bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 shadow-xl'}`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Analyzing your vibe...
                </div>
              ) : (
                <>
                  <Sparkles className="inline h-5 w-5 mr-2" />
                  Discover My Vibe
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputForm;