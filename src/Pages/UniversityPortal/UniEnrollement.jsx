// EnrollmentPipelinePage.jsx
import React from "react";
import { FaPlaneDeparture } from "react-icons/fa";

export function EnrollmentPipelinePage() {
  return (
    <div className="h-full flex flex-col fade-in">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Enrollment Pipeline</h2>
          <p className="text-xs text-slate-500">Track students from acceptance to campus arrival.</p>
        </div>
      </div>

      {/* Status Indicators */}
      <div className="flex gap-3 text-xs font-bold text-slate-500 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
        <span className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          On Track
        </span>
        <span className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          At Risk
        </span>
        <span className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
          Pending Action
        </span>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden pb-4">
        <div className="flex gap-6 h-full min-w-[1200px]">
          
          {/* Offer Accepted Column */}
          <div className="w-80 flex flex-col h-full">
            <div className="bg-blue-50 p-4 rounded-t-2xl border-b-2 border-blue-200 font-bold text-blue-800 text-xs uppercase flex justify-between items-center">
              <span>Offer Accepted</span>
              <span className="bg-white/60 px-2 py-0.5 rounded text-[10px]">5</span>
            </div>
            <div className="flex-1 bg-slate-100 rounded-b-2xl p-3 space-y-3 overflow-y-auto kanban-col border-x border-b border-slate-200">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 cursor-move hover:shadow-md transition group">
                <div className="flex justify-between mb-2">
                  <span className="text-[10px] font-bold text-slate-400">882914</span>
                  <span className="w-2 h-2 rounded-full bg-green-500" title="On Track"></span>
                </div>
                <div className="font-bold text-slate-800 text-sm">David Chen</div>
                <div className="text-xs text-slate-500">BSc Comp Sci</div>
                <div className="mt-3 flex justify-between items-center border-t border-slate-50 pt-2">
                  <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-bold">Deposit Paid</span>
                  <button className="text-slate-300 hover:text-indigo-600">
                    <i className="fas fa-ellipsis-h"></i> {/* Replace with FaEllipsisV */}
                  </button>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 cursor-move hover:shadow-md transition group">
                <div className="flex justify-between mb-2">
                  <span className="text-[10px] font-bold text-slate-400">882919</span>
                  <span className="w-2 h-2 rounded-full bg-red-500" title="Deposit Late"></span>
                </div>
                <div className="font-bold text-slate-800 text-sm">Priya Patel</div>
                <div className="text-xs text-slate-500">MSc Data Science</div>
                <div className="mt-3 flex justify-between items-center border-t border-slate-50 pt-2">
                  <span className="text-[10px] bg-red-50 text-red-600 px-2 py-0.5 rounded font-bold">Deposit Due</span>
                  <button className="text-slate-300 hover:text-indigo-600">
                    <i className="fas fa-ellipsis-h"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Visa Letter Issued Column */}
          <div className="w-80 flex flex-col h-full">
            <div className="bg-purple-50 p-4 rounded-t-2xl border-b-2 border-purple-200 font-bold text-purple-800 text-xs uppercase flex justify-between items-center">
              <span>Visa Letter Issued</span>
              <span className="bg-white/60 px-2 py-0.5 rounded text-[10px]">2</span>
            </div>
            <div className="flex-1 bg-slate-100 rounded-b-2xl p-3 space-y-3 overflow-y-auto kanban-col border-x border-b border-slate-200">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 cursor-move hover:shadow-md transition group">
                <div className="flex justify-between mb-2">
                  <span className="text-[10px] font-bold text-slate-400">882913</span>
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                </div>
                <div className="font-bold text-slate-800 text-sm">Sarah Smith</div>
                <div className="text-xs text-slate-500">MD Medicine</div>
                <div className="mt-3 flex justify-between items-center border-t border-slate-50 pt-2">
                  <span className="text-[10px] bg-purple-50 text-purple-600 px-2 py-0.5 rounded font-bold">CAS Sent</span>
                  <button className="text-slate-300 hover:text-indigo-600">
                    <i className="fas fa-ellipsis-h"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Visa Approved Column */}
          <div className="w-80 flex flex-col h-full">
            <div className="bg-green-50 p-4 rounded-t-2xl border-b-2 border-green-200 font-bold text-green-800 text-xs uppercase flex justify-between items-center">
              <span>Visa Approved</span>
              <span className="bg-white/60 px-2 py-0.5 rounded text-[10px]">4</span>
            </div>
            <div className="flex-1 bg-slate-100 rounded-b-2xl p-3 space-y-3 overflow-y-auto kanban-col border-x border-b border-slate-200">
              {/* Add more cards as needed */}
            </div>
          </div>

          {/* Enrolled Column */}
          <div className="w-80 flex flex-col h-full">
            <div className="bg-slate-200 p-4 rounded-t-2xl border-b-2 border-slate-300 font-bold text-slate-700 text-xs uppercase flex justify-between items-center">
              <span>Enrolled</span>
              <span className="bg-white/60 px-2 py-0.5 rounded text-[10px]">10</span>
            </div>
            <div className="flex-1 bg-slate-100 rounded-b-2xl p-3 space-y-3 overflow-y-auto kanban-col border-x border-b border-slate-200">
              {/* Add more cards as needed */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
