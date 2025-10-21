import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Navbar from "../Components/SysAdmin/Navbar";
import Sidebar from "../Components/SysAdmin/Sidebar";

export default function SchoolAdminRoot() {
  let role = useSelector((state) => state.authReducer.role);
  const location = useLocation();
  if (role !== "schooladmin") {
    return <Navigate to={`/${role}`} replace state={{ from: location }} />;
  }

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      <main className="flex flex-col flex-1">
        <Navbar />
        <Outlet />
      </main>
    </div>
  );
}
