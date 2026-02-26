import type { Coach } from "./types";

export function CoachCard({ coach }: { coach: Coach }) {
  const initials = coach.fullName
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="rounded-2xl border border-border bg-surface p-4">
      <div className="flex items-center gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-full border border-border bg-bg text-sm font-semibold text-fg">
          {initials}
        </div>
        <div className="min-w-0">
          <div className="text-xs text-muted">Trener</div>
          <div className="truncate text-base font-semibold text-fg">
            {coach.fullName}
          </div>
        </div>
      </div>

      <div className="mt-3 space-y-1 text-sm text-muted">
        {coach.email ? <div>{coach.email}</div> : null}
        {coach.phone ? <div>{coach.phone}</div> : null}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button className="rounded-full border border-border bg-surface px-4 py-2 text-sm text-fg hover:bg-surface-2">
          Napisz
        </button>
        <button className="rounded-full border border-border bg-surface px-4 py-2 text-sm text-fg hover:bg-surface-2">
          Szczegóły
        </button>
      </div>
    </div>
  );
}
