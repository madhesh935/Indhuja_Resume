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
  // rotateY(-12deg) -> rotateY(0), rotateX(4deg) -> rotateX(0), scale(0.92) -> scale(1)
  const rawRotateY = useTransform(scrollYProgress, [0, 1], [-12, 0]);
  const rawRotateX = useTransform(scrollYProgress, [0, 1], [6, 0]);
  const rawScale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);

  const smoothRotateY = useSpring(rawRotateY, { damping: 20, stiffness: 120 });
  const smoothRotateX = useSpring(rawRotateX, { damping: 20, stiffness: 120 });
  const smoothScale = useSpring(rawScale, { damping: 20, stiffness: 120 });

  // Mouse tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    // Maximum 2-3 degrees tilt
    setMousePos({ x: x * 2.5, y: -y * 2 });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const floatingTags = [
    { name: 'Planning', position: 'top-8 -left-6 md:-left-10', delay: 0 },
    { name: 'Analytics', position: 'top-16 -right-6 md:-right-10', delay: 0.2 },
    { name: 'Automation', position: 'bottom-24 -left-8 md:-left-12', delay: 0.4 },
    { name: 'Resources', position: 'bottom-16 -right-6 md:-right-12', delay: 0.6 },
  ];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-4xl mx-auto py-10 px-2 sm:px-4 perspective-[1400px] select-none"
    >
      {/* Floating 3D Orbiting Tags */}
      {floatingTags.map((tag, idx) => (
        <motion.div
          key={tag.name}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 + tag.delay }}
          animate={{
            y: [0, -6, 0],
            x: mousePos.x * (idx % 2 === 0 ? 1 : -1) * 2,
          }}
          className={`absolute ${tag.position} z-30 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1A1916]/90 border border-[#B89152]/40 text-[#D3B679] text-xs font-mono shadow-[0_8px_24px_rgba(0,0,0,0.4)] backdrop-blur-md`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#B89152]" />
          {tag.name}
        </motion.div>
      ))}

      {/* Main 3D Tilted Chassis Container */}
      <motion.div
        style={{
          scale: smoothScale,
          rotateY: smoothRotateY,
          rotateX: smoothRotateX,
          transformStyle: 'preserve-3d',
        }}
        className="relative transition-transform duration-200 ease-out"
      >
        {/* Screen Lid / Bezel */}
        <div className="relative rounded-t-2xl sm:rounded-t-3xl bg-[#1e1d1a] p-2.5 sm:p-4 border border-[#ffffff]/15 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)]">
          {/* Webcam dot */}
          <div className="flex justify-center mb-1.5 sm:mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#302e29] border border-white/20" />
          </div>

          {/* High-Fidelity Realistic Dashboard Screen */}
          <div className="rounded-lg sm:rounded-xl bg-[#0e0e0d] border border-white/10 overflow-hidden text-[#E5E2DC] font-sans text-xs">
            {/* Window chrome topbar */}
            <div className="flex items-center justify-between px-3 sm:px-4 py-2 border-b border-white/10 bg-[#161513]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/80" />
                <span className="text-[11px] font-mono text-[#A09D96] ml-2 hidden sm:inline">
                  Garment Production Planner • Production Operations Console
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onOpenDetails}
                  className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-[#B89152]/20 text-[#D3B679] border border-[#B89152]/30 hover:bg-[#B89152] hover:text-[#11110F] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Flask Live Engine</span>
                  <ArrowUpRight className="w-2.5 h-2.5" />
                </button>
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="p-3 sm:p-5 space-y-4">
              {/* Stat Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                <div className="p-2.5 sm:p-3 rounded-lg bg-[#181714] border border-white/8">
                  <div className="flex items-center justify-between text-[#A09D96] text-[10px] uppercase font-mono">
                    <span>Active Orders</span>
                    <Layers className="w-3 h-3 text-[#B89152]" />
                  </div>
                  <div className="text-lg sm:text-xl font-serif text-[#F7F4EE] mt-1 font-semibold">24</div>
                  <div className="text-[10px] text-[#A09D96] mt-0.5">In current cycle</div>
                </div>

                <div className="p-2.5 sm:p-3 rounded-lg bg-[#181714] border border-white/8">
                  <div className="flex items-center justify-between text-[#A09D96] text-[10px] uppercase font-mono">
                    <span>In Production</span>
                    <Activity className="w-3 h-3 text-[#D3B679]" />
                  </div>
                  <div className="text-lg sm:text-xl font-serif text-[#F7F4EE] mt-1 font-semibold">14</div>
                  <div className="text-[10px] text-[#D3B679] mt-0.5">Under assembly</div>
                </div>

                <div className="p-2.5 sm:p-3 rounded-lg bg-[#181714] border border-white/8">
                  <div className="flex items-center justify-between text-[#A09D96] text-[10px] uppercase font-mono">
                    <span>Completed</span>
                    <CheckCircle2 className="w-3 h-3 text-[#B89152]" />
                  </div>
                  <div className="text-lg sm:text-xl font-serif text-[#F7F4EE] mt-1 font-semibold">82</div>
                  <div className="text-[10px] text-[#A09D96] mt-0.5">Verified batches</div>
                </div>

                <div className="p-2.5 sm:p-3 rounded-lg bg-[#181714] border border-white/8">
                  <div className="flex items-center justify-between text-[#A09D96] text-[10px] uppercase font-mono">
                    <span>Pending</span>
                    <Clock className="w-3 h-3 text-[#706D67]" />
                  </div>
                  <div className="text-lg sm:text-xl font-serif text-[#F7F4EE] mt-1 font-semibold">08</div>
                  <div className="text-[10px] text-[#706D67] mt-0.5">Queue inspection</div>
                </div>
              </div>

              {/* Middle Section: Production Schedule & Resource Allocation */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Production Schedule Timeline (2 cols) */}
                <div className="md:col-span-2 p-3 rounded-lg bg-[#161513] border border-white/8">
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-[#F7F4EE]">
                      <Calendar className="w-3.5 h-3.5 text-[#B89152]" />
                      <span>Production Schedule &amp; Order Pipeline</span>
                    </div>
                    <span className="text-[10px] text-[#A09D96] font-mono">Realtime Track</span>
                  </div>

                  {/* Mock Gantt / Phase Rows */}
                  <div className="space-y-2 text-[11px]">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] text-[#A09D96]">
                        <span>Batch #GP-402 • Cotton Apparel</span>
                        <span className="text-[#D3B679]">Cutting → Sewing</span>
                      </div>
                      <div className="w-full bg-[#23211c] h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[#B89152] h-full w-[72%] rounded-full" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] text-[#A09D96]">
                        <span>Batch #GP-403 • Twill Trousers</span>
                        <span className="text-[#A09D96]">Finishing &amp; Packaging</span>
                      </div>
                      <div className="w-full bg-[#23211c] h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[#B89152] h-full w-[88%] rounded-full" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] text-[#A09D96]">
                        <span>Batch #GP-405 • Linen Overcoats</span>
                        <span className="text-[#706D67]">Material Estimation</span>
                      </div>
                      <div className="w-full bg-[#23211c] h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[#706D67] h-full w-[35%] rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Resource Allocation */}
                <div className="p-3 rounded-lg bg-[#161513] border border-white/8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-[#F7F4EE] mb-2.5">
                      <SlidersHorizontal className="w-3.5 h-3.5 text-[#B89152]" />
                      <span>Resource Load</span>
                    </div>

                    <div className="space-y-2 text-[10px]">
                      <div>
                        <div className="flex justify-between text-[#A09D96] mb-0.5">
                          <span>Fabric Inventory</span>
                          <span className="font-mono">82%</span>
                        </div>
                        <div className="w-full bg-[#23211c] h-1.5 rounded-full overflow-hidden">
                          <div className="bg-[#B89152] h-full w-[82%]" />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[#A09D96] mb-0.5">
                          <span>Sewing Stations</span>
                          <span className="font-mono">68%</span>
                        </div>
                        <div className="w-full bg-[#23211c] h-1.5 rounded-full overflow-hidden">
                          <div className="bg-[#D3B679] h-full w-[68%]" />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[#A09D96] mb-0.5">
                          <span>QA Inspection</span>
                          <span className="font-mono">45%</span>
                        </div>
                        <div className="w-full bg-[#23211c] h-1.5 rounded-full overflow-hidden">
                          <div className="bg-[#706D67] h-full w-[45%]" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-white/8 flex items-center justify-between text-[10px]">
                    <span className="text-[#A09D96]">Operational Status</span>
                    <span className="text-[#27c93f] font-mono flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#27c93f]" /> Optimal
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Laptop Keyboard Base & Hinge */}
        <div className="relative h-4 sm:h-5 bg-[#2a2824] rounded-b-xl border-t border-white/10 shadow-[0_12px_24px_rgba(0,0,0,0.6)]">
          {/* Thumb indentation notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 sm:w-20 h-1.5 bg-[#181714] rounded-b-md" />
        </div>

        {/* Realistic Floor Shadow */}
        <div className="w-4/5 h-8 mx-auto -mt-2 bg-black/40 blur-xl rounded-full pointer-events-none" />
      </motion.div>
    </div>
  );
};
