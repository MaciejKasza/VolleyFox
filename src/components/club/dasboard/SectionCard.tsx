type SectionCardProps = {
  title: string;
  right?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

export function SectionCard({
  title,
  right,
  children,
  className,
}: SectionCardProps) {
  return (
    <section
      className={["rounded-3xl border border-border bg-surface p-6", className]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-fg">{title}</h2>
        {right}
      </div>
      {children}
    </section>
  );
}
