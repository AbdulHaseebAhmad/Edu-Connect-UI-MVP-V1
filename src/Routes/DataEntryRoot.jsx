import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Navbar from "../Components/SysAdmin/Navbar";
import DataEntrySideBar from "../Components/SysAdmin/DataEntrySideBar";

export default function DataEntryRoot() {
  let role = useSelector((state) => state.authReducer.role);
  const location = useLocation();
  if (role !== "dataentry") {
    return <Navigate to={`/${role?role:"login"}`} replace state={{ from: location }} />;
   
  }

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      <DataEntrySideBar />
      <main className="flex flex-col flex-1">
        <Navbar />
        <Outlet />
      </main>
    </div>
  );
}
