import { useState } from "react";

export default function App() {
  const [inputs, setInputs] = useState(["", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [vibeResult, setVibeResult] = useState(null);
  const [error, setError] = useState(null);

  // Handle input changes
  const handleChange = (index, event) => {
    const newInputs = [...inputs];
    newInputs[index] = event.target.value;
    setInputs(newInputs);
  };

  const mockQlooResponse = {
    fashion: ["Thrift stores", "Vintage jackets", "Indie streetwear"],
    food: ["Jazz cafes", "Vegan bakeries", "Artisanal coffee"],
    film: ["Indie dramas", "Sofia Coppola films", "A24 movies"],
    music: ["Indie folk", "Dream pop", "Lo-fi beats"],
    travel: ["Boutique hostels", "Art districts", "Small music festivals"],
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setVibeResult(null);

    const userTastes = inputs.filter(i => i.trim());
    if (userTastes.length === 0) {
      setError("Please enter at least one taste.");
      return;
    }

    setIsLoading(true);

    const qlooData = mockQlooResponse;

    const prompt = `
You are a cultural strategist. The user likes these: ${userTastes.join(", ")}.
Based on these tastes, and the following preferences: ${JSON.stringify(qlooData)},
create a vibe profile with:

- **Aesthetic Name**: A catchy name for this vibe
- **Vibe Description**: 2-3 sentences describing the overall aesthetic
- **Color Palette**: 4-5 colors that match this vibe
- **Brands**: 3-4 brands that align with this aesthetic
- **Music**: 3-4 music genres or artists
- **Movies**: 3-4 movies or directors
- **Lifestyle**: Key lifestyle elements

Format it nicely with clear sections and emojis.
    `;

    try {
      const response = await fetch("http://127.0.0.1:4000/api/generate-vibe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Backend error:", errorData);
        
        // Handle specific error types
        if (errorData.details && errorData.details.includes('overloaded')) {
          throw new Error("The AI service is currently overloaded. Please try again in a few minutes.");
        } else if (errorData.details && errorData.details.includes('quota')) {
          throw new Error("API quota exceeded. Please try again later.");
        } else {
          throw new Error(`Backend error: ${response.status} - ${errorData.error || 'Unknown error'}`);
        }
      }

      const data = await response.json();
      setVibeResult(data.text);
      console.log("Generated Vibe:", data.text);

    } catch (error) {
      console.error("❌ Vibe generation failed:", error);
      
      // Show user-friendly error messages
      if (error.message.includes('overloaded')) {
        setError("🚦 The AI service is currently busy. Please try again in a few minutes!");
      } else if (error.message.includes('quota')) {
        setError("📊 API limit reached. Please try again later.");
      } else if (error.message.includes('Failed to fetch')) {
        setError("🔌 Can't connect to server. Make sure your server is running on port 4000.");
      } else {
        setError(`❌ ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setInputs(["", "", ""]);
    setVibeResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 text-center">
          ✨ Build Your Vibe ✨
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <div>
              <p className="mb-6 text-gray-700 text-lg">
                Enter up to 3 of your favorite artists, movies, brands, or vibes:
              </p>
              
              {inputs.map((value, index) => (
                <div key={index} className="mb-4">
                  <input
                    type="text"
                    placeholder={`Taste #${index + 1} (e.g., ${
                      index === 0 ? "Taylor Swift" : 
                      index === 1 ? "Wes Anderson films" : 
                      "Vintage fashion"
                    })`}
                    value={value}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all"
                    disabled={isLoading}
                    onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
                  />
                </div>
              ))}

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                  {error}
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none font-semibold"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating Your Vibe...
                  </span>
                ) : (
                  "Generate Vibe"
                )}
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            {!vibeResult && !isLoading && (
              <div className="text-center text-gray-500 py-12">
                <div className="text-6xl mb-4">🎨</div>
                <p className="text-lg">Your vibe profile will appear here!</p>
                <p className="text-sm mt-2">Fill out your tastes and hit generate to see your personalized cultural aesthetic.</p>
              </div>
            )}

            {isLoading && (
              <div className="text-center text-gray-500 py-12">
                <div className="text-6xl mb-4 animate-pulse">✨</div>
                <p className="text-lg">Creating your unique vibe...</p>
                <p className="text-sm mt-2">This may take a few moments</p>
              </div>
            )}

            {vibeResult && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Your Vibe Profile</h2>
                  <button
                    onClick={resetForm}
                    className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Create New Vibe
                  </button>
                </div>
                
                <div className="prose max-w-none">
                  <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-lg border border-purple-100">
                    <pre className="whitespace-pre-wrap text-gray-800 font-sans leading-relaxed">
                      {vibeResult}
                    </pre>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600">
          <p className="text-sm">
            Powered by AI cultural analysis • Enter your favorite things to discover your aesthetic
          </p>
        </div>
      </div>
    </div>
  );
}