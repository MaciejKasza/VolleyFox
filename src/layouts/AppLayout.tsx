import { useTranslation } from "react-i18next";
import { NavLink, Outlet, useMatch } from "react-router-dom";
import { PATHS } from "../router/paths";
import { useClub } from "../contexts/club/ClubContext";

const linkBase =
  "flex items-center gap-3 rounded-lg px-3 py-2 text-md font-semibold transition";
const linkActive = "bg-accent text-accentfg";
const linkInactive = "text-muted hover:bg-surface2 hover:text-fg";

export default function AppLayout() {
  const { t } = useTranslation();
  const match = useMatch("app/clubs/:clubId/*");
  const isClub = !!match;
  const clubId = match?.params.clubId;
  //const { club } = useClub(); // Pobierz dane klubu z kontekstu

  const clubMenu = () => (
    <>
      <div className={`${linkBase} text-accent`}>Club Menu</div>
      <div className="pl-4">
        <NavLink
          to={`clubs/${clubId}`}
          end
          className={({ isActive }) =>
            `${linkBase} ${isActive ? linkActive : linkInactive}`
          }
        >
          Main
        </NavLink>
        <NavLink
          to={`clubs/${clubId}/players`}
          end
          className={({ isActive }) =>
            `${linkBase} ${isActive ? linkActive : linkInactive}`
          }
        >
          Lista graczy
        </NavLink>
        <NavLink
          to={`clubs/${clubId}/statistics`}
          end
          className={({ isActive }) =>
            `${linkBase} ${isActive ? linkActive : linkInactive}`
          }
        >
          Statyski
        </NavLink>
        <NavLink
          to={`clubs/${clubId}/calendar`}
          end
          className={({ isActive }) =>
            `${linkBase} ${isActive ? linkActive : linkInactive}`
          }
        >
          Kalendarz
        </NavLink>
        <NavLink
          to={`clubs/${clubId}/settings`}
          end
          className={({ isActive }) =>
            `${linkBase} ${isActive ? linkActive : linkInactive}`
          }
        >
          Ustawienia
        </NavLink>
      </div>
    </>
  );

  return (
    <div className="h-screen bg-bg text-fg">
      <div className="grid h-full grid-cols-[260px_1fr]">
        {/* SIDEBAR (no scroll) */}
        <aside className="border-r border-border bg-surface">
          <div className="h-full p-4 flex flex-col">
            {/* Brand */}
            <div className="px-2 py-2 text-3xl font-extrabold">
              {t("common.appName1")}
              <span className="text-accent">{t("common.appName2")}</span>
            </div>

            {/* Nav */}
            <nav className="my-4 flex flex-1 flex-col">
              <NavLink
                to={PATHS.app}
                end
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? linkActive : linkInactive}`
                }
              >
                {t("common.nav.dashboard")}
              </NavLink>

              {isClub && clubMenu()}

              <NavLink
                to={PATHS.callendar}
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? linkActive : linkInactive}`
                }
              >
                {t("common.nav.callendar")}
              </NavLink>
              <NavLink
                to={PATHS.activities}
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? linkActive : linkInactive}`
                }
              >
                {t("common.nav.activities")}
              </NavLink>

              {/* Spacer */}
              <div className="flex-1" />

              <NavLink
                to={PATHS.profile}
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? linkActive : linkInactive}`
                }
              >
                {t("common.nav.profile")}
              </NavLink>

              <NavLink
                to={PATHS.logout}
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? linkActive : linkInactive}`
                }
              >
                {t("auth.logout")}
              </NavLink>
              {/* Dodasz kolejne pozycje */}
              {/* <NavLink to="/app/matches" ...>Matches</NavLink> */}
            </nav>

            {/* Footer sidebar */}
            <div className="border-t border-border pt-4 text-xs text-muted">
              v0.1 • VolleyFlow
            </div>
          </div>
        </aside>

        {/* CONTENT (scrolls) */}
        <main className="min-w-0 overflow-y-auto">
          <div className="py-4 px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
