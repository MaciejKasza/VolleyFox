import { Link, NavLink, Outlet } from "react-router-dom";

const linkBase = "px-3 py-2 rounded-lg";
const linkActive = "bg-slate-900 text-white";
const linkInactive = "text-slate-700 hover:bg-slate-100";

export default function RootLayout() {
  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
          <Link to="/" className="font-bold">
            VolleyFox
          </Link>

          <nav className="flex gap-2">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : linkInactive}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/teams"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : linkInactive}`
              }
            >
              Teams
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
