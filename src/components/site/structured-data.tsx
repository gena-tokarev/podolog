import { fullAddress, siteConfig } from "@/config/site";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

type StructuredDataProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function StructuredData({ locale, dictionary }: StructuredDataProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": `${siteConfig.siteUrl}/#business`,
    name: siteConfig.businessName,
    description: dictionary.seo.description,
    url: `${siteConfig.siteUrl}/${locale}`,
    image: `${siteConfig.siteUrl}${siteConfig.heroImage}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      postalCode: siteConfig.address.postalCode,
      addressLocality: siteConfig.address.city,
      addressRegion: "Mazowieckie",
      addressCountry: siteConfig.address.country,
    },
    areaServed: {
      "@type": "Place",
      name: "Warszawa Wola",
      address: fullAddress,
    },
    availableLanguage: ["Polish", "Russian", "English", "Ukrainian"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: dictionary.hero.servicesLabel,
      itemListElement: dictionary.hero.services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service,
        },
      })),
    },
    potentialAction: {
      "@type": "ReserveAction",
      target: siteConfig.bookingUrl,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
