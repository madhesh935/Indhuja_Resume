import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ContactConstellationProps {
  isButtonHovered?: boolean;
}

export const ContactConstellation: React.FC<ContactConstellationProps> = ({ isButtonHovered = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameId = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);
  const isHoveredRef = useRef<boolean>(isButtonHovered);

  useEffect(() => {
    isHoveredRef.current = isButtonHovered;
  }, [isButtonHovered]);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 500;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0, 16);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // 24 sparse nodes (between 18–30)
    const particleCount = 24;
    const originalPositions = new Float32Array(particleCount * 3);
    const currentPositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 12;
      const z = (Math.random() - 0.5) * 6;

      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      currentPositions[i * 3] = x;
      currentPositions[i * 3 + 1] = y;
      currentPositions[i * 3 + 2] = z;
    }

    const pointsGeometry = new THREE.BufferGeometry();
    pointsGeometry.setAttribute('position', new THREE.BufferAttribute(currentPositions, 3));

    const pointsMaterial = new THREE.PointsMaterial({
      color: 0xc6a15b,
      size: 0.15,
      transparent: true,
      opacity: 0.55,
    });

    const points = new THREE.Points(pointsGeometry, pointsMaterial);
    scene.add(points);

    // Very low opacity connecting lines
    const lineIndices: number[] = [];
    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const dx = originalPositions[i * 3] - originalPositions[j * 3];
        const dy = originalPositions[i * 3 + 1] - originalPositions[j * 3 + 1];
        const dz = originalPositions[i * 3 + 2] - originalPositions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 5.0) {
          lineIndices.push(i, j);
        }
      }
    }

    const linesGeometry = new THREE.BufferGeometry();
    linesGeometry.setAttribute('position', pointsGeometry.getAttribute('position'));
    linesGeometry.setIndex(lineIndices);

    const linesMaterial = new THREE.LineBasicMaterial({
      color: 0xc6a15b,
      transparent: true,
      opacity: 0.07,
    });

    const lines = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(lines);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      // Max 4px cursor shift
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.4;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 0.4;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      animFrameId.current = requestAnimationFrame(animate);
      if (!isVisibleRef.current || prefersReducedMotion) return;

      const posAttr = pointsGeometry.getAttribute('position') as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      // Subtle convergence toward center (0,0,0) when CTA button is hovered
      for (let i = 0; i < particleCount; i++) {
        const origX = originalPositions[i * 3];
        const origY = originalPositions[i * 3 + 1];
        const origZ = originalPositions[i * 3 + 2];

        let targetX = origX + mouseX;
        let targetY = origY + mouseY;
        let targetZ = origZ;

        if (isHoveredRef.current && (i % 3 === 0)) {
          // 3-5 nearby nodes gently move toward center
          targetX = origX * 0.65;
          targetY = origY * 0.65;
          targetZ = origZ * 0.65;
        }

        posArray[i * 3] += (targetX - posArray[i * 3]) * 0.04;
        posArray[i * 3 + 1] += (targetY - posArray[i * 3 + 1]) * 0.04;
        posArray[i * 3 + 2] += (targetZ - posArray[i * 3 + 2]) * 0.04;
      }

      posAttr.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current || !renderer) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      if (renderer.domElement && container) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      pointsGeometry.dispose();
      pointsMaterial.dispose();
      linesGeometry.dispose();
      linesMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
    />
  );
};
