import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Hero } from "@/components/site/hero";
import { StructuredData } from "@/components/site/structured-data";
import { siteConfig } from "@/config/site";
import {
  isLocale,
  localeDetails,
  locales,
  type Locale,
} from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

function languageAlternates() {
  return {
    ...Object.fromEntries(locales.map((locale) => [locale, `/${locale}`])),
    "x-default": "/pl",
  };
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);
  const currentLocale = localeDetails[locale];

  return {
    title: dictionary.seo.title,
    description: dictionary.seo.description,
    alternates: {
      canonical: `/${locale}`,
      languages: languageAlternates(),
    },
    openGraph: {
      type: "website",
      url: `/${locale}`,
      siteName: siteConfig.businessName,
      locale: currentLocale.ogLocale,
      alternateLocale: locales
        .filter((item) => item !== locale)
        .map((item) => localeDetails[item].ogLocale),
      title: dictionary.seo.ogTitle,
      description: dictionary.seo.ogDescription,
      images: [
        {
          url: siteConfig.heroImage,
          width: 1672,
          height: 941,
          alt: dictionary.hero.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dictionary.seo.ogTitle,
      description: dictionary.seo.ogDescription,
      images: [siteConfig.heroImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocalePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale as Locale);

  return (
    <>
      <StructuredData locale={locale} dictionary={dictionary} />
      <Hero locale={locale} dictionary={dictionary} />
    </>
  );
}
