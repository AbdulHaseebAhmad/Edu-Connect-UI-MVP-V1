import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../Components/UniversityPortal/Sidebar";
import Navbar from "../Components/UniversityPortal/Navbar";
import { useSelector } from "react-redux";

export default function UniversityRoot() {
   let role = useSelector((state) => state.authReducer.role);
  const location = useLocation();
  if (role !== "university") {
    return <Navigate to={`/${role ? role : "university/login"}`} replace state={{ from: location }} />;
   
  }
  return (
    <div className="h-screen w-screen flex overflow-hidden bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden bg-white">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-8 bg-[#f8fafc]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}