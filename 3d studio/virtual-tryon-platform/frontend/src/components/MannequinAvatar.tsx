import { useMemo } from "react";
import * as THREE from "three";

/**
 * Faceless neutral body for cloth / 3D garment preview (no head — neck stump only).
 * Roughly ~1.75m when group scale = 1.
 */
export function MannequinAvatar({ scale = 1.05 }: { scale?: number }) {
  const mat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#9a8e86",
        roughness: 0.62,
        metalness: 0.04,
      }),
    []
  );
  const s = scale;
  return (
    <group scale={s} position={[0, 0, 0]}>
      <mesh
        castShadow
        receiveShadow
        position={[0, 0.11, 0]}
        rotation={[0, 0, 0]}
        material={mat}
      >
        <boxGeometry args={[0.36, 0.22, 0.22]} />
      </mesh>
      <mesh castShadow receiveShadow position={[-0.12, 0.38, 0]} material={mat}>
        <capsuleGeometry args={[0.07, 0.36, 6, 12]} />
      </mesh>
      <mesh castShadow receiveShadow position={[0.12, 0.38, 0]} material={mat}>
        <capsuleGeometry args={[0.07, 0.36, 6, 12]} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0.62, 0]} material={mat}>
        <cylinderGeometry args={[0.17, 0.15, 0.24, 20]} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0.92, 0]} material={mat}>
        <cylinderGeometry args={[0.2, 0.17, 0.42, 24]} />
      </mesh>
      <mesh castShadow receiveShadow position={[-0.28, 1.08, 0]} rotation={[0, 0, 0.35]} material={mat}>
        <capsuleGeometry args={[0.055, 0.28, 6, 10]} />
      </mesh>
      <mesh castShadow receiveShadow position={[0.28, 1.08, 0]} rotation={[0, 0, -0.35]} material={mat}>
        <capsuleGeometry args={[0.055, 0.28, 6, 10]} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 1.28, 0]} material={mat}>
        <cylinderGeometry args={[0.09, 0.1, 0.14, 16]} />
      </mesh>
    </group>
  );
}
