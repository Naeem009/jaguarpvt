import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";

type LocaleParams = Promise<{ locale: string }>;

export async function prepareLocale(params: LocaleParams): Promise<Locale> {
  const { locale } = await params;
  setRequestLocale(locale);
  return locale as Locale;
}
