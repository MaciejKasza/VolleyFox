import PlayersFilters from "./PlayersFilters";
import PlayersTable from "./PlayersTable";
import type { Player, PlayerPosition } from "./types";

const card = "rounded-3xl border border-border bg-surface p-6 shadow";
const neonButton =
  "rounded-xl bg-accent px-4 py-2 font-semibold text-accentfg hover:opacity-90 active:opacity-80 cursor-pointer";
const input =
  "w-full rounded-xl border border-border bg-bg/40 px-4 py-2 text-fg placeholder:text-muted outline-none transition focus:border-accent/70 focus:ring-2 focus:ring-accent/25";

export default function PlayersListPanel({
  title,
  query,
  onQueryChange,
  position,
  onPositionChange,
  players,
  selectedId,
  onSelect,
  onAddPlayer,
}: {
  title: string;
  query: string;
  onQueryChange: (v: string) => void;
  position: PlayerPosition | "All";
  onPositionChange: (v: PlayerPosition | "All") => void;
  players: Player[];
  selectedId: string;
  onSelect: (id: string) => void;
  onAddPlayer: () => void;
}) {
  return (
    <section className={card}>
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-3xl font-extrabold text-fg">{title}</h2>
        <button className={neonButton} type="button" onClick={onAddPlayer}>
          Dodaj zawodnika
        </button>
      </div>

      <div className="mt-5 flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="flex-1">
          <input
            className={input}
            placeholder="Szukaj…"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
          />
        </div>
        <PlayersFilters value={position} onChange={onPositionChange} />
      </div>

      <div className="mt-4">
        <PlayersTable
          players={players}
          selectedId={selectedId}
          onSelect={onSelect}
        />
      </div>
    </section>
  );
}
