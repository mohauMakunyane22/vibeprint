// src/App.jsx
import React, { useState } from 'react';
import ModeSelect from './components/modeSelect';
import InputForm from './components/inputForm';
import VibeResult from './components/vibeResults';

const App = () => {
  const [currentStep, setCurrentStep] = useState('mode'); // 'mode', 'form', 'result'
  const [mode, setMode] = useState(null); // 'individual' or 'brand'
  const [formData, setFormData] = useState(null);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for demonstration - replace with actual API calls
  const mockResults = {
    individual: {
      summary: "You're a creative soul with eclectic tastes. You appreciate authenticity and seek experiences that feel genuine and artisanal. Your vibe blends vintage charm with modern sensibilities.",
      traits: ["Creative", "Authentic", "Eclectic", "Mindful", "Artistic", "Independent"],
      recommendations: [
        { name: "Local Coffee Roastery", description: "Perfect for your artisanal coffee appreciation" },
        { name: "Vintage Boutique", description: "Unique finds that match your style" },
        { name: "Indie Music Venue", description: "Intimate concerts with emerging artists" },
        { name: "Farm-to-Table Restaurant", description: "Sustainable dining experience" }
      ]
    },
    brand: {
      summary: "Your brand embodies modern sophistication with a conscious edge. You appeal to discerning consumers who value quality, sustainability, and authentic storytelling in their purchasing decisions.",
      traits: ["Sustainable", "Premium", "Authentic", "Innovative", "Conscious", "Sophisticated"],
      recommendations: [
        { name: "Boutique Hotels", description: "Perfect partnership for conscious travelers" },
        { name: "Artisan Markets", description: "Showcase your products to target demographic" },
        { name: "Co-working Spaces", description: "Connect with creative professionals" },
        { name: "Sustainable Events", description: "Align with environmentally conscious gatherings" }
      ]
    }
  };

  const handleModeSelect = (selectedMode) => {
    setMode(selectedMode);
    setCurrentStep('form');
  };

  const handleFormSubmit = async (data) => {
    setIsLoading(true);
    setFormData(data);
    
    try {
      // TODO: Replace with actual API call to your server.cjs
      // const response = await fetch('/api/analyze-vibe', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ mode, ...data })
      // });
      // const result = await response.json();
      
      // For now, simulate API call with mock data
      setTimeout(() => {
        setResult(mockResults[mode]);
        setCurrentStep('result');
        setIsLoading(false);
      }, 2000);
      
    } catch (error) {
      console.error('Error analyzing vibe:', error);
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (currentStep === 'form') {
      setCurrentStep('mode');
      setMode(null);
    } else if (currentStep === 'result') {
      setCurrentStep('form');
    }
  };

  const handleRestart = () => {
    setCurrentStep('mode');
    setMode(null);
    setFormData(null);
    setResult(null);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen">
      {currentStep === 'mode' && (
        <ModeSelect onSelect={handleModeSelect} />
      )}
      
      {currentStep === 'form' && (
        <InputForm 
          mode={mode} 
          onSubmit={handleFormSubmit}
          onBack={handleBack}
          isLoading={isLoading}
        />
      )}
      
      {currentStep === 'result' && (
        <VibeResult 
          mode={mode}
          result={result}
          onBack={handleBack}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
};

export default App;