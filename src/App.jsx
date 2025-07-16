// App.jsx
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ModeSelect from './components/modeSelect';
import InputForm from './components/inputForm';
import VibeResult from './components/vibeResults';

const App = () => {
  const [currentStep, setCurrentStep] = useState('mode');
  const [mode, setMode] = useState(null);
  const [formData, setFormData] = useState(null);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleModeSelect = (selectedMode) => {
    setMode(selectedMode);
    setCurrentStep('form');
  };

  const handleFormSubmit = async (data) => {
    setIsLoading(true);
    setFormData(data);

    try {
      const prompt = generatePrompt(mode, data);

      const response = await fetch('http://localhost:4000/api/generate-vibe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });

      const resultJson = await response.json();
      const parsed = parseGeminiOutput(resultJson.text);

      setResult(parsed);
      setCurrentStep('result');
    } catch (error) {
      console.error('Error generating vibe:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generatePrompt = (mode, data) => {
    const input = JSON.stringify(data);

    if (mode === 'individual') {
      return `Act as a vibe analyst. Based on the user's preferences below, generate:
1. A short vibe summary (2–3 sentences, no markdown or headings).
2. A list of exactly 6 short personality traits (1–2 word phrases, no bullets).
3. A list of 4 real and existing local places in the user's city. Return each as a bullet point (start with a dash), with this format:

- Place Name (City): one sentence description.

Do not invent venues. If unsure a place exists, skip it.

User Input: ${input}`;
    } else {
      return `Act as a brand consultant. Based on the brand input below, generate:
1. A short brand vibe summary (2–3 sentences).
2. 6 key brand traits (1–2 word phrases).
3. 4 real venues or partnership ideas in their city (bullet list with name and 1-line description).
4. Key marketing insights for the brand.

Input: ${input}`;
    }
  };

  const parseGeminiOutput = (text) => {
    const parts = text.split(/\n{2,}/);

    const summary = parts[0]?.trim();

    const traits = parts[1]
      .split(/[,;\n]/)
      .map(t => t.trim())
      .filter(t => t);

    const recsRaw = parts[2]?.split(/\n/).filter(line => /^[-–\d]/.test(line)) || [];
    const recommendations = recsRaw.map(line => {
      const clean = line.replace(/^[-–]\s*/, '').trim();
      const [namePart, desc] = clean.split(':').map(s => s.trim());
      return { name: namePart, description: desc };
    });

    const marketingInsights = parts[3]
      ? parts[3].split(/\n/).map(l => l.replace(/^[-•\d]\s*/, '').trim()).filter(Boolean)
      : [];

    return { summary, traits, recommendations, marketingInsights };
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
    <div className="min-vh-100 p-3">
      {currentStep === 'mode' && <ModeSelect onSelect={handleModeSelect} />}
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
