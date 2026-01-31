import React, { useState } from "react";

export function UniGptPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const runAnalysis = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowResults(true);
    }, 3000);
  };

  return (
    <div className="fade-in">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
     <div className="text-center mb-8">
  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 border border-purple-200 text-purple-700 text-xs font-bold uppercase tracking-wider mb-4 inline-block">
    <i className="fas fa-brain text-xs" />
    UniGPT 3.0
  </div>
  <h1 className="text-4xl font-extrabold text-slate-900 mb-3 leading-tight">
    Precision Matching Engine
  </h1>
  <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
    We use your GPA, detailed career ambition, and financials to find the perfect fit across 500+ programs worldwide.
  </p>
</div>


        {/* Progress bar */}
        {!showResults && (
          <div className="w-full bg-slate-200 rounded-full h-2 mb-8 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            />
          </div>
        )}

        {/* Wizard Container */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden relative min-h-[500px]">
          {/* Loading overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-white z-20 flex flex-col items-center justify-center">
              <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-6" />
              <h3 className="text-2xl font-bold text-slate-900">UniGPT is thinking...</h3>
              <p className="text-slate-500 mt-2">Cross-referencing 500+ programs against your profile</p>
            </div>
          )}

          {/* STEP 1: Academic & Career */}
          <div className={`p-8 space-y-6 transition-opacity duration-300 ${currentStep === 1 ? 'block' : 'hidden'}`}>
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-sm font-bold">1</div>
              Academic & Career Profile
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">Current GPA / Points</label>
                <input 
                  type="number" 
                  placeholder="e.g. 3.8 or 14" 
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">Career Ambition</label>
                <input 
                  type="text" 
                  placeholder="e.g. AI Researcher at Google" 
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2">Primary Field of Interest</label>
              <select className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
                <option>Technology & Computer Science</option>
                <option>Health & Medicine</option>
                <option>Business & Finance</option>
                <option>Engineering</option>
                <option>Arts & Humanities</option>
                <option>Law</option>
              </select>
            </div>
            <div className="flex justify-end">
              <button 
                onClick={nextStep}
                className="px-10 py-4 bg-slate-900 text-white font-bold rounded-2xl shadow-lg hover:bg-slate-800 hover:shadow-xl hover:scale-[1.02] transition-all duration-200 flex items-center gap-2"
              >
                Next Step <i className="fas fa-arrow-right" />
              </button>
            </div>
          </div>

          {/* STEP 2: Financial */}
          <div className={`p-8 space-y-6 transition-opacity duration-300 ${currentStep === 2 ? 'block' : 'hidden'}`}>
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center text-sm font-bold">2</div>
              Financial Logistics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">Max Annual Budget</label>
                <select className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition">
                  <option>$10,000 or less (Scholarship focus)</option>
                  <option>$10k - $30k (Mid-range)</option>
                  <option>$30k - $60k (Premium)</option>
                  <option>$60k+ (Self-funded)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">Preferred Study Region</label>
                <select className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition">
                  <option>Global Best Fit</option>
                  <option>United Kingdom</option>
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Australia</option>
                  <option>Europe (EU)</option>
                </select>
              </div>
            </div>
            <div className="flex justify-between">
              <button 
                onClick={prevStep}
                className="px-8 py-3 text-slate-500 font-bold hover:text-slate-700 transition-colors"
              >
                ← Back
              </button>
              <button 
                onClick={nextStep}
                className="px-10 py-4 bg-slate-900 text-white font-bold rounded-2xl shadow-lg hover:bg-slate-800 hover:shadow-xl hover:scale-[1.02] transition-all duration-200 flex items-center gap-2"
              >
                Continue <i className="fas fa-arrow-right" />
              </button>
            </div>
          </div>

          {/* STEP 3: Ready */}
          <div className={`p-8 flex flex-col items-center justify-center text-center pt-20 transition-opacity duration-300 ${currentStep === 3 ? 'block' : 'hidden'}`}>
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-3xl flex flex-col items-center justify-center shadow-2xl mb-8">
              <i className="fas fa-rocket text-3xl mb-2" />
              <div className="text-sm font-bold">Ready</div>
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Analysis Ready</h3>
            <p className="text-slate-500 mb-8 max-w-md mx-auto leading-relaxed">
              UniGPT will now cross-reference your academic profile, career goals, and budget 
              against admission criteria from 500+ programs worldwide.
            </p>
            <button 
              onClick={runAnalysis}
              className="px-12 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-3xl shadow-2xl hover:shadow-3xl hover:scale-[1.05] hover:from-purple-700 hover:to-pink-700 transition-all duration-300 text-lg flex items-center gap-3 mb-4"
            >
              <i className="fas fa-sparkles" />
              Run UniGPT Analysis
            </button>
            <button 
              onClick={prevStep}
              className="text-slate-400 font-bold text-sm hover:text-slate-600 transition-colors flex items-center gap-1"
            >
              <i className="fas fa-arrow-left" />
              Back
            </button>
          </div>

          {/* RESULTS SCREEN */}
          <div className={`transition-opacity duration-700 ${showResults ? 'block' : 'hidden'}`}>
            <div className="p-8 space-y-8">
              {/* Hero result */}
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-10 rounded-3xl shadow-2xl text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full blur-3xl -mr-20 -mt-20" />
                <div className="relative z-10">
                  <h2 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Your Perfect Matches
                  </h2>
                  <div className="text-6xl font-black mb-4">92%</div>
                  <p className="text-slate-300 text-lg max-w-md mx-auto leading-relaxed">
                    Exceptional fit for top-tier Computer Science programs. Multiple scholarship opportunities identified.
                  </p>
                </div>
              </div>

              {/* Top recommendations */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-sm shadow-lg">
                      UK
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition">University of Oxford</h4>
                      <p className="text-sm text-slate-500">BSc Computer Science</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-emerald-600">£28,000</span>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">95% Match</span>
                  </div>
                  <button className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 hover:shadow-lg transition-all duration-200">
                    Apply Now
                  </button>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-sm shadow-lg">
                      US
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-slate-900 group-hover:text-purple-600 transition">MIT</h4>
                      <p className="text-sm text-slate-500">BS Artificial Intelligence</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-emerald-600">$62,000</span>
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full">89% Match</span>
                  </div>
                  <button className="w-full py-3 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 hover:shadow-lg transition-all duration-200">
                    Shortlist
                  </button>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white font-bold text-sm shadow-lg">
                      CA
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-slate-900 group-hover:text-emerald-600 transition">University of Toronto</h4>
                      <p className="text-sm text-slate-500">BSc Data Science</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-emerald-600">CAD 45,000</span>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">91% Match</span>
                  </div>
                  <button className="w-full py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 hover:shadow-lg transition-all duration-200">
                    Scholarship Eligible
                  </button>
                </div>
              </div>

              {/* Next steps */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-3xl p-8 text-center">
                <h4 className="text-xl font-bold text-blue-900 mb-4">Next Steps</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 bg-white rounded-2xl border border-blue-200 hover:shadow-md transition">
                    <div className="text-2xl mb-2">📄</div>
                    <h5 className="font-bold text-sm mb-1">Complete Applications</h5>
                    <p className="text-xs text-slate-600">3 programs ready</p>
                  </div>
                  <div className="p-4 bg-white rounded-2xl border border-blue-200 hover:shadow-md transition">
                    <div className="text-2xl mb-2">💰</div>
                    <h5 className="font-bold text-sm mb-1">Scholarships</h5>
                    <p className="text-xs text-slate-600">5 opportunities</p>
                  </div>
                  <div className="p-4 bg-white rounded-2xl border border-blue-200 hover:shadow-md transition">
                    <div className="text-2xl mb-2">📞</div>
                    <h5 className="font-bold text-sm mb-1">Advisor Call</h5>
                    <p className="text-xs text-slate-600">Book free consultation</p>
                  </div>
                </div>
                <button className="px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 hover:shadow-xl hover:scale-[1.02] transition-all duration-200 text-lg">
                  Start Applications →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
