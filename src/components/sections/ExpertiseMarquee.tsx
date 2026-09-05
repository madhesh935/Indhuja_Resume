import React from 'react';
import { FLOW_MARQUEE, TECH_MARQUEE } from '../../data/portfolioData';

export const ExpertiseMarquee: React.FC = () => {
  return (
    <div className="border-y border-white/[0.07] bg-[#0A0A0A]/90 py-5 overflow-hidden select-none relative z-10 backdrop-blur-md">
      {/* Strip 1: DATA → INSIGHT → DECISION → IMPACT */}
      <div className="relative w-full overflow-hidden flex items-center py-2 pause-hover">
        <div className="animate-marquee-left flex items-center gap-8 whitespace-nowrap">
          {[...Array(6)].map((_, loopIdx) => (
            <div key={loopIdx} className="flex items-center gap-8">
              {FLOW_MARQUEE.map((word) => (
                <div key={`${loopIdx}-${word}`} className="flex items-center gap-8">
                  <span className="font-serif text-lg sm:text-xl md:text-2xl tracking-wider text-[#F4F1EA] font-light">
                    {word}
                  </span>
                  <span className="text-[#C6A15B] font-mono text-sm sm:text-base flex items-center">
                    →
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Subtle Divider */}
      <div className="w-full h-[1px] bg-white/[0.06] my-2" />

      {/* Strip 2: Technologies Marquee (Alternating direction) */}
      <div className="relative w-full overflow-hidden flex items-center py-2 pause-hover">
        <div className="animate-marquee-right flex items-center gap-10 whitespace-nowrap">
          {[...Array(6)].map((_, loopIdx) => (
            <div key={loopIdx} className="flex items-center gap-10">
              {TECH_MARQUEE.map((tech) => (
                <div key={`${loopIdx}-${tech}`} className="flex items-center gap-10">
                  <span className="text-xs sm:text-sm font-mono tracking-widest text-[#A9A59D] hover:text-[#F4F1EA] transition-colors">
                    {tech}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C6A15B]/70" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

