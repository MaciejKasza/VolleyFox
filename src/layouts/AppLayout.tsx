import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth/AuthContext";
import { PATHS } from "../router/paths";
import { useLang } from "../i18n/useLang";
import { useTranslation } from "react-i18next";

const navBase = "px-3 py-2 rounded-lg";
const navActive = "bg-slate-900 text-white";
const navInactive = "text-slate-700 hover:bg-slate-100";

export default function AppLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { lang, toggle } = useLang();
  const { t } = useTranslation();

  function handleLogout() {
    logout();
    navigate(PATHS.login, { replace: true });
  }
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
              {t("common.dashboard")}
            </NavLink>
            <NavLink
              to="/app/teams"
              className={({ isActive }) =>
                `${navBase} ${isActive ? navActive : navInactive}`
              }
            >
              {t("common.teams")}
            </NavLink>
          </nav>

          <button className="text-sm underline" onClick={handleLogout}>
            {t("common.logout")}
          </button>
          <button className="text-sm underline" onClick={toggle}>
            {lang.toUpperCase()}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
