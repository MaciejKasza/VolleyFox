import { Link, useLocation, useNavigate } from "react-router-dom";
import { PATHS } from "../../router/paths";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../contexts/auth/AuthContext";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormValues } from "../../validation/auth";
import type { ApiError } from "../../services/http";
import { useEffect } from "react";

export default function Login() {
  const { t } = useTranslation();
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || PATHS.app;
  useEffect(() => {
    if (user) {
      navigate(PATHS.app);
    }
  }, [user]);

  const {
    register,
    handleSubmit,
    setError,
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
    try {
      await login(values.email, values.password);
      navigate(from, { replace: true });
    } catch (e) {
      const err = e as ApiError;
      // Błąd globalny zwracany z API
      setError("root", {
        type: "server",
        message: `errors.api.${err.code}`, // klucz i18n (polecane)
      });
    }
  }

  const inputClass =
    "w-full rounded-xl border border-border bg-bg/40 px-4 py-2 text-fg placeholder:text-muted outline-none transition focus:border-accent/70 focus:ring-2 focus:ring-accent/25";

  return (
    <div>
      <h1 className="text-2xl font-bold">{t("auth.titleLogin")}</h1>

      <form className="mt-6 space-y-3" onSubmit={handleSubmit(onSubmit)}>
        {errors.root?.message ? (
          <div
            role="alert"
            className={[
              "flex items-start gap-3 rounded-2xl",
              "border border-red-500/40 bg-red-500/10",
              "px-4 py-3",
              "text-sm text-red-200",
              "shadow-[0_0_0_1px_rgba(239,68,68,0.12)]",
            ].join(" ")}
          >
            {/* icon */}
            <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-500/20 text-red-200">
              !
            </span>

            <div className="min-w-0">
              <div className="mt-0.5 leading-relaxed">
                {t(errors.root.message)}
              </div>
            </div>
          </div>
        ) : null}
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
