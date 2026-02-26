import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth/AuthContext";
import { PATHS } from "../../router/paths";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormValues } from "../../validation/auth";
import type { ApiError } from "../../services/http";
import { useEffect } from "react";

export default function Register() {
  const { t } = useTranslation();
  const { registerAndLogin, user } = useAuth();
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
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onSubmit", // możesz zmienić na "onBlur"
  });

  async function onSubmit(values: RegisterFormValues) {
    try {
      await registerAndLogin(values.email, values.password);
      navigate(from, { replace: true });
    } catch (e) {
      const err = e as ApiError;

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
      <h1 className="text-2xl font-bold">{t("auth.titleRegister")}</h1>

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
            autoComplete="new-password"
            {...register("password")}
          />
          {errors.password?.message ? (
            <p className="text-sm text-red-400">{t(errors.password.message)}</p>
          ) : null}
        </div>

        <div className="space-y-1">
          <input
            className={inputClass}
            placeholder={t("auth.repeatPassword")}
            type="password"
            autoComplete="new-password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword?.message ? (
            <p className="text-sm text-red-400">
              {t(errors.confirmPassword.message)}
            </p>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={[
            "w-full rounded-xl bg-accent px-4 py-2 font-semibold text-accentfg cursor-pointer",
            "hover:opacity-90 active:opacity-80",
            isSubmitting ? "opacity-70 cursor-wait" : "",
          ].join(" ")}
        >
          {t("auth.register")}
        </button>
      </form>

      <p className="mt-4 text-sm text-muted">
        {t("auth.haveAccount")}{" "}
        <Link
          to={PATHS.login}
          className="text-accent underline hover:opacity-90"
        >
          {t("auth.loginAccount")}
        </Link>
      </p>
    </div>
  );
}
