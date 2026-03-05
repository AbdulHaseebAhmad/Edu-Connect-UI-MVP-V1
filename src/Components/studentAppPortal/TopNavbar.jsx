import React from "react";
import { FaBell } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function TopNavbar() {

  const user_name = useSelector((state)=> state.profileReducer.first_name)
  return (
    <header className="h-16 bg-white/70 backdrop-blur-md border-b border-slate-200/60 flex items-center justify-between px-8 z-20 flex-shrink-0 sticky top-0">
      <div>
        <h1 className="text-lg font-bold text-slate-800">
          Welcome Home, {user_name} 👋
        </h1>
        <p className="text-[11px] text-slate-500">
          Admissions for Fall 2026 are{" "}
          <span className="text-green-600 font-bold bg-green-50 px-1.5 py-0.5 rounded-md">
            OPEN
          </span>
        </p>
      </div>
      <div className="flex items-center gap-6 relative">
        {/* <button className="relative text-slate-400 hover:text-blue-600 transition">
          <FaBell className="w-6 h-6 text-xl" />
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
        </button> */}

        <div className="h-8 w-px bg-slate-200 hidden md:block" />

        <div className="text-right hidden md:block">
          <div className="text-[10px] font-bold text-slate-400 uppercase">
            Credits
          </div>
          <div className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
            $0.00
          </div>
        </div>
      </div>
    </header>
  );
}
