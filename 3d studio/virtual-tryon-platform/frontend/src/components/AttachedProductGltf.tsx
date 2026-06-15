import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";

type Props = {
  url: string;
  anchorY?: number;
  targetHeight?: number;
};

/**
 * Loads a product GLTF and scales it to sit on the mannequin torso.
 */
export function AttachedProductGltf({
  url,
  anchorY = 1.02,
  targetHeight = 0.62,
}: Props) {
  const { scene } = useGLTF(url);

  const obj = useMemo(() => {
    const root = new THREE.Group();
    const clone = scene.clone(true);
    clone.updateMatrixWorld(true);
    clone.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.isMesh) {
        m.castShadow = true;
        m.receiveShadow = true;
      }
    });
    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const sc = targetHeight / Math.max(size.y, 0.001);
    clone.position.set(-center.x * sc, -box.min.y * sc, -center.z * sc);
    clone.scale.setScalar(sc);
    root.add(clone);
    root.position.set(0, anchorY, 0);
    return root;
  }, [scene, url, anchorY, targetHeight]);

  return <primitive object={obj} />;
}
