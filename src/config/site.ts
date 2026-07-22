export const siteConfig = {
  // Replace these placeholders before launch.
  businessName: "Gabinet Podologiczny Wola",
  shortName: "Podolog Wola",
  address: {
    street: "Kasprzaka 35/230",
    postalCode: "01-248",
    city: "Warszawa",
    district: "Wola",
    country: "PL",
  },
  contact: {
    phone: "+48 000 000 000",
    email: "kontakt@example.com",
  },
  bookingUrl:
    process.env.NEXT_PUBLIC_BOOKSY_URL ?? "https://booksy.com/pl-pl/",
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://podolog-wola.example",
  heroImage: "/images/podology-studio-warsaw.png",
} as const;

export const fullAddress = `${siteConfig.address.street}, ${siteConfig.address.postalCode} ${siteConfig.address.city}`;
