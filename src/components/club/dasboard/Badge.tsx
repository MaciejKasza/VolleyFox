const statusLabel: Record<string, string> = {
  DRAFT: "Szkic",
  PENDING: "do potwierdzenia",
  ACTIVE: "aktywny",
};

export function StatusBadge({
  status,
}: {
  status: "DRAFT" | "PENDING" | "ACTIVE";
}) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 text-xs text-fg">
      Status: {statusLabel[status]}
    </span>
  );
}
