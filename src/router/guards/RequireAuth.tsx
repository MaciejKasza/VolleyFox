import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/auth/AuthContext";
import { PATHS } from "../paths";

export default function RequireAuth() {
  const { isInitialized, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isInitialized) {
    return (
      <div className="min-h-[40vh] grid place-items-center text-muted">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={PATHS.login} replace state={{ from: location }} />;
  }

  return <Outlet />;
}
