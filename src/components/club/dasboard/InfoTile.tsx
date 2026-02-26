type InfoTileProps = { label: string; value: React.ReactNode };

export function InfoTile({ label, value }: InfoTileProps) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4">
      <div className="text-xs text-muted">{label}</div>
      <div className="mt-1 text-3xl font-semibold text-fg">{value}</div>
    </div>
  );
}
