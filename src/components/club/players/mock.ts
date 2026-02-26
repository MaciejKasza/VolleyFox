import type { Player } from "./types";

export const mockPlayers: Player[] = [
  {
    id: "p1",
    number: 21,
    name: "Piotr Nowak",
    position: "Outside",
    avatarUrl: "https://i.pravatar.cc/200?img=12",
    heightCm: 188,
    dominantHand: "Right",
    availability: "Available",
    notes: "Wszechstronny",
  },
  {
    id: "p2",
    number: 23,
    name: "Marcin B",
    position: "Opposite",
    avatarUrl: "https://i.pravatar.cc/200?img=32",
    availability: "Uncertain",
  },
  {
    id: "p3",
    number: 15,
    name: "Tomasz E",
    position: "Outside",
    avatarUrl: "https://i.pravatar.cc/200?img=48",
    availability: "Available",
  },
  {
    id: "p4",
    number: 16,
    name: "Michał G",
    position: "Opposite",
    avatarUrl: "https://i.pravatar.cc/200?img=4",
    availability: "Unavailable",
  },
];
