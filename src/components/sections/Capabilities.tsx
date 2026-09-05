import React, { useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { Database, Code2, BrainCircuit, BarChart3 } from 'lucide-react';
import { CAPABILITIES } from '../../data/portfolioData';
import { SectionHeader } from '../ui/SectionHeader';
import type { CapabilityGroup } from '../../types';

const ICON_MAP: Record<string, React.ReactNode> = {
  Database: <Database className="w-6 h-6 text-[#B89152]" />,
  Code: <Code2 className="w-6 h-6 text-[#B89152]" />,
  BrainCircuit: <BrainCircuit className="w-6 h-6 text-[#B89152]" />,
  BarChart3: <BarChart3 className="w-6 h-6 text-[#B89152]" />,
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

    // Constrain tilt to 2-3 degrees (max 3)
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
        y: isHovered ? -4 : 0,
      }}
      className="relative p-7 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#EFEAE1]/60 hover:bg-[#EFEAE1] border border-[#11110F]/10 hover:border-[#B89152]/50 shadow-[0_4px_24px_rgba(17,17,15,0.03)] hover:shadow-[0_16px_36px_rgba(184,145,82,0.1)] transition-colors duration-300 flex flex-col justify-between"
    >
      <div>
        {/* Top bar with number and floating spring icon */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-xs font-mono text-[#B89152] font-semibold tracking-wider">
            {group.number} / 04
          </span>

          <motion.div
            style={{
              x: springIconX,
              y: springIconY,
            }}
            className="w-12 h-12 rounded-xl bg-[#F7F4EE] border border-[#11110F]/8 flex items-center justify-center shadow-sm"
          >
            {ICON_MAP[group.iconName]}
          </motion.div>
        </div>

        {/* Group Title */}
        <h3 className="font-serif text-xl sm:text-2xl text-[#11110F] font-semibold tracking-tight mb-5">
          {group.title}
        </h3>

        {/* Skills list - structured without percentage bars */}
        <ul className="space-y-3">
          {group.skills.map((skill) => (
            <li key={skill} className="flex items-center gap-3 text-sm text-[#4E4B44]">
              <div className="w-1.5 h-1.5 rounded-full bg-[#B89152]" />
              <span className="font-medium">{skill}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Subtle bottom decorative line */}
      <div className="mt-8 pt-4 border-t border-[#11110F]/8 flex items-center justify-between text-[11px] font-mono text-[#706D67]">
        <span>PRACTICAL CORE</span>
        <span className="text-[#B89152] font-bold">COMPETENCY</span>
      </div>
    </motion.div>
  );
};

export const Capabilities: React.FC = () => {
  return (
    <section id="skills" className="py-24 sm:py-32 bg-[#F7F4EE] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <SectionHeader
          label="SKILLS &amp; TECHNOLOGIES"
          title="My Capabilities"
          subtitle="“A blend of analytical thinking and technical skills used to build data-driven solutions.”"
          align="left"
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
