import React from "react";
import "font-awesome/css/font-awesome.min.css";
import { FaBell, FaWallet } from "react-icons/fa";
import { useSelector } from "react-redux";

const Navbar = () => {

  const SchoolName = useSelector((state)=> state.authReducer.name)
  const SchoolId = useSelector((state)=> state.authReducer.user_id)

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex justify-between items-center px-8 z-20 sticky top-0">
      <div>
        <h1 className="text-xl font-bold text-slate-800">Overview</h1>
        <p className="text-xs text-slate-500 mt-0.5 capitalize">
          {SchoolName} Verified Partner <span className="font-bold">
            ID : {SchoolId}
            </span>
            
        </p>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100 text-emerald-700 shadow-sm cursor-pointer hover:bg-emerald-100 transition">
          <FaWallet className="text-xl" />
          <span className="text-xs font-bold">Balance: $5,500.00</span>
        </div>

        <div className="relative">
          <button className="relative text-slate-400 hover:text-indigo-600 transition">
            <FaBell className="text-xl" />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse" />
          </button>

          <div className="hidden absolute right-0 mt-4 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <span className="font-bold text-sm text-slate-800">
                Notifications
              </span>
              <button className="text-[10px] text-indigo-600 font-bold hover:underline">
                Clear
              </button>
            </div>
            <div className="max-h-64 overflow-y-auto p-2">
              {/* Notification items go here */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
