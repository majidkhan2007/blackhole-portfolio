"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, PointMaterial, Points, Preload } from "@react-three/drei";
import { Suspense, useMemo } from "react";
import * as THREE from "three";
import { blackHoleFragmentShader, blackHoleVertexShader } from "@/shaders/blackHole";
import { useMouseParallax } from "@/lib/useMouseParallax";

function EventHorizonPlane() {
  const { size } = useThree();
  const mouse = useMouseParallax(0.7);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: blackHoleVertexShader,
        fragmentShader: blackHoleFragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uResolution: { value: new THREE.Vector2(size.width, size.height) },
          uMouse: { value: new THREE.Vector2(0, 0) },
        },
      }),
    [size.height, size.width]
  );

  useFrame(({ clock }) => {
    material.uniforms.uTime.value = clock.getElapsedTime();
    material.uniforms.uResolution.value.set(size.width, size.height);
    material.uniforms.uMouse.value.lerp(new THREE.Vector2(mouse.x, mouse.y), 0.05);
  });

  return (
    <mesh position={[0, 0, -1]}>
      <planeGeometry args={[12, 12]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

function DustField() {
  const points = useMemo(() => {
    const items = new Float32Array(1600 * 3);

    for (let i = 0; i < 1600; i += 1) {
      const radius = 2.2 + Math.random() * 7;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * 0.65;

      items[i * 3] = Math.cos(theta) * radius;
      items[i * 3 + 1] = Math.sin(phi) * radius * 0.45;
      items[i * 3 + 2] = Math.sin(theta) * radius;
    }

    return items;
  }, []);

  return (
    <Points positions={points} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#fff8da"
        size={0.018}
        sizeAttenuation
        depthWrite={false}
        opacity={0.75}
      />
    </Points>
  );
}

export function BlackHoleScene() {
  return (
    <div className="absolute inset-0">
      <Canvas
        dpr={[1, 1.8]}
        camera={{ position: [0, 0, 2.4], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#070302"]} />
        <fog attach="fog" args={["#070302", 6, 16]} />
        <Suspense fallback={null}>
          <Float speed={0.8} rotationIntensity={0.12} floatIntensity={0.2}>
            <EventHorizonPlane />
          </Float>
          <DustField />
          <ambientLight intensity={0.35} />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
