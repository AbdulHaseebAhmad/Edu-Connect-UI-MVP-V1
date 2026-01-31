// SettingsPage.jsx - Exact match to your HTML
import React from "react";
import { FaUserCircle } from "react-icons/fa";

export function SettingsPage() {
  return (
    <div className="space-y-6 fade-in">
      <h2 className="text-xl font-bold text-slate-800">System Settings</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Staff Management */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">
            Staff Management
          </h3>
          
          <div className="space-y-4">
            {/* John Doe */}
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">
                  JD
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-800">John Doe</div>
                  <div className="text-[10px] text-slate-500">Super Admin</div>
                </div>
              </div>
              <button className="text-xs text-slate-400 hover:text-indigo-600 font-bold">Edit</button>
            </div>

            {/* Alice Smith */}
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-xs">
                  AS
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-800">Alice Smith</div>
                  <div className="text-[10px] text-slate-500">Admissions Officer</div>
                </div>
              </div>
              <button className="text-xs text-slate-400 hover:text-indigo-600 font-bold">Edit</button>
            </div>

            {/* Invite Button */}
            <button className="w-full py-2 border border-dashed border-slate-300 text-slate-400 rounded-xl hover:border-indigo-500 hover:text-indigo-600 text-xs font-bold transition">
              Invite New User
            </button>
          </div>
        </div>

        {/* Security Access */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">
            Security Access
          </h3>
          
          <div className="space-y-4">
            {/* 2FA Toggle */}
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm font-bold text-slate-700">Two-Factor Authentication (2FA)</div>
                <div className="text-xs text-slate-500">Enforce 2FA for all staff accounts.</div>
              </div>
              <div className="relative inline-block w-10 align-middle select-none">
                <input 
                  type="checkbox" 
                  checked 
                  className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-slate-300 left-0 transition-all duration-300" 
                />
                <label className="toggle-label block overflow-hidden h-5 rounded-full bg-emerald-400 cursor-pointer"></label>
              </div>
            </div>

            {/* IP Whitelisting */}
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm font-bold text-slate-700">IP Whitelisting</div>
                <div className="text-xs text-slate-500">Restrict access to campus IPs.</div>
              </div>
              <div className="relative inline-block w-10 align-middle select-none">
                <input 
                  type="checkbox" 
                  className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-slate-300 left-0 transition-all duration-300" 
                />
                <label className="toggle-label block overflow-hidden h-5 rounded-full bg-slate-300 cursor-pointer"></label>
              </div>
            </div>

            {/* Audit Logs */}
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm font-bold text-slate-700">Audit Logs</div>
                <div className="text-xs text-slate-500">Log all data export activities.</div>
              </div>
              <div className="relative inline-block w-10 align-middle select-none">
                <input 
                  type="checkbox" 
                  checked 
                  className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-slate-300 left-0 transition-all duration-300" 
                />
                <label className="toggle-label block overflow-hidden h-5 rounded-full bg-emerald-400 cursor-pointer"></label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
