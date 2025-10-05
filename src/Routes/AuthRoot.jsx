import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router";

export default function AuthElement() {
  const isAuthenticated = useSelector(
    (state) => state.authReducer.authenticated
  );

  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
