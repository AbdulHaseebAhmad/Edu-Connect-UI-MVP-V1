import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Navbar from "../Components/SysAdmin/Navbar";
import Sidebar from "../Components/SysAdmin/Sidebar";

export default function SysAdminRoot() {
  let role = useSelector((state) => state.authReducer.role);
  const location = useLocation();
  if (role !== "admin") {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      <Sidebar />
      <main className="flex flex-col flex-1">
        <Navbar />
        <Outlet />
      </main>
    </div>
  );
}
