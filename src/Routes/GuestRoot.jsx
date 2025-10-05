import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router";

export default function GuestRoot() {
  const isAuthenticated = useSelector(
    (state) => state.authReducer.authenticated
  );

  let role = useSelector((state)=> state.authReducer.role)


  const location = useLocation();

  if (isAuthenticated) {
    if (role == 'admin'){
        return <Navigate to="/sysadmin/dashboard" replace state={{ from: location }} />;
    } else if (role = 'student') {
        return <Navigate to="/login" replace state={{ from: location }} />;
    } else if(role == "school-admin"){
        return <Navigate to="/login" replace state={{ from: location }} />;
    }
  }

  return <Outlet />;
}
