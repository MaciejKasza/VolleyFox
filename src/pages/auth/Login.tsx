import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth/AuthContext";
import { PATHS } from "../../router/paths";
import { useTranslation } from "react-i18next";

export default function Login() {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || PATHS.app;

  function handleLogin() {
    login();
    navigate(from, { replace: true });
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">{t("auth.titleLogin")}</h1>

      <form className="mt-6 space-y-3" onSubmit={(e) => e.preventDefault()}>
        <input
          className="w-full rounded-xl border border-border bg-bg/40 px-4 py-2 text-fg placeholder:text-muted outline-none transition focus:border-accent/70 focus:ring-2 focus:ring-accent/25"
          placeholder={t("auth.email")}
        />
        <input
          className="w-full rounded-xl border border-border bg-bg/40 px-4 py-2 text-fg placeholder:text-muted outline-none transition focus:border-accent/70 focus:ring-2 focus:ring-accent/25"
          placeholder={t("auth.password")}
          type="password"
        />
        <button
          type="button"
          onClick={handleLogin}
          className="w-full rounded-xl bg-accent px-4 py-2 font-semibold text-accentfg hover:opacity-90 active:opacity-80 cursor-pointer"
        >
          {t("auth.login")}
        </button>
      </form>

      <p className="mt-4 text-sm text-muted">
        {t("auth.noAccount")}{" "}
        <Link
          to={PATHS.register}
          className="text-accent underline hover:opacity-90 "
        >
          {t("auth.register")}
        </Link>
      </p>
    </div>
  );
}
