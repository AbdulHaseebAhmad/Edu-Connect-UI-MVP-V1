import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function SysAdminRootElement() {

    const role = useSelector(state => state.authReducer.role);
    const location = useLocation()
    if (role !== "admin") {
        return <Navigate to="/login" replace state={{ from: location }}/>
    }

  return (
          <Outlet />

  );
}

