import "server-only";

import pl from "./locales/pl.json";
import type { Locale } from "./config";

const dictionaries = {
  pl: () => import("./locales/pl.json").then((module) => module.default),
  ru: () => import("./locales/ru.json").then((module) => module.default),
  en: () => import("./locales/en.json").then((module) => module.default),
  uk: () => import("./locales/uk.json").then((module) => module.default),
};

export type Dictionary = typeof pl;

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
