import { SectionCard } from "./SectionCard";
import type { Upcoming } from "./types";

export function OverviewSection({ upcoming }: { upcoming: Upcoming }) {
  return (
    <SectionCard title="Przegląd" className="min-h-[340px]">
      <div className="space-y-4">
        <NextMatchCard match={upcoming.nextMatch} />
        <NextTrainingCard training={upcoming.nextTraining} />

        <div className="rounded-2xl border border-border bg-surface p-4">
          <div className="mb-3 text-xs text-muted">Szybkie akcje</div>
          <div className="flex flex-wrap gap-2">
            <button className="rounded-full border border-border bg-surface px-4 py-2 text-sm text-fg hover:bg-surface-2">
              Dodaj mecz
            </button>
            <button className="rounded-full border border-border bg-surface px-4 py-2 text-sm text-fg hover:bg-surface-2">
              Dodaj trening
            </button>
            <button className="rounded-full border border-border bg-surface px-4 py-2 text-sm text-fg hover:bg-surface-2">
              Wyślij ogłoszenie
            </button>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

function NextMatchCard({ match }: { match?: Upcoming["nextMatch"] }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4">
      <div className="text-xs text-muted">Najbliższy mecz</div>
      {match ? (
        <>
          <div className="mt-1 text-sm font-semibold text-fg">
            {match.datetimeLabel} • {match.title}
          </div>
          <div className="mt-1 text-sm text-muted">
            {match.locationLabel}
            {match.needsLineupConfirm ? " • Potwierdź skład" : null}
          </div>
        </>
      ) : (
        <div className="mt-2 text-sm text-muted">Brak zaplanowanych meczów</div>
      )}
    </div>
  );
}

function NextTrainingCard({
  training,
}: {
  training?: Upcoming["nextTraining"];
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4">
      <div className="text-xs text-muted">Najbliższy trening</div>
      {training ? (
        <>
          <div className="mt-1 text-sm font-semibold text-fg">
            {training.datetimeLabel} • {training.locationLabel}
          </div>
          <div className="mt-1 text-sm text-muted">
            Dostępność: {training.availability.confirmed}/
            {training.availability.total}
          </div>
        </>
      ) : (
        <div className="mt-2 text-sm text-muted">
          Brak zaplanowanych treningów
        </div>
      )}
    </div>
  );
}
