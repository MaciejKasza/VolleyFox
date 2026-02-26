const buttonGhost =
  "rounded-xl border border-border bg-transparent px-4 py-2 text-sm font-semibold text-fg transition cursor-pointer hover:bg-surface2 active:opacity-85";

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5">
      <path
        d="M12 22a2.2 2.2 0 0 0 2.2-2.2H9.8A2.2 2.2 0 0 0 12 22Zm7-6.5V11a7 7 0 1 0-14 0v4.5L3.5 17v1.2h17V17L19 15.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function PlayersTopbar({
  title,
  userName,
  userEmail,
}: {
  title?: string;
  userName: string;
  userEmail: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-xl font-extrabold text-fg">{title}</div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 overflow-hidden rounded-full border border-border bg-bg/30">
            <img
              src="https://i.pravatar.cc/100?img=15"
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-bold text-fg">{userName}</div>
            <div className="text-xs text-muted">{userEmail}</div>
          </div>
        </div>
        <button
          type="button"
          className={[
            "relative grid h-10 w-10 place-items-center rounded-2xl transition",
            "border border-border bg-surface text-white",
            "hover:border-[rgb(var(--accent))]",
            "cursor-pointer focus:outline-none",
          ].join(" ")}
          aria-label="Notifications"
        >
          <BellIcon />
          {/* badge (opcjonalnie) */}
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[rgb(var(--accent))]" />
        </button>
      </div>
    </div>
  );
}
