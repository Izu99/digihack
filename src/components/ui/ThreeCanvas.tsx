"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      65,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ── Primary torus knot — wireframe ──────────────────────────────
    const geo = new THREE.TorusKnotGeometry(1.8, 0.48, 160, 24);
    const mat = new THREE.MeshBasicMaterial({
      color: 0x18b2de,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    // ── Secondary inner knot — glowing core ─────────────────────────
    const geo2 = new THREE.TorusKnotGeometry(1.1, 0.22, 100, 16);
    const mat2 = new THREE.MeshBasicMaterial({
      color: 0x0d8fb3,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const mesh2 = new THREE.Mesh(geo2, mat2);
    mesh2.rotation.set(0.5, 0.5, 0);
    scene.add(mesh2);

    // ── Particle field ───────────────────────────────────────────────
    const pGeo = new THREE.BufferGeometry();
    const count = 700;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) pos[i] = (Math.random() - 0.5) * 28;
    pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x18b2de,
      size: 0.025,
      transparent: true,
      opacity: 0.5,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    let animId: number;
    let time = 0;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      time += 0.01;

      // Breathing scale animation on primary
      const s = 1 + Math.sin(time * 0.5) * 0.04;
      mesh.scale.set(s, s, s);

      mesh.rotation.x  += 0.0022;
      mesh.rotation.y  += 0.0038;
      mesh2.rotation.x -= 0.0015;
      mesh2.rotation.y += 0.0025;
      particles.rotation.y += 0.0003;

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      geo.dispose(); mat.dispose();
      geo2.dispose(); mat2.dispose();
      pGeo.dispose(); pMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
