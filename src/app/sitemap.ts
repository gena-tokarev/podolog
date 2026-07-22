import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { locales } from "@/i18n/config";

const languageUrls = Object.fromEntries(
  locales.map((locale) => [locale, `${siteConfig.siteUrl}/${locale}`]),
);

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: `${siteConfig.siteUrl}/${locale}`,
    changeFrequency: "monthly",
    priority: locale === "pl" ? 1 : 0.8,
    images: [`${siteConfig.siteUrl}${siteConfig.heroImage}`],
    alternates: {
      languages: {
        ...languageUrls,
        "x-default": `${siteConfig.siteUrl}/pl`,
      },
    },
  }));
}
