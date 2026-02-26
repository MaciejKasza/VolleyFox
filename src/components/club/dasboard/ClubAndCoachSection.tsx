import { StatusBadge } from "./Badge";
import { ClubSummaryCard } from "./ClubSummaryCard";
import { CoachCard } from "./CoachCard";
import { InfoTile } from "./InfoTile";
import { SectionCard } from "./SectionCard";
import type { ClubSummary, Coach } from "./types";

export function ClubAndCoachSection({
  club,
  coach,
}: {
  club: ClubSummary;
  coach: Coach;
}) {
  return (
    <SectionCard
      title="Podstawowe informacje"
      //   right={<StatusBadge status={club.status} />}
      className="min-h-[340px]"
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <ClubSummaryCard club={club} />
        <CoachCard coach={coach} />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <InfoTile label="Zawodnicy" value={club.kpis.playersCount} />
        <InfoTile
          label="Mecze w tym miesiącu"
          value={club.kpis.matchesThisMonth}
        />
        <InfoTile
          label="Frekwencja treningów"
          value={`${club.kpis.trainingAttendancePct}%`}
        />
      </div>
    </SectionCard>
  );
}
