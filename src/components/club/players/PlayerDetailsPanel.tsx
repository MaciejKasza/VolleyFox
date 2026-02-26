import type { Player } from "./types";

const card = "rounded-3xl border border-border bg-surface p-6 shadow";
const neonButton =
  "rounded-xl bg-accent px-4 py-2 font-semibold text-accentfg hover:opacity-90 active:opacity-80 cursor-pointer";
const ghost =
  "rounded-xl border border-border bg-transparent px-4 py-2 text-sm font-semibold text-fg transition cursor-pointer hover:bg-surface2 active:opacity-85";

export default function PlayerDetailsPanel({
  player,
  onOpenProfile,
  onEdit,
  onDelete,
}: {
  player: Player | null;
  onOpenProfile: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  if (!player) {
    return (
      <aside className={card}>
        <div className="text-muted">Wybierz zawodnika z listy</div>
      </aside>
    );
  }

  return (
    <aside className={card}>
      <div className="text-3xl font-extrabold text-fg">{player.name}</div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-border bg-bg/30">
        <div className="aspect-square w-full">
          <img
            src={player.avatarUrl ?? "https://i.pravatar.cc/300?img=14"}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <div className="mt-5 text-lg font-bold text-fg">
        {humanPosition(player.position)}
      </div>

      <div className="mt-2 space-y-1 text-sm text-muted">
        <div>#{player.number}</div>
        {player.heightCm ? <div>{player.heightCm} cm</div> : null}
        {player.notes ? <div>{player.notes}</div> : null}
        {player.dominantHand ? (
          <div>
            {player.dominantHand === "Left" ? "Lewa ręka" : "Prawa ręka"}
          </div>
        ) : null}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button className={neonButton} type="button" onClick={onOpenProfile}>
          Otwórz profil →
        </button>
        <button className={ghost} type="button" onClick={onEdit}>
          Edytuj
        </button>
        <button
          className={`${ghost} border-red-500/40 text-red-200 hover:bg-red-500/10`}
          type="button"
          onClick={onDelete}
        >
          Usuń
        </button>
      </div>

      <div className="mt-8 border-t border-border pt-6">
        <div className="text-sm font-semibold text-muted">Ostatnie 30 dni</div>
        <div className="mt-3 rounded-2xl border border-border bg-bg/30 p-4 text-sm text-muted">
          Brak notatek trenera
        </div>

        <div className="mt-6 text-sm font-semibold text-muted">Dostępność</div>
        <div className="mt-3 rounded-2xl border border-border bg-bg/30 p-4 text-sm text-muted">
          9/12 na najbliższy mecz
        </div>
      </div>
    </aside>
  );
}

function humanPosition(p: Player["position"]) {
  switch (p) {
    case "Outside":
      return "Przyjmujący";
    case "Opposite":
      return "Atakujący";
    case "Middle":
      return "Środkowy";
    case "Setter":
      return "Rozgrywający";
    case "Libero":
      return "Libero";
    default:
      return "Zawodnik";
  }
}
