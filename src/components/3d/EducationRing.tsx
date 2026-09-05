import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

interface EducationRingProps {
  score: string;
  label: string;
}

export const EducationRing: React.FC<EducationRingProps> = ({ score, label }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameId = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || 280;
    const height = container.clientHeight || 280;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // Subtle lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const goldPoint = new THREE.PointLight(0xd3b679, 1.5, 10);
    goldPoint.position.set(2, 3, 3);
    scene.add(goldPoint);

    // 1. Champagne Gold Torus (Main Orbiting Ring)
    const torusGeom = new THREE.TorusGeometry(2.0, 0.045, 16, 100);
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xb89152,
      roughness: 0.35,
      metalness: 0.75,
    });
    const mainRing = new THREE.Mesh(torusGeom, goldMaterial);
    mainRing.rotation.x = Math.PI / 2.6;
    group.add(mainRing);

    // 2. Secondary Thin Eccentric Orbital Ring
    const ring2Geom = new THREE.TorusGeometry(2.35, 0.018, 12, 100);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0x8a8780,
      roughness: 0.5,
      metalness: 0.4,
      transparent: true,
      opacity: 0.4,
    });
    const secondaryRing = new THREE.Mesh(ring2Geom, ring2Mat);
    secondaryRing.rotation.x = Math.PI / 2.2;
    secondaryRing.rotation.y = Math.PI / 7;
    group.add(secondaryRing);

    // 3. Small Orbiting Marker Spheres
    const markerGeom = new THREE.SphereGeometry(0.08, 16, 16);
    const marker = new THREE.Mesh(markerGeom, goldMaterial);
    marker.position.set(2.0, 0, 0);
    mainRing.add(marker);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    let progress = 0;
    let initialEntrySpin = 1.0;

    const animate = () => {
      animFrameId.current = requestAnimationFrame(animate);
      if (!isVisibleRef.current || prefersReducedMotion) return;

      progress += 0.003;
      // Gently decelerate initial rotation to very slow ambient movement as required by prompt
      if (initialEntrySpin > 0.005) {
        initialEntrySpin *= 0.985;
      }

      const spinSpeed = initialEntrySpin + 0.0025;
      mainRing.rotation.z += spinSpeed;
      secondaryRing.rotation.z -= spinSpeed * 0.7;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      observer.disconnect();
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      if (renderer.domElement && container) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      torusGeom.dispose();
      ring2Geom.dispose();
      markerGeom.dispose();
      goldMaterial.dispose();
      ring2Mat.dispose();
    };
  }, []);

  return (
    <div className="relative w-64 h-64 sm:w-72 sm:h-72 mx-auto flex items-center justify-center select-none">
      {/* 3D WebGL Canvas Layer */}
      <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* SVG Circular Progress Arc in Background */}
      <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-4" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="42"
          stroke="rgba(184, 145, 82, 0.15)"
          strokeWidth="3"
          fill="none"
        />
        <motion.circle
          cx="50"
          cy="50"
          r="42"
          stroke="#B89152"
          strokeWidth="3.5"
          strokeDasharray="264"
          initial={{ strokeDashoffset: 264 }}
          whileInView={{ strokeDashoffset: 264 * (1 - 0.83) }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* Center Percentage Display */}
      <div className="relative z-10 text-center flex flex-col items-center justify-center p-6 rounded-full bg-[#F7F4EE]/80 backdrop-blur-sm border border-[#B89152]/20 shadow-[0_8px_32px_rgba(184,145,82,0.12)]">
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-4xl sm:text-5xl font-semibold text-[#11110F] tracking-tight"
        >
          {score}
        </motion.span>
        <span className="text-[11px] font-mono tracking-widest text-[#B89152] uppercase mt-1 font-semibold">
          {label}
        </span>
      </div>
    </div>
  );
};
