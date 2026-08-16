"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Truck from "./Truck";
import Environment from "./Environment";

// Subtle camera breathing animation
function CameraRig() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const lookTarget = useRef(new THREE.Vector3(0, 1.5, 0));

  useFrame((state) => {
    if (!cameraRef.current) return;
    const t = state.clock.elapsedTime;
    const cam = cameraRef.current;

    // Very subtle breathing
    cam.position.x = 10 + Math.sin(t * 0.15) * 0.3;
    cam.position.y = 5 + Math.sin(t * 0.2) * 0.15;
    cam.position.z = 10 + Math.cos(t * 0.15) * 0.3;

    cam.lookAt(lookTarget.current);
  });

  return <perspectiveCamera ref={cameraRef} makeDefault position={[10, 5, 10]} fov={32} near={0.1} far={100} />;
}

// Loading fallback
function Loader() {
  return (
    <mesh>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshBasicMaterial color="#DC2626" wireframe />
    </mesh>
  );
}

export default function Scene() {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 0.9,
      }}
      camera={{
        fov: 32,
        near: 0.1,
        far: 100,
      }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
      }}
    >
      <Suspense fallback={<Loader />}>
        <Environment />
        <Truck />
        <CameraRig />
      </Suspense>
    </Canvas>
  );
}
