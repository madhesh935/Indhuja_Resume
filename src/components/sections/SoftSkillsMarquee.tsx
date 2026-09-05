import React from 'react';
import { motion } from 'framer-motion';
import { EXPLORING_TERMS, SOFT_SKILLS } from '../../data/portfolioData';

export const SoftSkillsMarquee: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-[#0A0A0A] text-[#F4F1EA] overflow-hidden select-none border-y border-white/[0.07] relative z-10">
      {/* Subtle top indicator */}
      <div className="mb-6 text-center">
        <div className="inline-flex items-center gap-2">
          <span className="w-4 h-[1px] bg-[#C6A15B]" />
          <span className="text-[11px] font-mono tracking-[0.3em] text-[#C6A15B] uppercase font-semibold">
            CURRENTLY EXPLORING &amp; EXPANDING
          </span>
          <span className="w-4 h-[1px] bg-[#C6A15B]" />
        </div>
      </div>

      {/* Row 1: Leftward infinite movement */}
      <div className="relative w-full overflow-hidden flex items-center py-2 pause-hover">
        <div className="animate-marquee-left flex items-center gap-10 whitespace-nowrap">
          {[...Array(6)].map((_, loopIdx) => (
            <div key={loopIdx} className="flex items-center gap-10">
              {EXPLORING_TERMS.map((term) => (
                <div key={`${loopIdx}-${term}`} className="flex items-center gap-10">
                  <span className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-[#F4F1EA]/85 hover:text-[#DFC786] transition-colors duration-300">
                    {term}
                  </span>
                  <span className="text-[#C6A15B]/70 font-serif text-2xl sm:text-3xl">/</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Rightward infinite movement with reverse list */}
      <div className="relative w-full overflow-hidden flex items-center py-2 pause-hover mt-3 sm:mt-5">
        <div className="animate-marquee-right flex items-center gap-10 whitespace-nowrap">
          {[...Array(6)].map((_, loopIdx) => (
            <div key={loopIdx} className="flex items-center gap-10">
              {[...EXPLORING_TERMS].reverse().map((term) => (
                <div key={`${loopIdx}-${term}-rev`} className="flex items-center gap-10">
                  <span className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white/30 hover:text-[#C6A15B] transition-colors duration-300">
                    {term}
                  </span>
                  <span className="text-[#C6A15B]/50 font-serif text-2xl sm:text-3xl">/</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Editorial Statement Banner & Soft Skills Highlight Composition */}
      <div className="max-w-5xl mx-auto px-4 sm:px-8 mt-16 sm:mt-20 text-center">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-xl sm:text-2xl md:text-3xl text-[#F4F1EA] font-light leading-relaxed italic max-w-3xl mx-auto"
        >
          “Learning continuously. Building practically. Growing through every project.”
        </motion.p>

        {/* Soft Skills Editorial Composition */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-4xl mx-auto">
          {SOFT_SKILLS.map((skill) => (
            <span
              key={skill.name}
              className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 ${
                skill.isHighlighted
                  ? 'bg-[#C6A15B]/20 text-[#DFC786] border border-[#C6A15B]/50 shadow-[0_0_15px_rgba(198,161,91,0.2)] font-semibold'
                  : 'bg-[#111111] text-[#A9A59D] border border-white/[0.08] hover:border-white/[0.2] hover:text-[#F4F1EA]'
              }`}
            >
              {skill.isHighlighted && <span className="mr-1.5 text-[#C6A15B]">★</span>}
              {skill.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
