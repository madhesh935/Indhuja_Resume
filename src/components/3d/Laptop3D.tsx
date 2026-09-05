import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Layers, Activity, Calendar, Clock, CheckCircle2, SlidersHorizontal, ArrowUpRight } from 'lucide-react';

interface Laptop3DProps {
  onOpenDetails?: () => void;
}

export const Laptop3D: React.FC<Laptop3DProps> = ({ onOpenDetails }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Scroll progression
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'center center'],
  });

  // Entry transforms specified in prompt:
  // start: scale: 0.82, rotateY: -14deg, rotateX: 6deg, translateY: 70px
  // scroll to center: scale: 1, rotateY: 0, rotateX: 0, translateY: 0
  const rawRotateY = useTransform(scrollYProgress, [0, 1], [-14, 0]);
  const rawRotateX = useTransform(scrollYProgress, [0, 1], [6, 0]);
  const rawScale = useTransform(scrollYProgress, [0, 1], [0.82, 1]);
  const rawTranslateY = useTransform(scrollYProgress, [0, 1], [70, 0]);

  const smoothRotateY = useSpring(rawRotateY, { damping: 22, stiffness: 130 });
  const smoothRotateX = useSpring(rawRotateX, { damping: 22, stiffness: 130 });
  const smoothScale = useSpring(rawScale, { damping: 22, stiffness: 130 });
  const smoothTranslateY = useSpring(rawTranslateY, { damping: 22, stiffness: 130 });

  // Mouse tilt (max 2.5 deg)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || window.innerWidth < 768) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({ x: x * 2.2, y: -y * 1.8 });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // 5 Floating tags with thin connector lines: PLANNING, ORDERS, RESOURCES, ANALYTICS, SCHEDULE
  const floatingTags = [
    { name: 'PLANNING', position: 'top-6 -left-4 md:-left-12', delay: 0.1 },
    { name: 'ORDERS', position: 'top-20 -right-4 md:-right-12', delay: 0.25 },
    { name: 'RESOURCES', position: 'bottom-28 -left-6 md:-left-14', delay: 0.4 },
    { name: 'ANALYTICS', position: 'bottom-16 -right-6 md:-right-14', delay: 0.55 },
    { name: 'SCHEDULE', position: '-top-4 right-1/4', delay: 0.7 },
  ];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-4xl mx-auto py-12 px-2 sm:px-4 perspective-[1400px] select-none"
    >
      {/* 5 Floating Project Module Tags with connector dots */}
      {floatingTags.map((tag) => (
        <motion.div
          key={tag.name}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: tag.delay }}
          animate={{
            y: [0, -5, 0],
            x: mousePos.x * 1.5,
          }}
          className={`absolute ${tag.position} z-30 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#111111]/90 border border-[#C6A15B]/40 text-[#DFC786] text-[11px] font-mono shadow-[0_8px_24px_rgba(0,0,0,0.6)] backdrop-blur-md`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#C6A15B]" />
          <span>{tag.name}</span>
        </motion.div>
      ))}

      {/* Main 3D Tilted Device Chassis Container */}
      <motion.div
        style={{
          scale: smoothScale,
          rotateY: smoothRotateY,
          rotateX: smoothRotateX,
          y: smoothTranslateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative transition-transform duration-200 ease-out"
      >
        {/* Screen Lid / Bezel with Gold Rim Light */}
        <div className="relative rounded-t-2xl sm:rounded-t-3xl bg-[#161616] p-2.5 sm:p-4 border border-white/12 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.95)] ring-1 ring-[#C6A15B]/20">
          {/* Top Webcam indicator */}
          <div className="flex justify-center mb-1.5 sm:mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#2a2a2a] border border-white/20" />
          </div>

          {/* High-Fidelity Realistic Dashboard Screen */}
          <div className="rounded-lg sm:rounded-xl bg-[#080808] border border-white/10 overflow-hidden text-[#F4F1EA] font-sans text-xs">
            {/* Window chrome topbar */}
            <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 border-b border-white/10 bg-[#0E0E0E]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/80" />
                <span className="text-[11px] font-mono text-[#A9A59D] ml-2.5 hidden sm:inline">
                  Garment Production Planner • Operations Engine
                </span>
              </div>
              <div className="flex items-center gap-2">
                {/* Visible Demodata Badge as required by rule 24 */}
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-[#191919] text-[#DFC786] border border-[#C6A15B]/40">
                  CONCEPT INTERFACE · DEMO DATA
                </span>
                <button
                  type="button"
                  onClick={onOpenDetails}
                  className="hidden md:flex items-center gap-1 text-[10px] font-mono text-[#A9A59D] hover:text-[#C6A15B] transition-colors"
                >
                  <span>Case Study</span>
                  <ArrowUpRight className="w-2.5 h-2.5" />
                </button>
              </div>
            </div>

            {/* Dashboard Visual Content */}
            <div className="p-3 sm:p-5 space-y-4">
              {/* Stat Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                <div className="p-3 rounded-xl bg-[#111111] border border-white/8">
                  <div className="flex items-center justify-between text-[#A9A59D] text-[10px] uppercase font-mono">
                    <span>Active Orders</span>
                    <Layers className="w-3.5 h-3.5 text-[#C6A15B]" />
                  </div>
                  <div className="text-xl sm:text-2xl font-serif text-[#F4F1EA] mt-1 font-semibold">24</div>
                  <div className="text-[10px] text-[#77736C] mt-0.5">Active Cycle</div>
                </div>

                <div className="p-3 rounded-xl bg-[#111111] border border-white/8">
                  <div className="flex items-center justify-between text-[#A9A59D] text-[10px] uppercase font-mono">
                    <span>In Production</span>
                    <Activity className="w-3.5 h-3.5 text-[#DFC786]" />
                  </div>
                  <div className="text-xl sm:text-2xl font-serif text-[#F4F1EA] mt-1 font-semibold">14</div>
                  <div className="text-[10px] text-[#DFC786] mt-0.5">Under Assembly</div>
                </div>

                <div className="p-3 rounded-xl bg-[#111111] border border-white/8">
                  <div className="flex items-center justify-between text-[#A9A59D] text-[10px] uppercase font-mono">
                    <span>Completed</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C6A15B]" />
                  </div>
                  <div className="text-xl sm:text-2xl font-serif text-[#F4F1EA] mt-1 font-semibold">82</div>
                  <div className="text-[10px] text-[#77736C] mt-0.5">Verified Batches</div>
                </div>

                <div className="p-3 rounded-xl bg-[#111111] border border-white/8">
                  <div className="flex items-center justify-between text-[#A9A59D] text-[10px] uppercase font-mono">
                    <span>Pending</span>
                    <Clock className="w-3.5 h-3.5 text-[#77736C]" />
                  </div>
                  <div className="text-xl sm:text-2xl font-serif text-[#F4F1EA] mt-1 font-semibold">08</div>
                  <div className="text-[10px] text-[#77736C] mt-0.5">Queue Inspection</div>
                </div>
              </div>

              {/* Middle Section: Timeline & Resource Load */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Timeline */}
                <div className="md:col-span-2 p-3.5 rounded-xl bg-[#111111] border border-white/8">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-[#F4F1EA]">
                      <Calendar className="w-3.5 h-3.5 text-[#C6A15B]" />
                      <span>Production Schedule &amp; Order Pipeline</span>
                    </div>
                    <span className="text-[10px] text-[#77736C] font-mono">Realtime Track</span>
                  </div>

                  <div className="space-y-2.5 text-[11px]">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] text-[#A9A59D]">
                        <span>Batch #GP-402 • Cotton Apparel</span>
                        <span className="text-[#DFC786]">Cutting → Sewing</span>
                      </div>
                      <div className="w-full bg-[#1A1919] h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[#C6A15B] h-full w-[72%] rounded-full" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] text-[#A9A59D]">
                        <span>Batch #GP-403 • Twill Trousers</span>
                        <span className="text-[#A9A59D]">Finishing &amp; Packaging</span>
                      </div>
                      <div className="w-full bg-[#1A1919] h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[#C6A15B] h-full w-[88%] rounded-full" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] text-[#A9A59D]">
                        <span>Batch #GP-405 • Linen Overcoats</span>
                        <span className="text-[#77736C]">Material Estimation</span>
                      </div>
                      <div className="w-full bg-[#1A1919] h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[#77736C] h-full w-[35%] rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Resource Allocation */}
                <div className="p-3.5 rounded-xl bg-[#111111] border border-white/8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-[#F4F1EA] mb-3">
                      <SlidersHorizontal className="w-3.5 h-3.5 text-[#C6A15B]" />
                      <span>Resource Load</span>
                    </div>

                    <div className="space-y-2.5 text-[10px]">
                      <div>
                        <div className="flex justify-between text-[#A9A59D] mb-1">
                          <span>Fabric Inventory</span>
                          <span className="font-mono">82%</span>
                        </div>
                        <div className="w-full bg-[#1A1919] h-1.5 rounded-full overflow-hidden">
                          <div className="bg-[#C6A15B] h-full w-[82%]" />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[#A9A59D] mb-1">
                          <span>Sewing Stations</span>
                          <span className="font-mono">68%</span>
                        </div>
                        <div className="w-full bg-[#1A1919] h-1.5 rounded-full overflow-hidden">
                          <div className="bg-[#DFC786] h-full w-[68%]" />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[#A9A59D] mb-1">
                          <span>QA Inspection</span>
                          <span className="font-mono">45%</span>
                        </div>
                        <div className="w-full bg-[#1A1919] h-1.5 rounded-full overflow-hidden">
                          <div className="bg-[#77736C] h-full w-[45%]" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-white/8 flex items-center justify-between text-[10px]">
                    <span className="text-[#77736C]">Pipeline Status</span>
                    <span className="text-[#27c93f] font-mono flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#27c93f]" /> Operational
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Laptop Base & Hinge */}
        <div className="relative h-4 sm:h-5 bg-[#1F1F1F] rounded-b-xl border-t border-white/10 shadow-[0_15px_30px_rgba(0,0,0,0.8)]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 sm:w-24 h-1.5 bg-[#111111] rounded-b-md" />
        </div>

        {/* Soft Floor Shadow */}
        <div className="w-4/5 h-8 mx-auto -mt-2 bg-black/60 blur-xl rounded-full pointer-events-none" />
      </motion.div>
    </div>
  );
};
