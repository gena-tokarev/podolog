export const siteConfig = {
  businessName: "Gabinet Podologiczny Wola",
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
    facebookUrl:
      "https://www.facebook.com/people/Podolog-Warszawa/61565163163955",
    instagramUrl: "https://www.instagram.com/podolog_warsaw",
  },
  bookingUrl:
    "https://booksy.com/pl-pl/297783_podolog-warszawa-wola_podologia_3_warszawa",
  siteUrl: "https://podolog-warsaw.pl",
  heroImage: "/images/podology-practice-warsaw.png",
  heroImageSize: {
    width: 1536,
    height: 1024,
  },
} as const;

export const postalStreetAddress = `${siteConfig.address.street}, piętro ${siteConfig.address.floor}, gabinet ${siteConfig.address.office}`;

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${siteConfig.address.street}, ${siteConfig.address.city}`)}`;
