export function FallbackAvatar() {
  return (
    <group position={[0, 0.9, 0]}>
      <mesh castShadow receiveShadow>
        <capsuleGeometry args={[0.35, 1.1, 8, 16]} />
        <meshStandardMaterial color="#c4b8a8" roughness={0.6} metalness={0.05} />
      </mesh>
      <mesh position={[0, 0.75, 0.28]} castShadow>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color="#d4c4b0" roughness={0.5} />
      </mesh>
    </group>
  );
}
