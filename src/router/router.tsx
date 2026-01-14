import { createBrowserRouter, Navigate } from "react-router-dom";
import { PATHS } from "./paths";
import { authRoutes } from "./routes/authRoutes";
import { appRoutes } from "./routes/appRoutes";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
  { path: PATHS.root, element: <Navigate to={PATHS.app} replace /> },
  authRoutes,
  appRoutes,
  { path: "*", element: <NotFound /> },
]);
