import { useEffect, useRef, useState } from "react";

const LOGO_GLB = `${import.meta.env.BASE_URL}brand-kurta-logo.glb`;
const FALLBACK_SRC = `${import.meta.env.BASE_URL}smartfitao-logo.png`;

type Props = {
  size?: number;
};

export function BrandLogo3D({ size = 48 }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (failed) return;
    const host = hostRef.current;
    if (!host) return;

    let disposed = false;
    let animId = 0;
    let renderer: import("three").WebGLRenderer | null = null;

    void (async () => {
      try {
        const THREE = await import("three");
        const { GLTFLoader } = await import("three/examples/jsm/loaders/GLTFLoader.js");

        if (disposed || !hostRef.current) return;

        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(size, size);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.domElement.style.display = "block";
        host.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(32, 1, 0.01, 100);
        camera.position.set(0, 0.06, 2.35);

        scene.add(new THREE.AmbientLight(0xffffff, 0.72));
        const key = new THREE.DirectionalLight(0xffffff, 0.95);
        key.position.set(2.5, 4, 3);
        scene.add(key);
        const fill = new THREE.DirectionalLight(0xc8daf8, 0.4);
        fill.position.set(-2.2, 1.2, -1.5);
        scene.add(fill);

        const loader = new GLTFLoader();
        loader.load(
          LOGO_GLB,
          (gltf) => {
            if (disposed) return;
            const model = gltf.scene;
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            const dims = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(dims.x, dims.y, dims.z, 0.001);
            const fit = 1.38 / maxDim;
            model.scale.setScalar(fit);
            model.position.set(-center.x * fit, -center.y * fit, -center.z * fit);
            scene.add(model);

            const animate = () => {
              if (disposed || !renderer) return;
              model.rotation.y += 0.013;
              model.rotation.x = Math.sin(Date.now() * 0.0012) * 0.07;
              renderer.render(scene, camera);
              animId = requestAnimationFrame(animate);
            };
            animate();
          },
          undefined,
          () => {
            if (!disposed) setFailed(true);
          },
        );
      } catch {
        if (!disposed) setFailed(true);
      }
    })();

    return () => {
      disposed = true;
      cancelAnimationFrame(animId);
      renderer?.dispose();
      host.replaceChildren();
    };
  }, [size, failed]);

  if (failed) {
    return (
      <img
        src={FALLBACK_SRC}
        alt=""
        width={size}
        height={size}
        className="tk-logo-img"
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      ref={hostRef}
      className="tk-logo-3d"
      style={{ width: size, height: size }}
      aria-hidden="true"
    />
  );
}
