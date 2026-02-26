export default function PlayersListLayout({
  topbar,
  left,
  right,
}: {
  topbar: React.ReactNode;
  left: React.ReactNode;
  right: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      {topbar}

      <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        {left}
        {right}
      </div>
    </div>
  );
}
