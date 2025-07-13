import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ModeSelect from './components/modeSelect';
import InputForm from './components/inputForm';
import VibeResult from './components/vibeResults';

const App = () => {
  const [currentStep, setCurrentStep] = useState('mode'); // 'mode', 'form', 'result'
  const [mode, setMode] = useState(null); // 'individual' or 'brand'
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
      return `Act as a vibe analyst. Based on the user's responses below, generate:\n\n1. A short personal vibe summary (2–3 sentences)\n2. A list of 6 descriptive personality traits\n3. A list of 4 personalized lifestyle recommendations (with name and a short description each)\n\nResponses: ${input}`;
    } else {
      return `Act as a brand consultant. Based on the brand input below, generate:\n\n1. A short brand vibe summary (2–3 sentences)\n2. 6 key brand traits\n3. 4 relevant venues or partnerships (name and short description)\n4. Key marketing insights for the brand\n\nInput: ${input}`;
    }
  };

  const parseGeminiOutput = (text) => {
    const summaryMatch = text.match(/(?:Brand Vibe|Summary):([\s\S]*?)(?:Traits:|Six Brand Traits:)/i);
    const traitsMatch = text.match(/(?:Traits|Six Brand Traits):([\s\S]*?)(?:Recommendations:|Four Relevant Recommendation Venues:)/i);
    const recsMatch = text.match(/(?:Recommendations|Four Relevant Recommendation Venues):([\s\S]*?)(?:Marketing Insights:|$)/i);
    const insightsMatch = text.match(/Marketing Insights:([\s\S]*)/i);

    const traits = traitsMatch?.[1]
      ?.split(/\n|[,•\-]/)
      .map(str => str.trim())
      .filter(str => str.length > 0);

    const recommendations = recsMatch?.[1]
      ?.split(/\n(?=\d+\.)/)
      .map(line => {
        const [name, ...desc] = line.split(/[:-]/);
        return {
          name: name?.replace(/^\d+\.\s*/, '').trim(),
          description: desc.join(':').trim()
        };
      }) || [];

    return {
      summary: summaryMatch?.[1]?.trim() || '',
      traits: traits || [],
      recommendations: recommendations,
      marketingInsights: insightsMatch?.[1]
        ?.split('\n')
        .map(i => i.replace(/^[-•\d.]\s*/, '').trim())
        .filter(Boolean) || []
    };
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
