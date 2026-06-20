import { Environment, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import * as THREE from "three";
import { sceneForBackgroundPath } from "./backgroundScenes";
import { FastBackdropEnvironment } from "./FastBackdropEnvironment";
import { GarmentModel } from "./GarmentModel";
import { OrbitRig } from "./OrbitRig";
import { useCustomizerStore } from "./store";

const VIEWPORT_BG = "#282828";

function StudioLights() {
  return (
    <>
      <hemisphereLight args={["#ffffff", "#444444", 0.55]} />
      <ambientLight intensity={0.45} color="#ffffff" />
      <directionalLight position={[3.2, 5.5, 4]} intensity={1.1} color="#fffaf5" />
      <directionalLight position={[-3, 3.5, 2]} intensity={0.45} color="#c8d4ff" />
    </>
  );
}

/**
 * Instant HDR preset (always works online) + optional EXR upgrade when the file loads.
 * `key` forces a fresh Environment on each backdrop click so the canvas actually changes.
 */
function BackdropEnvironment({ exrPath }: { exrPath: string }) {
  if (!exrPath) return null;
  const scene = sceneForBackgroundPath(exrPath);
  const preset = scene?.environmentPreset ?? "studio";

  return (
    <>
      <Environment
        key={`preset-${preset}-${exrPath}`}
        preset={preset}
        background
        backgroundBlurriness={0}
        backgroundIntensity={1}
        environmentIntensity={0.85}
      />
      {/* HDRI EXR upgrades in background — preset shows instantly */}
      <Suspense fallback={null}>
        <FastBackdropEnvironment key={`exr-${exrPath}`} exrPath={exrPath} />
      </Suspense>
    </>
  );
}

export function GarmentViewer() {
  const activeBackgroundPath = useCustomizerStore((s) => s.activeBackgroundPath);
  const hasBackdrop = Boolean(activeBackgroundPath);

  return (
    <Canvas
      className="h-full w-full"
      gl={{
        preserveDrawingBuffer: true,
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
        outputColorSpace: THREE.SRGBColorSpace,
      }}
      dpr={[1, 1.25]}
      onCreated={({ gl, scene }) => {
        THREE.ColorManagement.enabled = true;
        if (!hasBackdrop) {
          scene.background = new THREE.Color(VIEWPORT_BG);
        }
        gl.domElement.addEventListener(
          "webglcontextlost",
          (e: Event) => e.preventDefault(),
          false,
        );
      }}
    >
      {!hasBackdrop ? <color attach="background" args={[VIEWPORT_BG]} /> : null}
      <PerspectiveCamera makeDefault position={[0, 0.58, 2.08]} fov={40} />
      <OrbitRig />
      <StudioLights />

      <Suspense fallback={null}>
        <GarmentModel />
      </Suspense>

      {hasBackdrop ? (
        <BackdropEnvironment exrPath={activeBackgroundPath} />
      ) : null}
    </Canvas>
  );
}
