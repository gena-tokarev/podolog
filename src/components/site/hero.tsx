import { Check, MapPin, Phone } from "lucide-react";
import Image from "next/image";

import { buttonVariants } from "@/components/ui/button";
import { mapsUrl, siteConfig } from "@/config/site";
import BooksyIcon from "@/icons/booksy.svg";
import FacebookIcon from "@/icons/facebook.svg";
import InstagramIcon from "@/icons/instagram.svg";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

import { LanguageSwitcher } from "./language-switcher";

type HeroProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function Hero({ locale, dictionary }: HeroProps) {
  const { hero } = dictionary;

  return (
    <section className="relative isolate flex min-h-[100dvh] w-full overflow-hidden bg-[#15271f] text-white">
      <Image
        src={siteConfig.heroImage}
        alt={hero.imageAlt}
        fill
        preload
        sizes="100vw"
        className="-z-30 object-cover object-[66%_center] sm:object-center"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(10,27,21,.7)_0%,rgba(17,39,31,.45)_40%,rgba(9,24,19,.78)_100%)] md:bg-[linear-gradient(90deg,rgba(8,25,19,.88)_0%,rgba(13,34,27,.76)_42%,rgba(13,31,25,.3)_77%,rgba(9,22,18,.45)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-30 [background-image:radial-gradient(circle_at_50%_42%,rgba(255,255,255,.12),transparent_48%)]"
      />

      <header className="absolute inset-x-0 top-0 z-10">
        <div className="mx-auto flex w-full max-w-[90rem] items-center justify-between gap-4 px-4 py-5 sm:px-8 sm:py-7 lg:px-12">
          <div className="flex items-center gap-3" aria-label={siteConfig.businessName}>
            <span
              aria-hidden="true"
              className="grid size-10 place-items-center rounded-full border border-white/30 bg-white/10 font-heading text-lg italic backdrop-blur-sm"
            >
              P
            </span>
            <span className="hidden text-xs font-semibold uppercase tracking-[0.22em] text-white/90 md:block">
              {siteConfig.shortName}
            </span>
          </div>
          <LanguageSwitcher
            currentLocale={locale}
            label={dictionary.languageSwitcher}
          />
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-5xl flex-1 items-center justify-center px-5 py-28 sm:px-8 sm:py-32 lg:px-12">
        <main className="flex w-full flex-col items-center text-center">
          <p className="mb-5 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[#e7d7b4] sm:text-xs sm:tracking-[0.3em]">
            {hero.eyebrow}
          </p>

          <h1 className="max-w-4xl font-heading text-[clamp(3.6rem,9vw,7.75rem)] font-medium leading-[0.82] tracking-[-0.045em] text-balance drop-shadow-sm">
            {hero.heading}
          </h1>

          <p className="mt-6 max-w-3xl text-sm leading-6 text-white/78 sm:text-base sm:leading-7">
            {hero.intro}
          </p>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={hero.mapsLabel}
            className="mt-5 flex max-w-3xl items-start justify-center gap-2 rounded-sm text-sm font-medium text-white/92 underline decoration-white/35 underline-offset-4 transition-colors hover:text-white hover:decoration-white/75 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:text-base"
          >
            <MapPin
              aria-hidden="true"
              className="mt-0.5 size-4 shrink-0 text-[#e7d7b4]"
            />
            <span className="sr-only">{hero.addressLabel}: </span>
            <address className="text-balance not-italic">{hero.address}</address>
          </a>

          <div className="my-7 h-px w-16 bg-[#e7d7b4]/60 sm:my-8" />

          <div className="w-full max-w-[52rem]" aria-labelledby="services-heading">
            <h2 id="services-heading" className="sr-only">
              {hero.servicesLabel}
            </h2>
            <ul className="grid grid-cols-1 gap-x-8 gap-y-2.5 text-left sm:grid-cols-2 sm:gap-y-3">
              {hero.services.map((service) => (
                <li
                  key={service}
                  className="flex items-start gap-2.5 text-sm leading-5 text-white/90 sm:text-[0.95rem] sm:leading-6"
                >
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border border-[#e7d7b4]/45 bg-[#e7d7b4]/10 text-[#f5e7c9]">
                    <Check aria-hidden="true" className="size-3" strokeWidth={2.25} />
                  </span>
                  {service}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex w-full max-w-4xl flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            <a
              href={siteConfig.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={hero.ctaLabel}
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-14 w-full rounded-full bg-[#f2e2be] px-7 text-sm font-bold text-[#17352b] shadow-[0_14px_50px_rgba(0,0,0,.24)] transition-all hover:-translate-y-0.5 hover:bg-[#fff2d6] hover:shadow-[0_18px_56px_rgba(0,0,0,.3)] focus-visible:ring-[#f2e2be]/60 sm:h-16 sm:w-auto sm:px-8 sm:text-base",
              )}
            >
              <BooksyIcon
                aria-hidden="true"
                className="size-[1.4rem]"
              />
              {hero.cta}
            </a>

            <a
              href={siteConfig.contact.phoneHref}
              aria-label={`${hero.callLabel}: ${siteConfig.contact.phone}`}
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "h-14 rounded-full border-white/25 bg-[#10261f]/55 px-5 text-sm font-semibold text-white shadow-lg shadow-black/10 backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/12 hover:text-white focus-visible:ring-white/40 sm:h-16 sm:px-6 sm:text-base",
              )}
            >
              <Phone aria-hidden="true" className="size-[1.15rem]" strokeWidth={1.7} />
              <span>{siteConfig.contact.phone}</span>
            </a>

            {siteConfig.social.facebookUrl ? (
              <a
                href={siteConfig.social.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={hero.facebookLabel}
                className="grid size-14 place-items-center rounded-full border border-white/25 bg-[#10261f]/55 text-white shadow-lg shadow-black/10 backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/12 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:size-16"
              >
                <FacebookIcon
                  aria-hidden="true"
                  className="size-[1.1rem]"
                />
              </a>
            ) : (
              <span
                role="link"
                aria-disabled="true"
                aria-label={hero.facebookLabel}
                className="grid size-14 cursor-not-allowed place-items-center rounded-full border border-white/15 bg-[#10261f]/35 text-white/55 backdrop-blur-md sm:size-16"
              >
                <FacebookIcon
                  aria-hidden="true"
                  className="size-[1.1rem]"
                />
              </span>
            )}

            {siteConfig.social.instagramUrl ? (
              <a
                href={siteConfig.social.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={hero.instagramLabel}
                className="grid size-14 place-items-center rounded-full border border-white/25 bg-[#10261f]/55 text-white shadow-lg shadow-black/10 backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/12 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:size-16"
              >
                <InstagramIcon
                  aria-hidden="true"
                  className="size-[1.1rem]"
                />
              </a>
            ) : (
              <span
                role="link"
                aria-disabled="true"
                aria-label={hero.instagramLabel}
                className="grid size-14 cursor-not-allowed place-items-center rounded-full border border-white/15 bg-[#10261f]/35 text-white/55 backdrop-blur-md sm:size-16"
              >
                <InstagramIcon
                  aria-hidden="true"
                  className="size-[1.1rem]"
                />
              </span>
            )}
          </div>
        </main>
      </div>

      <p className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 text-[0.62rem] font-medium uppercase tracking-[0.25em] text-white/45 lg:block">
        Warszawa • Wola
      </p>
    </section>
  );
}
