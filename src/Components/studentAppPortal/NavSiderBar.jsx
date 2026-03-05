import {
  FaGraduationCap,
  FaThLarge,
  FaRobot,
  FaSearch,
  FaGift,
  FaPaperPlane,
  FaPassport,
  FaIdCard,
  FaFolderOpen,
  FaCommentDots,
  FaSignOutAlt,
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAdmin } from "../../Features/Auth_Features/AuthSlice";
import logo from "../../assets/pgl.png";
export default function NavSiderBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const username = useSelector((state) => state.authReducer.name);
  const handleLogout = async () => {
    dispatch(logoutAdmin());
    navigate("/student/login", { replace: true });
  };

  return (
    <aside className="w-64 bg-[#0f172a] flex flex-col z-30 flex-shrink-0 shadow-2xl relative h-full">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-900/20 to-transparent pointer-events-none" />

      <div className="h-16 flex items-center px-6 cursor-pointer relative z-10 flex-shrink-0">
        <div className="bg-white py-2 w-[150px] text-white w-8 h-8 rounded-xl flex items-center justify-center mr-3 shadow-lg shadow-blue-900/50">
          <img src={logo} />
        </div>
      </div>

      <div className="p-3 space-y-1 flex-1 overflow-y-auto relative z-10">
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 px-4 mt-4">
          Main Menu
        </div>

        <NavLink
          to="/student/dashboard"
          className="nav-item flex items-center px-4 py-3 font-medium rounded-xl mb-1"
        >
          <FaThLarge className="w-4 h-4 mr-3" />
          <span className="font-medium">Dashboard</span>
        </NavLink>

        <NavLink
          to="/student/uni-gpt"
          className="nav-item flex items-center px-4 py-3 font-medium rounded-xl mb-1 group border border-white/5 bg-white/5"
        >
          <FaRobot className="w-4 h-4 mr-3 transition" />
          <span className="nav-item bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 font-bold group-hover:text-white transition whitespace-nowrap">
            UniGPT 3.0
          </span>
          <span className="ml-auto text-[9px] bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded border border-purple-500/30 font-bold">
            NEW
          </span>
        </NavLink>

        <NavLink
          to="/student/apply-to-university/destinations"
          className="nav-item flex items-center px-4 py-3 font-medium rounded-xl mb-1"
        >
          <FaSearch className="w-4 h-4 mr-3 transition" />
          <span className="">Find Programs</span>
        </NavLink>

        <NavLink
          to="/student/scholarships"
          className="nav-item flex items-center px-4 py-3 font-medium rounded-xl mb-1 group hover:text-purple-400"
        >
          <FaGift className="w-4 h-4 mr-3 transition" />
          <span className="">Scholarships</span>
        </NavLink>

        <NavLink
          to="/student/applications"
          className="nav-item flex items-center px-4 py-3 font-medium rounded-xl mb-1"
        >
          <FaPaperPlane className="w-4 h-4 mr-3 transition" />
          <span className="">Applications</span>
          <span className="ml-auto bg-blue-600/20 text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded-full hidden">
            0
          </span>
        </NavLink>

        <NavLink
          to="/student/visa&offer"
          className="nav-item flex items-center px-4 py-3 font-medium rounded-xl mb-1"
        >
          <FaPassport className="w-4 h-4 mr-3 transition" />
          <span className="">Visa & Offers</span>
        </NavLink>

        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 px-4 mt-6">
          My Records
        </div>

        <NavLink
          to="/student/verified-profile"
          className="nav-item flex items-center px-4 py-3 font-medium rounded-xl mb-1"
        >
          <FaIdCard className="w-4 h-4 mr-3 transition" />
          <span className="">Verified Profile</span>
        </NavLink>

        <NavLink
          to="/student/documents"
          className="nav-item flex items-center px-4 py-3 font-medium rounded-xl mb-1"
        >
          <FaFolderOpen className="w-4 h-4 mr-3 transition" />
          <span className="">Documents</span>
        </NavLink>

        <NavLink className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 px-4 mt-6">
          Help
        </NavLink>

        <NavLink
          to="student/messages"
          className="nav-item flex items-center px-4 py-3 font-medium rounded-xl mb-1"
        >
          <FaCommentDots className="w-4 h-4 mr-3 transition" />
          <span className="">Messages</span>
          {/* {<span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">
            
          </span>} */}
        </NavLink>
      </div>

      {/* Sign out */}
      <div className="px-3 pb-3 relative z-10 flex-shrink-0">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 text-red-400 font-medium rounded-xl hover:bg-white/5 cursor-pointer transition"
        >
          <FaSignOutAlt className="w-4 h-4 mr-1" />
          <span className="text-red-400">Sign Out</span>
        </button>
      </div>

      {/* User footer */}
      {/* <div className="p-4 bg-[#1e293b] border-t border-white/5 relative z-10 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src="https://i.pravatar.cc/150?img=11"
              className="w-9 h-9 rounded-full border-2 border-[#0f172a]"
              alt="User"
            />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#1e293b]" />
          </div>
          <div>
            <div className="text-sm font-bold text-white">{username}</div>
            <div className="text-[10px] text-slate-400">UG-Standard Plan</div>
          </div>
        </div>
      </div> */}
    </aside>
  );
}
