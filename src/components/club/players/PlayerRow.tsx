import PlayerStatusPill from "./PlayerStatusPill";
import type { Player } from "./types";

export default function PlayerRow({
  player,
  isSelected,
  onClick,
}: {
  player: Player;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "w-full text-left",
        "grid grid-cols-[90px_1fr_220px] items-center gap-0 px-4 py-4",
        "hover:bg-surface2/40 transition",
        isSelected ? "bg-accent/80 text-accentfg" : "bg-transparent",
      ].join(" ")}
    >
      <div className="flex items-center gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-bg/40 text-xs font-extrabold">
          {player.number}
        </div>
      </div>

      <div className="min-w-0">
        <div
          className={[
            "truncate font-bold",
            isSelected ? "text-accentfg" : "text-fg",
          ].join(" ")}
        >
          {player.name}
        </div>
        <div
          className={[
            "text-sm",
            isSelected ? "text-accentfg/80" : "text-muted",
          ].join(" ")}
        >
          {humanPosition(player.position)}
        </div>
      </div>

      <div className="flex justify-end">
        <PlayerStatusPill status={player.availability} selected={isSelected} />
      </div>
    </button>
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
