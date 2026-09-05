import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Layers, Cpu, ArrowRight } from 'lucide-react';
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
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#11110F]/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-3xl max-h-[85vh] bg-[#1A1916] text-[#F7F4EE] rounded-2xl shadow-2xl border border-white/12 overflow-hidden flex flex-col z-10"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#11110F]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#B89152]" />
                <span className="text-xs font-semibold tracking-wider text-[#D3B679] uppercase font-sans">
                  {project.category}
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-white/10 text-[#A09D96] hover:text-[#F7F4EE] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 font-sans space-y-6">
              <div>
                <p className="text-xs font-semibold text-[#B89152] uppercase tracking-widest mb-1">
                  {project.subtitle}
                </p>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#F7F4EE] font-medium leading-tight">
                  {project.title}
                </h2>
                <p className="text-sm text-[#A09D96] mt-3 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Technologies */}
              <div>
                <h3 className="text-xs font-semibold text-[#D3B679] uppercase tracking-wider mb-2.5 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-[#B89152]" /> Technology Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full bg-[#11110F] border border-white/10 text-xs font-mono text-[#F7F4EE]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Core Capabilities */}
              <div>
                <h3 className="text-xs font-semibold text-[#D3B679] uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#B89152]" /> Core Architectural Capabilities
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {project.capabilities.map((cap) => (
                    <div
                      key={cap}
                      className="flex items-center gap-2.5 p-3 rounded-lg bg-[#11110F]/60 border border-white/8 text-xs text-[#E5E2DC]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#B89152] shrink-0" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Feature Highlights if any */}
              {project.features && (
                <div>
                  <h3 className="text-xs font-semibold text-[#D3B679] uppercase tracking-wider mb-3">
                    Functional Modules
                  </h3>
                  <div className="space-y-2">
                    {project.features.map((feat) => (
                      <div key={feat.title} className="p-3 rounded-lg bg-[#11110F]/60 border border-white/8">
                        <span className="font-semibold text-xs text-[#F7F4EE] block mb-0.5">
                          {feat.title}
                        </span>
                        <span className="text-xs text-[#A09D96]">
                          {feat.description}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Bottom Note */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] text-[#706D67]">
                  Developed with focus on production reliability and clean software structure.
                </span>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center gap-1 text-xs font-medium text-[#B89152] hover:text-[#D3B679]"
                >
                  Close Details <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
