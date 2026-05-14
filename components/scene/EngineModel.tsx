"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { scrollState } from "@/lib/scrollState";

const ENGINE_URL = "/models/engine.glb";

const extendLoader = (loader: { setMeshoptDecoder?: (d: unknown) => void }) => {
  loader.setMeshoptDecoder?.(MeshoptDecoder);
};

useGLTF.preload(ENGINE_URL, undefined, undefined, extendLoader);

export function EngineFallback() {
  return (
    <mesh>
      <boxGeometry args={[1.4, 1.1, 1.4]} />
      <meshStandardMaterial color="#1a1a1a" roughness={0.35} metalness={0.7} />
    </mesh>
  );
}

export function EngineModel() {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(ENGINE_URL, undefined, undefined, extendLoader);

  const normalized = useMemo(() => {
    const clone = scene.clone(true);
    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const targetLength = 2.2;
    const scale = targetLength / Math.max(size.x, size.y, size.z);
    clone.position.sub(center).multiplyScalar(scale);
    clone.scale.multiplyScalar(scale);
    return clone;
  }, [scene]);

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(normalized);
    const size = box.getSize(new THREE.Vector3());
    console.info(
      `[EngineModel] loaded: bounds=${size.x.toFixed(2)}×${size.y.toFixed(2)}×${size.z.toFixed(2)}`
    );
  }, [normalized]);

  useFrame((_state, delta) => {
    const g = groupRef.current;
    if (!g) return;
    const p = scrollState.engine;
    g.rotation.y += delta * (0.25 + p * 0.6);
    const targetTiltX = THREE.MathUtils.lerp(-0.45, -0.05, p);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, targetTiltX, 3, delta);
  });

  return (
    <group ref={groupRef} rotation={[-0.35, 0, 0]}>
      <primitive object={normalized} />
    </group>
  );
}
