import { NavLink } from "react-router-dom";
import { SideBarLinks } from "./Constants";
const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-900 text-white flex-shrink-0">
      <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-700">
        <i className="fa fa-graduation-cap text-blue-500 text-2xl" />
        <span className="text-xl font-bold">EduAI</span>
      </div>

      <nav className="mt-6 flex flex-col gap-[10px]">
        {SideBarLinks.map((eachLink, index) => (
          <div key={index} className="">
            <NavLink
              to={`/sysadmin/${eachLink.link}`}
              className={({ isActive }) =>
                ` flex items-center gap-4 px-5 h-[50px] cursor-pointer hover:bg-blue-600 hover:bg-opacity-20  ${
                  isActive
                    ? "bg-blue-600 bg-opacity-20 border-l-4 border-blue-500"
                    : ""
                }`
              }
            >
              {eachLink.name}
            </NavLink>
          </div>
        ))}

        <div className="border-t border-gray-700 my-4" />
      </nav>
    </aside>
  );
};

export default Sidebar;

{
  /**
 * <aside className="flex-[0.25]  text-gray-200 flex flex-col justify-between">
      <div className="flex-1">
        <nav className="mt-6 flex flex-col space-y-2 px-4">
          {SideBarLinks.map((eachLink, index) => (
            <NavLink
              key={index}
              to={`/sysadmin/${eachLink.link}`}
              className={({ isActive }) =>
                `text-[#545454] flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                  isActive ? "bg-[#404040] text-[white]" : "hover:bg-[#545454] hover:text-[white] font-semibold"
                }`
              }
            >
              {eachLink.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside> */
}
