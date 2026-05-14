"use client";

import { Suspense, useRef } from "react";
import { createPortal } from "react-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { CarModel, CarFallback } from "./CarModel";
import { Lighting } from "./Lighting";
import { SceneErrorBoundary } from "./SceneErrorBoundary";
import { scrollState } from "@/lib/scrollState";

function ScrollCamera() {
  const camRef = useRef<THREE.PerspectiveCamera>(null);

  useFrame((_s, delta) => {
    const cam = camRef.current;
    if (!cam) return;
    const p = scrollState.hero * 0.4 + scrollState.scene * 0.6;
    const targetZ = THREE.MathUtils.lerp(7.2, 5.4, p);
    const targetY = THREE.MathUtils.lerp(1.35, 0.95, p);
    cam.position.z = THREE.MathUtils.damp(cam.position.z, targetZ, 3, delta);
    cam.position.y = THREE.MathUtils.damp(cam.position.y, targetY, 3, delta);
    cam.lookAt(0, 0.4, 0);
  });

  return (
    <PerspectiveCamera
      ref={camRef}
      makeDefault
      fov={32}
      near={0.1}
      far={50}
      position={[0, 1.35, 7.2]}
    />
  );
}

export function HeroScene() {
  const mount =
    typeof document !== "undefined"
      ? document.getElementById("canvas-root")
      : null;

  if (!mount) return null;

  return createPortal(
    <Canvas
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.05,
      }}
      shadows={false}
      style={{ width: "100%", height: "100%", pointerEvents: "none" }}
    >
      <ScrollCamera />
      <Suspense fallback={null}>
        <Lighting />
        <SceneErrorBoundary label="CarModel" fallback={<CarFallback />}>
          <CarModel />
        </SceneErrorBoundary>
        <ContactShadows
          position={[0, -0.005, 0]}
          opacity={0.55}
          scale={10}
          blur={2.4}
          far={3}
        />
      </Suspense>
    </Canvas>,
    mount
  );
}
