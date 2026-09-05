import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Printer, ExternalLink, Mail, Phone, MapPin, Award, GraduationCap, Code2, Briefcase } from 'lucide-react';
import { PERSONAL_INFO, EDUCATION_DATA, CAPABILITIES, FEATURED_PROJECT, OTHER_PROJECT, GROWTH_CARDS } from '../../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

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
            className="fixed inset-0 bg-[#080808]/90 backdrop-blur-xl"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 25 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-[#111111] text-[#F4F1EA] rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.8)] border border-white/12 overflow-hidden flex flex-col z-10"
          >
            {/* Header bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0D0D0D]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C6A15B]" />
                <span className="text-xs font-semibold tracking-wider text-[#DFC786] uppercase font-mono">
                  CURRICULUM VITAE • INDUJHA
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="p-2 rounded-full hover:bg-white/10 text-[#A9A59D] hover:text-[#F4F1EA] transition-colors cursor-pointer"
                  title="Print / Save as PDF"
                >
                  <Printer className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-full bg-[#C6A15B] text-[#080808] hover:bg-[#D4B06A] transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  Save PDF
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-white/10 text-[#A9A59D] hover:text-[#F4F1EA] transition-colors ml-1 cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Resume Content Paper */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-10 font-sans space-y-8">
              {/* Header */}
              <div className="border-b border-white/10 pb-6">
                <h1 className="font-serif text-3xl sm:text-4xl text-[#F4F1EA] font-semibold tracking-tight">
                  {PERSONAL_INFO.name}
                </h1>
                <p className="text-xs font-medium text-[#C6A15B] mt-1 tracking-wider uppercase font-mono">
                  {PERSONAL_INFO.role}
                </p>

                <div className="flex flex-wrap items-center gap-y-2 gap-x-6 mt-4 text-xs text-[#A9A59D]">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#C6A15B]" />
                    <span>{PERSONAL_INFO.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#C6A15B]" />
                    <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-[#F4F1EA] underline decoration-dotted">
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#C6A15B]" />
                    <span>{PERSONAL_INFO.phoneFormatted}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ExternalLink className="w-3.5 h-3.5 text-[#C6A15B]" />
                    <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="hover:text-[#F4F1EA] underline">
                      LinkedIn Profile
                    </a>
                  </div>
                </div>
              </div>

              {/* Professional Summary */}
              <div>
                <h2 className="text-xs font-mono font-bold tracking-widest text-[#C6A15B] uppercase mb-2">
                  PROFESSIONAL SUMMARY
                </h2>
                <p className="text-sm text-[#A9A59D] leading-relaxed font-light">
                  {PERSONAL_INFO.heroSecondary}
                </p>
              </div>

              {/* Education */}
              <div>
                <h2 className="text-xs font-mono font-bold tracking-widest text-[#C6A15B] uppercase mb-3 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" /> ACADEMIC FOUNDATION
                </h2>
                <div className="bg-[#151515] rounded-2xl p-4 sm:p-5 border border-white/8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-semibold text-[#F4F1EA]">
                      {EDUCATION_DATA.degree}
                    </h3>
                    <p className="text-xs text-[#A9A59D] mt-0.5">
                      {EDUCATION_DATA.institution} • {EDUCATION_DATA.location}
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C6A15B]/15 text-[#DFC786] text-xs font-mono font-bold self-start sm:self-auto border border-[#C6A15B]/30">
                    Academic Score: {EDUCATION_DATA.score}
                  </div>
                </div>
              </div>

              {/* Capabilities */}
              <div>
                <h2 className="text-xs font-mono font-bold tracking-widest text-[#C6A15B] uppercase mb-3 flex items-center gap-2">
                  <Code2 className="w-4 h-4" /> TECHNICAL CAPABILITIES
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {CAPABILITIES.map((group) => (
                    <div key={group.id} className="p-4 rounded-xl bg-[#151515] border border-white/6">
                      <h3 className="text-xs font-mono font-bold tracking-wider text-[#DFC786] uppercase mb-2.5">
                        {group.title}
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {group.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2.5 py-0.5 text-xs rounded-full bg-[#191919] text-[#A9A59D] border border-white/6 font-mono"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Projects */}
              <div>
                <h2 className="text-xs font-mono font-bold tracking-widest text-[#C6A15B] uppercase mb-3 flex items-center gap-2">
                  <Briefcase className="w-4 h-4" /> PROJECTS &amp; IMPLEMENTATIONS
                </h2>
                <div className="space-y-4">
                  {/* Capstone */}
                  <div className="p-5 rounded-2xl bg-[#151515] border border-white/8">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-semibold text-[#F4F1EA]">
                            {FEATURED_PROJECT.title}
                          </h3>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#C6A15B]/20 text-[#DFC786] border border-[#C6A15B]/30">
                            Capstone
                          </span>
                        </div>
                        <p className="text-xs text-[#C6A15B] font-mono mt-0.5">
                          {FEATURED_PROJECT.subtitle}
                        </p>
                      </div>
                      <div className="text-[11px] text-[#77736C] font-mono">
                        {FEATURED_PROJECT.techStack.join(' • ')}
                      </div>
                    </div>
                    <p className="text-xs text-[#A9A59D] mt-2.5 leading-relaxed font-light">
                      {FEATURED_PROJECT.description}
                    </p>
                  </div>

                  {/* Other Project */}
                  <div className="p-5 rounded-2xl bg-[#151515] border border-white/8">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-sm font-semibold text-[#F4F1EA]">
                          {OTHER_PROJECT.title}
                        </h3>
                        <p className="text-xs text-[#C6A15B] font-mono mt-0.5">
                          {OTHER_PROJECT.subtitle}
                        </p>
                      </div>
                      <div className="text-[11px] text-[#77736C] font-mono">
                        {OTHER_PROJECT.techStack.join(' • ')}
                      </div>
                    </div>
                    <p className="text-xs text-[#A9A59D] mt-2.5 leading-relaxed font-light">
                      {OTHER_PROJECT.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Growth */}
              <div>
                <h2 className="text-xs font-mono font-bold tracking-widest text-[#C6A15B] uppercase mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4" /> GROWTH &amp; DEVELOPMENT
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {GROWTH_CARDS.map((item) => (
                    <div key={item.id} className="p-3 rounded-xl bg-[#151515] border border-white/6 text-left">
                      <p className="text-xs font-mono font-semibold text-[#F4F1EA]">{item.title}</p>
                      <p className="text-[11px] text-[#77736C] mt-1 font-light leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
