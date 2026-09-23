"use client";

import { useEffect } from "react";

export function ScrollToHash() {
  useEffect(() => {
    const scrollToHash = () => {
      const id = window.location.hash.replace(/^#/, "");
      if (!id) {
        return;
      }
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const timeout = window.setTimeout(scrollToHash, 50);
    window.addEventListener("hashchange", scrollToHash);
    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, []);

  return null;
}
