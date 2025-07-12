import React from 'react';
import { ChevronRight, User, Building2, Sparkles } from 'lucide-react';

const ModeSelect = ({ onSelect }) => {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-neutral-gradient p-4">
      <div className="w-100" style={{ maxWidth: '720px' }}>
        <div className="text-center mb-5">
          <Sparkles size={64} className="text-purple-700 mb-3" />
          <h1 className="display-5 fw-bold text-purple-900">Discover Your Vibe</h1>
          <p className="lead text-purple-700">Find your perfect taste match in seconds</p>
        </div>

        <div className="row g-4">
          <div className="col-md-6">
            <button
              onClick={() => onSelect('individual')}
              className="w-100 p-4 bg-white backdrop-blur rounded-2xl border border-purple-200 hover-border transition-all shadow-sm hover-shadow-lg text-start"
            >
              <div className="text-center">
                <User size={48} className="text-purple-700 mb-3" />
                <h3 className="h5 fw-semibold text-purple-900">Individual Discovery</h3>
                <p className="text-purple-700 mb-2">
                  Get personalized recommendations based on your unique taste profile
                </p>
                <ChevronRight size={20} className="text-purple-700" />
              </div>
            </button>
          </div>

          <div className="col-md-6">
            <button
              onClick={() => onSelect('brand')}
              className="w-100 p-4 bg-white backdrop-blur rounded-2xl border border-rose-200 hover-border transition-all shadow-sm hover-shadow-lg text-start"
            >
              <div className="text-center">
                <Building2 size={48} className="text-rose-700 mb-3" />
                <h3 className="h5 fw-semibold text-rose-900">Brand Analysis</h3>
                <p className="text-rose-700 mb-2">
                  Understand your brand’s vibe and target audience preferences
                </p>
                <ChevronRight size={20} className="text-rose-700" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModeSelect;
