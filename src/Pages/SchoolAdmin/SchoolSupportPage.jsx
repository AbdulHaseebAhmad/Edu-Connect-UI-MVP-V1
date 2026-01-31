import React from "react";

export function SchoolSupportPage() {
  return (
    <div className="fade-in space-y-6">
      <h2 className="text-xl font-bold text-slate-800">Support Hub</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4">Open New Ticket</h3>
          <form className="space-y-4">
            <div>
              <label className="hs-label">Subject</label>
              <input
                type="text"
                placeholder="e.g. Issue with payout"
                className="hs-input"
              />
            </div>
            <div>
              <label className="hs-label">Category</label>
              <select className="hs-input">
                <option>Account &amp; Billing</option>
                <option>Student Verification</option>
                <option>Technical Bug</option>
              </select>
            </div>
            <div>
              <label className="hs-label">Message</label>
              <textarea rows={4} className="hs-input" />
            </div>
            <button
              type="button"
              className="w-full py-3 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-900"
            >
              Submit Ticket
            </button>
          </form>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col">
          <h3 className="font-bold text-slate-800 mb-4">Ticket History</h3>
          <div className="space-y-3 flex-1 overflow-y-auto">
            {/* Ticket items will go here */}
          </div>
        </div>
      </div>
    </div>
  );
}
