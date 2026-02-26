import type { TeamRole } from "./TeamsList";

export const RoleBadge = ({ role }: { role: TeamRole }) => {
  const base =
    "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold";

  // delikatne zróżnicowanie (bez nowych kolorów — zostajemy w Twoim theme)
  const styles =
    role === "Owner"
      ? "border-[rgb(var(--accent))] text-[rgb(var(--accent))]"
      : role === "Coach"
        ? "border-border text-fg"
        : "border-border text-muted";

  return <span className={`${base} ${styles}`}>{role}</span>;
};
