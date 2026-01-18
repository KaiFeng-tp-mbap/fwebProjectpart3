import { Navigate, Outlet } from "react-router";
import { useAuthContext } from "../context/AuthContext";

function ProtectedRoute({ allowedRoles, redirectTo = "/login" }) {
  const { isLoggedIn, user} = useAuthContext();

  if (!isLoggedIn) {
    return <Navigate to={redirectTo} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
