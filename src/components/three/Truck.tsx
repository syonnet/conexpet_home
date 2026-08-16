"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ─── Materials ───
const bodyMat = new THREE.MeshStandardMaterial({
  color: "#1a1a1a",
  metalness: 0.85,
  roughness: 0.25,
});

const tankMat = new THREE.MeshStandardMaterial({
  color: "#222222",
  metalness: 0.7,
  roughness: 0.3,
});

const wheelMat = new THREE.MeshStandardMaterial({
  color: "#0d0d0d",
  metalness: 0.2,
  roughness: 0.9,
});

const tireMat = new THREE.MeshStandardMaterial({
  color: "#1a1a1a",
  metalness: 0.1,
  roughness: 0.95,
});

const glassMat = new THREE.MeshStandardMaterial({
  color: "#334455",
  metalness: 0.95,
  roughness: 0.05,
  transparent: true,
  opacity: 0.4,
});

const headlightMat = new THREE.MeshStandardMaterial({
  color: "#ffffff",
  emissive: "#ffaa33",
  emissiveIntensity: 2,
});

const tailLightMat = new THREE.MeshStandardMaterial({
  color: "#ffffff",
  emissive: "#DC2626",
  emissiveIntensity: 3,
});

const accentMat = new THREE.MeshStandardMaterial({
  color: "#DC2626",
  emissive: "#DC2626",
  emissiveIntensity: 0.5,
});

const chassisMat = new THREE.MeshStandardMaterial({
  color: "#141414",
  metalness: 0.6,
  roughness: 0.5,
});

// ─── Wheel Component ───
function Wheel({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Tire */}
      <mesh rotation={[0, 0, Math.PI / 2]} material={tireMat}>
        <cylinderGeometry args={[0.85, 0.85, 0.55, 24]} />
      </mesh>
      {/* Rim */}
      <mesh rotation={[0, 0, Math.PI / 2]} material={wheelMat}>
        <cylinderGeometry args={[0.5, 0.5, 0.6, 16]} />
      </mesh>
      {/* Hub */}
      <mesh rotation={[0, 0, Math.PI / 2]} material={wheelMat}>
        <cylinderGeometry args={[0.15, 0.15, 0.7, 8]} />
      </mesh>
    </group>
  );
}

