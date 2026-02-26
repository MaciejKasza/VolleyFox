export type PlayerPosition =
  | "Setter"
  | "Opposite"
  | "Outside"
  | "Middle"
  | "Libero"
  | "Universal";

export type PlayerAvailability = "Available" | "Uncertain" | "Unavailable";

export type Player = {
  id: string;
  number: number;
  name: string;
  position: PlayerPosition;
  avatarUrl?: string;

  heightCm?: number;
  dominantHand?: "Left" | "Right";
  notes?: string;

  availability: PlayerAvailability;
};
