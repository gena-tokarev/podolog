export const locales = ["pl", "ru", "en", "uk"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "pl";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export const localeDetails: Record<
  Locale,
  { code: string; flag: string; name: string; ogLocale: string }
> = {
  pl: { code: "PL", flag: "🇵🇱", name: "Polski", ogLocale: "pl_PL" },
  ru: { code: "RU", flag: "🇷🇺", name: "Русский", ogLocale: "ru_RU" },
  en: { code: "EN", flag: "🇬🇧", name: "English", ogLocale: "en_GB" },
  uk: { code: "UK", flag: "🇺🇦", name: "Українська", ogLocale: "uk_UA" },
};
