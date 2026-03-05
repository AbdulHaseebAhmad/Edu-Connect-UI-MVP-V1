import { FaBell, FaSearch } from "react-icons/fa";

export default function Navbar() {
  return (
    <header className="h-20 bg-white border-b border-slate-200 flex justify-between items-center px-8 sticky top-0 z-20">
      <div>
        <h1 className="text-xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-xs text-slate-500">
          Academic Cycle: <span className="font-bold text-indigo-600">Fall 2026</span> •
          <span className="text-green-600 font-bold ml-1">Operational</span>
        </p>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative">
          <FaSearch className="absolute left-4 top-3 text-slate-400 text-xs" />
          <input
            placeholder="Global Search..."
            className="pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold w-64 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
        <div className="h-8 w-px bg-slate-200" />
        {/* <button className="relative text-slate-400 hover:text-indigo-600">
          <FaBell className="text-xl" />
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
        </button> */}
      </div>
    </header>
  );
}