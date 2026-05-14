"use client";

import dynamic from "next/dynamic";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useSectionInView } from "@/hooks/useInView";

const HeroScene = dynamic(
  () => import("./HeroScene").then((m) => m.HeroScene),
  { ssr: false }
);

export function HeroSceneMount() {
  const isMobile = useIsMobile();
  // Mount the car canvas while either hero or scene section is anywhere near
  // the viewport. Unmount once we've scrolled well past — frees the WebGL
  // context and stops the render loop.
  const heroNear = useSectionInView('[data-scroll-section="hero"]', "400px 0px");
  const sceneNear = useSectionInView(
    '[data-scroll-section="scene"]',
    "400px 0px"
  );

  if (isMobile) return null;
  if (!heroNear && !sceneNear) return null;
  return <HeroScene />;
}
