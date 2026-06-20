import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

/** Orbit around mid-torso; auto-rotate so product spins on open. */
const TARGET = new THREE.Vector3(0, 0.48, 0);

export function OrbitRig() {
  return (
    <OrbitControls
      makeDefault
      enablePan={false}
      minPolarAngle={0.38}
      maxPolarAngle={Math.PI / 2 + 0.12}
      minDistance={1.18}
      maxDistance={3.5}
      target={[TARGET.x, TARGET.y, TARGET.z]}
      dampingFactor={0.06}
      enableDamping
      autoRotate
      autoRotateSpeed={2.4}
      enableZoom
    />
  );
}
