import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingChoice from "../../components/onboardingChoice/OnboardingChoice";
import { Header } from "../../components/pageHeader/Header";
import { TeamsList } from "../../components/teams/TeamsList";
import { PATHS } from "../../router/paths";

import { useTranslation } from "react-i18next";

export default function Dashboard() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [isLoading, setLoading] = useState(true);
  const [errorCode, setErrorCode] = useState<string | null>(null);
  const [hasTeams, setHasTeams] = useState<boolean | null>(null);

  // useEffect(() => {
  //   let cancelled = false;

  //   async function load() {
  //     setLoading(true);
  //     setErrorCode(null);

  //     try {
  //       const data = await teamService.hasTeams();
  //       if (!cancelled) setClubs(data);
  //     } catch (e) {
  //       console.log("data", e);
  //       const err = e as ApiError;
  //       if (!cancelled) setErrorCode(err.code ?? "UNKNOWN");
  //     } finally {
  //       if (!cancelled) setLoading(false);
  //     }
  //   }

  //   load();
  //   return () => {
  //     cancelled = true;
  //   };
  // }, []);

  // // mapujemy kluby -> TeamRow (tymczasowo)
  // const teams: TeamRow[] = useMemo(
  //   () =>
  //     clubs.map((c) => ({
  //       id: c.externalId,
  //       logoUrl: c.logoUrl ?? null,
  //       name: c.name,
  //       season: "—",
  //       role: "Owner", // TODO: jak backend da role
  //       lastActivity: "—",
  //     })),
  //   [clubs],
  // );

  // Loading state

  // Error state

  // Empty state -> onboarding
  // TODO: sprawdzac czy ma drużyny
  if (hasTeams === false) {
    return (
      <OnboardingChoice
        onCreateTeam={() => navigate(PATHS.createClub)}
        onJoinTeam={() => console.log("join team")}
        onSkip={() => console.log("skip")}
      />
    );
  }

  return (
    <div>
      <Header
        title={t("common.header.dashboard")}
        subtitle={t("common.header.dashboardSubtitle")}
      />
      <TeamsList />
    </div>
  );
}
