// UniversityProfilePage.jsx - Perfect layout match + React Icons
import React, { useState } from "react";
import { 
  FaCloudUploadAlt, FaEdit, FaTimes, FaPlus, FaInfoCircle, 
  FaTrophy, FaCheckCircle, FaTrash, FaPlusCircle 
} from "react-icons/fa";

export function UniversityProfilePage() {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="space-y-8">
      {/* Header - Exact match */}
      <div className="flex justify-between items-end mb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">University Profile CMS</h2>
          <p className="text-xs text-slate-500">Control your public-facing profile on the UniGlobal App.</p>
        </div>
        <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition transform active:scale-95">
          Publish Changes
        </button>
      </div>

      {/* Main Container - Exact structure */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        
        {/* Tab Navigation - Exact flex layout */}
        <div className="flex border-b border-slate-200 bg-slate-50 overflow-x-auto">
          <button 
            onClick={() => setActiveTab("general")}
            className={`px-8 py-4 text-xs font-bold transition whitespace-nowrap flex-1 ${
              activeTab === "general" ? "text-indigo-600 border-b-2 border-indigo-600 bg-white" : "text-slate-500 hover:text-slate-800 border-b-2 border-transparent"
            }`}
          >
            General Info
          </button>
          <button 
            onClick={() => setActiveTab("media")}
            className={`px-8 py-4 text-xs font-bold transition whitespace-nowrap flex-1 ${
              activeTab === "media" ? "text-indigo-600 border-b-2 border-indigo-600 bg-white" : "text-slate-500 hover:text-slate-800 border-b-2 border-transparent"
            }`}
          >
            Media Branding
          </button>
          <button 
            onClick={() => setActiveTab("stats")}
            className={`px-8 py-4 text-xs font-bold transition whitespace-nowrap flex-1 ${
              activeTab === "stats" ? "text-indigo-600 border-b-2 border-indigo-600 bg-white" : "text-slate-500 hover:text-slate-800 border-b-2 border-transparent"
            }`}
          >
            Key Statistics
          </button>
          <button 
            onClick={() => setActiveTab("social")}
            className={`px-8 py-4 text-xs font-bold transition whitespace-nowrap flex-1 ${
              activeTab === "social" ? "text-indigo-600 border-b-2 border-indigo-600 bg-white" : "text-slate-500 hover:text-slate-800 border-b-2 border-transparent"
            }`}
          >
            Contact Social
          </button>
        </div>

        {/* Content Area - min-h-[500px] exact */}
        <div className="p-10 min-h-[500px]">
          
          {/* GENERAL TAB - Exact 2-column grid layout */}
          {activeTab === "general" && (
            <div className="space-y-8 max-w-4xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-2">University Name</label>
                  <input type="text" value="Oxford University" className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:ring-2 ring-indigo-500 focus:border-transparent outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-2">Tagline / Motto</label>
                  <input type="text" value="Dominus Illuminatio Mea" className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:ring-2 ring-indigo-500 focus:border-transparent outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-2">Institution Type</label>
                  <select className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:ring-2 ring-indigo-500 focus:border-transparent outline-none transition-all">
                    <option>Public Research University</option>
                    <option>Private University</option>
                    <option>Liberal Arts College</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-2">Established Year</label>
                  <input type="text" value="1096" className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:ring-2 ring-indigo-500 focus:border-transparent outline-none transition-all" />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-2">About Description</label>
                <textarea 
                  rows={6}
                  className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:ring-2 ring-indigo-500 focus:border-transparent outline-none transition-all"
                  defaultValue="The University of Oxford is a collegiate research university in Oxford, England. There is evidence of teaching as early as 1096, making it the oldest university in the English-speaking world and the world's second-oldest university in continuous operation."
                />
                <p className="text-[10px] text-slate-400 mt-1 text-right">0/500 words</p>
              </div>
            </div>
          )}

          {/* MEDIA TAB - Exact layout with gallery grid */}
          {activeTab === "media" && (
            <div className="space-y-8 max-w-5xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <label className="block text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-2">Official Logo Square</label>
                  <div className="mt-2 w-32 h-32 rounded-2xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 bg-slate-50 cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition">
                    <FaCloudUploadAlt className="text-2xl mb-2" />
                    <span className="text-[10px] font-bold">Upload PNG</span>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-2">Profile Banner 1200x400px</label>
                <div 
                  className="mt-2 w-full h-32 rounded-2xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 bg-cover bg-center cursor-pointer relative group"
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600')" }}
                >
                  <div className="absolute inset-0 bg-black/40 hidden group-hover:flex items-center justify-center rounded-2xl">
                    <span className="text-white font-bold text-xs flex items-center">
                      <FaEdit className="mr-1" /> Change Images
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-2">Video Tour URL YouTube/Vimeo</label>
                <input type="text" value="https://youtube.com/watch?v=oxfordtour" className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:ring-2 ring-indigo-500 focus:border-transparent outline-none transition-all" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-[12px] font-bold text-slate-500 uppercase tracking-wider">Photo Gallery</label>
                  <button className="text-xs font-bold text-indigo-600 hover:text-indigo-700">Add Image</button>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div className="aspect-square rounded-xl bg-slate-100 overflow-hidden relative group">
                    <img src="https://images.unsplash.com/photo-1592280771190-3e2e4d50c20f?w=300" className="w-full h-full object-cover" alt="" />
                    <button className="absolute top-2 right-2 bg-red-500 text-white w-6 h-6 rounded-full text-xs hidden group-hover:flex items-center justify-center">
                      <FaTimes />
                    </button>
                  </div>
                  <div className="aspect-square rounded-xl bg-slate-100 overflow-hidden relative group">
                    <img src="https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=300" className="w-full h-full object-cover" alt="" />
                    <button className="absolute top-2 right-2 bg-red-500 text-white w-6 h-6 rounded-full text-xs hidden group-hover:flex items-center justify-center">
                      <FaTimes />
                    </button>
                  </div>
                  <div className="aspect-square rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 cursor-pointer hover:bg-slate-50">
                    <FaPlus className="text-lg" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STATS TAB - Exact row layout */}
          {activeTab === "stats" && (
            <div className="space-y-6 max-w-4xl">
              <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl text-xs text-indigo-800 mb-6 flex items-center gap-2 font-medium">
                <FaInfoCircle className="text-lg" />
                These statistics appear prominently on your university card and profile header in the student app.
              </div>
              <div className="space-y-3">
                <div className="flex gap-4 items-end bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="flex-1">
                    <label className="block text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-2">Label</label>
                    <input type="text" value="Global Ranking" className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:ring-2 ring-indigo-500 focus:border-transparent outline-none transition-all" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-2">Value</label>
                    <input type="text" value="1" className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:ring-2 ring-indigo-500 focus:border-transparent outline-none transition-all" />
                  </div>
                  <div className="w-32">
                    <label className="block text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-2">Icon</label>
                    <div className="w-full h-12 px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold flex items-center justify-center cursor-pointer hover:bg-white">
                      <FaTrophy className="text-yellow-500 text-lg" />
                    </div>
                  </div>
                  <button className="mb-1 p-3 text-red-400 hover:text-red-600 bg-white border border-slate-200 rounded-lg">
                    <FaTrash />
                  </button>
                </div>
                
                <div className="flex gap-4 items-end bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="flex-1">
                    <label className="block text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-2">Label</label>
                    <input type="text" value="Acceptance Rate" className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:ring-2 ring-indigo-500 focus:border-transparent outline-none transition-all" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-2">Value</label>
                    <input type="text" value="14" className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:ring-2 ring-indigo-500 focus:border-transparent outline-none transition-all" />
                  </div>
                  <div className="w-32">
                    <label className="block text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-2">Icon</label>
                    <div className="w-full h-12 px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold flex items-center justify-center cursor-pointer hover:bg-white">
                      <FaCheckCircle className="text-green-500 text-lg" />
                    </div>
                  </div>
                  <button className="mb-1 p-3 text-red-400 hover:text-red-600 bg-white border border-slate-200 rounded-lg">
                    <FaTrash />
                  </button>
                </div>

                <button className="text-xs font-bold text-indigo-600 flex items-center gap-2 hover:bg-indigo-50 px-4 py-2 rounded-lg transition">
                  <FaPlusCircle />
                  Add Statistic
                </button>
              </div>
            </div>
          )}

          {/* SOCIAL TAB - Exact 2-col + full-width layout */}
          {activeTab === "social" && (
            <div className="space-y-6 max-w-4xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-2">Website URL</label>
                  <input type="text" value="https://www.ox.ac.uk" className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:ring-2 ring-indigo-500 focus:border-transparent outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-2">Admissions Email</label>
                  <input type="text" value="admissions@ox.ac.uk" className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:ring-2 ring-indigo-500 focus:border-transparent outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-2">LinkedIn URL</label>
                  <input type="text" placeholder="https://linkedin.com/..." className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:ring-2 ring-indigo-500 focus:border-transparent outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-2">Instagram Handle</label>
                  <input type="text" placeholder="@oxforduni" className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:ring-2 ring-indigo-500 focus:border-transparent outline-none transition-all" />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-2">Physical Address</label>
                <input type="text" value="Wellington Square, Oxford OX1 2JD, UK" className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:ring-2 ring-indigo-500 focus:border-transparent outline-none transition-all" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
