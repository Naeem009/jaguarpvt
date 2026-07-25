import type { Locale } from "@/i18n/routing";
import en from "./en";

export type ContentMessages = typeof en;

export async function loadContentMessages(locale: Locale): Promise<ContentMessages> {
  try {
    const mod = await import(`./${locale}`);
    return mod.default as ContentMessages;
  } catch {
    return en;
  }
}

export function getContentMessages(locale: Locale): ContentMessages {
  return en;
}
