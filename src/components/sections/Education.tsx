import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, MapPin, BookOpen } from 'lucide-react';

import { EDUCATION_DATA } from '../../data/portfolioData';
import { SectionHeader } from '../ui/SectionHeader';
import { EducationRing } from '../3d/EducationRing';

export const Education: React.FC = () => {
  return (
    <section
      id="education"
      className="py-24 sm:py-32 bg-[#EFEAE1]/60 relative overflow-hidden border-t border-[#11110F]/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Academic Credentials & Coursework */}
          <div className="lg:col-span-7">
            <SectionHeader
              label="EDUCATION"
              title="Academic Foundation"
              subtitle="Formal education combining theoretical computer science principles with rigorous data analysis paradigms."
              align="left"
            />

            <div className="mt-8 space-y-6">
              {/* Institution Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#F7F4EE] border border-[#11110F]/10 shadow-[0_4px_24px_rgba(17,17,15,0.04)]"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="text-[11px] font-mono font-semibold tracking-wider text-[#B89152] uppercase block mb-1">
                      Degree Program
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#11110F] font-semibold">
                      {EDUCATION_DATA.degree}
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#EFEAE1] flex items-center justify-center shrink-0 border border-[#11110F]/8">
                    <GraduationCap className="w-5 h-5 text-[#B89152]" />
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-sm text-[#706D67] mb-6 font-mono">
                  <span className="font-medium text-[#11110F]">{EDUCATION_DATA.institution}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#B89152]" /> {EDUCATION_DATA.location}
                  </span>
                </div>

                <div className="border-t border-[#11110F]/8 pt-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#11110F] mb-2 uppercase tracking-wide">
                    <BookOpen className="w-3.5 h-3.5 text-[#B89152]" /> Academic Study Focus
                  </div>
                  <p className="text-xs sm:text-sm text-[#55524B] leading-relaxed font-light">
                    {EDUCATION_DATA.details}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Column: 3D Orbital Score Gauge */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="p-8 sm:p-10 rounded-3xl bg-[#F7F4EE] border border-[#11110F]/10 shadow-[0_16px_48px_rgba(17,17,15,0.06)] text-center w-full max-w-sm flex flex-col items-center"
            >
              <div className="w-full mb-4">
                <EducationRing
                  score={EDUCATION_DATA.score}
                  label={EDUCATION_DATA.scoreLabel}
                />
              </div>

              <div className="w-full pt-4 border-t border-[#11110F]/8 text-center">
                <p className="text-xs text-[#706D67] font-mono leading-snug">
                  Verified Academic Evaluation
                </p>
                <span className="inline-block mt-2 px-3 py-1 rounded-full bg-[#B89152]/15 text-[#8E6D35] text-xs font-semibold font-mono">
                  Overall Academic Standing: 83%
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
