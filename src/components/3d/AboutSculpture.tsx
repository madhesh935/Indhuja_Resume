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

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 9);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Group for complete sculpture
    const sculptureGroup = new THREE.Group();
    scene.add(sculptureGroup);

    // Subtle Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const goldLight = new THREE.PointLight(0xd3b679, 1.8, 20);
    goldLight.position.set(4, 5, 4);
    scene.add(goldLight);

    const rimLight = new THREE.PointLight(0x706d67, 1.2, 20);
    rimLight.position.set(-4, -3, -2);
    scene.add(rimLight);

    // Materials: Matte dark with champagne gold wireframes/highlights
    const darkMatteMaterial = new THREE.MeshStandardMaterial({
      color: 0x1f1e1a,
      roughness: 0.8,
      metalness: 0.2,
    });

    const goldAccentMaterial = new THREE.MeshStandardMaterial({
      color: 0xb89152,
      roughness: 0.4,
      metalness: 0.7,
    });

    // 1. Interconnected Concentric Rings
    const ring1Geom = new THREE.TorusGeometry(2.4, 0.035, 16, 100);
    const ring1 = new THREE.Mesh(ring1Geom, goldAccentMaterial);
    ring1.rotation.x = Math.PI / 3;
    sculptureGroup.add(ring1);

    const ring2Geom = new THREE.TorusGeometry(1.8, 0.03, 16, 100);
    const ring2 = new THREE.Mesh(ring2Geom, darkMatteMaterial);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = Math.PI / 6;
    sculptureGroup.add(ring2);

    const ring3Geom = new THREE.TorusGeometry(1.2, 0.025, 16, 100);
    const ring3 = new THREE.Mesh(ring3Geom, goldAccentMaterial);
    ring3.rotation.z = Math.PI / 5;
    ring3.rotation.y = Math.PI / 3;
    sculptureGroup.add(ring3);

    // 2. Inner Analytical Core: Icosahedron Wireframe
    const coreGeom = new THREE.IcosahedronGeometry(0.85, 1);
    const coreWireframe = new THREE.WireframeGeometry(coreGeom);
    const wireframeMat = new THREE.LineBasicMaterial({
      color: 0xb89152,
      transparent: true,
      opacity: 0.35,
    });
    const coreLines = new THREE.LineSegments(coreWireframe, wireframeMat);
    sculptureGroup.add(coreLines);

    // 3. Small Data Nodes positioned along vertices
    const nodeGeom = new THREE.SphereGeometry(0.06, 12, 12);
    const nodeGroup = new THREE.Group();
    const nodeCount = 14;
    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2;
      const radius = 1.8;
      const node = new THREE.Mesh(nodeGeom, i % 2 === 0 ? goldAccentMaterial : darkMatteMaterial);
      node.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle * 1.5) * 0.4,
        Math.sin(angle) * radius
      );
      nodeGroup.add(node);
    }
    sculptureGroup.add(nodeGroup);

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

    // Mouse Interaction
    let targetRotX = 0;
    let targetRotY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotY = x * 0.4;
      targetRotX = y * 0.4;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Render loop
    const clock = new THREE.Clock();
    const animate = () => {
      animFrameId.current = requestAnimationFrame(animate);
      if (!isVisibleRef.current || prefersReducedMotion) return;

      const elapsedTime = clock.getElapsedTime();

      // Slow elegant rotations
      ring1.rotation.z = elapsedTime * 0.12;
      ring2.rotation.x = elapsedTime * -0.15;
      ring3.rotation.y = elapsedTime * 0.18;
      coreLines.rotation.x = elapsedTime * 0.08;
      coreLines.rotation.y = elapsedTime * 0.1;
      nodeGroup.rotation.y = elapsedTime * -0.12;

      // Mouse response
      sculptureGroup.rotation.y += (targetRotY - sculptureGroup.rotation.y) * 0.03;
      sculptureGroup.rotation.x += (targetRotX - sculptureGroup.rotation.x) * 0.03;

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
      ring1Geom.dispose();
      ring2Geom.dispose();
      ring3Geom.dispose();
      coreGeom.dispose();
      coreWireframe.dispose();
      nodeGeom.dispose();
      darkMatteMaterial.dispose();
      goldAccentMaterial.dispose();
      wireframeMat.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-[320px] sm:h-[380px] md:h-[420px] relative flex items-center justify-center pointer-events-none"
    />
  );
};
