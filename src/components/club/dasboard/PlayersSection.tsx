import { SectionCard } from "./SectionCard";
import type { PlayerMini } from "./types";

export function PlayersSection({
  players,
  totalPlayers,
}: {
  players: PlayerMini[];
  totalPlayers: number;
}) {
  return (
    <SectionCard
      title="Zawodnicy"
      right={
        <button className="rounded-full border border-border bg-surface px-4 py-2 text-sm text-fg hover:bg-surface-2">
          Zobacz pełną listę
        </button>
      }
    >
      <div className="mb-4 text-sm text-muted">
        Podgląd składu ({totalPlayers})
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {players.slice(0, 8).map((p) => (
          <div
            key={p.id}
            className="rounded-2xl border border-border bg-surface p-4"
          >
            <div className="text-sm font-semibold text-fg">{p.fullName}</div>
            <div className="mt-1 text-xs text-muted">
              {p.position ? `Pozycja: ${p.position}` : "—"}
              {p.number ? ` • #${p.number}` : ""}
            </div>
            <div className="mt-3 text-xs text-muted">
              Status: {p.availability ?? "—"}
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
