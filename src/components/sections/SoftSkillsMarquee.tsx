import React from 'react';
import { SOFT_SKILLS } from '../../data/portfolioData';

export const SoftSkillsMarquee: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-[#11110F] text-[#F7F4EE] overflow-hidden select-none border-y border-white/8">
      <div className="mb-4 text-center">
        <span className="text-xs font-mono tracking-[0.25em] text-[#B89152] uppercase">
          PROFESSIONAL CAPABILITIES &amp; MINDSET
        </span>
      </div>

      {/* Row 1: Leftward infinite movement */}
      <div className="relative w-full overflow-hidden flex items-center py-2 pause-hover">
        <div className="animate-marquee-left flex items-center gap-10 whitespace-nowrap">
          {[...Array(6)].map((_, loopIdx) => (
            <div key={loopIdx} className="flex items-center gap-10">
              {SOFT_SKILLS.map((skill) => (
                <div key={`${loopIdx}-${skill}`} className="flex items-center gap-10">
                  <span className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-stroke-light hover:text-[#F7F4EE] transition-colors duration-300">
                    {skill}
                  </span>
                  <span className="text-[#B89152] font-serif text-2xl sm:text-3xl">/</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Rightward infinite movement with offset */}
      <div className="relative w-full overflow-hidden flex items-center py-2 pause-hover mt-3 sm:mt-5">
        <div className="animate-marquee-right flex items-center gap-10 whitespace-nowrap">
          {[...Array(6)].map((_, loopIdx) => (
            <div key={loopIdx} className="flex items-center gap-10">
              {[...SOFT_SKILLS].reverse().map((skill) => (
                <div key={`${loopIdx}-${skill}-rev`} className="flex items-center gap-10">
                  <span className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-stroke-light hover:text-[#D3B679] transition-colors duration-300">
                    {skill}
                  </span>
                  <span className="text-[#B89152] font-serif text-2xl sm:text-3xl">/</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
