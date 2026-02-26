// types
export type ClubStatus = "DRAFT" | "PENDING" | "ACTIVE";

export type ClubSummary = {
  id: string;
  name: string;
  city: string;
  status: ClubStatus;
  kpis: {
    playersCount: number;
    matchesThisMonth: number;
    trainingAttendancePct: number; // 0-100
  };
};

export type Coach = {
  id: string;
  fullName: string;
  phone?: string;
  email?: string;
};

export type EventBase = {
  id: string;
  title: string;
  datetimeLabel: string; // np. "Sob, 17:00"
  locationLabel: string; // np. "Hala MOSiR"
};

export type Upcoming = {
  nextMatch?: EventBase & { opponent: string; needsLineupConfirm?: boolean };
  nextTraining?: EventBase & {
    availability: { confirmed: number; total: number };
  };
};

export type ActivityItem = {
  id: string;
  timeLabel: string; // "Dzisiaj 09:12"
  text: string;
  type: "TRAINING" | "MATCH" | "ANNOUNCEMENT" | "SYSTEM";
};

export type PlayerMini = {
  id: string;
  fullName: string;
  position?: string;
  number?: number;
  availability?: "AVAILABLE" | "UNCONFIRMED" | "OUT";
};
