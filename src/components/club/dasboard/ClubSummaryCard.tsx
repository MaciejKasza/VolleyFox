import type { ClubSummary } from "./types";

export function ClubSummaryCard({ club }: { club: ClubSummary }) {
  const monogram = club.name.trim().slice(0, 1).toUpperCase();

  return (
    <div className="flex gap-4 rounded-2xl border border-border bg-surface p-4">
      <div className="grid h-20 w-20 place-items-center rounded-full border border-border bg-bg text-xl font-semibold text-fg">
        {monogram}
      </div>

      <div className="min-w-0">
        <div className="text-xs text-muted">Nazwa klubu</div>
        <div className="truncate text-lg font-semibold text-fg">
          {club.name}
        </div>

        <div className="mt-3 text-xs text-muted">Miasto</div>
        <div className="truncate text-lg font-semibold text-fg">
          {club.city}
        </div>
      </div>
    </div>
  );
}
