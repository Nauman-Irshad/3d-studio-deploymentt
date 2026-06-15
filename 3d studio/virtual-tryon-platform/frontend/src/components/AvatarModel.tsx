import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import * as THREE from "three";

/** Khronos glTF sample — small download, good fallback for dev. Swap for `/avatar.glb` in `public/`. */
export const DEFAULT_AVATAR_URL =
  "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/RiggedFigure/glTF-Binary/RiggedFigure.glb";

type Props = {
  url: string;
  position?: [number, number, number];
  scale?: number;
};

export function AvatarModel({ url, position = [0, 0, 0], scale = 1 }: Props) {
  const { scene } = useGLTF(url);
  const root = useMemo(() => scene.clone(true), [scene, url]);

  useEffect(() => {
    root.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.isMesh && m.material) {
        const mat = m.material as THREE.MeshStandardMaterial;
        mat.needsUpdate = true;
        m.castShadow = true;
        m.receiveShadow = true;
      }
    });
  }, [root]);

  return (
    <primitive object={root} position={position} scale={scale} />
  );
}

useGLTF.preload(DEFAULT_AVATAR_URL);
