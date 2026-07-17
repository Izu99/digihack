"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const CYAN = "#18b2de";
const CYAN_DIM = "#0d8fb3";

function fibonacciSphere(count: number, radius: number) {
  const points: THREE.Vector3[] = [];
  const offset = 2 / count;
  const increment = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = i * offset - 1 + offset / 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const phi = i * increment;
    points.push(
      new THREE.Vector3(Math.cos(phi) * r, y, Math.sin(phi) * r).multiplyScalar(radius)
    );
  }
  return points;
}

// ── Glowing torus-knot core — the "power" center of the model ──────────
function GlowCore() {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (outerRef.current) {
      outerRef.current.rotation.x += delta * 0.132;
      outerRef.current.rotation.y += delta * 0.228;
      const s = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
      outerRef.current.scale.setScalar(s);
    }
    if (innerRef.current) {
      innerRef.current.rotation.x -= delta * 0.09;
      innerRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group>
      <mesh ref={outerRef}>
        <torusKnotGeometry args={[1.7, 0.44, 180, 26]} />
        <meshStandardMaterial
          color={CYAN}
          wireframe
          transparent
          opacity={0.3}
          emissive={CYAN}
          emissiveIntensity={0.7}
        />
      </mesh>
      <mesh ref={innerRef} rotation={[0.5, 0.5, 0]}>
        <torusKnotGeometry args={[1.0, 0.2, 120, 18]} />
        <meshStandardMaterial
          color={CYAN_DIM}
          wireframe
          transparent
          opacity={0.2}
          emissive={CYAN_DIM}
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  );
}

// ── Neural-network shell orbiting the core — nodes + pulsing links ─────
function NeuralShell({ count = 46, radius = 3.4 }: { count?: number; radius?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const lineMatRef = useRef<THREE.LineBasicMaterial>(null);

  const nodes = useMemo(() => fibonacciSphere(count, radius), [count, radius]);

  const lineGeo = useMemo(() => {
    const positions: number[] = [];
    const maxDist = radius * 0.85;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < maxDist) {
          positions.push(nodes[i].x, nodes[i].y, nodes[i].z, nodes[j].x, nodes[j].y, nodes[j].z);
        }
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(positions), 3));
    return g;
  }, [nodes, radius]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y -= delta * 0.07;
      groupRef.current.rotation.x += delta * 0.02;
    }
    if (lineMatRef.current) {
      lineMatRef.current.opacity = 0.12 + Math.sin(state.clock.elapsedTime * 0.8) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.035, 8, 8]} />
          <meshBasicMaterial color={CYAN} transparent opacity={0.85} />
        </mesh>
      ))}
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial ref={lineMatRef} color={CYAN} transparent opacity={0.15} />
      </lineSegments>
    </group>
  );
}

// ── Ambient dust particles ──────────────────────────────────────────────
function DustField({ count = 700 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    // eslint-disable-next-line react-hooks/purity -- random scatter is intentional; memoized so it stays stable across renders
    for (let i = 0; i < count * 3; i++) arr[i] = (Math.random() - 0.5) * 28;
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.018;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={CYAN} size={0.025} transparent opacity={0.5} />
    </points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 3, 5]} intensity={1.2} color={CYAN} />
      <GlowCore />
      <NeuralShell />
      <DustField />
    </>
  );
}

export default function HeroScene3D() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <Canvas
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        camera={{ position: [0, 0, 6.5], fov: 50 }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
