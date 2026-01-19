import type { ReactNode } from "react";

type Props = {
  step: number;
  title: string;
  description: string;
  icon: ReactNode;
  buttonText: string;
  onClick?: () => void;
};

export default function ChoiceCard({
  step,
  title,
  description,
  icon,
  buttonText,
  onClick,
}: Props) {
  return (
    <div className="relative rounded-3xl border border-border bg-surface p-7 shadow hover:shadow-[0_10px_30px_rgba(0,0,0,0.45),0_0_0_1px_rgba(235,255,0,0.08)] hover:-translate-y-0.5 hover:border-accent/40 hover:bg-surface2">
      <div className="absolute left-6 top-6 grid h-8 w-8 place-items-center rounded-full bg-bg/60 text-xs font-bold text-muted border border-border/70">
        {step}
      </div>

      <div className="mt-8 grid min-h-[280px] grid-rows-[auto_1fr_auto] items-start text-center">
        <div className="flex flex-col items-center">
          <div className="grid h-16 w-16 place-items-center rounded-2xl border border-border bg-bg/60">
            <span className="text-accent">{icon}</span>
          </div>

          <h3 className="mt-5 text-xl font-extrabold tracking-tight text-fg">
            {title}
          </h3>

          <p className="mt-3 text-sm leading-relaxed text-muted">
            {description}
          </p>
        </div>

        <div />

        <div className="pt-6 pb-2">
          <button
            type="button"
            onClick={onClick}
            className={[
              "w-full rounded-2xl px-5 py-3 text-sm font-semibold transition",
              "cursor-pointer focus:outline-none",
              "border bg-transparent",
              "border-[rgb(var(--accent))] text-white",
              "hover:bg-[rgb(var(--accent))] hover:text-[rgb(var(--accent-fg))]",
              "active:opacity-85",
              "whitespace-nowrap",
            ].join(" ")}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}
