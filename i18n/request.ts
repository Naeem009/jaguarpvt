import { getRequestConfig } from "next-intl/server";
import { loadContentMessages } from "@/lib/i18n/content";
import { routing, type Locale } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale;
  }

  const uiMessages = (await import(`../messages/${locale}.json`)).default;
  const contentMessages = await loadContentMessages(locale as Locale);

  return {
    locale,
    messages: { ...uiMessages, ...contentMessages },
  };
});
