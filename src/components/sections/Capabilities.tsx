import React, { useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { Database, Code2, BrainCircuit, BarChart3 } from 'lucide-react';
import { CAPABILITIES } from '../../data/portfolioData';
import { SectionHeader } from '../ui/SectionHeader';
import type { CapabilityGroup } from '../../types';

const ICON_MAP: Record<string, React.ReactNode> = {
  Database: <Database className="w-6 h-6 text-[#C6A15B]" />,
  Code: <Code2 className="w-6 h-6 text-[#C6A15B]" />,
  BrainCircuit: <BrainCircuit className="w-6 h-6 text-[#C6A15B]" />,
  BarChart3: <BarChart3 className="w-6 h-6 text-[#C6A15B]" />,
};

interface CapabilityCardProps {
  group: CapabilityGroup;
  index: number;
}

const CapabilityCard: React.FC<CapabilityCardProps> = ({ group, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for 3D tilt
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const iconX = useMotionValue(0);
  const iconY = useMotionValue(0);

  // Springs for smooth physics
  const springRotX = useSpring(rotX, { stiffness: 300, damping: 25 });
  const springRotY = useSpring(rotY, { stiffness: 300, damping: 25 });
  const springIconX = useSpring(iconX, { stiffness: 350, damping: 25 });
  const springIconY = useSpring(iconY, { stiffness: 350, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || window.innerWidth < 768) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Constrain tilt to 2-3 degrees
    rotX.set((-y / (rect.height / 2)) * 3);
    rotY.set((x / (rect.width / 2)) * 3);

    // Internal icon floating offset
    iconX.set((x / (rect.width / 2)) * 6);
    iconY.set((y / (rect.height / 2)) * 6);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotX.set(0);
    rotY.set(0);
    iconX.set(0);
    iconY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springRotX,
        rotateY: springRotY,
        transformStyle: 'preserve-3d',
      }}
      animate={{
        y: isHovered ? -6 : 0,
      }}
      className="relative p-7 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#111111] hover:bg-[#151515] border border-white/[0.08] hover:border-[#C6A15B]/45 shadow-[0_4px_24px_rgba(0,0,0,0.5)] hover:shadow-[0_16px_36px_rgba(198,161,91,0.12)] transition-colors duration-300 flex flex-col justify-between group overflow-hidden"
    >
      {/* Subtle radial glow on hover */}
      {isHovered && (
        <div
          className="absolute -inset-24 pointer-events-none rounded-full bg-[radial-gradient(circle,rgba(198,161,91,0.08)_0%,transparent_70%)]"
          style={{ transform: 'translate3d(0, 0, 0)' }}
        />
      )}

      <div className="relative z-10">
        {/* Top bar with number and floating spring icon */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-xs font-mono text-[#C6A15B] font-semibold tracking-wider">
            {group.number} / 04
          </span>

          <motion.div
            style={{
              x: springIconX,
              y: springIconY,
            }}
            className="w-11 h-11 rounded-xl bg-[#181818] border border-white/[0.08] flex items-center justify-center shadow-inner group-hover:border-[#C6A15B]/40 transition-colors"
          >
            {ICON_MAP[group.iconName]}
          </motion.div>
        </div>

        {/* Group Title */}
        <h3 className="font-serif text-xl sm:text-2xl text-[#F4F1EA] font-semibold tracking-tight mb-5 group-hover:text-[#DFC786] transition-colors">
          {group.title}
        </h3>

        {/* Skills list - structured without percentage bars */}
        <ul className="space-y-3">
          {group.skills.map((skill) => (
            <li key={skill} className="flex items-center gap-3 text-sm text-[#A9A59D]">
              <div className="w-1.5 h-1.5 rounded-full bg-[#C6A15B]/70 group-hover:bg-[#C6A15B] transition-colors" />
              <span className="font-medium group-hover:text-[#F4F1EA] transition-colors">{skill}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Subtle bottom decorative line */}
      <div className="relative z-10 mt-8 pt-4 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-[#77736C]">
        <span>PRACTICAL CORE</span>
        <span className="text-[#C6A15B] font-semibold">COMPETENCY</span>
      </div>
    </motion.div>
  );
};

export const Capabilities: React.FC = () => {
  return (
    <section id="expertise" className="py-28 sm:py-36 bg-[#080808] relative overflow-hidden border-t border-white/[0.07] scroll-mt-28">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#C6A15B]/[0.025] rounded-full filter blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <SectionHeader
          label="02 / EXPERTISE"
          title="Technical Capabilities"
          subtitle="“A blend of analytical thinking and technical skills used to build data-driven solutions.”"
          align="left"
          theme="dark"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CAPABILITIES.map((group, index) => (
            <CapabilityCard key={group.id} group={group} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

