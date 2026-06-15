/** True when the main viewer should load with OBJLoader instead of useGLTF. */
export function isObjModelPath(path: string): boolean {
  return path.toLowerCase().endsWith(".obj");
}
