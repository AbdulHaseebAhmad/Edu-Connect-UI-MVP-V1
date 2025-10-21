import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Navbar from "../Components/SysAdmin/Navbar";
import Sidebar from "../Components/SysAdmin/Sidebar";

export default function StudentRoot() {
  let role = useSelector((state) => state.authReducer.role);
  const location = useLocation();
  if (role !== "student") {
    return <Navigate to={`/${role}`} replace state={{ from: location }} />;
  }

  return (
    <div className="flex flex-col h-screen p-2 ">
      <Navbar />
      <div className="flex flex-1 bg-[#F2F2F2]">
        <Sidebar />
        <main className="flex-1 bg-gray-100 p-6 bg-[#F2F2F2]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
