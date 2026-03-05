import { NavLink, useNavigate } from "react-router-dom";
import {
  FaUniversity,
  FaChartPie,
  FaUsers,
  FaPlaneDeparture,
  FaBuilding,
  FaBookOpen,
  FaNetworkWired,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logoutAdmin } from "../../Features/Auth_Features/AuthSlice";
const linkBase =
  "flex items-center px-4 lg:px-6 py-3.5 text-sm font-medium transition border-r-4";
import logo from "../../assets/pgl.png";
export default function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(logoutAdmin());
    navigate("/university/login", { replace: true });
  };

  return (
    <aside className="w-20 lg:w-64 bg-white border-r border-slate-200 flex flex-col flex-shrink-0">
      {/* Header */}
      <div className="h-20 flex items-center justify-center lg:justify-start lg:px-6 border-b border-slate-100">
        {/* <div className="bg-indigo-600 text-white w-9 h-9 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
          <FaUniversity />
        </div> */}
        <span className="ml-3 font-extrabold text-xl text-slate-800 hidden lg:block">
          <div className="bg-white py-2 w-[150px] text-white w-8 h-8 rounded-xl flex items-center justify-center mr-3 shadow-lg shadow-blue-900/50">
            <img src={logo} />
          </div>{" "}
        </span>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-6 space-y-1">
        <div className="px-6 mb-2 text-[10px] font-bold uppercase text-slate-400 hidden lg:block">
          Admissions Core
        </div>

        <NavLink
          to="/university"
          className={({ isActive }) =>
            `${linkBase} ${
              isActive
                ? "bg-blue-50 text-indigo-600 border-indigo-600 font-semibold"
                : "text-slate-500 border-transparent hover:bg-slate-100"
            }`
          }
        >
          <FaChartPie className="w-5" />
          <span className="ml-3 hidden lg:block">Dashboard</span>
        </NavLink>

        <NavLink
          to="/university/applicants"
          className={({ isActive }) =>
            `${linkBase} ${
              isActive
                ? "bg-blue-50 text-indigo-600 border-indigo-600 font-semibold"
                : "text-slate-500 border-transparent hover:bg-slate-100"
            }`
          }
        >
          <FaUsers className="w-5" />
          <span className="ml-3 hidden lg:block">Applicants Manager</span>
        </NavLink>

        <NavLink
          to="/university/enrollment"
          className={({ isActive }) =>
            `${linkBase} ${
              isActive
                ? "bg-blue-50 text-indigo-600 border-indigo-600 font-semibold"
                : "text-slate-500 border-transparent hover:bg-slate-100"
            }`
          }
        >
          <FaPlaneDeparture className="w-5" />
          <span className="ml-3 hidden lg:block">Enrollment Pipeline</span>
        </NavLink>

        <div className="px-6 mt-8 mb-2 text-[10px] font-bold uppercase text-slate-400 hidden lg:block">
          Configuration
        </div>

        <NavLink
          to="/university/profile"
          className={({ isActive }) =>
            `${linkBase} ${
              isActive
                ? "bg-blue-50 text-indigo-600 border-indigo-600 font-semibold"
                : "text-slate-500 border-transparent hover:bg-slate-100"
            }`
          }
        >
          <FaBuilding className="w-5" />
          <span className="ml-3 hidden lg:block">University Profile</span>
        </NavLink>

        <NavLink
          to="/university/programs"
          className={({ isActive }) =>
            `${linkBase} ${
              isActive
                ? "bg-blue-50 text-indigo-600 border-indigo-600 font-semibold"
                : "text-slate-500 border-transparent hover:bg-slate-100"
            }`
          }
        >
          <FaBookOpen className="w-5" />
          <span className="ml-3 hidden lg:block">Manage Programs</span>
        </NavLink>

        <div className="px-6 mt-8 mb-2 text-[10px] font-bold uppercase text-slate-400 hidden lg:block">
          Enterprise
        </div>

        <NavLink
          to="/university/integrations"
          className={({ isActive }) =>
            `${linkBase} ${
              isActive
                ? "bg-blue-50 text-indigo-600 border-indigo-600 font-semibold"
                : "text-slate-500 border-transparent hover:bg-slate-100"
            }`
          }
        >
          <FaNetworkWired className="w-5" />
          <span className="ml-3 hidden lg:block">API & Integrations</span>
        </NavLink>

        <NavLink
          to="/university/settings"
          className={({ isActive }) =>
            `${linkBase} ${
              isActive
                ? "bg-blue-50 text-indigo-600 border-indigo-600 font-semibold"
                : "text-slate-500 border-transparent hover:bg-slate-100"
            }`
          }
        >
          <FaCog className="w-5" />
          <span className="ml-3 hidden lg:block">System Settings</span>
        </NavLink>
      </div>

      {/* Logout */}
      <div className="border-t border-slate-100 p-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center lg:justify-start gap-3 px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-xl transition"
        >
          <FaSignOutAlt />
          <span className="hidden lg:block">Logout</span>
        </button>
      </div>
    </aside>
  );
}
