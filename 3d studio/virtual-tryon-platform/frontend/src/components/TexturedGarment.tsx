import { useTexture } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import * as THREE from "three";

export type GarmentPreset = "torso" | "kurta" | "plane";

type Props = {
  textureUrl: string;
  preset: GarmentPreset;
  uvRepeat: [number, number];
  offsetY: number;
  offsetZ: number;
  scale: number;
  /** Vertical anchor for PNG shell (mannequin ~0.98, tall GLB ~1.05) */
  torsoY?: number;
};

export function TexturedGarment({
  textureUrl,
  preset,
  uvRepeat,
  offsetY,
  offsetZ,
  scale,
  torsoY = 1.05,
}: Props) {
  const texture = useTexture(textureUrl);

  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.flipY = false;
    texture.repeat.set(uvRepeat[0], uvRepeat[1]);
    texture.needsUpdate = true;
  }, [texture, uvRepeat]);

  const geometry = useMemo(() => {
    if (preset === "plane") {
      return new THREE.PlaneGeometry(0.9 * scale, 1.1 * scale, 1, 1);
    }
    if (preset === "kurta") {
      return new THREE.CylinderGeometry(
        0.42 * scale,
        0.48 * scale,
        1.15 * scale,
        48,
        1,
        true
      );
    }
    return new THREE.CylinderGeometry(
      0.38 * scale,
      0.44 * scale,
      0.85 * scale,
      48,
      1,
      true
    );
  }, [preset, scale]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  const posY = torsoY + offsetY;
  const posZ = 0.12 + offsetZ;

  return (
    <mesh
      geometry={geometry}
      position={[0, posY, posZ]}
      rotation={[0, 0, 0]}
      castShadow
    >
      <meshStandardMaterial
        map={texture}
        side={THREE.DoubleSide}
        transparent
        opacity={0.96}
        roughness={0.75}
        metalness={0.02}
      />
    </mesh>
  );
}
