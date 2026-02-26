import { useEffect, useMemo, useState } from "react";
import { RoleBadge } from "./RoleBadge";
import { TeamIcon } from "./TeamIcon";
import { teamService, type Team } from "../../services/teamService";
import type { ApiError } from "../../services/http";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../router/paths";
import { Loader } from "../common/Loader";
import { useTranslation } from "react-i18next";

export type TeamRole = "Owner" | "Coach" | "Player";

export type TeamRow = {
  id: string;
  logoUrl: string | null;
  name: string;
  season: string;
  role: TeamRole;
  lastActivity: string;
};

type Props = {
  teams: TeamRow[];
  onCreateTeam: () => void;
  onJoinTeam: () => void;
  onOpenTeam: (teamId: string) => void;
};

export const TeamsList = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [teams, setTeams] = useState<TeamRow[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [errorCode, setErrorCode] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setErrorCode(null);

      try {
        const data = await teamService.list();
        if (!cancelled) {
          setTeams(
            data.map((c) => ({
              id: c.externalId,
              logoUrl: c.logoUrl ?? null,
              name: c.name,
              season: "—",
              role: "Owner",
              lastActivity: "—",
            })),
          );
        }

        console.log("data", data);
      } catch (e) {
        console.log("data", e);
        const err = e as ApiError;
        if (!cancelled) setErrorCode(err.code ?? "UNKNOWN");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const onCreateTeam = () => {
    console.log("create team");
    navigate(PATHS.createClub);
  };

  const onJoinTeam = () => {
    console.log("join team");
    // navigate(PATHS.joinClub);
  };

  const onOpenTeam = (id: string) => {
    console.log("open team", id);
    navigate(`${PATHS.clubDashboard(id)}`);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (errorCode) {
    return (
      <div className="rounded-3xl border border-border bg-surface p-6 shadow text-center">
        <p className="text-sm text-muted">{t(`errors.api.${errorCode}`)}</p>
      </div>
    );
  }

  return (
    <section className="rounded-3xl border border-border bg-surface p-6 shadow">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-fg">
            Moje drużyny
          </h2>
          <p className="mt-1 text-sm text-muted">
            Zarządzaj drużynami, do których należysz.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCreateTeam}
            className={[
              "rounded-2xl px-4 py-2 text-sm font-semibold transition",
              "cursor-pointer focus:outline-none whitespace-nowrap",
              "border border-[rgb(var(--accent))] bg-transparent text-white",
              "hover:bg-[rgb(var(--accent))] hover:text-[rgb(var(--accent-fg))]",
              "active:opacity-85",
            ].join(" ")}
          >
            + Załóż drużynę
          </button>

          <button
            type="button"
            onClick={onJoinTeam}
            className={[
              "rounded-2xl px-4 py-2 text-sm font-semibold transition",
              "cursor-pointer focus:outline-none whitespace-nowrap",
              "border border-[rgb(var(--accent))] bg-transparent text-white",
              "hover:bg-[rgb(var(--accent))] hover:text-[rgb(var(--accent-fg))]",
              "active:opacity-85",
            ].join(" ")}
          >
            Dołącz do drużyny
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-border divide-y divide-[rgb(var(--border))]">
        {/* header row */}
        <div className="grid grid-cols-[1.6fr_0.7fr_0.8fr_1fr_0.5fr] gap-3 bg-bg/40 px-4 py-3 text-xs font-semibold text-muted">
          <div>Drużyna</div>
          <div>Sezon</div>
          <div>Moja rola</div>
          <div>Ostatnia aktywność</div>
          <div className="text-right"> </div>
        </div>

        {/* body */}
        <div className="divide-y divide-[rgb(var(--border))]">
          {teams.map((t) => (
            <div
              key={t.id}
              className="grid grid-cols-[1.6fr_0.7fr_0.8fr_1fr_0.5fr] gap-3 px-4 py-4"
            >
              <div className="flex items-center gap-3 min-w-0">
                <TeamIcon name={t.name} logoUrl={t.logoUrl} />
                <div className="min-w-0">
                  <div className="truncate font-bold text-fg">{t.name}</div>
                </div>
              </div>

              <div className="text-sm text-muted self-center">{t.season}</div>

              <div className="self-center">
                <RoleBadge role={t.role} />
              </div>

              <div className="text-sm text-muted self-center">
                {t.lastActivity}
              </div>

              <div className="self-center text-right">
                <button
                  type="button"
                  onClick={() => onOpenTeam(t.id)}
                  className={[
                    "rounded-xl px-3 py-2 text-sm font-semibold transition",
                    "cursor-pointer focus:outline-none whitespace-nowrap",
                    "border border-[rgb(var(--accent))] bg-transparent text-white",
                    "hover:bg-[rgb(var(--accent))] hover:text-[rgb(var(--accent-fg))]",
                    "active:opacity-85",
                  ].join(" ")}
                >
                  Wejdź
                </button>
              </div>
            </div>
          ))}

          {teams.length === 0 && (
            <div className="px-4 py-10 text-center text-sm text-muted">
              Nie masz jeszcze żadnych drużyn.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
