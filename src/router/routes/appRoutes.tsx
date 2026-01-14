import AppLayout from "../../layouts/AppLayout";
import Dashboard from "../../pages/app/Dashboard";
import Teams from "../../pages/app/Teams";
import { PATHS } from "../paths";

export const appRoutes = {
  path: PATHS.app,
  element: <AppLayout />,
  children: [
    { index: true, element: <Dashboard /> },
    { path: "teams", element: <Teams /> },
  ],
};
