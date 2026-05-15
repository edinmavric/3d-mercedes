"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { useInView } from "@/hooks/useInView";

const EngineScene = dynamic(
  () => import("./EngineScene").then((m) => m.EngineScene),
  { ssr: false }
);

export function EngineSceneMount() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { rootMargin: "300px 0px" });

  return (
    <div ref={ref} className="absolute inset-0">
      {inView ? <EngineScene /> : null}
    </div>
  );
}
