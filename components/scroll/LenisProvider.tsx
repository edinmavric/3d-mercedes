"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setSectionProgress, scrollState, type SectionKey } from "@/lib/scrollState";
import { useIsMobile } from "@/hooks/useIsMobile";

gsap.registerPlugin(ScrollTrigger);

const SECTIONS: SectionKey[] = [
  "hero",
  "scene",
  "engine",
  "performance",
  "models",
  "footer",
];

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();

  useEffect(() => {
    let lenis: Lenis | null = null;
    let rafHandle: ((time: number) => void) | null = null;

    if (!isMobile) {
      lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      lenis.on("scroll", ScrollTrigger.update);

      rafHandle = (time: number) => {
        lenis?.raf(time * 1000);
      };
      gsap.ticker.add(rafHandle);
      gsap.ticker.lagSmoothing(0);
    }

    const triggers: ScrollTrigger[] = [];
    for (const key of SECTIONS) {
      const el = document.querySelector(`[data-scroll-section="${key}"]`);
      if (!el) continue;
      const trigger = ScrollTrigger.create({
        trigger: el as Element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => setSectionProgress(key, self.progress),
      });
      triggers.push(trigger);
    }

    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      scrollState.global = max > 0 ? doc.scrollTop / max : 0;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      triggers.forEach((t) => t.kill());
      if (rafHandle) gsap.ticker.remove(rafHandle);
      if (lenis) lenis.destroy();
    };
  }, [isMobile]);

  return <>{children}</>;
}
