import { useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaGraduationCap,
  FaPaperPlane,
  FaRobot,
  FaTasks,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { GetFreeApplicationCount } from "../../Features/Students_Features/StudentAppSlice";
import ConsultationModal from "../../Components/studentAppPortal/StudentConsultationModal";

export default function StdDashboardPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [free_app_count, setFreeAppCount] = useState(0);

  const school_verified = useSelector(
    (state) => state.authReducer.school_verified,
  );
  const student_id = useSelector((state) => state.authReducer.user_id);

  useEffect(() => {
    dispatch(GetFreeApplicationCount(student_id))
      .unwrap()
      .then((Res) => {
        if (Res) {
          setFreeAppCount(Res);
        }
      });
  }, []);

  return (
    <div className="space-y-8">
      {/* Scholarship banner */}
      {school_verified == "verified" ? <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-3xl p-6 text-white flex justify-between items-center shadow-xl shadow-indigo-200 relative overflow-hidden group">
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-white/20 transition duration-700" />
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-1">Scholarship Eligible 🎓</h2>
        </div>
        <button
          onClick={() => navigate("/student/scholarships")}
          className="relative z-10 bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold text-sm hover:bg-indigo-50 hover:scale-105 transition shadow-lg"
        >
          View Scholarships
        </button>
      </div>

       :
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl p-6 text-white flex justify-between items-center shadow-xl shadow-amber-200 relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-white/20 transition duration-700" />
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-1">Verification Pending ⏳</h2>
            <p className="font-bold text-sm text-white/80">
              Your profile is currently under review. Upon successful
              verification, you will gain access to apply.
            </p>
          </div>
        </div>
      }

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

        <div
          className={`p-6 rounded-2xl border shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg hover:-translate-y-1 transition duration-300 ${
            free_app_count < 3
              ? "bg-white border-slate-100"
              : "bg-red-50 border-red-100"
          }`}
        >
          <div className="flex justify-between items-start mb-4">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                free_app_count < 3
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              <FaGraduationCap className="w-5 h-5" />
            </div>

            <span
              className={`text-xs font-bold px-2 py-1 rounded ${
                free_app_count < 3
                  ? "text-emerald-600 bg-emerald-50"
                  : "text-red-600 bg-red-100"
              }`}
            >
              {free_app_count < 3 ? "Free" : "Limit Reached"}
            </span>
          </div>

          <div className="text-3xl font-bold text-slate-900 mb-1">
            {free_app_count}/3
          </div>

          <div
            className={`text-xs font-medium ${
              free_app_count < 3 ? "text-slate-500" : "text-red-500"
            }`}
          >
            {free_app_count < 3
              ? `${3 - free_app_count} Free Applications Remaining`
              : "No Free Applications Left"}
          </div>
        </div>

        {school_verified == "verified" && (
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg hover:-translate-y-1 transition duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
                <FaCheckCircle className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
                Verified
              </span>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">100%</div>
            <div className="text-xs text-slate-500 font-medium">
              Profile Verified
            </div>
          </div>
        )}

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

          <ConsultationModal/>
        </div>
      </div>
    </div>
  );
}
