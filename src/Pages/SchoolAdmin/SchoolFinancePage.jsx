import React from "react";

export function SchoolFinancePage() {
  return (
    <div className="fade-in space-y-8">
      <div className="bg-slate-900 text-white p-8 rounded-2xl relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -mr-16 -mt-16" />
        <div className="relative z-10 flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-bold">$5,500.00</h2>
            <p className="text-slate-400 text-sm mt-1">Available for Payout</p>
          </div>
          <button className="bg-white text-slate-900 px-6 py-2 rounded-lg font-bold text-sm hover:bg-slate-100 shadow-md">
            Request Payout
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
          <h3 className="font-bold text-slate-700 text-sm">Transaction Ledger</h3>
          <button className="text-xs text-indigo-600 font-bold">
            Export CSV
          </button>
        </div>
        <table className="w-full text-left">
          <thead className="bg-white border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase">
            <tr>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Transaction ID</th>
              <th className="px-6 py-3">Student / Detail</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
            {/* Transactions go here */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
