"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Ground with subtle grid
function Ground() {
  return (
    <group>
      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <planeGeometry args={[300, 300]} />
        <meshStandardMaterial
          color="#0a0a0a"
          metalness={0.85}
          roughness={0.3}
        />
      </mesh>

      {/* Subtle road line */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <planeGeometry args={[300, 4]} />
        <meshStandardMaterial
          color="#0f0f0f"
          metalness={0.7}
          roughness={0.4}
          transparent
          opacity={0.5}
        />
      </mesh>
    </group>
  );
}

// Atmospheric dust particles
function DustParticles({ count }: { count: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useRef(new THREE.Object3D()).current;

  const positions = useRef(
    Float32Array.from(
      Array.from({ length: count * 3 }, () => (Math.random() - 0.5) * 40)
    )
  );

  const speeds = useRef(
    Float32Array.from(
      Array.from({ length: count }, () => 0.2 + Math.random() * 0.5)
    )
  );

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const x = positions.current[i * 3];
      const y = positions.current[i * 3 + 1] + Math.sin(time * speeds.current[i] + i) * 0.003;
      const z = positions.current[i * 3 + 2];

      dummy.position.set(x, y, z);
      const scale = 0.02 + Math.sin(time * 0.5 + i * 0.7) * 0.01;
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 4, 4]} />
      <meshBasicMaterial color="#334455" transparent opacity={0.3} />
    </instancedMesh>
  );
}

export default function Environment({ mobile = false }: { mobile?: boolean }) {
  const shadowSize = mobile ? 1024 : 2048;
  const dustCount = mobile ? 60 : 200;

  return (
    <>
      {/* === LIGHTING === */}

      {/* Main sunset light - warm backlight */}
      <directionalLight
        position={[15, 10, -8]}
        intensity={3}
        color="#ff8844"
        castShadow={!mobile}
        shadow-mapSize-width={shadowSize}
        shadow-mapSize-height={shadowSize}
        shadow-camera-far={50}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
      />

      {/* Cool fill light - opposite side */}
      <directionalLight
        position={[-10, 6, 8]}
        intensity={0.5}
        color="#4466aa"
      />

      {/* Ambient - very subtle */}
      <ambientLight intensity={0.15} color="#1a2233" />

      {/* Hemisphere light - sky/ground */}
      <hemisphereLight
        args={["#223344", "#0a0a0a", 0.3]}
      />

      {/* Rim light from below/behind for dramatic edge */}
      <spotLight
        position={[0, 0.5, -5]}
        intensity={2}
        color="#DC2626"
        angle={0.8}
        penumbra={1}
        distance={25}
        decay={2}
        target-position={[0, 2, 0]}
      />

      {/* === ENVIRONMENT === */}

      {/* Fog */}
      <fog attach="fog" args={["#0a0a0a", 12, 45]} />

      {/* Ground */}
      <Ground />

      {/* Atmospheric particles */}
      <DustParticles count={dustCount} />
    </>
  );
}
