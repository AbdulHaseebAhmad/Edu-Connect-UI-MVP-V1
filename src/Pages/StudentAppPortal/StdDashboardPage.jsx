import { FaCheckCircle, FaPaperPlane, FaRobot, FaTasks } from "react-icons/fa";
import { useNavigate } from "react-router";

export default function StdDashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {/* Scholarship banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-3xl p-6 text-white flex justify-between items-center shadow-xl shadow-indigo-200 relative overflow-hidden group">
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-white/20 transition duration-700" />
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-1">Scholarship Eligible 🎓</h2>
          {/* <p className="text-indigo-100 text-sm max-w-lg">
            Great news! You qualify for the &quot;Global Excellence&quot; grant
            based on your AAA grades.
          </p> */}
        </div>
        <button
          onClick={() => navigate("/student/scholarships")}
          className="relative z-10 bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold text-sm hover:bg-indigo-50 hover:scale-105 transition shadow-lg"
        >
          View Scholarships
        </button>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg hover:-translate-y-1 transition duration-300">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <FaPaperPlane className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-300 bg-slate-50 px-2 py-1 rounded">
              LIVE
            </span>
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-1">0</div>
          <div className="text-xs text-slate-500 font-medium">
            Active Applications
          </div>
        </div>

        {/* <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg hover:-translate-y-1 transition duration-300">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
              <FaTasks className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded">
              High
            </span>
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-1">2</div>
          <div className="text-xs text-slate-500 font-medium">
            Pending Tasks
          </div>
        </div> */}

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg hover:-translate-y-1 transition duration-300">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
              <FaCheckCircle className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-1">100%</div>
          <div className="text-xs text-slate-500 font-medium">
            Profile Verified
          </div>
        </div>

        <div className="bg-[#1e293b] p-6 rounded-2xl shadow-xl shadow-slate-300 text-white group relative overflow-hidden border border-slate-700 hover:bg-[#0f172a] transition duration-500">
          {/* Glow accent */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-indigo-600/10 opacity-0 group-hover:opacity-100 transition" />

          {/* Robot icon */}
          <div className="absolute -right-4 -bottom-4 text-8xl text-purple-500/10 group-hover:text-purple-500/20 transition rotate-12">
            <FaRobot className="w-20 h-20" />
          </div>

          {/* Content */}
          <h3 className="font-bold text-lg mb-1 relative z-10 flex items-center gap-2">
            UniGPT
            <span className="text-[9px] bg-purple-500 text-white px-1.5 py-0.5 rounded">
              3.0
            </span>
          </h3>

          <p className="text-slate-400 text-xs mb-4 relative z-10 group-hover:text-blue-100">
            Precision Matching Engine
          </p>

          <span className="text-xs font-bold bg-white/10 px-3 py-1.5 rounded-lg relative z-10 inline-block opacity-50">
            Start Assessment →
          </span>

          {/* Coming Soon glass overlay */}
          <div className="absolute inset-0 backdrop-blur-[2px] bg-black/40 flex items-center justify-center z-20">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-5 py-2 rounded-xl text-sm font-bold shadow-xl tracking-wide">
              🚀 Coming Soon
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
