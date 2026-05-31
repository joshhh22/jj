"use client";

import { useEffect } from "react";

export default function SmoothScroll() {
  useEffect(() => {
    let lenis: {
      raf: (time: number) => void;
      destroy: () => void;
    } | null = null;

    async function initLenis() {
      const Lenis = (
        await import("@studio-freight/lenis")
      ).default;

      lenis = new Lenis({
        smoothWheel: true,
      });

      function raf(time: number) {
        if (!lenis) return;

        lenis.raf(time);

        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
    }

    initLenis();

    return () => {
      if (lenis) {
        lenis.destroy();
      }
    };
  }, []);

  return null;
}