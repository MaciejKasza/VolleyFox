import { useMemo, useState } from "react";
import PlayersListLayout from "../../../layouts/club/PlayersListLayout";
import PlayersListPanel from "../../../components/club/players/PlayersListPanel";
import PlayerDetailsPanel from "../../../components/club/players/PlayerDetailsPanel";

import { mockPlayers } from "../../../components/club/players/mock";
import type {
  Player,
  PlayerPosition,
} from "../../../components/club/players/types";
import { Header } from "../../../components/pageHeader/Header";
import { useTranslation } from "react-i18next";

export const ClubPlayersPage = () => {
  // docelowo: players z API
  const [players] = useState<Player[]>(mockPlayers);

  const [query, setQuery] = useState("");
  const [position, setPosition] = useState<PlayerPosition | "All">("All");
  const [selectedId, setSelectedId] = useState(players[0]?.id ?? "");

  const { t } = useTranslation();

  const selected = useMemo(
    () => players.find((p) => p.id === selectedId) ?? null,
    [players, selectedId],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return players.filter((p) => {
      const okQ =
        !q || p.name.toLowerCase().includes(q) || String(p.number).includes(q);
      const okPos = position === "All" || p.position === position;
      return okQ && okPos;
    });
  }, [players, query, position]);

  return (
    <PlayersListLayout
      topbar={
        <Header
          title={t("common.header.club.playersList")}
          subtitle={t("common.header.club.playersListSubtitle")}
        />
      }
      left={
        <PlayersListPanel
          title="Zawodnicy"
          query={query}
          onQueryChange={setQuery}
          position={position}
          onPositionChange={setPosition}
          players={filtered}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onAddPlayer={() => console.log("add player")}
        />
      }
      right={
        <PlayerDetailsPanel
          player={selected}
          onOpenProfile={() => console.log("open profile", selected?.id)}
          onEdit={() => console.log("edit", selected?.id)}
          onDelete={() => console.log("delete", selected?.id)}
        />
      }
    />
  );
};
