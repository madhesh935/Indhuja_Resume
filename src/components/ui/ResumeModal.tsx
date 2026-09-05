import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Printer, ExternalLink, Mail, Phone, MapPin, Award, GraduationCap, Code2, Briefcase } from 'lucide-react';
import { PERSONAL_INFO, EDUCATION_DATA, CAPABILITIES, FEATURED_PROJECT, OTHER_PROJECT, BEYOND_CLASSROOM_ITEMS } from '../../data/portfolioData';

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
            className="fixed inset-0 bg-[#11110F]/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-[#F7F4EE] rounded-2xl shadow-2xl border border-[#11110F]/15 overflow-hidden flex flex-col z-10"
          >
            {/* Header bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#11110F]/10 bg-[#EFEAE1]/60">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#B89152]" />
                <span className="text-xs font-semibold tracking-wider text-[#161513] uppercase font-sans">
                  Curriculum Vitae • Indujha
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="p-2 rounded-full hover:bg-black/5 text-[#706D67] hover:text-[#161513] transition-colors"
                  title="Print / Save as PDF"
                >
                  <Printer className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-[#B89152] text-[#11110F] hover:bg-[#A68042] transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  Save PDF
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-black/5 text-[#706D67] hover:text-[#161513] transition-colors ml-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Resume Content Paper */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-10 font-sans text-[#161513] print:p-0">
              {/* Header */}
              <div className="border-b border-[#11110F]/12 pb-6 mb-8">
                <h1 className="font-serif text-3xl sm:text-4xl text-[#11110F] font-semibold tracking-tight">
                  INDUJHA
                </h1>
                <p className="text-sm font-medium text-[#B89152] mt-1 tracking-wide uppercase">
                  {PERSONAL_INFO.role}
                </p>

                <div className="flex flex-wrap items-center gap-y-2 gap-x-6 mt-4 text-xs text-[#706D67]">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#B89152]" />
                    <span>{PERSONAL_INFO.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#B89152]" />
                    <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-[#11110F] underline decoration-dotted">
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#B89152]" />
                    <span>{PERSONAL_INFO.phone}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ExternalLink className="w-3.5 h-3.5 text-[#B89152]" />
                    <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="hover:text-[#11110F] underline">
                      LinkedIn Profile
                    </a>
                  </div>
                </div>
              </div>

              {/* Professional Summary */}
              <div className="mb-8">
                <h2 className="text-xs font-bold tracking-widest text-[#B89152] uppercase mb-2">
                  Professional Summary
                </h2>
                <p className="text-sm text-[#3E3C38] leading-relaxed">
                  B.Sc. Computer Science with Data Analytics student with practical competence in exploratory data analysis, machine learning foundations, SQL database structures, and full-stack Python development. Dedicated to building structured, clean analytical solutions and web tools that address real operational challenges.
                </p>
              </div>

              {/* Education */}
              <div className="mb-8">
                <h2 className="text-xs font-bold tracking-widest text-[#B89152] uppercase mb-3 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" /> Academic Foundation
                </h2>
                <div className="bg-white/60 rounded-xl p-4 border border-[#11110F]/8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-semibold text-[#11110F]">
                      {EDUCATION_DATA.degree}
                    </h3>
                    <p className="text-xs text-[#706D67] mt-0.5">
                      {EDUCATION_DATA.institution} • {EDUCATION_DATA.location}
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B89152]/15 text-[#8E6D35] text-xs font-bold self-start sm:self-auto">
                    Score: {EDUCATION_DATA.score}
                  </div>
                </div>
              </div>

              {/* Capabilities / Core Competencies */}
              <div className="mb-8">
                <h2 className="text-xs font-bold tracking-widest text-[#B89152] uppercase mb-3 flex items-center gap-2">
                  <Code2 className="w-4 h-4" /> Technical Capabilities
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {CAPABILITIES.map((group) => (
                    <div key={group.id} className="p-3.5 rounded-xl bg-white/40 border border-[#11110F]/8">
                      <h3 className="text-xs font-bold tracking-wider text-[#11110F] uppercase mb-2">
                        {group.title}
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {group.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-0.5 text-xs rounded bg-[#EFEAE1] text-[#3E3C38] border border-[#11110F]/5"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Selected Projects */}
              <div className="mb-8">
                <h2 className="text-xs font-bold tracking-widest text-[#B89152] uppercase mb-3 flex items-center gap-2">
                  <Briefcase className="w-4 h-4" /> Projects &amp; Implementations
                </h2>
                <div className="space-y-4">
                  {/* Capstone Project */}
                  <div className="p-4 rounded-xl bg-white/60 border border-[#11110F]/8">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-semibold text-[#11110F]">
                            {FEATURED_PROJECT.title}
                          </h3>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#B89152]/20 text-[#8E6D35]">
                            Capstone
                          </span>
                        </div>
                        <p className="text-xs text-[#B89152] font-medium mt-0.5">
                          {FEATURED_PROJECT.subtitle}
                        </p>
                      </div>
                      <div className="text-[11px] text-[#706D67] font-mono">
                        {FEATURED_PROJECT.techStack.join(' • ')}
                      </div>
                    </div>
                    <p className="text-xs text-[#3E3C38] mt-2 leading-relaxed">
                      {FEATURED_PROJECT.description}
                    </p>
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {FEATURED_PROJECT.capabilities.map((cap) => (
                        <span key={cap} className="text-[10px] px-2 py-0.5 bg-[#EFEAE1] text-[#55524B] rounded">
                          {cap}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Other Project */}
                  <div className="p-4 rounded-xl bg-white/60 border border-[#11110F]/8">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-sm font-semibold text-[#11110F]">
                          {OTHER_PROJECT.title}
                        </h3>
                        <p className="text-xs text-[#B89152] font-medium mt-0.5">
                          {OTHER_PROJECT.subtitle}
                        </p>
                      </div>
                      <div className="text-[11px] text-[#706D67] font-mono">
                        {OTHER_PROJECT.techStack.join(' • ')}
                      </div>
                    </div>
                    <p className="text-xs text-[#3E3C38] mt-2 leading-relaxed">
                      {OTHER_PROJECT.description}
                    </p>
                    <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {OTHER_PROJECT.features?.map((feat) => (
                        <div key={feat.title} className="text-[11px] bg-[#EFEAE1]/70 p-2 rounded">
                          <span className="font-semibold block text-[#161513]">{feat.title}</span>
                          <span className="text-[#706D67]">{feat.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Beyond Classroom */}
              <div>
                <h2 className="text-xs font-bold tracking-widest text-[#B89152] uppercase mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4" /> Academic &amp; Technical Engagement
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                  {BEYOND_CLASSROOM_ITEMS.map((item) => (
                    <div key={item.id} className="p-2.5 rounded-lg bg-white/40 border border-[#11110F]/5 text-center">
                      <p className="text-xs font-semibold text-[#161513]">{item.title}</p>
                      <p className="text-[10px] text-[#706D67] mt-0.5">{item.category}</p>
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
