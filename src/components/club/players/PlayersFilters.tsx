import type { PlayerPosition } from "./types";

const chip =
  "rounded-xl border border-border bg-bg/30 px-3 py-1.5 text-sm font-semibold text-fg transition cursor-pointer hover:bg-surface2";
const chipActive =
  "rounded-xl border border-border bg-surface2 px-3 py-1.5 text-sm font-semibold text-fg";

const options: { key: PlayerPosition | "All"; label: string }[] = [
  { key: "All", label: "Wszystkie" },
  { key: "Opposite", label: "Atakujący" },
  { key: "Outside", label: "Przyjmujący" },
  { key: "Middle", label: "Środkowi" },
  { key: "Setter", label: "Rozgrywający" },
  { key: "Libero", label: "Libero" },
];

export default function PlayersFilters({
  value,
  onChange,
}: {
  value: PlayerPosition | "All";
  onChange: (v: PlayerPosition | "All") => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o.key}
          type="button"
          onClick={() => onChange(o.key)}
          className={value === o.key ? chipActive : chip}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
