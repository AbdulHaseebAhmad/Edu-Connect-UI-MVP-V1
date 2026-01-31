import React from "react";

export function ApplicationsPage() {
  return (
    <div className="mb-4 py-8 px-6">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">
        Global Application Pipeline
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Submitted column */}
        <div className="bg-slate-100 rounded-2xl p-4 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-700">Submitted</h3>
            <span className="bg-white text-slate-600 text-xs font-bold px-2 py-0.5 rounded border border-slate-200">
              0
            </span>
          </div>
          <div className="space-y-3 overflow-y-auto flex-1 custom-scroll">
            {/* Example static card */}
            
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
              <div className="font-bold text-slate-900 mb-1">
                Alex Student
              </div>
              <div className="text-xs text-slate-500 mb-2">
                BSc Computer Science @ Oxford University
              </div>
              <button className="w-full py-1.5 bg-slate-900 text-white text-xs font-bold rounded">
                Mark Offer Received
              </button>
            </div>
           
          </div>
        </div>

        {/* Review / Offer column */}
        <div className="bg-blue-50 rounded-2xl p-4 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-blue-800">Review / Offer</h3>
            <span className="bg-white text-blue-600 text-xs font-bold px-2 py-0.5 rounded border border-blue-200">
              0
            </span>
          </div>
          <div className="space-y-3 overflow-y-auto flex-1 custom-scroll">
            {/* Example static card */}
            
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
              <div className="font-bold text-slate-900 mb-1">
                Sarah Connor
              </div>
              <div className="text-xs text-slate-500 mb-2">
                BA History @ Harvard University
              </div>
              <button className="w-full py-1.5 bg-green-600 text-white text-xs font-bold rounded">
                Confirm Enrollment
              </button>
            </div>
           
          </div>
        </div>

        {/* Enrolled column */}
        <div className="bg-green-50 rounded-2xl p-4 flex flex-col border border-green-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-green-800">Enrolled (Billable)</h3>
            <span className="bg-white text-green-600 text-xs font-bold px-2 py-0.5 rounded border border-green-200">
              0
            </span>
          </div>
          <div className="space-y-3 overflow-y-auto flex-1 custom-scroll">
            {/* Example static card */}
            
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
              <div className="font-bold text-slate-900 mb-1">
                Alex Student
              </div>
              <div className="text-xs text-slate-500 mb-2">
                Data Sci @ Universiti Malaya
              </div>
              <div className="text-xs font-bold text-green-600 flex items-center justify-center gap-1">
                <i className="fas fa-check-circle" />
                Commission Generated
              </div>
            </div>
           
          </div>
        </div>
      </div>
    </div>
  );
}