// ─── Truck Component ───
export default function Truck() {
  const groupRef = useRef<THREE.Group>(null);

  // Subtle idle floating animation
  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.position.y =
      Math.sin(state.clock.elapsedTime * 0.5) * 0.03;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* ═══ CHASSIS FRAME ═══ */}
      <mesh position={[-0.5, 0.8, 0]} material={chassisMat}>
        <boxGeometry args={[11, 0.35, 2.6]} />
      </mesh>

      {/* ═══ CAB ═══ */}
      <group position={[3.2, 0, 0]}>
        {/* Main cab body */}
        <mesh position={[0, 1.85, 0]} material={bodyMat}>
          <boxGeometry args={[2.8, 2.1, 2.8]} />
        </mesh>

        {/* Cab roof (slight overhang) */}
        <mesh position={[0, 3.05, 0]} material={bodyMat}>
          <boxGeometry args={[2.9, 0.2, 3.0]} />
        </mesh>

        {/* Hood / engine compartment */}
        <mesh position={[1.8, 1.5, 0]} material={bodyMat}>
          <boxGeometry args={[1.6, 1.2, 2.8]} />
        </mesh>

        {/* Hood top */}
        <mesh position={[1.8, 2.15, 0]} material={bodyMat}>
          <boxGeometry args={[1.6, 0.15, 2.8]} />
        </mesh>

        {/* Windshield */}
        <mesh position={[0.3, 2.2, 0]} rotation={[0.15, 0, 0]} material={glassMat}>
          <boxGeometry args={[0.08, 1.6, 2.4]} />
        </mesh>

        {/* Side windows - left */}
        <mesh position={[-0.1, 2.1, 1.41]} material={glassMat}>
          <boxGeometry args={[1.8, 1.2, 0.06]} />
        </mesh>

        {/* Side windows - right */}
        <mesh position={[-0.1, 2.1, -1.41]} material={glassMat}>
          <boxGeometry args={[1.8, 1.2, 0.06]} />
        </mesh>

        {/* Door line - left */}
        <mesh position={[-0.6, 1.5, 1.41]}>
          <boxGeometry args={[0.04, 2.0, 0.04]} />
        </mesh>

        {/* Door line - right */}
        <mesh position={[-0.6, 1.5, -1.41]}>
          <boxGeometry args={[0.04, 2.0, 0.04]} />
        </mesh>

        {/* Headlights */}
        <mesh position={[2.62, 1.5, 0.9]} material={headlightMat}>
          <boxGeometry args={[0.08, 0.4, 0.6]} />
        </mesh>
        <mesh position={[2.62, 1.5, -0.9]} material={headlightMat}>
          <boxGeometry args={[0.08, 0.4, 0.6]} />
        </mesh>

        {/* Headlight glow point */}
        <pointLight
          position={[2.8, 1.5, 0]}
          color="#ffaa33"
          intensity={3}
          distance={8}
          decay={2}
        />

        {/* Bumper */}
        <mesh position={[2.7, 0.7, 0]} material={chassisMat}>
          <boxGeometry args={[0.3, 0.4, 3.0]} />
        </mesh>

        {/* Side mirrors */}
        <mesh position={[0.2, 2.6, 1.7]} material={chassisMat}>
          <boxGeometry args={[0.5, 0.5, 0.08]} />
        </mesh>
        <mesh position={[0.2, 2.6, -1.7]} material={chassisMat}>
          <boxGeometry args={[0.5, 0.5, 0.08]} />
        </mesh>

        {/* Exhaust stack */}
        <mesh position={[-0.8, 3.2, 1.3]} material={chassisMat}>
          <cylinderGeometry args={[0.08, 0.1, 1.8, 8]} />
        </mesh>

        {/* Roof light bar */}
        <mesh position={[0, 3.2, 0.6]} material={accentMat}>
          <boxGeometry args={[1.5, 0.08, 0.15]} />
        </mesh>
        <mesh position={[0, 3.2, -0.6]} material={accentMat}>
          <boxGeometry args={[1.5, 0.08, 0.15]} />
        </mesh>
        <pointLight
          position={[0, 3.3, 0]}
          color="#DC2626"
          intensity={1}
          distance={5}
          decay={2}
        />
      </group>

      {/* ═══ VACUUM TANK ═══ */}
      <group position={[-2, 0, 0]}>
        {/* Main tank cylinder */}
        <mesh
          position={[0, 2.3, 0]}
          rotation={[0, 0, Math.PI / 2]}
          material={tankMat}
        >
          <cylinderGeometry args={[1.55, 1.55, 6.5, 32]} />
        </mesh>

        {/* Tank end cap - front */}
        <mesh position={[3.25, 2.3, 0]} rotation={[0, Math.PI / 2, 0]} material={bodyMat}>
          <circleGeometry args={[1.55, 32]} />
        </mesh>

        {/* Tank end cap - back */}
        <mesh position={[-3.25, 2.3, 0]} rotation={[0, -Math.PI / 2, 0]} material={bodyMat}>
          <circleGeometry args={[1.55, 32]} />
        </mesh>

        {/* Tank ring details */}
        {[2, 1, 0, -1, -2].map((x) => (
          <mesh
            key={x}
            position={[x, 2.3, 0]}
            rotation={[0, 0, Math.PI / 2]}
            material={chassisMat}
          >
            <torusGeometry args={[1.56, 0.04, 8, 32]} />
          </mesh>
        ))}

        {/* Vacuum hatch on top */}
        <mesh position={[0, 3.88, 0]} material={chassisMat}>
          <cylinderGeometry args={[0.4, 0.4, 0.15, 16]} />
        </mesh>
        <mesh position={[0, 3.95, 0]} material={chassisMat}>
          <cylinderGeometry args={[0.3, 0.3, 0.1, 16]} />
        </mesh>

        {/* Side access panel - left */}
        <mesh position={[0.5, 2.0, 1.56]} material={chassisMat}>
          <boxGeometry args={[2.5, 1.2, 0.06]} />
        </mesh>

        {/* Side access panel - right */}
        <mesh position={[0.5, 2.0, -1.56]} material={chassisMat}>
          <boxGeometry args={[2.5, 1.2, 0.06]} />
        </mesh>

        {/* Rear valve assembly */}
        <mesh position={[-3.4, 1.6, 0]} rotation={[0, 0, Math.PI / 2]} material={chassisMat}>
          <cylinderGeometry args={[0.2, 0.2, 1.5, 8]} />
        </mesh>

        {/* Tail lights */}
        <mesh position={[-3.3, 1.5, 1.2]} material={tailLightMat}>
          <boxGeometry args={[0.1, 0.35, 0.5]} />
        </mesh>
        <mesh position={[-3.3, 1.5, -1.2]} material={tailLightMat}>
          <boxGeometry args={[0.1, 0.35, 0.5]} />
        </mesh>
        <pointLight
          position={[-3.5, 1.5, 0]}
          color="#DC2626"
          intensity={2}
          distance={4}
          decay={2}
        />
      </group>

      {/* ═══ WHEELS ═══ */}
      {/* Front axle */}
      <Wheel position={[3.8, 0.85, 1.6]} />
      <Wheel position={[3.8, 0.85, -1.6]} />

      {/* Rear axle 1 */}
      <Wheel position={[-0.5, 0.85, 1.65]} />
      <Wheel position={[-0.5, 0.85, -1.65]} />

      {/* Rear axle 2 */}
      <Wheel position={[-2.2, 0.85, 1.65]} />
      <Wheel position={[-2.2, 0.85, -1.65]} />

      {/* ═══ FENDERS ═══ */}
      {/* Front fenders */}
      <mesh position={[3.8, 1.5, 1.7]} material={bodyMat}>
        <boxGeometry args={[1.2, 0.6, 0.15]} />
      </mesh>
      <mesh position={[3.8, 1.5, -1.7]} material={bodyMat}>
        <boxGeometry args={[1.2, 0.6, 0.15]} />
      </mesh>

      {/* Rear fenders */}
      <mesh position={[-1.3, 1.5, 1.75]} material={bodyMat}>
        <boxGeometry args={[3.5, 0.5, 0.12]} />
      </mesh>
      <mesh position={[-1.3, 1.5, -1.75]} material={bodyMat}>
        <boxGeometry args={[3.5, 0.5, 0.12]} />
      </mesh>

      {/* ═══ UNDERCARRIAGE DETAILS ═══ */}
      {/* Fuel tank */}
      <mesh position={[1.5, 0.5, 0]} material={chassisMat}>
        <boxGeometry args={[1.5, 0.5, 1.2]} />
      </mesh>

      {/* Mud flaps */}
      <mesh position={[-3.0, 0.4, 1.4]} material={chassisMat}>
        <boxGeometry args={[0.05, 0.6, 0.5]} />
      </mesh>
      <mesh position={[-3.0, 0.4, -1.4]} material={chassisMat}>
        <boxGeometry args={[0.05, 0.6, 0.5]} />
      </mesh>
    </group>
  );
}
