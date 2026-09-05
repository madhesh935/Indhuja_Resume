import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, AlertCircle, Wrench, Sparkles } from 'lucide-react';

import { FEATURED_PROJECT } from '../../data/portfolioData';
import { Laptop3D } from '../3d/Laptop3D';
import { MagneticButton } from '../ui/MagneticButton';
import { ProjectModal } from '../ui/ProjectModal';
import { SectionHeader } from '../ui/SectionHeader';

export const FeaturedProject: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section
      id="projects"
      className="relative py-28 sm:py-36 bg-[#080808] text-[#F4F1EA] overflow-hidden border-t border-white/[0.07] scroll-mt-28"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#C6A15B]/[0.035] rounded-full filter blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <SectionHeader
          label="03 / SELECTED WORK"
          title="Projects Built Around Real Problems."
          subtitle="A focused selection of technical work combining data handling, structured logic, and functional application interfaces."
          theme="dark"
          align="left"
        />

        {/* Featured Project Header Banner */}
        <div className="mt-8 mb-10 p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#0D0D0D] border border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-mono font-semibold tracking-widest text-[#C6A15B] uppercase">
                FEATURED CAPSTONE
              </span>
              <span className="w-1 h-1 rounded-full bg-[#C6A15B]" />
              <span className="text-[11px] font-mono text-[#77736C] uppercase">
                ACADEMIC &amp; PRACTICAL BUILD
              </span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#F4F1EA] font-medium tracking-tight">
              {FEATURED_PROJECT.title}
            </h3>
            <p className="mt-2 text-xs sm:text-sm font-mono tracking-wider text-[#DFC786] uppercase">
              {FEATURED_PROJECT.subtitle}
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <MagneticButton
              variant="primary"
              onClick={() => setIsModalOpen(true)}
              className="text-xs sm:text-sm px-6 py-3 font-semibold"
            >
              <span>View Case Study</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </MagneticButton>
          </div>
        </div>

        {/* 3D Laptop Mockup Canvas */}
        <div className="mb-14">
          <Laptop3D onOpenDetails={() => setIsModalOpen(true)} />
        </div>

        {/* 4-Part Storytelling Architecture Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-white/[0.08]">
          {/* 1. The Challenge */}
          <div className="p-6 rounded-2xl bg-[#111111] border border-white/[0.08] flex flex-col justify-between group hover:border-[#C6A15B]/40 transition-colors">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#C6A15B] uppercase mb-3">
                <AlertCircle className="w-4 h-4 text-[#C6A15B]" />
                <span>The Challenge</span>
              </div>
              <p className="text-xs sm:text-sm text-[#A9A59D] font-light leading-relaxed">
                {FEATURED_PROJECT.challenge}
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-white/[0.06] text-[10px] font-mono text-[#77736C]">
              PHASE · ANALYSIS
            </div>
          </div>

          {/* 2. What I Built */}
          <div className="p-6 rounded-2xl bg-[#111111] border border-white/[0.08] flex flex-col justify-between group hover:border-[#C6A15B]/40 transition-colors">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#C6A15B] uppercase mb-3">
                <Sparkles className="w-4 h-4 text-[#C6A15B]" />
                <span>What I Built</span>
              </div>
              <p className="text-xs sm:text-sm text-[#A9A59D] font-light leading-relaxed">
                {FEATURED_PROJECT.whatIBuilt}
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-white/[0.06] text-[10px] font-mono text-[#77736C]">
              PHASE · IMPLEMENTATION
            </div>
          </div>

          {/* 3. Core Modules */}
          <div className="p-6 rounded-2xl bg-[#111111] border border-white/[0.08] flex flex-col justify-between group hover:border-[#C6A15B]/40 transition-colors">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#C6A15B] uppercase mb-3">
                <CheckCircle2 className="w-4 h-4 text-[#C6A15B]" />
                <span>Core Modules</span>
              </div>
              <div className="space-y-1.5">
                {FEATURED_PROJECT.capabilities.slice(0, 4).map((mod) => (
                  <div key={mod} className="flex items-center gap-2 text-xs text-[#A9A59D]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C6A15B]/60" />
                    <span>{mod}</span>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="text-[11px] font-mono text-[#DFC786] hover:underline pt-1 block"
                >
                  +{FEATURED_PROJECT.capabilities.length - 4} more modules →
                </button>
              </div>
            </div>
            <div className="mt-6 pt-3 border-t border-white/[0.06] text-[10px] font-mono text-[#77736C]">
              PHASE · ARCHITECTURE
            </div>
          </div>

          {/* 4. My Contribution */}
          <div className="p-6 rounded-2xl bg-[#111111] border border-white/[0.08] flex flex-col justify-between group hover:border-[#C6A15B]/40 transition-colors">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#C6A15B] uppercase mb-3">
                <Wrench className="w-4 h-4 text-[#C6A15B]" />
                <span>My Contribution</span>
              </div>
              <p className="text-xs sm:text-sm text-[#A9A59D] font-light leading-relaxed">
                {FEATURED_PROJECT.myContribution}
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-white/[0.06] text-[10px] font-mono text-[#77736C]">
              PHASE · DEVELOPMENT
            </div>
          </div>
        </div>

        {/* Tech Stack Bar */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-[#0D0D0D] border border-white/[0.06]">
          <div className="flex items-center gap-2 text-xs font-mono text-[#77736C]">
            <span>TECH STACK:</span>
            <div className="flex flex-wrap gap-2">
              {FEATURED_PROJECT.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded bg-[#151515] text-[#DFC786] border border-white/[0.08] text-xs font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="text-[11px] font-mono text-[#77736C]">
            CONCEPT INTERFACE · DEMO DATA · ZERO FABRICATED METRICS
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

