"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { scrollState } from "@/lib/scrollState";

const CAR_URL = "/models/car-final.glb";

const extendLoader = (loader: { setMeshoptDecoder?: (d: unknown) => void }) => {
  loader.setMeshoptDecoder?.(MeshoptDecoder);
};

useGLTF.preload(CAR_URL, undefined, undefined, extendLoader);

// Start showing 3/4 rear, end showing 3/4 front. End pose is locked in at
// scene-progress 0.5 (when section 2 fills the viewport).
const CAR_START_Y = 0.45;
const CAR_END_Y = CAR_START_Y - Math.PI * 0.85;

export function CarFallback() {
  return (
    <group rotation={[0, CAR_START_Y, 0]} position={[0, 0.6, 0]}>
      <mesh>
        <boxGeometry args={[4.5, 1.3, 1.9]} />
        <meshStandardMaterial color="#222" roughness={0.4} metalness={0.6} />
      </mesh>
    </group>
  );
}

type CarModelProps = {
  /** When true, scroll is past the settle threshold — the car damps toward
   * the final pose and OrbitControls owns the camera. */
  manualControl?: boolean;
};

function carPhase() {
  const heroPart = THREE.MathUtils.clamp(scrollState.hero, 0, 1);
  const scenePart = THREE.MathUtils.clamp(scrollState.scene / 0.5, 0, 1);
  return THREE.MathUtils.clamp(heroPart * 0.3 + scenePart * 0.85, 0, 1);
}

export function CarModel({ manualControl = false }: CarModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(CAR_URL, undefined, undefined, extendLoader);
  const invalidate = useThree((s) => s.invalidate);

  const normalized = useMemo(() => {
    const clone = scene.clone(true);
    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const targetLength = 4.6;
    const scaleFactor = targetLength / Math.max(size.x, size.z);
    clone.position.sub(center).multiplyScalar(scaleFactor);
    clone.scale.multiplyScalar(scaleFactor);
    const lifted = new THREE.Box3().setFromObject(clone);
    clone.position.y -= lifted.min.y;
    return clone;
  }, [scene]);

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(normalized);
    const size = box.getSize(new THREE.Vector3());
    console.info(
      `[CarModel] loaded: bounds=${size.x.toFixed(2)}×${size.y.toFixed(2)}×${size.z.toFixed(2)}`
    );
  }, [normalized]);

  useFrame((_state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    // Damp continuously toward target. When `manualControl` is on, the target
    // is the final pose regardless of scroll — fast scrolling past the freeze
    // point smoothly catches up instead of teleporting.
    const phase = manualControl ? 1 : carPhase();
    const targetRotY = THREE.MathUtils.lerp(CAR_START_Y, CAR_END_Y, phase);
    const targetY = -0.05 + phase * 0.05;
    const targetZ = phase * 0.4;

    group.rotation.y = THREE.MathUtils.damp(group.rotation.y, targetRotY, 4, delta);
    group.position.y = THREE.MathUtils.damp(group.position.y, targetY, 4, delta);
    group.position.z = THREE.MathUtils.damp(group.position.z, targetZ, 4, delta);

    // Keep the demand-mode pump alive while still converging, so a fast scroll
    // followed by an idle still finishes the rotation visibly.
    const drot = Math.abs(group.rotation.y - targetRotY);
    const dy = Math.abs(group.position.y - targetY);
    const dz = Math.abs(group.position.z - targetZ);
    if (drot > 0.001 || dy > 0.001 || dz > 0.001) {
      invalidate();
    }
  });

  return (
    <group ref={groupRef} rotation={[0, CAR_START_Y, 0]} position={[0, -0.05, 0]}>
      <primitive object={normalized} />
    </group>
  );
}
