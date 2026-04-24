import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

function DynamicShape({ type = "abstract", color = "#6366f1" }: { type?: string; color?: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 64, 64]} scale={1.5}>
        <MeshDistortMaterial
          color={color}
          speed={2}
          distort={0.4}
          radius={1}
          metalness={0.8}
          roughness={0.2}
        />
      </Sphere>
    </Float>
  );
}

export function ThreeScene({ type, color }: { type?: string; color?: string }) {
  return (
    <div className="w-full h-[500px] relative">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} color={color} intensity={1} />
        
        <DynamicShape type={type} color={color} />
        
        <gridHelper args={[20, 20, 0x444444, 0x222222]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -2]} />
      </Canvas>
    </div>
  );
}
