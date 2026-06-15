import { Center, Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { Suspense, useMemo } from "react";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { absoluteModelUrl } from "../lib/absoluteModelUrl";
import { isObjModelPath } from "./modelPath";

function miniFit(source: THREE.Object3D) {
  const c = source.clone(true);
  c.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(c);
  const size = box.getSize(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z, 0.001);
  const sc = 0.7 / maxDim;
  c.scale.setScalar(sc);
  c.updateMatrixWorld(true);
  c.traverse((o) => {
    const m = o as THREE.Mesh;
    if (m.isMesh) {
      m.castShadow = false;
      m.receiveShadow = false;
    }
  });
  return c;
}

function MiniFittedFromGltf({ url }: { url: string }) {
  const { scene } = useGLTF(absoluteModelUrl(url));
  const fitted = useMemo(() => miniFit(scene), [scene]);
  return (
    <group position={[0, -0.06, 0]}>
      <Center>
        <primitive object={fitted} />
      </Center>
    </group>
  );
}

function MiniFittedFromObj({ url }: { url: string }) {
  const obj = useLoader(OBJLoader, absoluteModelUrl(url));
  const fitted = useMemo(() => miniFit(obj), [obj]);
  return (
    <group position={[0, -0.06, 0]}>
      <Center>
        <primitive object={fitted} />
      </Center>
    </group>
  );
}

/** GLTF or OBJ; sidebar uses file materials only (no header fabric). */
function MiniFittedGarment({ url }: { url: string }) {
  if (isObjModelPath(url)) {
    return <MiniFittedFromObj url={url} />;
  }
  return <MiniFittedFromGltf url={url} />;
}

type Props = {
  url: string;
  className?: string;
  /** When false, orbit is off and the canvas ignores pointer events so a parent can handle clicks (whole-card select). */
  enableOrbit?: boolean;
  /** Slow spin for sidebar tiles (works with enableOrbit=false). */
  autoRotate?: boolean;
  autoRotateSpeed?: number;
};

/**
 * Tall sidebar preview: local studio EXR for IBL + soft fill lights.
 */
export function MiniProductPreview({
  url,
  className,
  enableOrbit = true,
  autoRotate = false,
  autoRotateSpeed = 1.6,
}: Props) {
  const base =
    className ??
    "h-[200px] w-full overflow-hidden rounded-t-xl bg-neutral-100 ring-1 ring-zinc-200/80";
  return (
    <div className={base}>
      <Canvas
        className={[
          "h-full w-full touch-none",
          !enableOrbit ? "pointer-events-none" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        gl={{
          alpha: false,
          antialias: true,
          powerPreference: "low-power",
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        dpr={enableOrbit ? [1, 1.75] : [1, 1]}
        camera={{ position: [0, 0.08, 1.32], fov: 32, near: 0.01, far: 20 }}
        onCreated={({ gl }) => {
          THREE.ColorManagement.enabled = true;
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1;
        }}
      >
        <color attach="background" args={["#f4f4f5"]} />
        <ambientLight intensity={0.22} color="#ffffff" />
        <hemisphereLight args={["#f5f5f5", "#8a8a8a", 0.42]} />
        <directionalLight position={[2.2, 3.2, 2.4]} intensity={0.85} color="#fffdfb" />
        <directionalLight position={[-2, 1.8, -1.2]} intensity={0.35} color="#e2e8f4" />
        <pointLight position={[0.5, 1.2, 1.5]} intensity={0.25} color="#fff8f0" distance={6} />
        {enableOrbit || autoRotate ? (
          <OrbitControls
            makeDefault
            enableZoom={false}
            enablePan={false}
            enableRotate={enableOrbit}
            rotateSpeed={0.85}
            minPolarAngle={0.2}
            maxPolarAngle={Math.PI - 0.15}
            target={[0, -0.02, 0]}
            dampingFactor={0.1}
            enableDamping
            autoRotate={autoRotate}
            autoRotateSpeed={autoRotateSpeed}
          />
        ) : null}
        <Suspense fallback={null}>
          <Environment
            preset="studio"
            environmentIntensity={0.72}
            background={false}
          />
          <MiniFittedGarment url={url} />
        </Suspense>
      </Canvas>
    </div>
  );
}
