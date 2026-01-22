type Props = {
  title: string;
};

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

export default function Header({ title }: Props) {
  return (
    <div className="sticky top-0 z-20 bg-bg/80 backdrop-blur">
      <div className="mx-auto flex max-w-12xl items-center justify-between pt-2 pb-4">
        {/* Left: where you are */}
        <div>
          <div className="text-3xl font-extrabold tracking-tight text-fg">
            {title}
          </div>
        </div>

        {/* Right: notifications + avatar */}
        <div className="flex items-center gap-3">
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

          <button
            type="button"
            className={[
              "grid h-10 w-10 place-items-center overflow-hidden rounded-2xl transition",
              "border border-border bg-surface text-white",
              "hover:border-[rgb(var(--accent))]",
              "cursor-pointer focus:outline-none",
            ].join(" ")}
            aria-label="Profile"
          >
            {/* Placeholder avatar (zamienisz na <img />) */}
            <span className="text-sm font-bold">MK</span>
          </button>
        </div>
      </div>
    </div>
  );
}
