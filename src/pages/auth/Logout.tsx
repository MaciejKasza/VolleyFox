import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth/AuthContext";
import { PATHS } from "../../router/paths";

export default function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate(PATHS.login, { replace: true });
  }, [logout, navigate]);

  return null;
}
