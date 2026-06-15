import { ContactShadows, Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useEffect } from "react";
import { AttachedProductGltf } from "./AttachedProductGltf";
import { AvatarModel, DEFAULT_AVATAR_URL } from "./AvatarModel";
import { FallbackAvatar } from "./FallbackAvatar";
import { MannequinAvatar } from "./MannequinAvatar";
import { ModelErrorBoundary } from "./ModelErrorBoundary";
import { TexturedGarment, type GarmentPreset } from "./TexturedGarment";
import { useCapture } from "../context/CaptureContext";

function CaptureRegistrar() {
  const { gl, scene, camera } = useThree();
  const { registerCapture } = useCapture();

  useEffect(() => {
    gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    gl.shadowMap.enabled = true;
  }, [gl]);

  useEffect(() => {
    registerCapture(async () => {
      gl.render(scene, camera);
      return new Promise<Blob | null>((resolve) => {
        gl.domElement.toBlob((b) => resolve(b), "image/png");
      });
    });
  }, [gl, scene, camera, registerCapture]);

  return null;
}

function AvatarWithFallback({ avatarUrl }: { avatarUrl: string }) {
  return (
    <ModelErrorBoundary fallback={<FallbackAvatar />}>
      <Suspense fallback={<FallbackAvatar />}>
        <AvatarModel url={avatarUrl} scale={1.2} position={[0, 0, 0]} />
      </Suspense>
    </ModelErrorBoundary>
  );
}

export type BodyBaseMode = "mannequin" | "custom";

type Scene3DProps = {
  bodyBase: BodyBaseMode;
  customAvatarUrl: string;
  attachedProductGltfUrl: string | null;
  garmentTextureUrl: string | null;
  garmentPreset: GarmentPreset;
  uvRepeat: [number, number];
  clothOffsetY: number;
  clothOffsetZ: number;
  clothScale: number;
};

export function Scene3D({
  bodyBase,
  customAvatarUrl,
  attachedProductGltfUrl,
  garmentTextureUrl,
  garmentPreset,
  uvRepeat,
  clothOffsetY,
  clothOffsetZ,
  clothScale,
}: Scene3DProps) {
  const customUrl = (customAvatarUrl || DEFAULT_AVATAR_URL).trim();
  const torsoY = bodyBase === "mannequin" ? 0.98 : 1.05;

  return (
    <Canvas
      gl={{ preserveDrawingBuffer: true, antialias: true }}
      style={{ width: "100%", height: "100%", background: "#1a1a1f" }}
    >
      <color attach="background" args={["#1a1a1f"]} />
      <PerspectiveCamera makeDefault position={[0.85, 1.35, 2.4]} fov={42} />
      <OrbitControls
        target={[0, 0.95, 0]}
        minDistance={1.2}
        maxDistance={6}
        maxPolarAngle={Math.PI * 0.52}
      />
      <ambientLight intensity={0.55} />
      <directionalLight
        position={[3, 6, 4]}
        intensity={1.1}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <directionalLight position={[-2, 3, -2]} intensity={0.35} />
      <Environment preset="city" />
      <Suspense fallback={null}>
        {bodyBase === "mannequin" ? (
          <>
            <MannequinAvatar scale={1.05} />
            {attachedProductGltfUrl ? (
              <ModelErrorBoundary fallback={null}>
                <Suspense fallback={null}>
                  <AttachedProductGltf url={attachedProductGltfUrl} />
                </Suspense>
              </ModelErrorBoundary>
            ) : null}
          </>
        ) : (
          <AvatarWithFallback avatarUrl={customUrl} />
        )}
        {garmentTextureUrl ? (
          <TexturedGarment
            textureUrl={garmentTextureUrl}
            preset={garmentPreset}
            uvRepeat={uvRepeat}
            offsetY={clothOffsetY}
            offsetZ={clothOffsetZ}
            scale={clothScale}
            torsoY={torsoY}
          />
        ) : null}
      </Suspense>
      <mesh rotation-x={-Math.PI / 2} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color="#2a2a32" roughness={0.9} metalness={0.05} />
      </mesh>
      <ContactShadows
        position={[0, 0.01, 0]}
        opacity={0.45}
        scale={8}
        blur={2.2}
        far={5}
      />
      <CaptureRegistrar />
    </Canvas>
  );
}
