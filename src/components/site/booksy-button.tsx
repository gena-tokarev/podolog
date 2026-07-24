"use client";

import { useEffect, useRef, useState } from "react";

import BooksyIcon from "@/icons/booksy.svg";
import type { Dictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

type BooksyButtonProps = {
  businessId: string;
  country?: string;
  lang?: string;
  label?: string;
  dictionary: Dictionary;
};

export const BooksyButton: React.FC<BooksyButtonProps> = ({
  businessId,
  country = "pl",
  lang = "pl",
  dictionary,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>("[data-site-hero]");

    if (!hero) {
      return;
    }

    let dialogWasOpen = false;
    let initialScrollY = 0;

    const syncHeroPosition = () => {
      const dialog = document.querySelector<HTMLElement>(
        ".booksy-widget-dialog",
      );
      const isDialogOpen = Boolean(
        dialog &&
          !dialog.hidden &&
          dialog.getAttribute("aria-hidden") !== "true" &&
          window.getComputedStyle(dialog).display !== "none",
      );

      if (isDialogOpen && !dialogWasOpen) {
        initialScrollY = window.scrollY;
        hero.setAttribute("data-booksy-dialog-open", "");
      }

      if (!isDialogOpen && dialogWasOpen) {
        hero.removeAttribute("data-booksy-dialog-open");
        window.scrollTo(0, initialScrollY);
      }

      dialogWasOpen = isDialogOpen;
    };

    const dialogObserver = new MutationObserver(syncHeroPosition);

    dialogObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class", "style", "hidden", "aria-hidden"],
    });

    return () => {
      dialogObserver.disconnect();
      hero.removeAttribute("data-booksy-dialog-open");
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    container.replaceChildren();
    setIsReady(false);

    const updateReadiness = () => {
      const booksyButton = container.querySelector<HTMLElement>(
        ".booksy-widget-button",
      );

      if (booksyButton) {
        setIsReady(true);
      }
    };

    const observer = new MutationObserver(updateReadiness);
    observer.observe(container, { childList: true, subtree: true });

    const script = document.createElement("script");

    script.type = "text/javascript";
    script.src =
      `https://booksy.com/widget/code.js` +
      `?id=${encodeURIComponent(businessId)}` +
      `&country=${encodeURIComponent(country)}` +
      `&lang=${encodeURIComponent(lang)}`;

    script.async = true;

    script.onload = updateReadiness;

    script.onerror = () => {
      setIsReady(false);
    };

    container.appendChild(script);

    return () => {
      observer.disconnect();
      container.replaceChildren();
    };
  }, [businessId, country, lang]);

  const openBooksy = () => {
    const booksyButton =
      containerRef.current?.querySelector<HTMLElement>(
        ".booksy-widget-button",
      );

    if (!booksyButton) {
      console.error("Booksy widget is not ready");
      return;
    }

    booksyButton.click();
  };

  return (
    <>
      <button
        type="button"
        aria-label={dictionary.hero.ctaLabel}
        disabled={!isReady}
        className={cn(
          buttonVariants({ size: "lg" }),
          "cursor-pointer h-12 w-[calc(50%-0.25rem)] min-w-0 rounded-full bg-[#f2e2be] px-2 text-xs font-bold text-[#17352b] shadow-[0_14px_50px_rgba(0,0,0,.24)] transition-all hover:-translate-y-0.5 hover:bg-[#fff2d6] hover:shadow-[0_18px_56px_rgba(0,0,0,.3)] focus-visible:ring-[#f2e2be]/60 disabled:cursor-wait disabled:opacity-75 sm:h-16 sm:w-auto sm:px-8 sm:text-base",
        )}
        onClick={openBooksy}
      >
        <BooksyIcon
          aria-hidden="true"
          className="size-5 sm:size-[1.4rem]"
        />
        {dictionary.hero.cta}
      </button>
      <div ref={containerRef} className="hidden" aria-hidden="true" />
    </>
  );
};

export default BooksyButton;
