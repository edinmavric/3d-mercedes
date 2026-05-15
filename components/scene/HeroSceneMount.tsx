"use client";

import dynamic from "next/dynamic";

const HeroScene = dynamic(
  () => import("./HeroScene").then((m) => m.HeroScene),
  { ssr: false }
);

// Always-mounted on both desktop and mobile. The canvas uses frameloop="demand"
// so it doesn't burn GPU while idle. State (car rotation/position) is preserved
// across scroll regardless of viewport visibility, so the car never "disappears"
// or "resets" when scrolling past section 2 and back.
export function HeroSceneMount() {
  return <HeroScene />;
}
