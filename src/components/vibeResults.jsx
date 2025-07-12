// src/components/VibeResult.jsx
import React from 'react';
import { Heart, Sparkles, MapPin, Download, ArrowLeft } from 'lucide-react';

const VibeResult = ({ mode, result, onBack, onRestart }) => {
  const handleExport = () => {
    alert('PDF export feature coming soon!');
  };

  return (
    <div className="min-vh-100 bg-gradient-to-br from-purple-50 via-pink-50 to-teal-50 p-4 d-flex justify-content-center align-items-center">
      <div className="backdrop-blur rounded-2xl shadow-xl p-4 border border-purple-200" style={{ maxWidth: '900px', width: '100%' }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <button
            onClick={onBack}
            className="btn btn-link d-flex align-items-center text-purple-700"
            style={{ textDecoration: 'none' }}
          >
            <ArrowLeft className="me-2" />
            Back to form
          </button>
          <button
            onClick={onRestart}
            className="btn btn-primary btn-gradient"
          >
            Start Over
          </button>
        </div>

        <div className="text-center mb-4">
          <div className="d-flex justify-content-center align-items-center mb-3">
            <Heart className="text-rose-500 me-2" size={48} />
            <Sparkles className="text-purple-600" size={48} />
          </div>
          <h2 className="fw-bold text-purple-900 mb-2">
            {mode === 'individual' ? 'Your Vibe Profile' : 'Your Brand Vibe Analysis'}
          </h2>
          <p className="text-purple-700">
            {mode === 'individual' 
              ? "Here's what we discovered about your taste"
              : "Here's your brand personality breakdown"
            }
          </p>
        </div>

        <div className="row g-4">
          <div className="col-md-6">
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-3 p-3 mb-3">
              <h3 className="text-purple-900 fw-semibold mb-2">
                {mode === 'individual' ? 'Your Vibe Summary' : 'Brand Essence'}
              </h3>
              <p className="text-purple-800" style={{ lineHeight: 1.4 }}>
                {result.summary}
              </p>
            </div>

            <div className="bg-gradient-to-r from-teal-100 to-blue-100 rounded-3 p-3">
              <h3 className="text-teal-900 fw-semibold mb-3">
                {mode === 'individual' ? 'Personality Traits' : 'Brand Values'}
              </h3>
              <div>
                {result.traits.map((trait, index) => (
                  <span
                    key={index}
                    className="d-inline-block px-3 py-1 mb-2 me-2 border rounded-pill text-teal-800 fw-medium"
                    style={{
                      backgroundColor: 'rgba(209, 250, 229, 0.6)',
                      borderColor: '#22c55e',
                      fontWeight: 500,
                      fontSize: '0.9rem',
                    }}
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="bg-gradient-to-r from-rose-100 to-orange-100 rounded-3 p-3 mb-3">
              <h3 className="text-rose-900 fw-semibold mb-3 d-flex align-items-center justify-content-center">
                <MapPin className="me-2" size={20} />
                {mode === 'individual' ? 'Perfect Places' : 'Target Venues'}
              </h3>
              <ul className="list-unstyled d-flex flex-column align-items-center gap-3 px-3">
                {result.recommendations.map((rec, index) => (
                  <li
                    key={index}
                    className="text-rose-800 text-center"
                    style={{ maxWidth: '300px' }}
                  >
                    <span className="fw-semibold">{rec.name}</span>
                    <p className="text-muted">{rec.description}</p>
                  </li>
                ))}
              </ul>
            </div>

            {mode === 'brand' && (
              <div className="bg-gradient-to-r from-amber-100 to-yellow-100 rounded-3 p-3">
                <h3 className="text-amber-900 fw-semibold mb-3">
                  Marketing Insights
                </h3>
                <ul className="list-unstyled text-amber-800 mb-0" style={{ lineHeight: 1.6 }}>
                  <li>• Focus on authenticity and sustainability messaging</li>
                  <li>• Target creative professionals aged 25-40</li>
                  <li>• Emphasize quality and craftsmanship</li>
                  <li>• Use warm, approachable visual language</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 d-flex justify-content-center gap-3 flex-wrap">
          {mode === 'brand' && (
            <button
              onClick={handleExport}
              className="btn btn-gradient flex align-items-center"
              style={{ background: 'linear-gradient(90deg, #9333ea 0%, #f43f5e 100%)', color: 'white', borderRadius: '1rem' }}
            >
              <Download className="me-2" size={20} />
              Export PDF Report
            </button>
          )}
          <button
            onClick={onRestart}
            className="btn btn-gradient flex align-items-center"
            style={{ background: 'linear-gradient(90deg, #14b8a6 0%, #3b82f6 100%)', color: 'white', borderRadius: '1rem' }}
          >
            <Sparkles className="me-2" size={20} />
            Discover Another Vibe
          </button>
        </div>
      </div>
    </div>
  );
};

export default VibeResult;
