import { mapsUrl, postalStreetAddress, siteConfig } from "@/config/site";
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
    telephone: siteConfig.contact.phone,
    url: `${siteConfig.siteUrl}/${locale}`,
    image: `${siteConfig.siteUrl}${siteConfig.heroImage}`,
    hasMap: mapsUrl,
    address: {
      "@type": "PostalAddress",
      name: siteConfig.address.building,
      streetAddress: postalStreetAddress,
      postalCode: siteConfig.address.postalCode,
      addressLocality: siteConfig.address.city,
      addressRegion: "Mazowieckie",
      addressCountry: siteConfig.address.country,
    },
    areaServed: {
      "@type": "Place",
      name: "Warszawa Wola",
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
    sameAs: [
      siteConfig.social.facebookUrl,
      siteConfig.social.instagramUrl,
    ].filter(Boolean),
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
