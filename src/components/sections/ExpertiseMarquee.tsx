import React from 'react';
import { FLOW_MARQUEE, TECH_MARQUEE } from '../../data/portfolioData';

export const ExpertiseMarquee: React.FC = () => {
  return (
    <div className="border-y border-[#11110F]/12 bg-[#EFEAE1]/50 py-5 overflow-hidden select-none">
      {/* Strip 1: DATA → INSIGHT → DECISION → IMPACT */}
      <div className="relative w-full overflow-hidden flex items-center py-2 pause-hover">
        <div className="animate-marquee-left flex items-center gap-8 whitespace-nowrap">
          {[...Array(6)].map((_, loopIdx) => (
            <div key={loopIdx} className="flex items-center gap-8">
              {FLOW_MARQUEE.map((word) => (
                <div key={`${loopIdx}-${word}`} className="flex items-center gap-8">
                  <span className="font-serif text-lg sm:text-xl md:text-2xl tracking-wider text-[#161513] font-medium">
                    {word}
                  </span>
                  <span className="text-[#B89152] font-mono text-sm sm:text-base flex items-center">
                    →
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>


      {/* Subtle Divider */}
      <div className="w-full h-[1px] bg-[#11110F]/8 my-2" />

      {/* Strip 2: Technologies Marquee (Alternating direction) */}
      <div className="relative w-full overflow-hidden flex items-center py-2 pause-hover">
        <div className="animate-marquee-right flex items-center gap-10 whitespace-nowrap">
          {[...Array(6)].map((_, loopIdx) => (
            <div key={loopIdx} className="flex items-center gap-10">
              {TECH_MARQUEE.map((tech) => (
                <div key={`${loopIdx}-${tech}`} className="flex items-center gap-10">
                  <span className="text-xs sm:text-sm font-mono tracking-widest text-[#706D67] hover:text-[#11110F] transition-colors">
                    {tech}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B89152]/60" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
