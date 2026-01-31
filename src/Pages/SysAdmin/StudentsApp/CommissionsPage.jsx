import React from "react";

export function CommissionsPage() {
  return (
    <div className="space-y-6 mb-4 py-8 px-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Partner Commissions (B2B)</h1>
          <p className="text-xs text-slate-500">Track revenue from University placements.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-right">
            <div className="text-[10px] font-bold text-slate-400 uppercase">Pending</div>
            <div className="text-xl font-bold text-orange-500">$0.00</div>
          </div>
          <div className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-right">
            <div className="text-[10px] font-bold text-slate-400 uppercase">Received</div>
            <div className="text-xl font-bold text-green-600">$0.00</div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-xs font-bold text-slate-500 uppercase">
            <tr>
              <th className="px-6 py-4">University</th>
              <th className="px-6 py-4">Student</th>
              <th className="px-6 py-4">Program</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {/* Example static row */}
            <tr className="hover:bg-slate-50 transition cursor-pointer">
              <td className="px-6 py-4 font-bold text-slate-900">Universiti Malaya</td>
              <td className="px-6 py-4">
                <div className="font-bold text-slate-700">Alex Student</div>
                <div className="text-xs text-slate-500">UG-882910</div>
              </td>
              <td className="px-6 py-4 text-slate-500">Data Science</td>
              <td className="px-6 py-4">
                <span className="font-bold text-green-600">$500.00</span>
              </td>
              <td className="px-6 py-4">
                <span className="text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider bg-orange-100 text-orange-700">
                  Pending
                </span>
              </td>
              <td className="px-6 py-4">
                <button className="text-blue-600 hover:text-blue-800 text-xs font-bold hover:underline">
                  Mark Paid
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
