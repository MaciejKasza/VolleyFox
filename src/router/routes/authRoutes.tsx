import { Navigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import Login from "../../pages/auth/Login";
import Register from "../../pages/auth/Register";
import { PATHS } from "../paths";

export const authRoutes = {
  path: PATHS.auth,
  element: <AuthLayout />,
  children: [
    { index: true, element: <Navigate to={PATHS.login} replace /> },
    { path: "login", element: <Login /> },
    { path: "register", element: <Register /> },
  ],
};
