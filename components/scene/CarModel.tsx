"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { scrollState } from "@/lib/scrollState";

const CAR_URL = "/models/car-final.glb";

const extendLoader = (loader: { setMeshoptDecoder?: (d: unknown) => void }) => {
  loader.setMeshoptDecoder?.(MeshoptDecoder);
};

useGLTF.preload(CAR_URL, undefined, undefined, extendLoader);

export function CarFallback() {
  return (
    <group rotation={[0, -0.25, 0]} position={[0, 0.6, 0]}>
      <mesh>
        <boxGeometry args={[4.5, 1.3, 1.9]} />
        <meshStandardMaterial color="#222" roughness={0.4} metalness={0.6} />
      </mesh>
    </group>
  );
}

export function CarModel() {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(CAR_URL, undefined, undefined, extendLoader);

  const normalized = useMemo(() => {
    const clone = scene.clone(true);
    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const targetLength = 4.6;
    const scale = targetLength / Math.max(size.x, size.z);
    clone.position.sub(center).multiplyScalar(scale);
    clone.scale.multiplyScalar(scale);
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

    const heroProgress = scrollState.hero;
    const sceneProgress = scrollState.scene;
    const combined = heroProgress * 0.5 + sceneProgress * 1.0;

    const targetRotY = combined * Math.PI * 0.35 - 0.25;
    group.rotation.y = THREE.MathUtils.damp(
      group.rotation.y,
      targetRotY,
      4,
      delta
    );

    const targetY = -0.05 + sceneProgress * 0.05;
    const targetZ = sceneProgress * 0.4;
    group.position.y = THREE.MathUtils.damp(group.position.y, targetY, 4, delta);
    group.position.z = THREE.MathUtils.damp(group.position.z, targetZ, 4, delta);
  });

  return (
    <group ref={groupRef} rotation={[0, -0.25, 0]} position={[0, -0.05, 0]}>
      <primitive object={normalized} />
    </group>
  );
}
