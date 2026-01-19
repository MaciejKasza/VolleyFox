import AppLayout from "../../layouts/AppLayout";
import Callendar from "../../pages/app/Callendar";
import Dashboard from "../../pages/app/Dashboard";
import Activities from "../../pages/app/Activities";
import { PATHS } from "../paths";
import Profile from "../../pages/app/Profile";

export const appRoutes = {
  path: PATHS.app,
  element: <AppLayout />,
  children: [
    { index: true, element: <Dashboard /> },
    { path: PATHS.activities, element: <Activities /> },
    { path: PATHS.callendar, element: <Callendar /> },
    { path: PATHS.profile, element: <Profile /> },
  ],
};
