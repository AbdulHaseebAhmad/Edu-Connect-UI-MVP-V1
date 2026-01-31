import { useEffect } from "react";
import {
  FaFileInvoice,
  FaHourglassHalf,
  FaPaperPlane,
  FaUserCheck,
  FaCircle,
} from "react-icons/fa";

export default function UniDashboard() {
  useEffect(() => {
    // chart init placeholder
  }, []);

  return (
    <div className="fade-in space-y-8">
      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Total Applications */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl">
              <FaFileInvoice />
            </div>
            <span className="text-[10px] font-bold text-green-700 bg-green-100 px-2 py-1 rounded-full">
              +12.5%
            </span>
          </div>
          <div className="text-3xl font-extrabold text-slate-900">1,240</div>
          <div className="text-xs text-slate-500 font-bold uppercase tracking-wide mt-1">
            Total Applications
          </div>
        </div>

        {/* Pending Review */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 border-l-4 border-l-orange-400 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center text-xl">
              <FaHourglassHalf />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900">45</div>
          <div className="text-xs text-slate-500 font-bold uppercase tracking-wide mt-1">
            Pending Review
          </div>
        </div>

        {/* Offers Released */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-xl">
              <FaPaperPlane />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900">320</div>
          <div className="text-xs text-slate-500 font-bold uppercase tracking-wide mt-1">
            Offers Released
          </div>
        </div>

        {/* Conversion Rate */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center text-xl">
              <FaUserCheck />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900">85%</div>
          <div className="text-xs text-slate-500 font-bold uppercase tracking-wide mt-1">
            Conversion Rate
          </div>
        </div>
      </div>

      {/* CHART + RECENT ACTIVITY */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-4">
            Applications Trend
          </h2>

          <div className="h-[280px] flex items-center justify-center text-slate-400 text-sm border border-dashed border-slate-300 rounded-xl">
            Chart.js Line Chart Placeholder
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-4">
            Recent Activity
          </h2>

          <ul className="space-y-5">
            {[
              "New application submitted",
              "Application reviewed",
              "Offer letter sent",
              "Student enrolled",
            ].map((item, idx) => (
              <li key={idx} className="flex gap-3 items-start">
                <FaCircle className="text-[8px] text-indigo-600 mt-2" />
                <div>
                  <p className="text-sm font-medium text-slate-700">{item}</p>
                  <p className="text-xs text-slate-400">Just now</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
