import { useEnvironment } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useLayoutEffect } from "react";
import { backdropAbsoluteUrl } from "./backdropPreload";

/** Applies cached EXR to scene — no remount, no dispose on switch. */
export function FastBackdropEnvironment({ exrPath }: { exrPath: string }) {
  const scene = useThree((s) => s.scene);
  const url = backdropAbsoluteUrl(exrPath);
  const texture = useEnvironment({ files: url });

  useLayoutEffect(() => {
    const prevBg = scene.background;
    const prevEnv = scene.environment;
    const prevBlur = scene.backgroundBlurriness;
    const prevBgInt = scene.backgroundIntensity;
    const prevEnvInt = scene.environmentIntensity;

    scene.background = texture;
    scene.environment = texture;
    scene.backgroundBlurriness = 0;
    scene.backgroundIntensity = 1;
    scene.environmentIntensity = 1;

    return () => {
      scene.background = prevBg;
      scene.environment = prevEnv;
      scene.backgroundBlurriness = prevBlur;
      scene.backgroundIntensity = prevBgInt;
      scene.environmentIntensity = prevEnvInt;
    };
  }, [scene, texture, exrPath]);

  return null;
}
