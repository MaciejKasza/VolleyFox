import { http } from "./http";

export type Team = {
  externalId: string;
  name: string;
  city: string;
  description?: string;
  logoUrl?: string;
  status?: string;
};

export type CreateTeamRequest = {
  name: string;
  city: string;
  description?: string;
  logoUrl?: string;
};

export type CreateTeamResponse = {
  externalId: string;
  name: string;
  city: string;
  description: string;
  logoUrl: string;
  status: string;
};

export type GetTeamResponse = {
  externalId: string;
  name: string;
  city: string;
  description: string;
  logoUrl: string;
  status: string;
}; // dopasuj jeśli backend da inny kształt

function mapTeam(dto: CreateTeamResponse): Team {
  return {
    externalId: dto.externalId,
    name: dto.name,
    city: dto.city,
    description: dto.description ?? undefined,
    logoUrl: dto.logoUrl ?? undefined,
    status: dto.status,
  };
}
// dodać Team[]
export type ListTeamsResponse = Team[]; // albo DTO jeśli backend da inny kształt

export const teamService = {
  async create(payload: CreateTeamRequest): Promise<Team> {
    const res = await http<CreateTeamResponse>("/app/clubs", {
      method: "POST",
      body: payload,
    });

    return mapTeam(res);
  },

  async list(): Promise<Team[]> {
    // dopasuj endpoint jeśli backend ma inaczej, np. "/app/Teams/my"
    const res = await http<ListTeamsResponse>("/app/clubs/my", {
      method: "GET",
    });

    return res;
  },

  async getById(TeamId: string): Promise<Team> {
    console.log(TeamId);

    const res = await http<GetTeamResponse>(`/app/clubs/${TeamId}`, {
      method: "GET",
    });

    return res;
  },
};
