"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { EngineModel, EngineFallback } from "./EngineModel";
import { SceneErrorBoundary } from "./SceneErrorBoundary";
import { scrollState } from "@/lib/scrollState";

function EngineCamera() {
  const camRef = useRef<THREE.PerspectiveCamera>(null);

  useFrame((_s, delta) => {
    const cam = camRef.current;
    if (!cam) return;
    const p = scrollState.engine;
    const targetZ = THREE.MathUtils.lerp(4.4, 3.3, p);
    const targetY = THREE.MathUtils.lerp(2.0, 1.0, p);
    cam.position.z = THREE.MathUtils.damp(cam.position.z, targetZ, 3, delta);
    cam.position.y = THREE.MathUtils.damp(cam.position.y, targetY, 3, delta);
    cam.lookAt(0, 0, 0);
  });

  return (
    <PerspectiveCamera
      ref={camRef}
      makeDefault
      fov={28}
      near={0.1}
      far={20}
      position={[0, 2.0, 4.4]}
    />
  );
}

export function EngineScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.0,
      }}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
      }}
    >
      <EngineCamera />
      <Suspense fallback={null}>
        <hemisphereLight args={["#e0e4ef", "#0a0a0c", 0.45]} />
        <directionalLight position={[-3, 4, 3]} intensity={1.2} />
        <directionalLight position={[3, 2, -1]} intensity={0.5} color="#cfe0ff" />
        <directionalLight position={[0, 3, -4]} intensity={0.8} />
        <SceneErrorBoundary label="EngineModel" fallback={<EngineFallback />}>
          <EngineModel />
        </SceneErrorBoundary>
      </Suspense>
    </Canvas>
  );
}
