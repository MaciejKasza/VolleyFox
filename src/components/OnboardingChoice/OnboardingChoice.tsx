import ChoiceCard from "./ChoiceCard";
import { useTranslation } from "react-i18next";
import { IconEye, IconQr, IconShield } from "./Icons";

type Props = {
  onCreateTeam: () => void;
  onJoinTeam: () => void;
  onSkip: () => void;
};

export default function OnboardingChoice({
  onCreateTeam,
  onJoinTeam,
  onSkip,
}: Props) {
  const { t } = useTranslation();
  return (
    <section className="min-h-[calc(100vh-120px)] grid place-items-center">
      <div className="w-full max-w-5xl">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight">
            {t("onboardingCard.header")}
          </h1>
          <p className="mt-3 text-muted">{t("onboardingCard.title")}</p>
        </header>

        <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
          <ChoiceCard
            step={1}
            title={t("onboardingCard.create.title")}
            description={t("onboardingCard.create.description")}
            icon={<IconShield />}
            buttonText={t("onboardingCard.create.button")}
            onClick={onCreateTeam}
          />
          <ChoiceCard
            step={2}
            title={t("onboardingCard.join.title")}
            description={t("onboardingCard.join.description")}
            icon={<IconQr />}
            buttonText={t("onboardingCard.join.button")}
            onClick={onJoinTeam}
          />
          <ChoiceCard
            step={3}
            title={t("onboardingCard.skip.title")}
            description={t("onboardingCard.skip.description")}
            icon={<IconEye />}
            buttonText={t("onboardingCard.skip.button")}
            onClick={onSkip}
          />
        </div>
      </div>
    </section>
  );
}
