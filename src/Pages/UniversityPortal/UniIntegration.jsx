// IntegrationsPage.jsx - Exact match to your HTML
import React, { useState } from "react";
import { 
  FaKey, FaSatelliteDish, FaCopy, FaEye, FaExclamationTriangle, 
  FaSalesforce, FaHubspot 
} from "react-icons/fa";

export function IntegrationsPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-8 fade-in">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-900 to-indigo-900 text-white rounded-3xl p-10 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-indigo-500/30 border border-indigo-400/30 text-indigo-200 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
              Developer Hub
            </span>
          </div>
          <h2 className="text-3xl font-bold mb-3">API Integrations</h2>
          <p className="text-indigo-200 text-sm max-w-2xl leading-relaxed">
            Seamlessly connect UniGlobal OS with your existing Student Information Systems (SIS), CRMs, and Marketing tools. 
            We support bi-directional sync with major enterprise platforms.
          </p>
          <div className="mt-8 flex gap-4">
            <button className="px-6 py-3 bg-white text-indigo-900 font-bold rounded-xl shadow-lg hover:bg-indigo-50 transition">
              View Documentation
            </button>
            <button className="px-6 py-3 bg-white/10 text-white font-bold rounded-xl border border-white/20 hover:bg-white/20 transition">
              Regenerate Sandbox
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* API Credentials */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
          <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2 text-lg">
            <FaKey className="text-yellow-500" />
            API Credentials
          </h3>
          
          <div className="space-y-6 flex-1">
            {/* Public Key */}
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">
                Public Key (Client-side)
              </label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value="pklive_51Mxq..." 
                  disabled 
                  className="flex-1 bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs font-mono text-slate-600 font-bold"
                />
                <button className="p-3 text-slate-400 hover:text-indigo-600 bg-slate-50 border border-slate-200 rounded-xl transition">
                  <FaCopy />
                </button>
              </div>
            </div>

            {/* Secret Key */}
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">
                Secret Key (Server-side)
              </label>
              <div className="flex gap-2">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value="sklive_dT34s..." 
                  disabled 
                  className="flex-1 bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs font-mono text-slate-600 font-bold"
                />
                <button 
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-3 text-slate-400 hover:text-indigo-600 bg-slate-50 border border-slate-200 rounded-xl transition"
                >
                  <FaEye />
                </button>
              </div>
              <p className="text-[10px] text-red-400 mt-2 font-medium flex items-center gap-1">
                <FaExclamationTriangle className="text-xs" />
                Never share your secret key in client-side code.
              </p>
            </div>

            <button className="mt-6 w-full py-3 border border-slate-200 rounded-xl text-xs font-bold hover:bg-slate-50 text-slate-600 transition">
              Roll API Keys
            </button>
          </div>
        </div>

        {/* Webhooks */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
              <FaSatelliteDish className="text-blue-500" />
              Webhooks
            </h3>
            <button className="text-xs bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg font-bold hover:bg-blue-100 transition">
              Add Endpoint
            </button>
          </div>
          
          <div className="space-y-4 flex-1">
            {/* Active Webhook */}
            <div className="p-4 border border-slate-200 rounded-xl flex justify-between items-center hover:border-blue-300 transition cursor-pointer group bg-slate-50/50">
              <div>
                <div className="text-xs font-bold text-slate-800 group-hover:text-blue-600">
                  https://api.university.edu/hooks/admissions
                </div>
                <div className="text-[10px] text-slate-400 mt-1">
                  Events: <span className="bg-slate-200 px-1.5 py-0.5 rounded text-slate-600 font-mono">application.created</span>
                  <span className="bg-slate-200 px-1.5 py-0.5 rounded text-slate-600 font-mono ml-1">doc.uploaded</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">
                  Active
                </span>
                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
              </div>
            </div>

            {/* Inactive Webhook */}
            <div className="p-4 border border-slate-200 rounded-xl flex justify-between items-center hover:border-blue-300 transition cursor-pointer opacity-60">
              <div>
                <div className="text-xs font-bold text-slate-800">
                  https://crm.university.edu/sync
                </div>
                <div className="text-[10px] text-slate-400 mt-1">
                  Events: <span className="bg-slate-200 px-1.5 py-0.5 rounded text-slate-600 font-mono">offer.accepted</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-slate-300"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CRM Integrations */}
      <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
        {/* Salesforce */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition">
          <div className="absolute top-0 right-0 p-4">
            <div className="relative inline-block w-10 align-middle select-none">
              <input 
                type="checkbox" 
                checked 
                className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-slate-300 left-0 transition-all duration-300" 
              />
              <label className="toggle-label block overflow-hidden h-5 rounded-full bg-slate-300 cursor-pointer"></label>
            </div>
          </div>
          <div>
            <FaSalesforce className="text-5xl text-blue-500 mb-4" />
            <h4 className="font-bold text-slate-900 text-lg">Salesforce CRM</h4>
            <p className="text-xs text-slate-500 mt-2 mb-6 h-8 leading-relaxed">
              Bi-directional sync of Student Leads, Contacts, and Opportunities.
            </p>
            <button className="w-full py-2.5 bg-slate-50 text-slate-600 font-bold rounded-lg text-xs hover:bg-slate-100 border border-slate-200 transition">
              Configure Mapping
            </button>
          </div>
        </div>

        {/* Hubspot */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group opacity-75">
          <div className="absolute top-0 right-0 p-4">
            <div className="relative inline-block w-10 align-middle select-none">
              <input 
                type="checkbox" 
                className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-slate-300 left-0 transition-all duration-300" 
              />
              <label className="toggle-label block overflow-hidden h-5 rounded-full bg-slate-300 cursor-pointer"></label>
            </div>
          </div>
          <div>
            <FaHubspot className="text-5xl text-orange-500 mb-4" />
            <h4 className="font-bold text-slate-900 text-lg">Hubspot</h4>
            <p className="text-xs text-slate-500 mt-2 mb-6 h-8 leading-relaxed">
              Sync marketing contacts and email engagement metrics.
            </p>
            <button className="w-full py-2.5 bg-slate-50 text-slate-600 font-bold rounded-lg text-xs hover:bg-slate-100 border border-slate-200 transition">
              Configure Mapping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
