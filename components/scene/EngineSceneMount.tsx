"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useInView } from "@/hooks/useInView";

const EngineScene = dynamic(
  () => import("./EngineScene").then((m) => m.EngineScene),
  { ssr: false }
);

export function EngineSceneMount() {
  const isMobile = useIsMobile();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { rootMargin: "300px 0px" });

  if (isMobile) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="font-display text-[11px] tracking-ultra uppercase text-mute">
            M177 · V8 Biturbo
          </div>
          <div className="text-[10px] tracking-wider2 uppercase text-mute/60 mt-2">
            3D pregled · samo na desktopu
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="absolute inset-0">
      {inView ? <EngineScene /> : null}
    </div>
  );
}
