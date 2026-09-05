import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface HeroCanvasProps {
  mousePosition: { x: number; y: number };
  scrollY: number;
}

interface ParticleNode {
  baseX: number;
  baseY: number;
  baseZ: number;
  phaseX: number;
  phaseY: number;
  speed: number;
  isGold: boolean;
}

export const HeroCanvas: React.FC<HeroCanvasProps> = ({ mousePosition, scrollY }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const pointsRef = useRef<THREE.Points | null>(null);
  const linesRef = useRef<THREE.LineSegments | null>(null);
  const animFrameId = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);

  // References for calm animation data
  const particlesDataRef = useRef<ParticleNode[]>([]);
  const linePairsRef = useRef<[number, number][]>([]);
  const positionsArrayRef = useRef<Float32Array | null>(null);
  const linePositionsArrayRef = useRef<Float32Array | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 18);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 1. Sparse Particle Count (Point 4: Desktop 18-28, Tablet 12-18, Mobile 6-10)
    const nodeCount = width < 640 ? 8 : width < 1024 ? 14 : 22;

    const particles: ParticleNode[] = [];
    const positions = new Float32Array(nodeCount * 3);
    const colors = new Float32Array(nodeCount * 3);

    // Color definitions
    // 80-85% faint white/gray (rgba 0.16 intensity), 15-20% champagne gold
    const goldColor = new THREE.Color(0xc6a15b);
    const faintWhiteColor = new THREE.Color(0x555555);

    // Distribute strictly in the RIGHT hemisphere (x from +1.2 to +8.5)
    // ZERO particles in the left text area (x < 0 is completely protected clear zone)
    for (let i = 0; i < nodeCount; i++) {
      // Clustered around the portrait zone (x: 1.5 to 8.0, y: -4.5 to 4.5, z: -2.5 to 1.5)
      const bx = 1.4 + Math.random() * 6.8;
      const by = (Math.random() - 0.48) * 9.2;
      const bz = (Math.random() - 0.5) * 4.0;

      const isGold = i < Math.ceil(nodeCount * 0.18); // strictly ~18% gold
      const col = isGold ? goldColor : faintWhiteColor;

      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;

      positions[i * 3] = bx;
      positions[i * 3 + 1] = by;
      positions[i * 3 + 2] = bz;

      particles.push({
        baseX: bx,
        baseY: by,
        baseZ: bz,
        phaseX: Math.random() * Math.PI * 2,
        phaseY: Math.random() * Math.PI * 2,
        speed: 0.22 + Math.random() * 0.15, // 16-24s cycle duration
        isGold,
      });
    }

    particlesDataRef.current = particles;
    positionsArrayRef.current = positions;

    const pointsGeometry = new THREE.BufferGeometry();
    pointsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    pointsGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Tiny particle size: ~2.5px - 4px on screen
    const pointsMaterial = new THREE.PointsMaterial({
      size: 0.14,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });

    const points = new THREE.Points(pointsGeometry, pointsMaterial);
    scene.add(points);
    pointsRef.current = points;

    // 2. Limited Connection Lines (Point 5: max 10-14 lines, max distance ~100-140px / 2.6 units)
    const validPairs: [number, number][] = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dx = particles[i].baseX - particles[j].baseX;
        const dy = particles[i].baseY - particles[j].baseY;
        const dz = particles[i].baseZ - particles[j].baseZ;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        // Connect only close neighbors (approx 100-130px)
        if (dist < 2.5 && validPairs.length < 12) {
          validPairs.push([i, j]);
        }
      }
    }
    linePairsRef.current = validPairs;

    const linePositions = new Float32Array(validPairs.length * 6);
    linePositionsArrayRef.current = linePositions;

    const linesGeometry = new THREE.BufferGeometry();
    linesGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

    // Thinnest possible, soft champagne line with faint opacity (0.08 - 0.12)
    const linesMaterial = new THREE.LineBasicMaterial({
      color: 0xc6a15b,
      transparent: true,
      opacity: 0.09,
    });

    const lines = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(lines);
    linesRef.current = lines;

    // Visibility Observer to pause off-screen (Point 19)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    let clock = new THREE.Clock();

    const animate = () => {
      animFrameId.current = requestAnimationFrame(animate);
      if (!isVisibleRef.current || prefersReducedMotion) return;

      const elapsed = clock.getElapsedTime();

      // Slow ambient drift (Point 7: max travel 8-15px / 0.15 units, 16-24s duration)
      const currentPositions = positionsArrayRef.current;
      const currentParticles = particlesDataRef.current;
      const currentLinePositions = linePositionsArrayRef.current;

      if (currentPositions && currentParticles && pointsRef.current) {
        for (let i = 0; i < currentParticles.length; i++) {
          const p = currentParticles[i];

          // Gentle sine drift around base position
          const driftX = Math.sin(elapsed * p.speed + p.phaseX) * 0.14;
          const driftY = Math.cos(elapsed * p.speed * 0.85 + p.phaseY) * 0.14;

          // Localized subtle cursor reaction (Point 8: max 3-4px / 0.05 units)
          const cursorFactor = 0.05;
          const mouseOffsetX = mousePosition.x * cursorFactor * (p.isGold ? 1.2 : 0.8);
          const mouseOffsetY = -mousePosition.y * cursorFactor * (p.isGold ? 1.2 : 0.8);

          currentPositions[i * 3] = p.baseX + driftX + mouseOffsetX;
          currentPositions[i * 3 + 1] = p.baseY + driftY + mouseOffsetY;
          currentPositions[i * 3 + 2] = p.baseZ;
        }

        pointsRef.current.geometry.attributes.position.needsUpdate = true;

        // Update short connecting lines
        if (currentLinePositions && linesRef.current && linePairsRef.current.length > 0) {
          const pairs = linePairsRef.current;
          for (let k = 0; k < pairs.length; k++) {
            const [i1, i2] = pairs[k];
            currentLinePositions[k * 6] = currentPositions[i1 * 3];
            currentLinePositions[k * 6 + 1] = currentPositions[i1 * 3 + 1];
            currentLinePositions[k * 6 + 2] = currentPositions[i1 * 3 + 2];

            currentLinePositions[k * 6 + 3] = currentPositions[i2 * 3];
            currentLinePositions[k * 6 + 4] = currentPositions[i2 * 3 + 1];
            currentLinePositions[k * 6 + 5] = currentPositions[i2 * 3 + 2];
          }
          linesRef.current.geometry.attributes.position.needsUpdate = true;
        }

        // Scroll upward translation (Point 17: only 15-20px)
        const scrollOffset = Math.min(scrollY * 0.008, 0.4);
        pointsRef.current.position.y = scrollOffset;
        if (linesRef.current) {
          linesRef.current.position.y = scrollOffset;
        }
      }

      // Camera stays calm (Point 8: barely noticeable 2px shift)
      if (cameraRef.current) {
        const targetCamX = mousePosition.x * 0.08;
        const targetCamY = -mousePosition.y * 0.06;
        cameraRef.current.position.x += (targetCamX - cameraRef.current.position.x) * 0.02;
        cameraRef.current.position.y += (targetCamY - cameraRef.current.position.y) * 0.02;
        cameraRef.current.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      cameraRef.current.aspect = newWidth / newHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      if (rendererRef.current && rendererRef.current.domElement) {
        container.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
      pointsGeometry.dispose();
      pointsMaterial.dispose();
      linesGeometry.dispose();
      linesMaterial.dispose();
    };
  }, [mousePosition.x, mousePosition.y, scrollY]);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0" />
  );
};

