import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../router/paths";
import { useTranslation } from "react-i18next";
import { teamService } from "../../services/teamService";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createClubSchema,
  type CreateClubFormValues,
} from "../../validation/club";
import type { ApiError } from "../../services/http";
import { Header } from "../../components/pageHeader/Header";

const inputClass =
  "w-full rounded-xl border border-border bg-bg/40 px-4 py-2 text-fg placeholder:text-muted outline-none transition focus:border-accent/70 focus:ring-2 focus:ring-accent/25";

const labelClass = "text-sm font-semibold text-muted";

const buttonPrimary =
  "rounded-xl bg-accent px-5 py-2.5 font-semibold text-accentfg hover:opacity-90 active:opacity-80 cursor-pointer";

const buttonGhost =
  "rounded-xl border border-[rgb(var(--accent))] bg-transparent px-5 py-2.5 font-semibold text-white transition cursor-pointer hover:bg-[rgb(var(--accent))] hover:text-[rgb(var(--accent-fg))] active:opacity-85";

function isValidUrl(v: string) {
  try {
    new URL(v);
    return true;
  } catch {
    return false;
  }
}

export default function CreateClub() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreateClubFormValues>({
    resolver: zodResolver(createClubSchema),
    defaultValues: {
      name: "",
      city: "",
      description: "",
      logoUrl: "",
    },
    mode: "onSubmit",
  });

  const name = watch("name");
  const city = watch("city");
  const description = watch("description");
  const logoUrl = watch("logoUrl");

  const logoPreview = useMemo(() => {
    const v = (logoUrl ?? "").trim();
    if (!v) return null;
    if (!isValidUrl(v)) return null;
    return v;
  }, [logoUrl]);

  function onCancel() {
    navigate(PATHS.app, { replace: false });
  }

  async function onSubmit(values: CreateClubFormValues) {
    try {
      const club = await teamService.create({
        name: values.name.trim(),
        city: values.city.trim(),
        description: values.description?.trim() || undefined,
        logoUrl: values.logoUrl?.trim() || undefined,
      });

      navigate(PATHS.app, { replace: true });
    } catch (e) {
      const err = e as ApiError;

      // na teraz globalny błąd (później podepniemy fieldErrors z API)
      setError("root", {
        type: "server",
        message: `errors.api.${err.code}`,
      });
    }
  }

  return (
    <div className="space-y-6">
      <Header title={t("createClub.title")} subtitle={t("createClub.header")} />

      {/* Global error */}
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
          <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-500/20 text-red-200">
            !
          </span>
          <div className="min-w-0">
            <div className="font-semibold text-red-100">
              {t("common.error") ?? "Błąd"}
            </div>
            <div className="mt-0.5 leading-relaxed">
              {t(errors.root.message)}
            </div>
          </div>
        </div>
      ) : null}
      <div className="rounded-3xl border border-border bg-surface p-6 shadow">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-8 lg:grid-cols-[1.6fr_1fr]"
        >
          <div className="space-y-5">
            <div className="space-y-2">
              <label className={labelClass}>{t("createClub.name")}</label>
              <input
                className={inputClass}
                placeholder={t("createClub.namePlaceholder")}
                {...register("name")}
              />
              {errors.name?.message ? (
                <p className="text-sm text-red-400">{t(errors.name.message)}</p>
              ) : null}
              <p className="text-xs text-muted">{t("createClub.nameTip")}</p>
            </div>

            <div className="space-y-2">
              <label className={labelClass}>{t("createClub.city")}</label>
              <input
                className={inputClass}
                placeholder={t("createClub.cityPlaceholder")}
                {...register("city")}
              />
              {errors.city?.message ? (
                <p className="text-sm text-red-400">{t(errors.city.message)}</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <label className={labelClass}>
                {t("createClub.description")}
              </label>
              <textarea
                className={`${inputClass} min-h-[120px] resize-none`}
                placeholder={t("createClub.descriptionPlaceholder")}
                {...register("description")}
              />
              {errors.description?.message ? (
                <p className="text-sm text-red-400">
                  {t(errors.description.message)}
                </p>
              ) : null}
              <p className="text-xs text-muted">
                {t("createClub.descriptionTip")}
              </p>
            </div>

            <div className="space-y-2">
              <label className={labelClass}>{t("createClub.url")}</label>
              <input
                className={inputClass}
                placeholder={t("createClub.urlPlaceholder")}
                {...register("logoUrl")}
              />
              {errors.logoUrl?.message ? (
                <p className="text-sm text-red-400">
                  {t(errors.logoUrl.message)}
                </p>
              ) : null}
              <p className="text-xs text-muted">{t("createClub.urlTip")}</p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button type="button" className={buttonGhost} onClick={onCancel}>
                {t("createClub.buttonCancel")}
              </button>
              <button
                type="submit"
                className={buttonPrimary}
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? (t("createClub.creating") ?? "Tworzenie...")
                  : t("createClub.buttonCreate")}
              </button>
            </div>
          </div>

          {/* Preview */}
          <div className="rounded-2xl border border-border bg-bg/30 p-5">
            <div className="text-sm font-semibold text-muted">
              {t("createClub.preview")}
            </div>

            <div className="mt-4 flex items-center gap-4">
              <div className="grid h-16 w-16 place-items-center overflow-hidden rounded-2xl border border-border bg-surface">
                {logoPreview ? (
                  <img
                    src={logoPreview}
                    alt={t("createClub.imgAlt")}
                    className="h-full w-full object-cover"
                    onError={() => {
                      // placeholder bez crasha
                    }}
                  />
                ) : (
                  <span className="text-xs font-bold text-muted">
                    {t("createClub.logo")}
                  </span>
                )}
              </div>

              <div className="min-w-0">
                <div className="truncate text-lg font-extrabold text-fg">
                  {name?.trim() ? name : t("createClub.name")}
                </div>
                <div className="text-sm text-muted">
                  {city?.trim() ? city : t("createClub.city")}
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-border bg-surface p-4">
              <div className="text-xs font-semibold text-muted">
                {t("createClub.desc")}
              </div>
              <p className="min-h-[200px] mt-2 text-sm leading-relaxed text-fg/90">
                {description?.trim()
                  ? description
                  : t("createClub.descriptionPreview")}
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
