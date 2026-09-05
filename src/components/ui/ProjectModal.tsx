import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Layers, Cpu, ArrowRight, Lightbulb, AlertCircle, Wrench } from 'lucide-react';
import type { Project } from '../../types';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Dark Curtain Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#080808]/90 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: 'spring', damping: 26, stiffness: 280 }}
            className="relative w-full max-w-4xl max-h-[88vh] bg-[#111111] text-[#F4F1EA] rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.8)] border border-white/10 overflow-hidden flex flex-col z-10"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0D0D0D]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C6A15B]" />
                <span className="text-xs font-mono tracking-widest text-[#DFC786] uppercase font-semibold">
                  {project.category} • CASE STUDY
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-white/10 text-[#A9A59D] hover:text-[#F4F1EA] transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-10 font-sans space-y-8">
              {/* Title Header */}
              <div>
                <span className="text-xs font-mono tracking-[0.2em] text-[#C6A15B] uppercase block mb-1">
                  {project.subtitle}
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#F4F1EA] font-medium leading-tight">
                  {project.title}
                </h2>
                <p className="text-base text-[#A9A59D] mt-3 leading-relaxed font-light">
                  {project.description}
                </p>
              </div>

              {/* Technologies */}
              <div>
                <h3 className="text-xs font-mono text-[#DFC786] uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-[#C6A15B]" /> TECHNOLOGY STACK
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3.5 py-1 rounded-full bg-[#151515] border border-white/10 text-xs font-mono text-[#F4F1EA]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* The Challenge */}
              {project.challenge && (
                <div className="p-5 rounded-2xl bg-[#151515]/60 border border-white/8">
                  <h3 className="text-xs font-mono text-[#C6A15B] uppercase tracking-wider mb-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" /> THE CHALLENGE
                  </h3>
                  <p className="text-sm text-[#A9A59D] leading-relaxed font-light">
                    {project.challenge}
                  </p>
                </div>
              )}

              {/* What I Built */}
              {project.whatIBuilt && (
                <div className="p-5 rounded-2xl bg-[#151515]/60 border border-white/8">
                  <h3 className="text-xs font-mono text-[#C6A15B] uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Wrench className="w-4 h-4" /> WHAT I BUILT
                  </h3>
                  <p className="text-sm text-[#A9A59D] leading-relaxed font-light">
                    {project.whatIBuilt}
                  </p>
                </div>
              )}

              {/* Core Modules Matrix */}
              <div>
                <h3 className="text-xs font-mono text-[#DFC786] uppercase tracking-wider mb-3.5 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#C6A15B]" /> SYSTEM MODULES &amp; CAPABILITIES
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {project.capabilities.map((cap) => (
                    <div
                      key={cap}
                      className="flex items-center gap-2.5 p-3 rounded-xl bg-[#151515] border border-white/6 text-xs text-[#F4F1EA]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#C6A15B] shrink-0" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* My Contribution */}
              {project.myContribution && (
                <div className="p-5 rounded-2xl bg-[#151515]/60 border border-white/8">
                  <h3 className="text-xs font-mono text-[#C6A15B] uppercase tracking-wider mb-2">
                    MY CONTRIBUTION
                  </h3>
                  <p className="text-sm text-[#A9A59D] leading-relaxed font-light">
                    {project.myContribution}
                  </p>
                </div>
              )}

              {/* Learnings */}
              {project.learnings && (
                <div className="p-5 rounded-2xl bg-[#191919]/60 border border-[#C6A15B]/30">
                  <h3 className="text-xs font-mono text-[#DFC786] uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-[#C6A15B]" /> PROJECT LEARNINGS
                  </h3>
                  <p className="text-sm text-[#A9A59D] leading-relaxed font-light">
                    “{project.learnings}”
                  </p>
                </div>
              )}

              {/* Bottom Accuracy Label & Close */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <span className="font-mono text-[11px] text-[#77736C]">
                  CONCEPT INTERFACE · DEMO DATA
                </span>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#151515] hover:bg-[#191919] text-[#C6A15B] font-mono text-xs cursor-pointer transition-colors"
                >
                  Close Case Study <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
