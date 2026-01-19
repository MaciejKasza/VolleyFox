import OnboardingChoice from "../../components/OnboardingChoice/OnboardingChoice";

type Team = {
  id: string;
  name: string;
};

export default function Dashboard() {
  // na razie nic nie wiemy o drużynach:
  const teams: Team[] = [{ id: "1", name: "dupa" }];

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
      <h1 className="text-3xl font-extrabold">Dashboard</h1>
      <p className="mt-2 text-muted">Masz {teams.length} drużyn(y).</p>
    </div>
  );
}
