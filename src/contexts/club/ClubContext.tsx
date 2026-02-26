import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import { teamService, type Team } from "../../services/teamService";
import type { ApiError } from "../../services/http";

type ClubContextValue = {
  clubId: string | null;
  club: Team | null;
  isLoading: boolean;
  errorCode: string | null;
  refresh: () => Promise<void>;
  clear: () => void;
};

const ClubContext = createContext<ClubContextValue | null>(null);

export function ClubProvider({ children }: { children: React.ReactNode }) {
  const { clubId } = useParams<{ clubId: string }>();

  const [club, setClub] = useState<Team | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [errorCode, setErrorCode] = useState<string | null>(null);

  const refresh = async () => {
    if (!clubId) return;

    setLoading(true);
    setErrorCode(null);

    try {
      const data = await teamService.getById(clubId);
      setClub(data);
      console.log(data);
    } catch (e) {
      const err = e as ApiError;
      setClub(null);
      setErrorCode(err.code ?? "UNKNOWN");
    } finally {
      setLoading(false);
    }
  };

  const clear = () => {
    setClub(null);
    setErrorCode(null);
    setLoading(false);
  };

  // gdy zmieni się clubId w URL -> reset + fetch
  useEffect(() => {
    clear();
    if (clubId) void refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clubId]);

  const value = useMemo<ClubContextValue>(
    () => ({
      clubId: clubId ?? null,
      club,
      isLoading,
      errorCode,
      refresh,
      clear,
    }),
    [clubId, club, isLoading, errorCode],
  );

  return <ClubContext.Provider value={value}>{children}</ClubContext.Provider>;
}

export function useClub() {
  const ctx = useContext(ClubContext);
  if (!ctx) throw new Error("useClub must be used within ClubProvider");
  return ctx;
}
