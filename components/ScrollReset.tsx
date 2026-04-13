"use client";

import { useLayoutEffect } from "react";

export function ScrollReset() {
  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const resetScroll = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    };

    const clearHash = () => {
      const cleanUrl = `${window.location.pathname}${window.location.search}`;
      window.history.replaceState(null, "", cleanUrl);
    };

    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest('a[href^="#"]') as HTMLAnchorElement | null;

      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const element = document.querySelector(href);
      if (!element) return;

      event.preventDefault();
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      clearHash();
    };

    const handlePageShow = () => {
      clearHash();
      resetScroll();
    };

    clearHash();
    resetScroll();

    window.addEventListener("pageshow", handlePageShow);
    window.addEventListener("beforeunload", resetScroll);
    document.addEventListener("click", handleAnchorClick);

    return () => {
      window.removeEventListener("pageshow", handlePageShow);
      window.removeEventListener("beforeunload", resetScroll);
      document.removeEventListener("click", handleAnchorClick);
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto";
      }
    };
  }, []);

  return null;
}
