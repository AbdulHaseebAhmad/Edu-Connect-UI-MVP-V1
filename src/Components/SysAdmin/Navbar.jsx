import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { logoutAdmin } from "../../Features/Auth_Features/AuthSlice";
import Cookies from "js-cookie";

export default function Navbar() {
  const dispatch = useDispatch();
  const onLogoutHandle = () => {
    Cookies.remove("csrf_token");
    Cookies.remove("session_token");
    dispatch(logoutAdmin());
    return <Navigate to="/login" replace state={{ from: location }} />;
  };

  const userName = useSelector((state) => state.authReducer.name);

  return (
    <div className="flex flex-col ">
      <header className="flex justify-between items-center bg-white px-6 py-4 shadow">
        <div className="relative w-full max-w-md">
          <i className="fa fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search across platforms..."
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-6">
          <div className="relative cursor-pointer">
            <i className="fa fa-bell text-lg text-gray-700" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              3
            </span>
          </div>
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white flex items-center justify-center font-semibold">
              SP
            </div>
            <span className="font-medium">{userName}</span>
          </div>
          <button
            onClick={onLogoutHandle}
            className="px-6 py-3 rounded-md bg-gray-900 hover:bg-red-700 text-sm text-[white]"
          >
            Logout
          </button>
        </div>
      </header>
    </div>
  );
}

{
  /**
  <h1 className="text-lg font-semibold tracking-wide text-[#404040]">
        SysAdmin Portal
      </h1>
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 rounded-full bg-[#545454] flex items-center justify-center overflow-hidden">
          <span className="text-sm">A</span>
        </div>
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="px-3 py-2 rounded-md bg-[#545454] hover:bg-[#606060] text-sm"
          >
            Menu
          </button>
          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-[#545454] rounded-md shadow-lg overflow-hidden z-20">
              <Link
                to="/sysadmin/settings"
                className="block px-4 py-2 text-sm hover:bg-[#606060]"
                onClick={() => setOpen(false)}
              >
                Settings
              </Link>
              <Link
                to="/sysadmin/users"
                className="block px-4 py-2 text-sm hover:bg-[#606060]"
                onClick={() => setOpen(false)}
              >
                Users
              </Link>
            </div>
          )}
        </div>

        <button
          onClick={onLogoutHandle}
          className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-sm"
        >
          Logout
        </button>
      </div> */
}
