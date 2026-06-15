import { useEffect, useRef } from "react";
import * as THREE from "three";

export type MatSnapshot = {
  map: THREE.Texture | null;
  color: THREE.Color;
  emissive: THREE.Color;
  emissiveMap: THREE.Texture | null;
};

function snapshotMaterial(mat: THREE.MeshStandardMaterial): MatSnapshot {
  return {
    map: mat.map ?? null,
    color: mat.color.clone(),
    emissive: mat.emissive.clone(),
    emissiveMap: mat.emissiveMap ?? null,
  };
}

function restoreMaterial(mat: THREE.MeshStandardMaterial, snap: MatSnapshot) {
  mat.map = snap.map;
  mat.color.copy(snap.color);
  mat.emissive.copy(snap.emissive);
  mat.emissiveMap = snap.emissiveMap;
  mat.needsUpdate = true;
}

/**
 * When `fabricUrl` is set, replaces MeshStandardMaterial maps with that texture;
 * otherwise restores each material from its first-seen snapshot (GLTF originals).
 */
export function useFabricOnObject(root: THREE.Object3D | null, fabricUrl: string | null) {
  const matBackup = useRef(new WeakMap<THREE.MeshStandardMaterial, MatSnapshot>());

  useEffect(() => {
    if (!root) return;

    root.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (!mesh.isMesh) return;
      const mats = (
        Array.isArray(mesh.material) ? mesh.material : [mesh.material]
      ) as THREE.Material[];
      mats.forEach((mat) => {
        if (mat instanceof THREE.MeshStandardMaterial && !matBackup.current.has(mat)) {
          matBackup.current.set(mat, snapshotMaterial(mat));
        }
      });
    });

    const applyFabric = (tex: THREE.Texture) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.needsUpdate = true;
      root.traverse((o) => {
        const mesh = o as THREE.Mesh;
        if (!mesh.isMesh) return;
        const mats = (
          Array.isArray(mesh.material) ? mesh.material : [mesh.material]
        ) as THREE.Material[];
        mats.forEach((mat) => {
          if (mat instanceof THREE.MeshStandardMaterial) {
            mat.map = tex;
            mat.color.set(0xffffff);
            mat.needsUpdate = true;
          }
        });
      });
    };

    const restoreOriginal = () => {
      root.traverse((o) => {
        const mesh = o as THREE.Mesh;
        if (!mesh.isMesh) return;
        const mats = (
          Array.isArray(mesh.material) ? mesh.material : [mesh.material]
        ) as THREE.Material[];
        mats.forEach((mat) => {
          if (mat instanceof THREE.MeshStandardMaterial) {
            const snap = matBackup.current.get(mat);
            if (snap) restoreMaterial(mat, snap);
          }
        });
      });
    };

    if (!fabricUrl) {
      restoreOriginal();
      return;
    }

    let cancelled = false;
    let loaded: THREE.Texture | null = null;
    const loader = new THREE.TextureLoader();
    loader.load(
      fabricUrl,
      (tex) => {
        if (cancelled) {
          tex.dispose();
          return;
        }
        loaded = tex;
        applyFabric(tex);
      },
      undefined,
      () => {
        restoreOriginal();
      }
    );

    return () => {
      cancelled = true;
      loaded?.dispose();
      loaded = null;
      restoreOriginal();
    };
  }, [fabricUrl, root]);
}
