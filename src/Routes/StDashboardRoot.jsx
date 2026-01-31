import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import NavSiderBar from "../Components/studentAppPortal/NavSiderBar";
import RightSideBar from "../Components/studentAppPortal/RightSideBar";
import TopNavbar from "../Components/studentAppPortal/TopNavbar";

export function StDashboardRoot() {
  let role = useSelector((state) => state.authReducer.role);
  const location = useLocation();
  if (role !== "student") {
    return <Navigate to={`/${role}`} replace state={{ from: location }} />;
  }

  return (
    <div className="h-screen w-screen flex overflow-hidden text-sm bg-slate-50">
      <NavSiderBar />

      <main className="flex-1 flex flex-col relative overflow-hidden bg-slate-50 bg-dots h-full">
        <div className="ambient-blob" />
        <TopNavbar />
        <div
          className="flex-1 overflow-y-auto p-8 relative scroll-smooth z-10"
          id="main-scroll"
        >
          <Outlet />
        </div>
      </main>

      <RightSideBar />
    </div>
  );
}
