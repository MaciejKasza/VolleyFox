import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../contexts/auth/AuthContext";
import { PATHS } from "../../router/paths";

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
          className="w-full rounded-xl border px-4 py-2"
          placeholder={t("common.email")}
        />
        <input
          className="w-full rounded-xl border px-4 py-2"
          placeholder={t("common.password")}
          type="password"
        />

        <button
          type="button"
          onClick={handleLogin}
          className="w-full rounded-xl bg-indigo-500 px-4 py-2 font-semibold text-white"
        >
          {t("common.login")}
        </button>
      </form>

      <p className="mt-4 text-sm">
        {t("auth.noAccount")}{" "}
        <Link to={PATHS.register} className="underline">
          {t("common.register")}
        </Link>
      </p>
    </div>
  );
}
