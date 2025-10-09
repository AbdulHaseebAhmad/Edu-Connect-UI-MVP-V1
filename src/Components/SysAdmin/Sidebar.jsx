import { NavLink } from "react-router-dom";
import { SideBarLinks } from "./Constants";
const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-900 text-white flex-shrink-0">
      <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-700">
        <i className="fa fa-graduation-cap text-blue-500 text-2xl" />
        <span className="text-xl font-bold">EduAI</span>
      </div>

      <nav className="mt-6 flex flex-col gap-2">
        {SideBarLinks.map((eachLink, index) => (
          <div key={index}>
            <NavLink
              to={`/sysadmin/${eachLink.link}`}
              className={({ isActive }) =>
                `flex items-center gap-4 px-5 h-[50px] rounded-lg cursor-pointer hover:bg-blue-600 hover:bg-opacity-20 transition-colors
           ${
             isActive
               ? "bg-blue-600 bg-opacity-20 border-l-4 border-blue-500"
               : ""
           }`
              }
            >
              {eachLink.name}
            </NavLink>
            {eachLink?.subLinks?.length > 0 && (
              <div className="mt-2 ml-5 flex flex-col gap-2 border-l-2 border-blue-100 pl-3">
                {eachLink.subLinks.map((eachSubLink, idx) => (
                  <NavLink
                    key={idx}
                    to={`${eachSubLink.link}`}
                    className={({ isActive }) =>
                      `flex items-center gap-4 px-5 h-[50px] rounded-lg cursor-pointer hover:bg-blue-600 hover:bg-opacity-20 transition-colors
           ${
             isActive
               ? "bg-blue-600 bg-opacity-20 border-l-4 border-blue-500"
               : ""
           }`
                    }
                  >
                    {eachSubLink.name}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}

        <div className="border-t border-gray-200 my-4" />
      </nav>
    </aside>
  );
};

export default Sidebar;
