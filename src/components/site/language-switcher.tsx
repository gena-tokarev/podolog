import Link from "next/link";

import { localeDetails, locales, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

type LanguageSwitcherProps = {
  currentLocale: Locale;
  label: string;
};

export function LanguageSwitcher({
  currentLocale,
  label,
}: LanguageSwitcherProps) {
  return (
    <nav aria-label={label}>
      <ul className="flex items-center gap-1 rounded-full border border-white/20 bg-[#10261f]/55 p-1 shadow-lg shadow-black/10 backdrop-blur-md">
        {locales.map((locale) => {
          const language = localeDetails[locale];
          const isCurrent = locale === currentLocale;

          return (
            <li key={locale}>
              <Link
                href={`/${locale}`}
                hrefLang={locale}
                lang={locale}
                aria-current={isCurrent ? "page" : undefined}
                aria-label={`${language.name} (${language.code})`}
                className={cn(
                  "flex min-h-9 items-center gap-1.5 rounded-full px-2.5 text-xs font-semibold tracking-wide text-white/75 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:px-3",
                  isCurrent && "bg-white text-[#17352b] shadow-sm hover:bg-white hover:text-[#17352b]",
                )}
              >
                <span aria-hidden="true" className="text-base leading-none">
                  {language.flag}
                </span>
                <span className="sm:hidden">{language.code}</span>
                <span className="hidden sm:inline">{language.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
