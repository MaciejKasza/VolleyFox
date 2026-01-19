import { useTranslation } from "react-i18next";
import { Outlet, Link } from "react-router-dom";

export default function AuthLayout() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen grid place-items-center bg-bg text-fg px-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow">
        <Link to="/" className="block text-center font-bold text-4xl">
          {t("common.appName1")}
          <span className="text-accent">{t("common.appName2")}</span>
        </Link>

        <div className="mt-6">
          <Outlet />
        </div>

        <p className="mt-6 text-center text-sm text-muted">
          © {new Date().getFullYear()} {t("common.appName")}
        </p>
      </div>
    </div>
  );
}
