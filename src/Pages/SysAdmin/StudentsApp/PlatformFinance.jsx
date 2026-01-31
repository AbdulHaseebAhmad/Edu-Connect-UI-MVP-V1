import React from "react";

export function PlatformFinancePage() {
  return (
    <div className="space-y-6 mb-4 py-8 px-6">
      <h1 className="text-2xl font-bold text-slate-900">Platform Finance (B2C)</h1>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-xs font-bold text-slate-500 uppercase">
            <tr>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Student</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {/* Example static rows */}
            <tr className="hover:bg-slate-50 transition">
              <td className="px-6 py-4 text-slate-500">Dec 26, 2025</td>
              <td className="px-6 py-4 font-bold text-slate-900">Alex Student</td>
              <td className="px-6 py-4 text-slate-600">Application Fee</td>
              <td className="px-6 py-4 font-bold text-green-600">+$75.00</td>
              <td className="px-6 py-4">
                <span className="text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider bg-green-100 text-green-700">
                  Completed
                </span>
              </td>
            </tr>
            <tr className="hover:bg-slate-50 transition">
              <td className="px-6 py-4 text-slate-500">Dec 20, 2025</td>
              <td className="px-6 py-4 font-bold text-slate-900">Sarah Connor</td>
              <td className="px-6 py-4 text-slate-600">Premium Upgrade</td>
              <td className="px-6 py-4 font-bold text-green-600">+$50.00</td>
              <td className="px-6 py-4">
                <span className="text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider bg-green-100 text-green-700">
                  Completed
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
