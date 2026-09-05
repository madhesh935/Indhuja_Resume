import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface HeroCanvasProps {
  mousePosition: { x: number; y: number };
  scrollY: number;
}

export const HeroCanvas: React.FC<HeroCanvasProps> = ({ mousePosition, scrollY }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const pointsRef = useRef<THREE.Points | null>(null);
  const linesRef = useRef<THREE.LineSegments | null>(null);
  const gridRef = useRef<THREE.GridHelper | null>(null);
  const animFrameId = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);



  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 18);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 1. Perspective Analytical Grid (Subtle, max 3-5 deg rotation)
    const gridHelper = new THREE.GridHelper(26, 26, 0xb89152, 0x161513);
    // Subtle opacity
    const gridMaterial = gridHelper.material as THREE.LineBasicMaterial;
    gridMaterial.opacity = 0.08;
    gridMaterial.transparent = true;
    gridHelper.position.set(0, -3.5, -4);
    gridHelper.rotation.x = Math.PI / 4.2;
    scene.add(gridHelper);
    gridRef.current = gridHelper;

    // 2. Data Points & Analytics Network
    const particleCount = 45;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const goldColor = new THREE.Color(0xb89152);
    const grayColor = new THREE.Color(0x8a8780);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;

      const chosenColor = Math.random() > 0.4 ? goldColor : grayColor;
      colors[i * 3] = chosenColor.r;
      colors[i * 3 + 1] = chosenColor.g;
      colors[i * 3 + 2] = chosenColor.b;
    }

    const pointsGeometry = new THREE.BufferGeometry();
    pointsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    pointsGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const pointsMaterial = new THREE.PointsMaterial({
      size: 0.16,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
    });

    const points = new THREE.Points(pointsGeometry, pointsMaterial);
    scene.add(points);
    pointsRef.current = points;

    // 3. Subtle Interconnecting Network Lines
    const lineIndices: number[] = [];
    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 4.2) {
          lineIndices.push(i, j);
        }
      }
    }

    const linesGeometry = new THREE.BufferGeometry();
    linesGeometry.setAttribute('position', pointsGeometry.getAttribute('position'));
    linesGeometry.setIndex(lineIndices);

    const linesMaterial = new THREE.LineBasicMaterial({
      color: 0xb89152,
      transparent: true,
      opacity: 0.12,
    });

    const lines = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(lines);
    linesRef.current = lines;

    // Visibility Observer to suspend rendering loop when off-screen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animFrameId.current = requestAnimationFrame(animate);
      if (!isVisibleRef.current || prefersReducedMotion) return;

      const elapsedTime = clock.getElapsedTime();

      // Slow organic rotation of data particles
      if (pointsRef.current) {
        pointsRef.current.rotation.y = elapsedTime * 0.04;
        pointsRef.current.rotation.x = Math.sin(elapsedTime * 0.03) * 0.05;
      }
      if (linesRef.current) {
        linesRef.current.rotation.y = elapsedTime * 0.04;
        linesRef.current.rotation.x = Math.sin(elapsedTime * 0.03) * 0.05;
      }

      // Smooth mouse parallax on camera (subtle, max 3-5 degrees)
      if (cameraRef.current) {
        const targetX = mousePosition.x * 0.8;
        const targetY = -mousePosition.y * 0.5;
        cameraRef.current.position.x += (targetX - cameraRef.current.position.x) * 0.04;
        cameraRef.current.position.y += (targetY - cameraRef.current.position.y) * 0.04;
        cameraRef.current.lookAt(0, 0, 0);
      }

      // Scroll effect: particles spread out gently as scroll increases
      if (pointsRef.current && linesRef.current) {
        const scrollFactor = Math.min(scrollY * 0.003, 1.5);
        pointsRef.current.position.z = -scrollFactor * 2;
        linesRef.current.position.z = -scrollFactor * 2;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
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
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden select-none" />
  );
};

