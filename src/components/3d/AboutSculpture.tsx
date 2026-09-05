import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const AboutSculpture: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameId = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || 360;
    const height = container.clientHeight || 360;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // Subtle dark ambient lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const goldLight = new THREE.PointLight(0xc6a15b, 1.4, 15);
    goldLight.position.set(3, 4, 3);
    scene.add(goldLight);

    const graphiteMaterial = new THREE.MeshStandardMaterial({
      color: 0x161616,
      roughness: 0.85,
      metalness: 0.25,
    });

    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xc6a15b,
      roughness: 0.4,
      metalness: 0.75,
    });

    // 1. Central Core Sphere
    const sphereGeom = new THREE.SphereGeometry(0.75, 24, 24);
    const centerSphere = new THREE.Mesh(sphereGeom, graphiteMaterial);
    group.add(centerSphere);

    // Core wireframe outline
    const wireGeom = new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(0.78, 1));
    const wireMat = new THREE.LineBasicMaterial({ color: 0xc6a15b, transparent: true, opacity: 0.35 });
    const coreLines = new THREE.LineSegments(wireGeom, wireMat);
    group.add(coreLines);

    // 2. Three Thin Orbital Rings
    const ring1Geom = new THREE.TorusGeometry(2.1, 0.025, 16, 100);
    const ring1 = new THREE.Mesh(ring1Geom, goldMaterial);
    ring1.rotation.x = Math.PI / 3;
    group.add(ring1);

    const ring2Geom = new THREE.TorusGeometry(1.65, 0.022, 16, 100);
    const ring2 = new THREE.Mesh(ring2Geom, graphiteMaterial);
    ring2.rotation.y = Math.PI / 3.8;
    ring2.rotation.x = Math.PI / 6;
    group.add(ring2);

    const ring3Geom = new THREE.TorusGeometry(1.2, 0.018, 16, 100);
    const ring3 = new THREE.Mesh(ring3Geom, goldMaterial);
    ring3.rotation.z = Math.PI / 4;
    ring3.rotation.y = Math.PI / 2.5;
    group.add(ring3);

    // 3. Tiny Connected Nodes at Ring Vertices
    const nodeGeom = new THREE.SphereGeometry(0.048, 12, 12);
    const nodeGroup = new THREE.Group();
    const nodeCount = 12;
    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2;
      const radius = 1.65;
      const node = new THREE.Mesh(nodeGeom, i % 2 === 0 ? goldMaterial : graphiteMaterial);
      node.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle * 1.5) * 0.3,
        Math.sin(angle) * radius
      );
      nodeGroup.add(node);
    }
    group.add(nodeGroup);

    // Visibility Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    let targetRotX = 0;
    let targetRotY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotY = x * 0.3;
      targetRotX = y * 0.3;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const clock = new THREE.Clock();
    const animate = () => {
      animFrameId.current = requestAnimationFrame(animate);
      if (!isVisibleRef.current || prefersReducedMotion) return;

      const elapsed = clock.getElapsedTime();

      // Rotation at controlled 0.02–0.04 rad/s
      ring1.rotation.z = elapsed * 0.035;
      ring2.rotation.x = elapsed * -0.028;
      ring3.rotation.y = elapsed * 0.04;
      nodeGroup.rotation.y = elapsed * -0.03;
      coreLines.rotation.y = elapsed * 0.02;

      group.rotation.y += (targetRotY - group.rotation.y) * 0.03;
      group.rotation.x += (targetRotX - group.rotation.x) * 0.03;

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
      sphereGeom.dispose();
      wireGeom.dispose();
      ring1Geom.dispose();
      ring2Geom.dispose();
      ring3Geom.dispose();
      nodeGeom.dispose();
      graphiteMaterial.dispose();
      goldMaterial.dispose();
      wireMat.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-[320px] sm:h-[380px] md:h-[420px] relative flex items-center justify-center pointer-events-none"
    />
  );
};
