"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { CarModel, CarFallback } from "./CarModel";
import { Lighting } from "./Lighting";
import { SceneErrorBoundary } from "./SceneErrorBoundary";
import { scrollState } from "@/lib/scrollState";

// Toggle to silence the rotation-debug instrumentation.
const DEBUG_ROTATION = false;
const dlog = (...args: unknown[]) => {
  if (DEBUG_ROTATION) console.log("[HeroScene]", ...args);
};

// Settle point: when section 2 has fully filled the viewport — corresponds
// to the "PREVUCITE ZA INTERAKCIJU" composition. ScrollTrigger maps this
// moment to scene-progress ≈ 0.5.
const SETTLED_THRESHOLD = 0.48;
// Drag-to-rotate stays enabled while the car is still on-screen. The canvas
// begins sliding up at scene ≥ 0.5 (see apply() — `past = (scene - 0.5) * 2`)
// and is fully off-screen at scene = 1.0. `touch-action: pan-y` on the canvas
// means vertical drags pass through to the page scroll, so leaving rotation
// enabled across the visible range doesn't trap the user. We close the window
// just before the canvas finishes leaving the viewport.
const INTERACT_MAX_SCENE = 0.9;

// Map scrollState.scene 0→0.5 to phase 0→1 (and clamp ≥0.5 to 1).
function carPhase() {
  const heroPart = THREE.MathUtils.clamp(scrollState.hero, 0, 1);
  const scenePart = THREE.MathUtils.clamp(scrollState.scene / 0.5, 0, 1);
  return THREE.MathUtils.clamp(heroPart * 0.3 + scenePart * 0.85, 0, 1);
}

function getCameraTargets(width: number, height: number) {
  const aspect = width / Math.max(1, height);
  // Smoothly pull the camera back as the viewport narrows so the car keeps
  // fitting horizontally on portrait phones / small tablets. Landscape
  // (aspect ≥ ~1.6) gets pullback = 1, i.e. the original framing.
  const pullback = Math.min(
    3.5,
    Math.max(1, 1.6 / Math.max(aspect, 0.3))
  );
  const isPortrait = aspect < 1;
  return {
    zStart: 7.4 * pullback,
    zEnd: 5.6 * pullback,
    yStart: isPortrait ? 1.55 : 1.35,
    yEnd: isPortrait ? 1.05 : 0.95,
  };
}

type CamState = "scroll" | "catching-up" | "frozen";

function ScrollCamera({
  settleSignal,
  onFrozen,
}: {
  settleSignal: boolean;
  onFrozen: (b: boolean) => void;
}) {
  const camRef = useRef<THREE.PerspectiveCamera>(null);
  const { size, invalidate } = useThree();
  const stateRef = useRef<CamState>("scroll");

  // Sync the external settle flag with the internal state machine. The
  // "catching-up" phase lets the camera smoothly damp to the final pose even
  // when the user blew past the trigger zone in one fast scroll.
  useEffect(() => {
    if (!settleSignal) {
      if (stateRef.current !== "scroll") {
        dlog("camState: → scroll (settleSignal=false)");
        stateRef.current = "scroll";
        onFrozen(false);
        invalidate();
      }
    } else if (stateRef.current === "scroll") {
      dlog("camState: scroll → catching-up");
      stateRef.current = "catching-up";
      invalidate();
    }
  }, [settleSignal, onFrozen, invalidate]);

  useFrame((_s, delta) => {
    const cam = camRef.current;
    if (!cam) return;
    const state = stateRef.current;
    if (state === "frozen") return;

    const t = getCameraTargets(size.width, size.height);
    let targetZ: number;
    let targetY: number;

    if (state === "scroll") {
      const p = carPhase();
      targetZ = THREE.MathUtils.lerp(t.zStart, t.zEnd, p);
      targetY = THREE.MathUtils.lerp(t.yStart, t.yEnd, p);
    } else {
      // catching-up — target is the final pose regardless of current scroll.
      targetZ = t.zEnd;
      targetY = t.yEnd;
    }

    cam.position.x = THREE.MathUtils.damp(cam.position.x, 0, 3, delta);
    cam.position.z = THREE.MathUtils.damp(cam.position.z, targetZ, 3, delta);
    cam.position.y = THREE.MathUtils.damp(cam.position.y, targetY, 3, delta);
    cam.lookAt(0, 0.7, 0);

    if (state === "catching-up") {
      const dx = Math.abs(cam.position.x);
      const dz = Math.abs(cam.position.z - targetZ);
      const dy = Math.abs(cam.position.y - targetY);
      if (dx < 0.005 && dz < 0.005 && dy < 0.005) {
        dlog("camState: catching-up → frozen", {
          camPos: [cam.position.x.toFixed(3), cam.position.y.toFixed(3), cam.position.z.toFixed(3)],
        });
        stateRef.current = "frozen";
        onFrozen(true);
      } else {
        invalidate();
      }
    }
  });

  return (
    <PerspectiveCamera
      ref={camRef}
      makeDefault
      fov={32}
      near={0.1}
      far={50}
      position={[0, 1.35, 9.5]}
    />
  );
}

