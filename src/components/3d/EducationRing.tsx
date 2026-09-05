import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

interface EducationRingProps {
  score: string;
  label: string;
  orbitingLabels?: string[];
}

export const EducationRing: React.FC<EducationRingProps> = ({
  score,
  label,
  orbitingLabels = ['COMPUTER SCIENCE', 'DATA ANALYTICS', 'PROGRAMMING', 'DATABASES']
}) => {
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
    camera.position.set(0, 0, 7.2);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const goldPoint = new THREE.PointLight(0xc6a15b, 1.6, 12);
    goldPoint.position.set(3, 3, 3);
    scene.add(goldPoint);

    // Champagne gold main torus
    const torusGeom = new THREE.TorusGeometry(2.0, 0.038, 16, 100);
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xc6a15b,
      roughness: 0.35,
      metalness: 0.8,
    });
    const mainRing = new THREE.Mesh(torusGeom, goldMaterial);
    mainRing.rotation.x = Math.PI / 2.6;
    group.add(mainRing);

    // Secondary thin orbit
    const ring2Geom = new THREE.TorusGeometry(2.35, 0.015, 12, 100);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0x555555,
      roughness: 0.6,
      metalness: 0.3,
      transparent: true,
      opacity: 0.3,
    });
    const secondaryRing = new THREE.Mesh(ring2Geom, ring2Mat);
    secondaryRing.rotation.x = Math.PI / 2.2;
    group.add(secondaryRing);

    const markerGeom = new THREE.SphereGeometry(0.07, 16, 16);
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

    let initialSpin = 0.8;

    const animate = () => {
      animFrameId.current = requestAnimationFrame(animate);
      if (!isVisibleRef.current || prefersReducedMotion) return;

      // Animate on entry, then stop (as required by prompt section 35)
      if (initialSpin > 0.0005) {
        initialSpin *= 0.97;
        mainRing.rotation.z += initialSpin;
        secondaryRing.rotation.z -= initialSpin * 0.7;
      }

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
    <div className="relative w-72 h-72 sm:w-80 sm:h-80 mx-auto flex items-center justify-center select-none">
      {/* 3D WebGL Canvas Layer */}
      <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* SVG Circular Progress Arc in Background */}
      <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-5" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="42"
          stroke="rgba(255, 255, 255, 0.06)"
          strokeWidth="2.5"
          fill="none"
        />
        <motion.circle
          cx="50"
          cy="50"
          r="42"
          stroke="#C6A15B"
          strokeWidth="3.2"
          strokeDasharray="264"
          initial={{ strokeDashoffset: 264 }}
          whileInView={{ strokeDashoffset: 264 * (1 - 0.83) }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* Center 83% Score Display */}
      <div className="relative z-10 text-center flex flex-col items-center justify-center p-7 rounded-full bg-[#111111]/90 backdrop-blur-md border border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.7)]">
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-4xl sm:text-5xl font-medium text-[#F4F1EA] tracking-tight"
        >
          {score}
        </motion.span>
        <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-[#C6A15B] uppercase mt-1 font-semibold">
          {label}
        </span>
      </div>

      {/* 4 Orbiting Academic Discipline Labels */}
      {orbitingLabels.map((lbl, idx) => {
        const positions = [
          'top-0 left-1/2 -translate-x-1/2',
          'bottom-0 left-1/2 -translate-x-1/2',
          'left-0 top-1/2 -translate-y-1/2',
          'right-0 top-1/2 -translate-y-1/2',
        ];
        return (
          <span
            key={lbl}
            className={`absolute ${positions[idx]} px-2 py-0.5 rounded-full bg-[#151515] border border-white/8 text-[9px] font-mono text-[#77736C] tracking-wider uppercase z-20 pointer-events-none`}
          >
            {lbl}
          </span>
        );
      })}
    </div>
  );
};
