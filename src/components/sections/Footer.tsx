import React from 'react';
import { ArrowUp } from 'lucide-react';

import { PERSONAL_INFO } from '../../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0c0c0b] text-[#A09D96] py-14 px-4 sm:px-8 border-t border-white/8 select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand & Role */}
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="font-serif text-2xl font-bold text-[#F7F4EE] tracking-tight">
              {PERSONAL_INFO.name}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#B89152]" />
          </div>
          <p className="text-xs text-[#706D67] mt-1 font-mono tracking-wide">
            {PERSONAL_INFO.role}
          </p>
        </div>

        {/* Navigation Quick Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono uppercase tracking-wider text-[#A09D96]">
          <a href="#hero" className="hover:text-[#B89152] transition-colors">Home</a>
          <a href="#about" className="hover:text-[#B89152] transition-colors">About</a>
          <a href="#skills" className="hover:text-[#B89152] transition-colors">Skills</a>
          <a href="#projects" className="hover:text-[#B89152] transition-colors">Projects</a>
          <a href="#education" className="hover:text-[#B89152] transition-colors">Education</a>
          <a href="#contact" className="hover:text-[#B89152] transition-colors">Contact</a>
        </div>

        {/* Back to top & credits */}
        <div className="flex items-center gap-4">
          <span className="text-[11px] font-mono text-[#706D67]">
            {PERSONAL_INFO.location}
          </span>
          <button
            type="button"
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full border border-white/10 hover:border-[#B89152] flex items-center justify-center text-[#F7F4EE] hover:text-[#B89152] bg-white/5 hover:bg-[#B89152]/10 transition-all duration-300"
            title="Back to top"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-white/6 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#55524B]">
        <span>© {new Date().getFullYear()} Indujha. All rights reserved.</span>
        <span className="mt-2 sm:mt-0">Crafted with editorial precision &amp; analytical design.</span>
      </div>
    </footer>
  );
};
