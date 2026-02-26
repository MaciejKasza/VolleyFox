import type { JSX } from "react/jsx-dev-runtime";

interface TeamIconProps {
  name: string;
  logoUrl: string | null;
}

export const TeamIcon = ({ name, logoUrl }: TeamIconProps): JSX.Element => {
  const acronym = name
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2); // maksymalnie 2 litery

  return (
    <div className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-bg/50 text-white overflow-hidden">
      {logoUrl ? (
        <img
          className="h-full w-full object-cover"
          src={logoUrl}
          alt={`${name} team logo`}
        />
      ) : (
        <span className="text-xs font-bold">{acronym}</span>
      )}
    </div>
  );
};
