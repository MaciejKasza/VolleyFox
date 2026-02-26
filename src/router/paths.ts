export const PATHS = {
  root: "/",
  auth: "/auth",
  login: "/auth/login",
  register: "/auth/register",
  logout: "/auth/logout",
  app: "/app",
  callendar: "/app/callendar",
  activities: "/app/activities",
  profile: "/app/profile",
  createClub: "/app/createClub",
  clubDashboard: (id: string) => `/app/clubs/${id}`,
  clubSettings: (id: string) => `/app/clubs/${id}/settings`,
} as const;
