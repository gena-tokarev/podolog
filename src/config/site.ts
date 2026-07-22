function requiredPublicUrl(name: string, value: string | undefined) {
  if (!value) {
    throw new Error(`${name} must be set in .env before building the site.`);
  }

  return value;
}

export const siteConfig = {
  businessName: "Gabinet Podologiczny Wola",
  shortName: "Podolog Wola",
  address: {
    street: "Marcina Kasprzaka 31",
    floor: "2",
    office: "230",
    building: "Varsovia Apartamenty",
    postalCode: "01-234",
    city: "Warszawa",
    district: "Wola",
    country: "PL",
  },
  contact: {
    phone: "+48 571 354 599",
    phoneHref: "tel:+48571354599",
    email: "jadanart@gmail.com",
  },
  social: {
    facebookUrl: process.env.NEXT_PUBLIC_FACEBOOK_URL,
    instagramUrl: process.env.NEXT_PUBLIC_INSTAGRAM_URL,
  },
  bookingUrl: requiredPublicUrl(
    "NEXT_PUBLIC_BOOKSY_URL",
    process.env.NEXT_PUBLIC_BOOKSY_URL,
  ),
  siteUrl: requiredPublicUrl(
    "NEXT_PUBLIC_SITE_URL",
    process.env.NEXT_PUBLIC_SITE_URL,
  ),
  heroImage: "/images/podology-studio-warsaw.png",
} as const;

export const postalStreetAddress = `${siteConfig.address.street}, piętro ${siteConfig.address.floor}, gabinet ${siteConfig.address.office}`;

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${siteConfig.address.street}, ${siteConfig.address.city}`)}`;
