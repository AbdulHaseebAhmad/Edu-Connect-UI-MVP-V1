import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaSchool,
  FaThLarge,
  FaUserCheck,
  FaUsers,
  FaBuilding,
  FaCoins,
  FaLifeRing,
} from "react-icons/fa";
import Cookies from "js-cookie";
import {useSelector} from "react-redux";

const Sidebar = () => {
    const SchoolName = useSelector((state)=> state.authReducer.name)

  const navGroups = [
    {
      label: "Dashboard",
      items: [
        {
          path: "/schooladmin",
          icon: FaThLarge,
          label: "Overview",
          badge: null,
        },
      ],
    },
    {
      label: "Students",
      items: [
        {
          path: "/schooladmin/verify-student",
          icon: FaUserCheck,
          label: "Verification",
          badge: "",
        },
        {
          path: "/schooladmin/all-students",
          icon: FaUsers,
          label: "All Students",
          badge: null,
        },
       
      ],
    },
    {
      label: "Management",
      items: [
        {
          path: "/schooladmin/profile",
          icon: FaBuilding,
          label: "School Profile",
          badge: null,
        },
        {
          path: "/schooladmin/finance",
          icon: FaCoins,
          label: "Finance & Revenue",
          badge: null,
        },
      ],
    },
    {
      label: "System",
      items: [
        {
          path: "/schooladmin/support",
          icon: FaLifeRing,
          label: "Help & Support",
          badge: null,
        },
      ],
    },
  ];

  const getNavItemClasses = ({ isActive }) => {
    return `flex items-center text-[0.9rem] py-3 px-6 border-r-[3px] transition-all duration-200 ${
      isActive
        ? "border-indigo-600 bg-indigo-50 text-indigo-600 font-bold hover:bg-indigo-100"
        : "border-transparent hover:bg-slate-100 hover:text-slate-800 text-slate-500 cursor-pointer"
    }`;
  };

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col z-30 flex-shrink-0 transition-all duration-300">
      {/* Logo */}
      <div className="h-20 flex items-center px-6 border-b border-slate-100">
        <div className="bg-indigo-600 text-white w-9 h-9 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
          <FaSchool className="text-sm" />
        </div>
        <span className="ml-3 font-extrabold text-lg text-slate-800 tracking-tight">
          Portal<span className="text-indigo-600">.</span>
        </span>
      </div>

      {/* Nav groups */}
      <div className="flex-1 overflow-y-auto py-6 space-y-1 text-[0.9rem]">
        {navGroups.map((group, groupIndex) => (
          <React.Fragment key={groupIndex}>
            <div className="px-6 mb-2 text-[10px] font-bold uppercase text-slate-400 tracking-wider">
              {group.label}
            </div>
            {group.items.map((item, itemIndex) => (
              <NavLink
                key={itemIndex}
                to={item.path}
                className={getNavItemClasses}
              >
                <item.icon className="w-5 text-center" />
                <span className="ml-3">{item.label}</span>
                {item.badge && (
                  <span className="ml-auto bg-orange-100 text-orange-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </React.Fragment>
        ))}
      </div>

      {/* User card */}
      {/* Replace the User card section with this */}
      <div className="p-4 border-t border-slate-100 space-y-2">
        {/* User info */}
        <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100 cursor-pointer hover:bg-slate-100 transition">
          <img
            src={`https://ui-avatars.com/api/?name=${SchoolName}&background=4338ca&color=fff`}
            className="w-9 h-9 rounded-full shadow-sm"
            alt="User"
          />
          <div className="overflow-hidden">
            <div className="capitalize text-xs font-bold text-slate-900 truncate">
              {SchoolName}
            </div>
            <div className="text-[10px] text-slate-500 truncate">
              Administrator
            </div>
          </div>
        </div>

        {/* Logout button */}
        <button
          onClick={() => {
            Cookies.remove("csrf_token", { path: "/" }); 
            Cookies.remove("session_token"); 
            localStorage.clear();
            window.location.href = "/school/login";
          }}
          className="w-full flex items-center gap-2 text-[0.85rem] py-2.5 px-4 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg border border-slate-200 hover:border-red-200 transition-all duration-200 font-medium"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Log out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
