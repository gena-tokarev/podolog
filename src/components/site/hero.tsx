import { Check, MapPin, Phone } from "lucide-react";
import Image from "next/image";

import { buttonVariants } from "@/components/ui/button";
import { mapsUrl, siteConfig } from "@/config/site";
import FacebookIcon from "@/icons/facebook.svg";
import InstagramIcon from "@/icons/instagram.svg";
import PodologyLogo from "@/icons/podology-logo.svg";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

import { LanguageSwitcher } from "./language-switcher";
import { BooksyButton } from "./booksy-button";

type HeroProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function Hero({ locale, dictionary }: HeroProps) {
  const { hero } = dictionary;

  return (
    <section
      data-site-hero
      className="relative isolate flex min-h-[100dvh] w-full overflow-hidden bg-[#15271f] text-white"
    >
      <Image
        src={siteConfig.heroImage}
        alt={hero.imageAlt}
        fill
        preload
        sizes="100vw"
        data-hero-background
        className="-z-30 object-cover object-[68%_center] saturate-[0.82] contrast-[0.96] brightness-[0.92] sm:object-center"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(12,30,24,.76)_0%,rgba(17,38,30,.62)_42%,rgba(8,23,18,.84)_100%)] md:bg-[linear-gradient(90deg,rgba(8,27,21,.82)_0%,rgba(12,33,26,.7)_40%,rgba(14,34,27,.58)_72%,rgba(8,25,20,.64)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 [background-image:radial-gradient(circle_at_50%_42%,transparent_22%,rgba(4,16,12,.36)_100%)]"
      />

      <header className="absolute inset-x-0 top-0 z-10">
        <div className="mx-auto flex w-full max-w-[90rem] items-center justify-between gap-4 px-4 py-5 sm:px-8 sm:py-7 lg:px-12">
          <div className="flex items-center gap-3">
            <PodologyLogo
              aria-hidden="true"
              className="size-12 text-[#e7d7b4]"
            />
            <span className="hidden text-xs font-semibold uppercase tracking-[0.22em] text-white/90 md:block">
              {hero.brandName}
            </span>
          </div>
          <LanguageSwitcher
            currentLocale={locale}
            label={dictionary.languageSwitcher}
          />
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-5xl flex-1 items-center justify-center px-5 py-20 sm:px-8 sm:py-32 lg:px-12">
        <main
          data-hero-copy
          className="flex w-full flex-col items-center text-center"
        >
          <p className="mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#e7d7b4] sm:mb-5 sm:text-xs sm:tracking-[0.3em]">
            {hero.eyebrow}
          </p>

          <h1 className="max-w-4xl font-heading text-[clamp(3.4rem,9vw,7.75rem)] font-medium leading-[0.84] tracking-[-0.045em] text-balance sm:leading-[0.82]">
            {hero.heading}
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-5 text-white/78 sm:mt-6 sm:text-base sm:leading-7">
            {hero.intro}
          </p>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={hero.mapsLabel}
            className="mt-3 max-w-3xl rounded-sm text-[0.8rem] font-medium leading-5 text-white/92 underline decoration-white/35 underline-offset-4 transition-colors hover:text-white hover:decoration-white/75 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:mt-5 sm:text-base sm:leading-normal"
          >
            <span className="sr-only">{hero.addressLabel}: </span>
            <address className="text-balance not-italic">
              <span className="inline-flex items-baseline whitespace-nowrap">
                <MapPin
                  aria-hidden="true"
                  className="mr-2 size-4 translate-y-[0.15em] shrink-0 text-[#e7d7b4]"
                />
              </span>
              {hero.address}
            </address>
          </a>

          <div className="my-4 h-px w-16 bg-[#e7d7b4]/60 sm:my-8" />

          <div className="w-full max-w-[52rem]" aria-labelledby="services-heading">
            <h2 id="services-heading" className="sr-only">
              {hero.servicesLabel}
            </h2>
            <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-left sm:gap-x-8 sm:gap-y-3">
              {hero.services.map((service) => (
                <li
                  key={service}
                  className="flex items-start gap-1.5 text-[0.78rem] leading-[1.1rem] text-white/90 sm:gap-2.5 sm:text-[0.95rem] sm:leading-6"
                >
                  <span className="mt-px grid size-4 shrink-0 place-items-center rounded-full border border-[#e7d7b4]/45 bg-[#e7d7b4]/10 text-[#f5e7c9] sm:mt-0.5 sm:size-5">
                    <Check aria-hidden="true" className="size-2.5 sm:size-3" strokeWidth={2.25} />
                  </span>
                  {service}
                </li>
              ))}
            </ul>
          </div>

          <div
            data-hero-actions
            className="mt-5 flex w-full max-w-4xl flex-wrap items-center justify-center gap-2 sm:mt-8 sm:gap-3"
          >
            <BooksyButton
              businessId="297783"
              country="pl"
              lang={locale}
              dictionary={dictionary}
            />

            <a
              href={siteConfig.contact.phoneHref}
              aria-label={`${hero.callLabel}: ${siteConfig.contact.phone}`}
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "h-12 w-[calc(50%-0.25rem)] min-w-0 rounded-full border-white/25 bg-[#10261f]/55 px-2 text-xs font-semibold text-white shadow-lg shadow-black/10 backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/12 hover:text-white focus-visible:ring-white/40 sm:h-16 sm:w-auto sm:px-6 sm:text-base",
              )}
            >
              <Phone aria-hidden="true" className="size-4 sm:size-[1.15rem]" strokeWidth={1.7} />
              <span>{siteConfig.contact.phone}</span>
            </a>

            <div className="flex w-full items-center justify-center gap-2 sm:contents">
              {siteConfig.social.facebookUrl ? (
                <a
                  href={siteConfig.social.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={hero.facebookLabel}
                  className="grid size-11 place-items-center rounded-full border border-white/25 bg-[#10261f]/55 text-white shadow-lg shadow-black/10 backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/12 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:size-16"
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
                  className="grid size-11 cursor-not-allowed place-items-center rounded-full border border-white/15 bg-[#10261f]/35 text-white/55 backdrop-blur-md sm:size-16"
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
                  className="grid size-11 place-items-center rounded-full border border-white/25 bg-[#10261f]/55 text-white shadow-lg shadow-black/10 backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/12 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:size-16"
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
                  className="grid size-11 cursor-not-allowed place-items-center rounded-full border border-white/15 bg-[#10261f]/35 text-white/55 backdrop-blur-md sm:size-16"
                >
                  <InstagramIcon
                    aria-hidden="true"
                    className="size-[1.1rem]"
                  />
                </span>
              )}
            </div>
          </div>
        </main>
      </div>

      <p className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 text-[0.62rem] font-medium uppercase tracking-[0.25em] text-white/45 lg:block">
        Warszawa • Wola
      </p>
    </section>
  );
}
