import { useMemo } from "react";
import { Header } from "../../../components/pageHeader/Header";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../../router/paths";

const card = "rounded-3xl border border-border bg-surface p-6 shadow";

const innerCard = "rounded-2xl border border-border bg-bg/30 p-3";

const pill =
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold";

const buttonNeon =
  "rounded-xl border border-[rgb(var(--accent))] bg-transparent px-4 py-2 text-sm font-semibold text-white transition cursor-pointer hover:bg-[rgb(var(--accent))] hover:text-[rgb(var(--accent-fg))] active:opacity-85";

const buttonBlue =
  "rounded-xl bg-surface2 px-4 py-2 text-sm font-semibold text-fg hover:opacity-90 active:opacity-80 cursor-pointer";

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join("");

  return (
    <div className="grid aspect-1/1 w-full place-items-center rounded-full border border-border bg-bg/40 text-xs font-extrabold text-fg">
      {initials || "CL"}
    </div>
  );
}

export default function ClubDashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // ===== MOCK DATA (na teraz) =====
  const club = {
    name: "Test",
    city: "Test",
    description: "Krótki opis / cele sezonu / kontakt.",
    status: "do potwierdzenia",
    season: "2025/26",
    league: "III liga",
    group: "Grupa A",
    notifications: 2,
    playersCount: 12,
    matchesThisMonth: 3,
    trainingAttendance: 86,
  };

  const nextMatch = {
    day: "Sob",
    time: "17:00",
    vs: "Skra II",
    place: "Hala MOSiR",
    cta: "Potwierdź skład",
  };

  const nextTraining = {
    day: "Wt",
    time: "19:30",
    place: "Hala SP 12",
    availability: "Dostępność: 9/12",
  };

  const activity = [
    { time: "Dzisiaj 09:12", text: "Kuba K. potwierdził obecność na treningu" },
    { time: "Wczoraj 20:41", text: "Dodano mecz: Skra II (dom)" },
    {
      time: "Wczoraj 18:05",
      text: "Ogłoszenie: Zmiana godziny treningu na 19:30",
    },
  ];

  // ===== UI helpers =====
  const title = useMemo(() => club.name, [club.name]);

  return (
    <div>
      {/* top header row (tytuł + ustawienia) */}
      <Header
        title={t("common.header.club.dashboard")}
        subtitle={t("common.header.club.dashboardSubtitle")}
      />

      {/* main */}
      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        {/* LEFT: basic info */}
        <section className={card}>
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-2xl font-extrabold text-fg">
              {t("club.dashboard.basicInfo") || "Podstawowe informacje"}
            </h2>

            <span
              className={`${pill} bg-sky-500/20 text-sky-200 border border-sky-500/30`}
            >
              {t("club.dashboard.status") || "Status"}: {club.status}
            </span>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-12">
            <div className={`col-span-2 p-1 flex items-center justify-center`}>
              <Avatar name={club.name} />
            </div>
            <div className={`${innerCard} col-span-5`}>
              <div className="text-xs font-semibold text-muted">
                {t("createClub.name") || "Nazwa klubu"}
              </div>
              <div className="mt-1 text-lg font-extrabold text-fg">
                {club.name}
              </div>
            </div>

            <div className={`${innerCard} col-span-5`}>
              <div className="text-xs font-semibold text-muted">
                {t("createClub.city") || "Miasto"}
              </div>
              <div className="mt-1 text-lg font-extrabold text-fg">
                {club.city}
              </div>
            </div>
          </div>

          {/* stats row */}
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className={innerCard}>
              <div className="text-xs font-semibold text-muted">
                {t("club.dashboard.players") || "Zawodnicy"}
              </div>
              <div className="mt-2 text-3xl font-extrabold text-fg">
                {club.playersCount}
              </div>
            </div>

            <div className={innerCard}>
              <div className="text-xs font-semibold text-muted">
                {t("club.dashboard.matchesThisMonth") || "Mecze w tym miesiącu"}
              </div>
              <div className="mt-2 text-3xl font-extrabold text-fg">
                {club.matchesThisMonth}
              </div>
            </div>

            <div className={innerCard}>
              <div className="text-xs font-semibold text-muted">
                {t("club.dashboard.attendance") || "Frekwencja treningów"}
              </div>
              <div className="mt-2 text-3xl font-extrabold text-fg">
                {club.trainingAttendance}%
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT: overview */}
        <aside className={card}>
          <h2 className="text-2xl font-extrabold text-fg">
            {t("club.dashboard.overview") || "Przegląd"}
          </h2>

          {/* next match */}
          <div className={`mt-4 ${innerCard}`}>
            <div className="text-xs font-semibold text-muted">
              {t("club.dashboard.nextMatch") || "Najbliższy mecz"}
            </div>
            <div className="mt-2 text-sm text-fg">
              {nextMatch.day}, {nextMatch.time} • vs. {nextMatch.vs}
            </div>
            <div className="text-sm text-muted">
              {nextMatch.place} • {nextMatch.cta}
            </div>
          </div>

          {/* next training */}
          <div className={`mt-4 ${innerCard}`}>
            <div className="text-xs font-semibold text-muted">
              {t("club.dashboard.nextTraining") || "Najbliższy trening"}
            </div>
            <div className="mt-2 text-sm text-fg">
              {nextTraining.day}, {nextTraining.time} • {nextTraining.place}
            </div>
            <div className="text-sm text-muted">
              {nextTraining.availability}
            </div>
          </div>

          {/* quick actions */}
          <div className={`mt-4 ${innerCard}`}>
            <div className="text-xs font-semibold text-muted">
              {t("club.dashboard.quickActions") || "Szybkie akcje"}
            </div>
            <div className="mt-3 flex flex-wrap gap-3">
              <button className={buttonBlue} type="button">
                {t("club.dashboard.addMatch") || "Dodaj mecz"}
              </button>
              <button className={buttonBlue} type="button">
                {t("club.dashboard.addTraining") || "Dodaj trening"}
              </button>
              <button className={buttonBlue} type="button">
                {t("club.dashboard.sendAnnouncement") || "Wyślij ogłoszenie"}
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* ACTIVITY */}
      <section className={card}>
        <h2 className="text-2xl font-extrabold text-fg">
          {t("club.dashboard.activity") || "Aktywność"}
        </h2>

        <div className="mt-5 space-y-3">
          {activity.map((a, idx) => (
            <div key={idx} className={`${innerCard} flex items-center gap-4`}>
              <div className="text-xs text-muted min-w-[92px]">{a.time}</div>
              <div className="text-sm text-fg">{a.text}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
