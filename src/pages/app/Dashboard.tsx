import OnboardingChoice from "../../components/OnboardingChoice/OnboardingChoice";
import Header from "../../components/pageHeader/Header";
import type { TeamRow } from "../../components/teams/TeamsList";
import TeamsList from "../../components/teams/TeamsList";

type Team = {
  id: string;
  name: string;
};

export default function Dashboard() {
  // na razie nic nie wiemy o drużynach:
  const teams: TeamRow[] = [
    {
      id: "1",
      name: "Volley Club",
      season: "2024/25",
      role: "Owner",
      lastActivity: "Mecz 2 dni temu",
    },
    {
      id: "2",
      name: "AZS Juniors",
      season: "2024/25",
      role: "Coach",
      lastActivity: "Trening jutro",
    },
    {
      id: "3",
      name: "Sparta",
      season: "2024/25",
      role: "Player",
      lastActivity: "—",
    },
  ];

  if (teams.length === 0) {
    return (
      <OnboardingChoice
        onCreateTeam={() => console.log("create team")}
        onJoinTeam={() => console.log("join team")}
        onSkip={() => console.log("skip")}
      />
    );
  }

  return (
    <div>
      <Header title="Dasboard" />
      <TeamsList
        teams={teams}
        onCreateTeam={() => console.log("create")}
        onJoinTeam={() => console.log("join")}
        onOpenTeam={(id) => console.log("open", id)}
      />
    </div>
  );
}
