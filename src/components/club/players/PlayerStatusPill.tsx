import type { PlayerAvailability } from "./types";

export default function PlayerStatusPill({
  status,
  selected,
}: {
  status: PlayerAvailability;
  selected?: boolean;
}) {
  const base =
    "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold border";

  if (selected) {
    return (
      <span
        className={`${base} border-accentfg/30 bg-accentfg/10 text-accentfg`}
      >
        <Dot className="bg-accentfg" />
        {label(status)}
      </span>
    );
  }

  if (status === "Available")
    return (
      <span
        className={`${base} border-emerald-500/30 bg-emerald-500/10 text-emerald-200`}
      >
        <Dot className="bg-emerald-400" /> Dostępny
      </span>
    );
  if (status === "Uncertain")
    return (
      <span
        className={`${base} border-amber-500/30 bg-amber-500/10 text-amber-200`}
      >
        <Dot className="bg-amber-400" /> Niepewny
      </span>
    );
  return (
    <span className={`${base} border-red-500/30 bg-red-500/10 text-red-200`}>
      <Dot className="bg-red-400" /> Niedostępny
    </span>
  );
}

function Dot({ className }: { className: string }) {
  return <span className={`h-2 w-2 rounded-full ${className}`} />;
}

function label(s: PlayerAvailability) {
  if (s === "Available") return "Dostępny";
  if (s === "Uncertain") return "Niepewny";
  return "Niedostępny";
}