// Diagnostic: log every pointerdown on the WebGL canvas + the computed
// pointer-events CSS so we know whether the canvas is actually grabbable when
// the user reports "I can't rotate".
function CanvasProbe() {
  const { gl } = useThree();
  useEffect(() => {
    const el = gl.domElement;
    const onDown = (e: PointerEvent) => {
      const cs = getComputedStyle(el);
      dlog("canvas pointerdown", {
        pointerType: e.pointerType,
        button: e.button,
        target: (e.target as Element)?.tagName,
        canvasPointerEvents: cs.pointerEvents,
        canvasTouchAction: cs.touchAction,
        canvasRect: el.getBoundingClientRect().toJSON(),
      });
    };
    const onParentDown = (e: PointerEvent) => {
      dlog("canvas-root pointerdown (parent) target=", (e.target as Element)?.tagName);
    };
    el.addEventListener("pointerdown", onDown, true);
    const parent = document.getElementById("canvas-root");
    parent?.addEventListener("pointerdown", onParentDown, true);
    dlog("CanvasProbe attached. canvas computed pointer-events=", getComputedStyle(el).pointerEvents);
    return () => {
      el.removeEventListener("pointerdown", onDown, true);
      parent?.removeEventListener("pointerdown", onParentDown, true);
    };
  }, [gl]);
  return null;
}

// Demand-mode renderer needs explicit invalidation. Scroll, resize, and a few
// frames after each scroll burst (so damp() can settle) trigger redraws.
// OrbitControls calls invalidate() internally on drag.
function ScrollInvalidator() {
  const invalidate = useThree((s) => s.invalidate);

  useEffect(() => {
    let raf = 0;
    let framesLeft = 0;

    const pump = () => {
      invalidate();
      if (framesLeft-- > 0) {
        raf = requestAnimationFrame(pump);
      }
    };

    const wake = () => {
      framesLeft = 45;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(pump);
    };

    window.addEventListener("scroll", wake, { passive: true });
    window.addEventListener("resize", wake);
    wake();

    return () => {
      window.removeEventListener("scroll", wake);
      window.removeEventListener("resize", wake);
      cancelAnimationFrame(raf);
    };
  }, [invalidate]);

  return null;
}

