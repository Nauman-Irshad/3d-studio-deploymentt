import { Environment, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import * as THREE from "three";
import { backdropAbsoluteUrl } from "./backdropPreload";
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

/** Visible while GLB/GLTF/OBJ is loading — avoids an empty viewport. */
function GarmentLoadingPlaceholder() {
  return (
    <mesh position={[0, 0.55, 0]}>
      <boxGeometry args={[0.35, 0.55, 0.12]} />
      <meshStandardMaterial color="#78716c" wireframe />
    </mesh>
  );
}

function BackdropEnvironment({ exrPath }: { exrPath: string }) {
  if (!exrPath) return null;
  return (
    <Environment
      files={backdropAbsoluteUrl(exrPath)}
      background
      backgroundBlurriness={0}
      backgroundIntensity={1}
      environmentIntensity={0.85}
    />
  );
}

export function GarmentViewer() {
  const activeBackgroundPath = useCustomizerStore((s) => s.activeBackgroundPath);

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
      dpr={[1, 1.5]}
      onCreated={({ gl, scene }) => {
        THREE.ColorManagement.enabled = true;
        scene.background = new THREE.Color(VIEWPORT_BG);
        gl.domElement.addEventListener(
          "webglcontextlost",
          (e: Event) => e.preventDefault(),
          false,
        );
      }}
    >
      <color attach="background" args={[VIEWPORT_BG]} />
      <PerspectiveCamera makeDefault position={[0, 0.58, 2.08]} fov={40} />
      <OrbitRig />
      <StudioLights />

      {/* Garment first — never blocked by heavy EXR backdrop */}
      <Suspense fallback={<GarmentLoadingPlaceholder />}>
        <GarmentModel />
      </Suspense>

      {/* Backdrop only when user picks one in the header (EXR files are large) */}
      {activeBackgroundPath ? (
        <Suspense fallback={null}>
          <BackdropEnvironment exrPath={activeBackgroundPath} />
        </Suspense>
      ) : null}
    </Canvas>
  );
}
