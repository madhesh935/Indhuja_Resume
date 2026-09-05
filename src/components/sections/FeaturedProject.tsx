import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

import { FEATURED_PROJECT } from '../../data/portfolioData';
import { Laptop3D } from '../3d/Laptop3D';
import { MagneticButton } from '../ui/MagneticButton';
import { ProjectModal } from '../ui/ProjectModal';

export const FeaturedProject: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section
      id="projects"
      className="relative py-24 sm:py-32 bg-[#11110F] text-[#F7F4EE] overflow-hidden border-t border-white/8"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#B89152]/4 rounded-full filter blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2.5 mb-3"
          >
            <span className="w-5 h-[1px] bg-[#B89152]" />
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#B89152]">
              FEATURED PROJECT
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-[#F7F4EE] leading-[1.12]"
          >
            {FEATURED_PROJECT.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-3 text-xs sm:text-sm font-mono tracking-wider text-[#D3B679] uppercase"
          >
            {FEATURED_PROJECT.subtitle}
          </motion.p>
        </div>

        {/* 3D Laptop Mockup Canvas */}
        <div className="mb-14">
          <Laptop3D onOpenDetails={() => setIsModalOpen(true)} />
        </div>

        {/* Project Description & Architecture Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pt-6 border-t border-white/10">
          <div className="lg:col-span-7">
            <h3 className="text-xs font-bold tracking-widest text-[#B89152] uppercase mb-3">
              Operational Focus &amp; Architecture
            </h3>
            <p className="text-base sm:text-lg text-[#A09D96] font-light leading-relaxed mb-6">
              “{FEATURED_PROJECT.description}”
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <MagneticButton
                variant="primary"
                onClick={() => setIsModalOpen(true)}
              >
                <span>Project Details</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </MagneticButton>
            </div>
          </div>

          {/* Capabilities Matrix */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="text-xs font-semibold text-[#D3B679] tracking-wider uppercase font-mono">
              System Modules
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {FEATURED_PROJECT.capabilities.map((cap) => (
                <div
                  key={cap}
                  className="flex items-center gap-2 p-2.5 rounded-lg bg-[#1A1916] border border-white/6 text-xs text-[#E5E2DC]"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#B89152] shrink-0" />
                  <span>{cap}</span>
                </div>
              ))}
            </div>

            {/* Tech stack badge list */}
            <div className="pt-2">
              <span className="text-[11px] font-mono text-[#706D67] block mb-2">Technologies Used:</span>
              <div className="flex flex-wrap gap-2">
                {FEATURED_PROJECT.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded bg-[#161513] text-[#D3B679] border border-white/10 text-xs font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={FEATURED_PROJECT}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};