export function HeroScene() {
  const mount =
    typeof document !== "undefined"
      ? document.getElementById("canvas-root")
      : null;
  const [settled, setSettled] = useState(false);
  const [frozen, setFrozen] = useState(false);
  const [withinInteractWindow, setWithinInteractWindow] = useState(false);
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = document.getElementById("canvas-root");
    rootRef.current = root;
    let lastSettled = false;
    let lastInteract = false;
    let applyCount = 0;
    let lastLoggedScene = -1;

    const apply = () => {
      applyCount += 1;
      if (root) {
        const past = Math.max(0, Math.min(1, (scrollState.scene - 0.5) * 2));
        root.style.transform =
          past > 0 ? `translate3d(0, ${(-past * 100).toFixed(2)}vh, 0)` : "";
        // Lift canvas-root above <main> once the car has settled so taps
        // actually land on the WebGL canvas. Globally it sits at z:0 so Hero
        // typography paints in front of the car during the intro. While
        // settled, the car is the focus — putting it on top is visually fine
        // (canvas is transparent except the car) and is the only way touch
        // events reach OrbitControls. EngineReveal (z-20) still covers it
        // when it scrolls in.
        root.style.zIndex = scrollState.scene >= SETTLED_THRESHOLD ? "15" : "";
      }

      const nextSettled = scrollState.scene >= SETTLED_THRESHOLD;
      const nextInteract =
        scrollState.scene >= SETTLED_THRESHOLD &&
        scrollState.scene <= INTERACT_MAX_SCENE;
      if (nextSettled !== lastSettled) {
        lastSettled = nextSettled;
        dlog("settled →", nextSettled, "(scene=", scrollState.scene.toFixed(3), ")");
        setSettled(nextSettled);
      }
      if (nextInteract !== lastInteract) {
        lastInteract = nextInteract;
        dlog("withinInteractWindow →", nextInteract, "(scene=", scrollState.scene.toFixed(3), ")");
        setWithinInteractWindow(nextInteract);
      }
      // Periodic scene snapshot so we can see whether apply() is even firing
      // while the user is at the settle position (Lenis smooth-scroll vs
      // native scroll event timing).
      if (Math.abs(scrollState.scene - lastLoggedScene) > 0.02) {
        lastLoggedScene = scrollState.scene;
        dlog("apply() scene=", scrollState.scene.toFixed(3), "settled=", nextSettled, "interact=", nextInteract, "callCount=", applyCount);
      }
    };

    window.addEventListener("scroll", apply, { passive: true });
    // Fallback poll: if Lenis suppresses native scroll events the React state
    // won't follow scrollState.scene. A 60Hz poll guarantees apply() runs.
    const pollId = window.setInterval(apply, 16);
    apply();
    dlog("mounted — listeners attached, initial scene=", scrollState.scene.toFixed(3));
    return () => {
      window.removeEventListener("scroll", apply);
      window.clearInterval(pollId);
      if (root) {
        root.style.transform = "";
        root.style.zIndex = "";
      }
    };
  }, []);

  if (!mount) return null;

  // Drag-to-rotate is only valid once the camera has fully caught up AND we
  // are still in the narrow window where the canvas is at rest.
  const interactable = frozen && withinInteractWindow;
  if (DEBUG_ROTATION) {
    dlog("render — settled=", settled, "frozen=", frozen, "withinInteractWindow=", withinInteractWindow, "→ interactable=", interactable);
  }

  return createPortal(
    <>
      <Canvas
        dpr={[1, 1.5]}
        frameloop="demand"
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05,
        }}
        shadows={false}
        style={{
          width: "100%",
          height: "100%",
          pointerEvents: interactable ? "auto" : "none",
          touchAction: "pan-y",
        }}
      >
        <ScrollInvalidator />
        <CanvasProbe />
        <ScrollCamera settleSignal={settled} onFrozen={setFrozen} />
        <Suspense fallback={null}>
          <Lighting />
          <SceneErrorBoundary label="CarModel" fallback={<CarFallback />}>
            <CarModel manualControl={settled} />
          </SceneErrorBoundary>
          <ContactShadows
            position={[0, -0.005, 0]}
            opacity={0.55}
            scale={10}
            blur={2.4}
            far={3}
          />
        </Suspense>
        <OrbitControls
          makeDefault
          enabled={interactable}
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.55}
          minPolarAngle={Math.PI / 2.45}
          maxPolarAngle={Math.PI / 2.05}
          target={[0, 0.7, 0]}
          onStart={() => dlog("OrbitControls onStart — drag began")}
          onChange={() => dlog("OrbitControls onChange — camera rotating")}
          onEnd={() => dlog("OrbitControls onEnd — drag ended")}
        />
      </Canvas>
      <SettledHint visible={interactable} />
    </>,
    mount
  );
}

function SettledHint({ visible }: { visible: boolean }) {
  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        left: "50%",
        bottom: "13vh",
        transform: "translateX(-50%)",
        pointerEvents: "none",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.6s ease",
        zIndex: 15,
      }}
      className="font-display text-[10px] tracking-ultra uppercase text-paper/80"
    >
      Prevucite za rotaciju
    </div>
  );
}
