import { useGLTF } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useMemo } from "react";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { absoluteModelUrl } from "../lib/absoluteModelUrl";
import { isObjModelPath } from "./modelPath";
import { useCustomizerStore } from "./store";
import { useFabricOnObject } from "./useFabricOnObject";
import { GarmentErrorBoundary } from "./GarmentErrorBoundary";

function fitClonedRootForMainCanvas(source: THREE.Object3D): THREE.Group {
  const g = new THREE.Group();
  const c = source.clone(true);
  c.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(c);
  if (box.isEmpty()) {
    g.add(c);
    return g;
  }
  const center = box.getCenter(new THREE.Vector3());
  const h = Math.max(box.getSize(new THREE.Vector3()).y, 0.001);
  const sc = 1.15 / h;
  c.position.set(-center.x * sc, -box.min.y * sc, -center.z * sc);
  c.scale.setScalar(sc);
  c.traverse((o) => {
    const m = o as THREE.Mesh;
    if (m.isMesh) {
      m.castShadow = false;
      m.receiveShadow = false;
    }
  });
  g.add(c);
  g.position.set(0, 0, 0);
  return g;
}

function GarmentFromGltf({ path, fabricUrl }: { path: string; fabricUrl: string | null }) {
  const url = absoluteModelUrl(path);
  const { scene } = useGLTF(url);
  const root = useMemo(() => fitClonedRootForMainCanvas(scene), [scene, url]);
  useFabricOnObject(root, fabricUrl);
  return <primitive object={root} />;
}

function GarmentFromObj({ path, fabricUrl }: { path: string; fabricUrl: string | null }) {
  const url = absoluteModelUrl(path);
  const loaded = useLoader(OBJLoader, url);
  const root = useMemo(() => fitClonedRootForMainCanvas(loaded), [loaded, url]);
  useFabricOnObject(root, fabricUrl);
  return <primitive object={root} />;
}

function GarmentModelInner({
  path,
  fabricUrl,
}: {
  path: string;
  fabricUrl: string | null;
}) {
  if (!path) return null;
  if (isObjModelPath(path)) {
    return <GarmentFromObj path={path} fabricUrl={fabricUrl} />;
  }
  return <GarmentFromGltf path={path} fabricUrl={fabricUrl} />;
}

export function GarmentModel() {
  const path = useCustomizerStore((s) => s.activeModelPath);
  const fabricUrl = useCustomizerStore((s) => {
    if (
      !s.fabricObjectUrl ||
      !s.fabricTargetModelPath ||
      s.fabricTargetModelPath !== s.activeModelPath
    ) {
      return null;
    }
    return s.fabricObjectUrl;
  });

  return (
    <GarmentErrorBoundary modelPath={path}>
      <GarmentModelInner key={path} path={path} fabricUrl={fabricUrl} />
    </GarmentErrorBoundary>
  );
}
