import { Link, NavLink, Outlet } from "react-router-dom";

const navBase = "px-3 py-2 rounded-lg";
const navActive = "bg-slate-900 text-white";
const navInactive = "text-slate-700 hover:bg-slate-100";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <Link to="/app" className="font-bold">
            VolleyFox
          </Link>

          <nav className="flex gap-2">
            <NavLink
              to="/app"
              end
              className={({ isActive }) =>
                `${navBase} ${isActive ? navActive : navInactive}`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/app/teams"
              className={({ isActive }) =>
                `${navBase} ${isActive ? navActive : navInactive}`
              }
            >
              Teams
            </NavLink>
          </nav>

          <Link className="text-sm underline" to="/auth/login">
            Wyloguj
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
