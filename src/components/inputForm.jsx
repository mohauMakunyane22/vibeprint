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
    <main className="min-vh-100 d-flex align-items-center justify-content-center bg-neutral-gradient p-4">
      <section className="w-100" style={{ maxWidth: '640px' }}>
        <nav>
          <button
            onClick={onBack}
            className="btn btn-link text-purple-700 fw-bold mb-4 d-flex align-items-center"
            type="button"
          >
            <ArrowLeft className="me-2" size={20} />
            Back to mode selection
          </button>
        </nav>

        <article className={mode === 'individual' ? 'backdrop-blur' : 'backdrop-blur-accent'}>
          <header className="text-center mb-4">
            {mode === 'individual' ? (
              <User size={48} className="text-purple-700" />
            ) : (
              <Building2 size={48} className="text-rose-700" />
            )}
            <h2 className={`fw-bold mt-3 ${mode === 'individual' ? 'text-purple-900' : 'text-rose-900'}`}>
              {mode === 'individual' ? 'Tell Us About Yourself' : 'Tell Us About Your Brand'}
            </h2>
            <p className={mode === 'individual' ? 'text-purple-700' : 'text-rose-700'}>
              {mode === 'individual'
                ? 'Help us understand your taste preferences'
                : 'Help us analyze your brand vibe and audience'}
            </p>
          </header>

          <form onSubmit={e => e.preventDefault()}>
            <fieldset className="mb-4">
              <label className={`form-label ${mode === 'individual' ? 'form-label-primary' : 'form-label-accent'}`}>
                {mode === 'individual'
                  ? 'Describe your taste in music, food, or style'
                  : 'What does your brand represent?'}
              </label>
              <textarea
                value={formData.taste}
                onChange={e => handleChange('taste', e.target.value)}
                placeholder={
                  mode === 'individual'
                    ? 'e.g., I love indie rock, artisanal coffee, vintage clothing...'
                    : 'e.g., We create sustainable fashion for conscious consumers...'
                }
                className="form-control"
                rows={4}
              />
            </fieldset>

            {mode === 'individual' ? (
              <fieldset className="row g-3 mb-4">
                <section className="col-md-6">
                  <label className="form-label form-label-primary">Age Range</label>
                  <select
                    value={formData.age}
                    onChange={e => handleChange('age', e.target.value)}
                    className="form-select"
                  >
                    <option value="">Select age range</option>
                    <option value="18-24">18–24</option>
                    <option value="25-34">25–34</option>
                    <option value="35-44">35–44</option>
                    <option value="45-54">45–54</option>
                    <option value="55+">55+</option>
                  </select>
                </section>
                <section className="col-md-6">
                  <label className="form-label form-label-primary">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={e => handleChange('location', e.target.value)}
                    placeholder="City, Country"
                    className="form-control"
                  />
                </section>
              </fieldset>
            ) : (
              <>
                <fieldset className="row g-3 mb-3">
                  <section className="col-md-6">
                    <label className="form-label form-label-accent">Brand Name</label>
                    <input
                      type="text"
                      value={formData.brandName}
                      onChange={e => handleChange('brandName', e.target.value)}
                      placeholder="Your brand name"
                      className="form-control"
                    />
                  </section>
                  <section className="col-md-6">
                    <label className="form-label form-label-accent">Industry</label>
                    <input
                      type="text"
                      value={formData.industry}
                      onChange={e => handleChange('industry', e.target.value)}
                      placeholder="e.g., Fashion, Tech, Food"
                      className="form-control"
                    />
                  </section>
                </fieldset>

                <fieldset className="mb-4">
                  <label className="form-label form-label-accent">Target Audience</label>
                  <textarea
                    value={formData.targetAudience}
                    onChange={e => handleChange('targetAudience', e.target.value)}
                    placeholder="Describe your ideal customers..."
                    className="form-control"
                    rows={3}
                  />
                </fieldset>
              </>
            )}

            <footer>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className={`w-100 ${mode === 'individual' ? 'btn btn-primary-gradient' : 'btn btn-accent-gradient'}`}
              >
                {isLoading ? (
                  <span className="d-flex align-items-center justify-content-center">
                    <span className="spinner-border spinner-border-sm text-white me-2" role="status" />
                    Analyzing your vibe...
                  </span>
                ) : (
                  <>
                    <Sparkles className="me-2" size={20} />
                    Discover My Vibe
                  </>
                )}
              </button>
            </footer>
          </form>
        </article>
      </section>
    </main>
  );
};

export default InputForm;
