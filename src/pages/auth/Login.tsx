import { Link, useLocation, useNavigate } from "react-router-dom";
import { PATHS } from "../../router/paths";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../contexts/auth/AuthContext";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormValues } from "../../validation/auth";

export default function Login() {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || PATHS.app;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  async function onSubmit(values: LoginFormValues) {
    // TODO: tu podepniesz API logowania
    console.log("login", values);

    login();
    navigate(from, { replace: true });
  }

  const inputClass =
    "w-full rounded-xl border border-border bg-bg/40 px-4 py-2 text-fg placeholder:text-muted outline-none transition focus:border-accent/70 focus:ring-2 focus:ring-accent/25";

  return (
    <div>
      <h1 className="text-2xl font-bold">{t("auth.titleLogin")}</h1>

      <form className="mt-6 space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-1">
          <input
            className={inputClass}
            placeholder={t("auth.email")}
            autoComplete="email"
            {...register("email")}
          />
          {errors.email?.message ? (
            <p className="text-sm text-red-400">{t(errors.email.message)}</p>
          ) : null}
        </div>

        <div className="space-y-1">
          <input
            className={inputClass}
            placeholder={t("auth.password")}
            type="password"
            autoComplete="current-password"
            {...register("password")}
          />
          {errors.password?.message ? (
            <p className="text-sm text-red-400">{t(errors.password.message)}</p>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={[
            "w-full rounded-xl bg-accent px-4 py-2 font-semibold text-accentfg cursor-pointer",
            "hover:opacity-90 active:opacity-80",
            isSubmitting ? "opacity-70 cursor-waiting" : "",
          ].join(" ")}
        >
          {t("auth.login")}
        </button>
      </form>

      <p className="mt-4 text-sm text-muted">
        {t("auth.noAccount")}{" "}
        <Link
          to={PATHS.register}
          className="text-accent underline hover:opacity-90"
        >
          {t("auth.register")}
        </Link>
      </p>
    </div>
  );
}
