import {
  type Coach,
  type Upcoming,
  type ActivityItem,
  type PlayerMini,
  type ClubSummary,
} from "./types";

export const mockClubSummary: ClubSummary = {
  id: "club_1",
  name: "Test",
  city: "Test",
  status: "PENDING",
  kpis: { playersCount: 12, matchesThisMonth: 3, trainingAttendancePct: 86 },
};

export const mockCoach: Coach = {
  id: "coach_1",
  fullName: "Jan Kowalski",
  email: "jan.kowalski@club.pl",
  phone: "+48 600 000 000",
};

export const mockUpcoming: Upcoming = {
  nextMatch: {
    id: "m1",
    title: "vs. Skra II",
    opponent: "Skra II",
    datetimeLabel: "Sob, 17:00",
    locationLabel: "Hala MOSiR",
    needsLineupConfirm: true,
  },
  nextTraining: {
    id: "t1",
    title: "Trening",
    datetimeLabel: "Wt, 19:30",
    locationLabel: "Hala SP 12",
    availability: { confirmed: 9, total: 12 },
  },
};

export const mockActivity: ActivityItem[] = [
  {
    id: "a1",
    timeLabel: "Dzisiaj 09:12",
    type: "TRAINING",
    text: "Kuba K. potwierdził obecność na treningu",
  },
  {
    id: "a2",
    timeLabel: "Wczoraj 20:41",
    type: "MATCH",
    text: "Dodano mecz: Skra II (dom)",
  },
  {
    id: "a3",
    timeLabel: "Wczoraj 18:05",
    type: "ANNOUNCEMENT",
    text: "Ogłoszenie: Zmiana godziny treningu na 19:30",
  },
];

export const mockPlayers: PlayerMini[] = [
  {
    id: "p1",
    fullName: "Kuba Kowalski",
    position: "P",
    number: 7,
    availability: "AVAILABLE",
  },
  {
    id: "p2",
    fullName: "Marek Nowak",
    position: "A",
    number: 11,
    availability: "UNCONFIRMED",
  },
  {
    id: "p3",
    fullName: "Paweł Lis",
    position: "Ś",
    number: 3,
    availability: "AVAILABLE",
  },
  {
    id: "p4",
    fullName: "Tomek Wróbel",
    position: "L",
    number: 1,
    availability: "OUT",
  },
  {
    id: "p5",
    fullName: "Tomek Wróbel",
    position: "L",
    number: 1,
    availability: "OUT",
  },
  {
    id: "p6",
    fullName: "Tomek Wróbel",
    position: "L",
    number: 1,
    availability: "OUT",
  },
  {
    id: "p7",
    fullName: "Tomek Wróbel",
    position: "L",
    number: 1,
    availability: "OUT",
  },
];
