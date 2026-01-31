import React from "react";

export default function RightSideBar() {
  return (
    <aside className="w-72 bg-white/80 backdrop-blur-md border-l border-slate-200/60 flex flex-col z-20 flex-shrink-0 h-full hidden lg:flex">
      {/* Featured Partners */}
      <div className="p-6 border-b border-slate-100">
        <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide mb-4">
          Featured Partners
        </h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-xl cursor-pointer transition">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <i className="fas fa-university text-white text-sm" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-900 truncate">
                Oxford University
              </p>
              <p className="text-[10px] text-slate-500">Russell Group</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-xl cursor-pointer transition">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <i className="fas fa-university text-white text-sm" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-900 truncate">
                Imperial College
              </p>
              <p className="text-[10px] text-slate-500">STEM Excellence</p>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="p-6 flex-1 border-b border-slate-100 overflow-y-auto">
        <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide mb-4">
          Upcoming Events
        </h3>
        <div className="space-y-3">
          <div className="p-3 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl border border-emerald-100">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 bg-emerald-500 rounded-full" />
              <span className="text-xs font-bold text-emerald-700">Jan 15</span>
            </div>
            <p className="text-xs font-bold text-slate-900">UK Virtual Fair</p>
            <p className="text-[10px] text-slate-500">10 AM - 4 PM GMT</p>
          </div>
          <div className="p-3 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border border-orange-100">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 bg-orange-500 rounded-full" />
              <span className="text-xs font-bold text-orange-700">Feb 2</span>
            </div>
            <p className="text-xs font-bold text-slate-900">
              Scholarship Deadline
            </p>
            <p className="text-[10px] text-slate-500">
              Global Excellence Grant
            </p>
          </div>
        </div>
      </div>

      {/* Spotlight */}
      <div className="p-6">
        <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide mb-4">
          Spotlight
        </h3>
        <div className="space-y-3">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-2xl text-center shadow-xl">
            <div className="text-2xl mb-1">🎓</div>
            <p className="text-xs font-bold">Complete UniGPT</p>
            <p className="text-[10px]">92% Match Score</p>
          </div>
          <button className="w-full p-3 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition">
            Upgrade to Pro
          </button>
        </div>
      </div>
    </aside>
  );
}
