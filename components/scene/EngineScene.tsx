"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { EngineModel, EngineFallback } from "./EngineModel";
import { SceneErrorBoundary } from "./SceneErrorBoundary";
import { scrollState } from "@/lib/scrollState";

const ENGINE_WIDTH = 1.5;

function EngineCamera({
  hoveredRef,
}: {
  hoveredRef: React.MutableRefObject<boolean>;
}) {
  const camRef = useRef<THREE.PerspectiveCamera>(null);
  const { size } = useThree();

  useFrame((_s, delta) => {
    const cam = camRef.current;
    if (!cam) return;
    const aspect = size.width / Math.max(size.height, 1);
    const vfov = (cam.fov * Math.PI) / 180;
    const hfov = 2 * Math.atan(aspect * Math.tan(vfov / 2));
    const minZ = (ENGINE_WIDTH / 2 / Math.tan(hfov / 2)) * 1.4; // 40% breathing room

    const p = THREE.MathUtils.clamp(scrollState.engine, 0, 1);
    const hov = hoveredRef.current;
    const idleZ = THREE.MathUtils.lerp(5.6, 4.6, p);
    const idleY = THREE.MathUtils.lerp(2.2, 1.4, p);
    const idleFov = 30;
    const hoverZ = 3.0;
    const hoverY = 0.9;
    const hoverFov = 20;

    const baseZ = hov ? hoverZ : idleZ;
    const targetZ = Math.max(baseZ, minZ);
    const targetY = hov ? hoverY : idleY;
    const targetFov = hov ? hoverFov : idleFov;

    cam.position.z = THREE.MathUtils.damp(cam.position.z, targetZ, 4, delta);
    cam.position.y = THREE.MathUtils.damp(cam.position.y, targetY, 4, delta);
    const nextFov = THREE.MathUtils.damp(cam.fov, targetFov, 4, delta);
    if (Math.abs(nextFov - cam.fov) > 0.01) {
      cam.fov = nextFov;
      cam.updateProjectionMatrix();
    }
    cam.lookAt(0, 0, 0);
  });

  return (
    <PerspectiveCamera
      ref={camRef}
      makeDefault
      fov={30}
      near={0.1}
      far={40}
      position={[0, 2.2, 5.6]}
    />
  );
}

export function EngineScene() {
  const hoveredRef = useRef(false);

  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.0,
      }}
      onPointerOver={() => (hoveredRef.current = true)}
      onPointerOut={() => (hoveredRef.current = false)}
      onPointerDown={() => (hoveredRef.current = true)}
      onPointerUp={() => (hoveredRef.current = false)}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        cursor: "zoom-in",
      }}
    >
      <EngineCamera hoveredRef={hoveredRef} />
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
