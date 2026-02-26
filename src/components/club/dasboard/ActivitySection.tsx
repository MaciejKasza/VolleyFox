import { SectionCard } from "./SectionCard";
import type { ActivityItem } from "./types";

export function ActivitySection({ items }: { items: ActivityItem[] }) {
  return (
    <SectionCard title="Aktywność">
      <div className="space-y-3">
        {items.map((it) => (
          <div
            key={it.id}
            className="flex gap-4 rounded-2xl border border-border bg-surface p-4"
          >
            <div className="w-24 shrink-0 text-xs text-muted">
              {it.timeLabel}
            </div>
            <div className="text-sm text-fg">{it.text}</div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
