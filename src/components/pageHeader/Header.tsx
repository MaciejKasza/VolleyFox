import { use, useState } from "react";
import { useAuth } from "../../contexts/auth/AuthContext";
import { Avatar } from "../common/Avatar";
import { useNavigate } from "react-router";
import { PATHS } from "../../router/paths";

const buttonStyle = [
  "relative grid h-10 w-10 place-items-center rounded-2xl transition",
  "border border-border bg-surface text-white",
  "hover:border-[rgb(var(--accent))]",
  "cursor-pointer focus:outline-none",
].join(" ");

const BellIcon = () => {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5">
      <path
        d="M12 22a2.2 2.2 0 0 0 2.2-2.2H9.8A2.2 2.2 0 0 0 12 22Zm7-6.5V11a7 7 0 1 0-14 0v4.5L3.5 17v1.2h17V17L19 15.5Z"
        fill="currentColor"
      />
    </svg>
  );
};

const LogoutIcon = () => {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M10 4c-2.2 0-4 1.8-4 4v8c0 2.2 1.8 4 4 4h4.2c-.2-.6-.2-1.3-.2-2H10c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2h4c0-.7.1-1.4.3-2H10Zm5.6 5.2 1.9 1.8H12v2h5.5l-1.9 1.8 1.4 1.4L22 12l-5-4.2-1.4 1.4Z"
      />
    </svg>
  );
};

const SettingsIcon = () => {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M19.1 13.6c.1-.5.1-1 .1-1.6s0-1.1-.1-1.6l2-1.5c.2-.1.2-.4.1-.6l-1.9-3.3c-.1-.2-.4-.3-.6-.2l-2.3.9c-.8-.6-1.7-1.1-2.7-1.4l-.3-2.4c0-.2-.2-.4-.5-.4H9.1c-.2 0-.4.2-.5.4l-.3 2.4c-1 .3-1.9.8-2.7 1.4l-2.3-.9c-.2-.1-.5 0-.6.2L.8 7.3c-.1.2-.1.5.1.6l2 1.5c-.1.5-.1 1-.1 1.6s0 1.1.1 1.6l-2 1.5c-.2.1-.2.4-.1.6l1.9 3.3c.1.2.4.3.6.2l2.3-.9c.8.6 1.7 1.1 2.7 1.4l.3 2.4c0 .2.2.4.5.4h3.8c.2 0 .4-.2.5-.4l.3-2.4c1-.3 1.9-.8 2.7-1.4l2.3.9c.2.1.5 0 .6-.2l1.9-3.3c.1-.2.1-.5-.1-.6l-2-1.5ZM12 15.2A3.2 3.2 0 1 1 12 8.8a3.2 3.2 0 0 1 0 6.4Z"
      />
    </svg>
  );
};

export const Header = ({
  title,
  subtitle,
}: {
  title?: string;
  subtitle?: string;
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between mb-5">
      <div className="text-xl text-fg">
        <h1 className="text-3xl font-extrabold tracking-tight text-fg">
          {title}
        </h1>
        <p className="mt-1 text-sm text-muted">{subtitle}</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 overflow-hidden rounded-full border border-border bg-bg/30">
            <Avatar src={user?.avatarUrl ?? ""} alt={"User Avatar"} />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-bold text-fg">{user?.name}</div>
            <div className="text-xs text-muted">{user?.email}</div>
          </div>
        </div>
        <button
          type="button"
          className={buttonStyle}
          aria-label="Notifications"
        >
          <BellIcon />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[rgb(var(--accent))]" />
        </button>
        <button
          type="button"
          className={buttonStyle}
          aria-label="Settings"
          onClick={() => navigate(PATHS.profile)}
        >
          <SettingsIcon />
        </button>
        <button
          type="button"
          className={buttonStyle}
          aria-label="Logout"
          onClick={() => navigate(PATHS.logout)}
        >
          <LogoutIcon />
        </button>
      </div>
    </div>
  );
};
