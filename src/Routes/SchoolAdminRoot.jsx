import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Sidebar from "../Components/SchoolAdmin/Sidebar.jsx";
import Navbar from "../Components/SchoolAdmin/Navbar.jsx";
// import StudentPanel from "../Components/SchoolAdmin/StudentPanel";

function SchoolAdminRoot() {
  const role = useSelector((state) => state.authReducer.role);
  const location = useLocation();

  if (role !== "schooladmin") {
    return <Navigate to={`/${role}`} replace state={{ from: location }} />;
  }

  return (
    <div className="h-screen w-screen relative bg-[#f8fafc]">
      {/* Main app container (matches #app-container) */}
      <div className="h-full flex overflow-hidden">
        {/* Left sidebar */}
        <Sidebar />

        {/* Main column */}
        <main className="flex-1 flex flex-col h-full relative overflow-hidden bg-[#f8fafc]">
          {/* Top navbar */}
          <Navbar />

          {/* Scrollable content area */}
          <div className="flex-1 overflow-y-auto p-8">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Right sliding student panel (matches #student-panel) */}
      {/* <StudentPanel /> */}
    </div>
  );
}

export default SchoolAdminRoot;
