"use client";

import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import Truck from "./Truck";
import Environment from "./Environment";
import { useScrollStore } from "@/lib/scroll-store";

// Camera keyframes: [progress, [x,y,z], [lookX,lookY,lookZ]]
// These define the camera path as scroll goes from 0→1
type CamKey = { t: number; pos: [number, number, number]; look: [number, number, number] };

const CAMERA_KEYS: CamKey[] = [
  { t: 0.00, pos: [12, 5, 12],   look: [0, 2, 0] },       // Hero: 3/4 front view
  { t: 0.05, pos: [12, 5, 12],   look: [0, 2, 0] },       // Hero end
  { t: 0.10, pos: [-6, 4, 10],   look: [0, 2, 0] },       // Orbit: moving left
  { t: 0.15, pos: [-10, 4, 6],   look: [0, 2, 0] },       // Orbit: left side
  { t: 0.20, pos: [-4, 5, 4],    look: [3, 2, 0] },       // Tech: close-up approach to cab
  { t: 0.25, pos: [2, 3.5, 5],   look: [3, 2, 0] },       // Tech: close to cab
  { t: 0.35, pos: [0, 8, 16],    look: [0, 1.5, 0] },     // Services: pulled back full view
  { t: 0.45, pos: [0, 8, 16],    look: [0, 1.5, 0] },     // Services: hold
  { t: 0.50, pos: [-3, 1.5, 6],  look: [-1, 1, 0] },      // Workshop: low angle undercarriage
  { t: 0.55, pos: [5, 2, 3],     look: [0, 2.5, 0] },     // Stats: dramatic low angle
  { t: 0.65, pos: [-5, 6, -6],   look: [-2, 2, 0] },      // Company: back 3/4 view
  { t: 0.75, pos: [0, 4, 10],    look: [0, 2, 0] },       // Projects: side view
  { t: 0.85, pos: [0, 14, 1],    look: [0, 0, 0] },       // Fleet: aerial top-down
  { t: 0.92, pos: [8, 5, 10],    look: [0, 2, 0] },       // Contact: returning to front
  { t: 1.00, pos: [16, 7, 16],   look: [0, 1.5, 0] },     // Finale: pulling back
];

function lerp3(a: [number, number, number], b: [number, number, number], t: number): [number, number, number] {
  return [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
  ];
}

function getCameraState(progress: number): { pos: [number, number, number]; look: [number, number, number] } {
  const p = Math.max(0, Math.min(1, progress));

  // Find the two keyframes to interpolate between
  let k0 = CAMERA_KEYS[0];
  let k1 = CAMERA_KEYS[CAMERA_KEYS.length - 1];

  for (let i = 0; i < CAMERA_KEYS.length - 1; i++) {
    if (p >= CAMERA_KEYS[i].t && p <= CAMERA_KEYS[i + 1].t) {
      k0 = CAMERA_KEYS[i];
      k1 = CAMERA_KEYS[i + 1];
      break;
    }
  }

  const segmentLength = k1.t - k0.t;
  const localT = segmentLength > 0 ? (p - k0.t) / segmentLength : 0;
  // Smooth step for ease
  const eased = localT * localT * (3 - 2 * localT);

  return {
    pos: lerp3(k0.pos, k1.pos, eased),
    look: lerp3(k0.look, k1.look, eased),
  };
}

// Scroll-driven camera rig
function ScrollCameraRig() {
  const { camera } = useThree();
  const progress = useScrollStore((s) => s.progress);
  const isReady = useScrollStore((s) => s.isReady);
  const currentLook = useRef(new THREE.Vector3(0, 2, 0));
  const targetLook = useRef(new THREE.Vector3(0, 2, 0));

  useFrame(() => {
    if (!isReady) return;

    const cam = camera as THREE.PerspectiveCamera;
    const { pos, look } = getCameraState(progress);

    // Smooth camera movement
    cam.position.x += (pos[0] - cam.position.x) * 0.08;
    cam.position.y += (pos[1] - cam.position.y) * 0.08;
    cam.position.z += (pos[2] - cam.position.z) * 0.08;

    // Smooth look at target
    targetLook.current.set(look[0], look[1], look[2]);
    currentLook.current.lerp(targetLook.current, 0.08);
    cam.lookAt(currentLook.current);
  });

  return null;
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
        position: [12, 5, 12],
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
        <ScrollCameraRig />
      </Suspense>
    </Canvas>
  );
}
