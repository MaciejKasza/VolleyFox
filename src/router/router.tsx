import { createBrowserRouter, Navigate } from "react-router-dom";
import { PATHS } from "./paths";
import { authRoutes } from "./routes/authRoutes";
import { appRoutes } from "./routes/appRoutes";
import NotFound from "../pages/NotFound";
import RequireAuth from "./guards/RequireAuth";

export const router = createBrowserRouter([
  { path: PATHS.root, element: <Navigate to={PATHS.app} replace /> },

  { children: [authRoutes] },

  // Guard dla całej aplikacji
  {
    element: <RequireAuth />,
    children: [appRoutes],
  },

  { path: "*", element: <NotFound /> },
]);
