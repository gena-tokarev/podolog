"use client";

import { useEffect, useRef, useState } from "react";

import { siteConfig } from "@/config/site";
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
  const [widgetStatus, setWidgetStatus] = useState<
    "loading" | "ready" | "fallback"
  >("loading");

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>("[data-site-hero]");

    if (!hero) {
      return;
    }

    let dialogWasOpen = false;
    let initialScrollY = 0;
    const readyIframeIds = new Set<string>();
    const removalTimers = new Set<number>();

    const addLoadingOverlay = (dialog: HTMLElement) => {
      const iframe = dialog.querySelector<HTMLIFrameElement>("iframe");

      if (
        !iframe ||
        readyIframeIds.has(iframe.id) ||
        dialog.querySelector("[data-booksy-loading-overlay]")
      ) {
        return;
      }

      const overlay = document.createElement("div");
      const spinner = document.createElement("span");
      const label = document.createElement("span");

      overlay.setAttribute("data-booksy-loading-overlay", "");
      overlay.setAttribute("role", "status");
      overlay.setAttribute("aria-live", "polite");
      spinner.setAttribute("aria-hidden", "true");
      spinner.setAttribute("data-booksy-loading-spinner", "");
      label.textContent = dictionary.hero.booksyLoading;
      overlay.append(spinner, label);
      dialog.appendChild(overlay);
    };

    const removeLoadingOverlay = (dialog: HTMLElement) => {
      const overlay = dialog.querySelector<HTMLElement>(
        "[data-booksy-loading-overlay]",
      );

      if (!overlay) {
        return;
      }

      overlay.setAttribute("data-ready", "");
      const timer = window.setTimeout(() => {
        overlay.remove();
        removalTimers.delete(timer);
      }, 200);
      removalTimers.add(timer);
    };

    const handleBooksyMessage = (event: MessageEvent) => {
      const dialog = document.querySelector<HTMLElement>(
        ".booksy-widget-dialog",
      );
      const iframe = dialog?.querySelector<HTMLIFrameElement>("iframe");

      if (!dialog || !iframe || event.source !== iframe.contentWindow) {
        return;
      }

      if (event.origin !== new URL(iframe.src).origin) {
        return;
      }

      const message = event.data as {
        uniqueId?: unknown;
        events?: { ready?: unknown };
      } | null;

      if (
        message?.uniqueId !== iframe.id ||
        !message.events?.ready
      ) {
        return;
      }

      readyIframeIds.add(iframe.id);
      removeLoadingOverlay(dialog);
    };

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

      if (isDialogOpen && dialog) {
        addLoadingOverlay(dialog);
      }

      if (!isDialogOpen && dialogWasOpen) {
        hero.removeAttribute("data-booksy-dialog-open");
        window.scrollTo(0, initialScrollY);
      }

      dialogWasOpen = isDialogOpen;
    };

    const dialogObserver = new MutationObserver(syncHeroPosition);

    window.addEventListener("message", handleBooksyMessage);
    dialogObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class", "style", "hidden", "aria-hidden"],
    });

    return () => {
      window.removeEventListener("message", handleBooksyMessage);
      dialogObserver.disconnect();
      removalTimers.forEach((timer) => window.clearTimeout(timer));
      document
        .querySelectorAll("[data-booksy-loading-overlay]")
        .forEach((overlay) => overlay.remove());
      hero.removeAttribute("data-booksy-dialog-open");
    };
  }, [dictionary.hero.booksyLoading]);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    container.replaceChildren();
    setWidgetStatus("loading");

    const readinessTimeout = window.setTimeout(() => {
      setWidgetStatus((status) =>
        status === "ready" ? status : "fallback",
      );
    }, 7000);

    const updateReadiness = () => {
      const booksyButton = container.querySelector<HTMLElement>(
        ".booksy-widget-button",
      );

      if (booksyButton) {
        window.clearTimeout(readinessTimeout);
        setWidgetStatus("ready");
      }
    };

    const observer = new MutationObserver(updateReadiness);
    observer.observe(container, { childList: true, subtree: true });

    const script = document.createElement("script");
    const instanceId = `${Date.now()}-${Math.random().toString(36).slice(2)}`;

    script.type = "text/javascript";
    script.src =
      `https://booksy.com/widget/code.js` +
      `?id=${encodeURIComponent(businessId)}` +
      `&country=${encodeURIComponent(country)}` +
      `&lang=${encodeURIComponent(lang)}` +
      `&instance=${encodeURIComponent(instanceId)}`;

    script.async = true;

    script.onload = updateReadiness;

    script.onerror = () => {
      window.clearTimeout(readinessTimeout);
      setWidgetStatus("fallback");
    };

    container.appendChild(script);

    return () => {
      window.clearTimeout(readinessTimeout);
      observer.disconnect();
      container.replaceChildren();
    };
  }, [businessId, country, lang]);

  const openBooksy = () => {
    const booksyButton =
      containerRef.current?.querySelector<HTMLElement>(
        ".booksy-widget-button",
      );

    if (widgetStatus !== "ready" || !booksyButton) {
      window.open(
        siteConfig.bookingUrl,
        "_blank",
        "noopener,noreferrer",
      );
      return;
    }

    booksyButton.click();
  };

  return (
    <>
      <button
        type="button"
        aria-label={dictionary.hero.ctaLabel}
        className={cn(
          buttonVariants({ size: "lg" }),
          "h-12 w-[calc(50%-0.25rem)] min-w-0 cursor-pointer rounded-full bg-[#f2e2be] px-2 text-xs font-bold text-[#17352b] shadow-[0_14px_50px_rgba(0,0,0,.24)] transition-all hover:-translate-y-0.5 hover:bg-[#fff2d6] hover:shadow-[0_18px_56px_rgba(0,0,0,.3)] focus-visible:ring-[#f2e2be]/60 sm:h-16 sm:w-auto sm:px-8 sm:text-base",
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
