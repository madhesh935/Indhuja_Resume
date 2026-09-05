import React from 'react';
import { ArrowUp, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050505] text-[#A9A59D] py-14 px-4 sm:px-8 border-t border-white/[0.07] select-none relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand & Role */}
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="font-serif text-2xl font-bold text-[#F4F1EA] tracking-tight">
              {PERSONAL_INFO.name}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C6A15B] shadow-[0_0_6px_rgba(198,161,91,0.6)]" />
          </div>
          <p className="text-xs text-[#77736C] mt-1 font-mono tracking-wide uppercase">
            {PERSONAL_INFO.rolePill}
          </p>
        </div>

        {/* Navigation Quick Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono uppercase tracking-wider text-[#A9A59D]">
          <a href="#hero" className="hover:text-[#DFC786] transition-colors">Home</a>
          <a href="#about" className="hover:text-[#DFC786] transition-colors">About</a>
          <a href="#expertise" className="hover:text-[#DFC786] transition-colors">Expertise</a>
          <a href="#projects" className="hover:text-[#DFC786] transition-colors">Projects</a>
          <a href="#journey" className="hover:text-[#DFC786] transition-colors">Journey</a>
          <a href="#contact" className="hover:text-[#DFC786] transition-colors">Contact</a>
        </div>

        {/* Back to top & Location */}
        <div className="flex items-center gap-4">
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-xs font-mono text-[#A9A59D] hover:text-[#DFC786] transition-colors inline-flex items-center gap-1"
          >
            <span>LinkedIn</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <span className="text-[11px] font-mono text-[#77736C]">
            •
          </span>
          <span className="text-[11px] font-mono text-[#77736C]">
            {PERSONAL_INFO.location}
          </span>
          <button
            type="button"
            onClick={scrollToTop}
            className="w-9 h-9 rounded-full border border-white/[0.1] hover:border-[#C6A15B] flex items-center justify-center text-[#F4F1EA] hover:text-[#C6A15B] bg-white/[0.03] hover:bg-[#C6A15B]/10 transition-all duration-300 cursor-pointer"
            title="Back to top"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#77736C]">
        <span>© {new Date().getFullYear()} INDUJHA · DATA • INSIGHT • IMPACT</span>
        <span className="mt-2 sm:mt-0">Designed with editorial precision &amp; technical rigor.</span>
      </div>
    </footer>
  );
};

