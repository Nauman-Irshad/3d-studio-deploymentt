import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

/** Orbit around mid-torso; camera slightly above target so the garment sits centered, not crowding the top */
const TARGET = new THREE.Vector3(0, 0.48, 0);

/** Drag to orbit; scroll to zoom. */
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
      dampingFactor={0.085}
      enableDamping
      autoRotate
      autoRotateSpeed={1.1}
      enableZoom
    />
  );
}
