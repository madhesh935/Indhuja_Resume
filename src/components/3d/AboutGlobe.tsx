import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { BarChart3, BookOpen, Cpu, Layers, Target } from 'lucide-react';
import { GLOBE_FLOATING_CARDS } from '../../data/portfolioData';

const FLOATING_CARD_ICONS: Record<string, React.ReactNode> = {
  analyze: <BarChart3 className="w-3.5 h-3.5 text-[#C9A253]" />,
  learn: <BookOpen className="w-3.5 h-3.5 text-[#C9A253]" />,
  build: <Cpu className="w-3.5 h-3.5 text-[#C9A253]" />,
  visualize: <Layers className="w-3.5 h-3.5 text-[#C9A253]" />,
  impact: <Target className="w-3.5 h-3.5 text-[#C9A253]" />,
};

interface FloatingCardPosition {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}

const CARD_POSITIONS: Record<string, FloatingCardPosition> = {
  analyze: { top: '7%', left: '6%' },
  learn: { top: '20%', right: '2%' },
  build: { top: '50%', left: '0%' },
  visualize: { top: '44%', right: '0%' },
  impact: { bottom: '16%', right: '2%' },
};

export const AboutGlobe: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameId = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);
  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number }>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
  });

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || 460;
    const height = container.clientHeight || 560;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.2, 8.8);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Subtle dark ambient lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Warm key light from upper right
    const keyLight = new THREE.DirectionalLight(0xe1c177, 1.2);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    // Soft neutral fill light
    const fillLight = new THREE.DirectionalLight(0x888888, 0.6);
    fillLight.position.set(-4, -2, 2);
    scene.add(fillLight);

    // Upward warm pedestal spotlight illuminating bottom of globe
    const pedestalSpot = new THREE.PointLight(0xc9a253, 2.4, 6);
    pedestalSpot.position.set(0, -1.5, 0.5);
    scene.add(pedestalSpot);

    // ==========================================
    // 1. MULTI-TIERED EXHIBITION PEDESTAL
    // ==========================================
    const pedestalGroup = new THREE.Group();
    pedestalGroup.position.set(0, -2.1, 0);
    mainGroup.add(pedestalGroup);

    const darkMetalMat = new THREE.MeshStandardMaterial({
      color: 0x111111,
      roughness: 0.7,
      metalness: 0.5,
    });

    const goldPolishedMat = new THREE.MeshStandardMaterial({
      color: 0xc9a253,
      roughness: 0.25,
      metalness: 0.85,
    });

    // Base Tier (wide dark cylinder)
    const baseGeom = new THREE.CylinderGeometry(1.65, 1.8, 0.22, 48);
    const baseMesh = new THREE.Mesh(baseGeom, darkMetalMat);
    pedestalGroup.add(baseMesh);

    // Base Gold Chamfer Ring
    const baseRingGeom = new THREE.TorusGeometry(1.68, 0.024, 16, 48);
    const baseRing = new THREE.Mesh(baseRingGeom, goldPolishedMat);
    baseRing.rotation.x = Math.PI / 2;
    baseRing.position.y = 0.11;
    pedestalGroup.add(baseRing);

    // Middle Tier (dark step)
    const midGeom = new THREE.CylinderGeometry(1.42, 1.55, 0.18, 48);
    const midMesh = new THREE.Mesh(midGeom, darkMetalMat);
    midMesh.position.y = 0.2;
    pedestalGroup.add(midMesh);

    // Middle Gold Collar
    const midRingGeom = new THREE.TorusGeometry(1.44, 0.022, 16, 48);
    const midRing = new THREE.Mesh(midRingGeom, goldPolishedMat);
    midRing.rotation.x = Math.PI / 2;
    midRing.position.y = 0.29;
    pedestalGroup.add(midRing);

    // Top Platform Plate
    const topGeom = new THREE.CylinderGeometry(1.22, 1.34, 0.14, 48);
    const topMesh = new THREE.Mesh(topGeom, darkMetalMat);
    topMesh.position.y = 0.36;
    pedestalGroup.add(topMesh);

    // Top Concentric Inset Gold Rings on Platform
    const topRing1Geom = new THREE.TorusGeometry(1.15, 0.018, 16, 48);
    const topRing1 = new THREE.Mesh(topRing1Geom, goldPolishedMat);
    topRing1.rotation.x = Math.PI / 2;
    topRing1.position.y = 0.43;
    pedestalGroup.add(topRing1);

    const topRing2Geom = new THREE.TorusGeometry(0.85, 0.014, 16, 48);
    const topRing2 = new THREE.Mesh(topRing2Geom, goldPolishedMat);
    topRing2.rotation.x = Math.PI / 2;
    topRing2.position.y = 0.435;
    pedestalGroup.add(topRing2);

    // ==========================================
    // 2. CENTRAL DATA GLOBE SPHERE & CONTINENT DOTS
    // ==========================================
    const globeGroup = new THREE.Group();
    globeGroup.position.set(0, 0.25, 0);
    mainGroup.add(globeGroup);

    // Dark glossy metallic core sphere
    const sphereRadius = 1.45;
    const coreSphereGeom = new THREE.SphereGeometry(sphereRadius * 0.985, 48, 48);
    const coreSphereMat = new THREE.MeshStandardMaterial({
      color: 0x09090c,
      roughness: 0.35,
      metalness: 0.65,
    });
    const coreSphere = new THREE.Mesh(coreSphereGeom, coreSphereMat);
    globeGroup.add(coreSphere);

    // Generate dotted continent / data-network point cloud on the sphere
    const pointCount = 1400;
    const pointPositions = new Float32Array(pointCount * 3);
    const pointColors = new Float32Array(pointCount * 3);

    const goldPointColor = new THREE.Color(0xc9a253);
    const lightGoldPointColor = new THREE.Color(0xe1c177);
    const faintWhitePointColor = new THREE.Color(0x555555);

    // Fibonacci sphere distribution with cluster density simulating continents
    for (let i = 0; i < pointCount; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / pointCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);

      // Noise modulation to create clustered landmass regions
      const clusterNoise =
        Math.sin(phi * 4.0) * Math.cos(theta * 3.0) +
        Math.sin(theta * 2.0 + phi) * 0.5;

      const isDataNode = clusterNoise > 0.15;
      const isBrightCluster = clusterNoise > 0.65;

      const r = sphereRadius * (isDataNode ? 1.002 : 0.995);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.cos(phi);
      const z = r * Math.sin(phi) * Math.sin(theta);

      pointPositions[i * 3] = x;
      pointPositions[i * 3 + 1] = y;
      pointPositions[i * 3 + 2] = z;

      let c = faintWhitePointColor;
      if (isBrightCluster) {
        c = lightGoldPointColor;
      } else if (isDataNode) {
        c = goldPointColor;
      }

      pointColors[i * 3] = c.r;
      pointColors[i * 3 + 1] = c.g;
      pointColors[i * 3 + 2] = c.b;
    }

    const pointsGeom = new THREE.BufferGeometry();
    pointsGeom.setAttribute('position', new THREE.BufferAttribute(pointPositions, 3));
    pointsGeom.setAttribute('color', new THREE.BufferAttribute(pointColors, 3));

    const pointsMat = new THREE.PointsMaterial({
      size: 0.042,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    const globePoints = new THREE.Points(pointsGeom, pointsMat);
    globeGroup.add(globePoints);

    // Faint longitudinal and latitudinal grid lines
    const wireGeom = new THREE.WireframeGeometry(new THREE.SphereGeometry(sphereRadius, 20, 14));
    const wireMat = new THREE.LineBasicMaterial({
      color: 0xc9a253,
      transparent: true,
      opacity: 0.12,
    });
    const globeWire = new THREE.LineSegments(wireGeom, wireMat);
    globeGroup.add(globeWire);

    // Active illuminated gold data nodes on globe
    const activeNodesGroup = new THREE.Group();
    const activeNodeCount = 18;
    const activeNodeGeom = new THREE.SphereGeometry(0.045, 12, 12);
    const activeNodeMat = new THREE.MeshBasicMaterial({
      color: 0xffe6a3,
    });

    for (let i = 0; i < activeNodeCount; i++) {
      const phi = (0.25 + (i / activeNodeCount) * 0.55) * Math.PI;
      const theta = (i * 137.5 * Math.PI) / 180;
      const r = sphereRadius * 1.01;
      const node = new THREE.Mesh(activeNodeGeom, activeNodeMat);
      node.position.set(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta)
      );
      activeNodesGroup.add(node);
    }
    globeGroup.add(activeNodesGroup);

    // ==========================================
    // 3. THIN CHAMPAGNE GOLD ORBITAL RINGS
    // ==========================================
    const ring1Geom = new THREE.TorusGeometry(1.85, 0.012, 16, 120);
    const ring1 = new THREE.Mesh(ring1Geom, goldPolishedMat);
    ring1.rotation.x = Math.PI / 2.6;
    ring1.rotation.y = 0.2;
    globeGroup.add(ring1);

    const ring2Geom = new THREE.TorusGeometry(2.1, 0.009, 16, 120);
    const ring2 = new THREE.Mesh(ring2Geom, goldPolishedMat);
    ring2.rotation.x = Math.PI / 3.4;
    ring2.rotation.y = -0.4;
    globeGroup.add(ring2);

    const ring3Geom = new THREE.TorusGeometry(2.35, 0.007, 16, 120);
    const ring3Mat = new THREE.MeshStandardMaterial({
      color: 0xc9a253,
      roughness: 0.3,
      metalness: 0.8,
      transparent: true,
      opacity: 0.55,
    });
    const ring3 = new THREE.Mesh(ring3Geom, ring3Mat);
    ring3.rotation.z = Math.PI / 4;
    ring3.rotation.x = Math.PI / 2.2;
    globeGroup.add(ring3);

    // Tiny orbital nodes revolving on ring 1
    const orbitMarker1 = new THREE.Mesh(
      new THREE.SphereGeometry(0.045, 12, 12),
      activeNodeMat
    );
    orbitMarker1.position.set(1.85, 0, 0);
    ring1.add(orbitMarker1);

    const orbitMarker2 = new THREE.Mesh(
      new THREE.SphereGeometry(0.038, 12, 12),
      activeNodeMat
    );
    orbitMarker2.position.set(-2.1, 0, 0);
    ring2.add(orbitMarker2);

    // ==========================================
    // 4. FLOATING GOLD DUST PARTICLES
    // ==========================================
    const dustCount = 45;
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 6.5;
      dustPositions[i * 3 + 1] = (Math.random() - 0.4) * 5.5;
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 4.0;
    }
    const dustGeom = new THREE.BufferGeometry();
    dustGeom.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    const dustMat = new THREE.PointsMaterial({
      color: 0xc9a253,
      size: 0.035,
      transparent: true,
      opacity: 0.45,
    });
    const dustPoints = new THREE.Points(dustGeom, dustMat);
    mainGroup.add(dustPoints);

    // ==========================================
    // 5. INTERSECTION OBSERVER & MOUSE TRACKING
    // ==========================================
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      mouseRef.current.targetX = x * 0.05; // max 2-3 degrees
      mouseRef.current.targetY = y * 0.04;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // ==========================================
    // 6. ANIMATION LOOP
    // ==========================================
    let clock = new THREE.Clock();

    const animate = () => {
      animFrameId.current = requestAnimationFrame(animate);
      if (!isVisibleRef.current || prefersReducedMotion) return;

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.04;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.04;

      mainGroup.rotation.y = mouseRef.current.x;
      mainGroup.rotation.x = mouseRef.current.y;

      // Slow elegant rotation of the globe
      globeGroup.rotation.y += delta * 0.12;

      // Independent subtle rotation of orbital rings
      ring1.rotation.z += delta * 0.08;
      ring2.rotation.z -= delta * 0.06;
      ring3.rotation.z += delta * 0.04;

      // Gentle pulsating gold intensity
      const pulse = 2.0 + Math.sin(elapsed * 1.8) * 0.4;
      pedestalSpot.intensity = pulse;

      // Subtle particle float
      dustPoints.rotation.y += delta * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    // ==========================================
    // 7. RESIZE & CLEANUP
    // ==========================================
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
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
      baseGeom.dispose();
      baseRingGeom.dispose();
      midGeom.dispose();
      midRingGeom.dispose();
      topGeom.dispose();
      topRing1Geom.dispose();
      topRing2Geom.dispose();
      coreSphereGeom.dispose();
      pointsGeom.dispose();
      wireGeom.dispose();
      activeNodeGeom.dispose();
      ring1Geom.dispose();
      ring2Geom.dispose();
      ring3Geom.dispose();
      dustGeom.dispose();
      darkMetalMat.dispose();
      goldPolishedMat.dispose();
      coreSphereMat.dispose();
      pointsMat.dispose();
      wireMat.dispose();
      activeNodeMat.dispose();
      ring3Mat.dispose();
      dustMat.dispose();
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full h-[520px] sm:h-[580px] lg:h-[640px] flex items-center justify-center select-none"
    >
      {/* Background Soft Gold Atmosphere Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[420px] h-[340px] sm:h-[420px] rounded-full pointer-events-none filter blur-[70px] opacity-60"
        style={{
          background:
            'radial-gradient(circle at center, rgba(201, 162, 83, 0.16) 0%, rgba(201, 162, 83, 0.05) 45%, transparent 70%)',
        }}
      />

      {/* Three.js 3D WebGL Canvas */}
      <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* 5 Surrounding Floating Glass Action Cards (Matching Reference Mockup) */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {GLOBE_FLOATING_CARDS.map((card, idx) => {
          const pos = CARD_POSITIONS[card.id] || {};
          return (
            <motion.div
              key={card.id}
              style={{
                top: pos.top,
                bottom: pos.bottom,
                left: pos.left,
                right: pos.right,
              }}
              animate={{
                y: [0, -3.5, 0],
              }}
              transition={{
                duration: 6 + idx * 1.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute pointer-events-auto flex items-center gap-2 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-[#0C0C0C]/90 backdrop-blur-md border border-[#C9A253]/35 shadow-[0_8px_25px_rgba(0,0,0,0.7)] hover:border-[#C9A253]/60 transition-colors cursor-default group max-w-[170px] sm:max-w-[195px]"
            >
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#151515] border border-[#C9A253]/30 flex items-center justify-center shrink-0 group-hover:border-[#C9A253] transition-colors">
                {FLOATING_CARD_ICONS[card.id]}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-wider text-[#E1C177] uppercase leading-none truncate">
                  {card.title}
                </span>
                <span className="text-[9px] sm:text-[9.5px] text-[#A8A39A] font-light leading-tight mt-0.5 truncate">
                  {card.subtitle}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
