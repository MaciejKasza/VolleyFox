import AppLayout from "../../layouts/AppLayout";
import Callendar from "../../pages/app/Callendar";
import Dashboard from "../../pages/app/Dashboard";
import Activities from "../../pages/app/Activities";
import { PATHS } from "../paths";
import Profile from "../../pages/app/Profile";
import CreateClub from "../../pages/app/CreateClub";
import { ClubDashboard } from "../../pages/app/club/ClubDasboard";
import { ClubProvider } from "../../contexts/club/ClubContext";
import { Outlet } from "react-router-dom";
import { ClubPlayersPage } from "../../pages/app/club/ClubPlayersList";

export const appRoutes = {
  path: PATHS.app,
  element: <AppLayout />,
  children: [
    { index: true, element: <Dashboard /> },
    { path: PATHS.activities, element: <Activities /> },
    { path: PATHS.callendar, element: <Callendar /> },
    { path: PATHS.profile, element: <Profile /> },
    { path: PATHS.createClub, element: <CreateClub /> },
    {
      path: "clubs/:clubId",
      element: (
        <ClubProvider>
          <Outlet />
        </ClubProvider>
      ),

      children: [
        { index: true, element: <ClubDashboard /> },
        {
          path: "players",
          element: <ClubPlayersPage />,
        },
        { path: "statistics", element: <div>Statistics</div> },
        { path: "calendar", element: <div>Calendar</div> },
        { path: "settings", element: <div>Settings</div> },
        // tu w przyszłości mogą być podstrony klubu, np. ustawienia, zarządzanie członkami itp.
      ],
    },
    // { path: "clubs/:clubId/settings", element: <ClubSettings /> },
  ],
};
