import PlayerRow from "./PlayerRow";
import type { Player } from "./types";

const tableWrap = "rounded-2xl border border-border bg-bg/30 overflow-hidden";

export default function PlayersTable({
  players,
  selectedId,
  onSelect,
}: {
  players: Player[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className={tableWrap}>
      <div className="grid grid-cols-[90px_1fr_220px] gap-0 border-b border-border bg-bg/20 px-4 py-3 text-xs font-semibold text-muted">
        <div>Numer</div>
        <div>Zawodnik</div>
        <div className="text-right">Status</div>
      </div>

      <div className="divide-y divide-border/70">
        {players.map((p) => (
          <PlayerRow
            key={p.id}
            player={p}
            isSelected={p.id === selectedId}
            onClick={() => onSelect(p.id)}
          />
        ))}
      </div>
    </div>
  );
}
