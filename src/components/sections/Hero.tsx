import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { HeroCanvas } from '../3d/HeroCanvas';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  const { scrollY: framerScrollY } = useScroll();
  const titleY = useTransform(framerScrollY, [0, 400], [0, -35]);
  const titleOpacity = useTransform(framerScrollY, [0, 400], [1, 0.8]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToProjects = () => {
    const target = document.querySelector('#projects');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-24 sm:pt-28 pb-12 sm:pb-16 flex flex-col justify-between overflow-hidden bg-[#F7F4EE]"
    >
      {/* Subtle 3D Canvas Background Layer */}
      <HeroCanvas mousePosition={mousePos} scrollY={scrollY} />

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full my-auto py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          {/* LEFT CONTENT (approx 52%) */}
          <motion.div
            style={{ y: titleY, opacity: titleOpacity }}
            className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center text-left z-20"
          >
            {/* Badge: ● OPEN TO OPPORTUNITIES */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#B89152]/70 bg-[#F7F4EE] shadow-sm w-fit mb-6 select-none"
            >
              <span className="w-2 h-2 rounded-full bg-[#B89152]" />
              <span className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-[#3E3C38] font-mono">
                OPEN TO OPPORTUNITIES
              </span>
            </motion.div>

            {/* "Hello, I'm" in elegant serif */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#161513] font-medium mb-1 tracking-tight"
            >
              Hello, I’m
            </motion.p>

            {/* "INDUJHA" in luxury metallic gold gradient serif typography */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight bg-gradient-to-r from-[#7D5B25] via-[#C9A253] via-[#E0C57D] to-[#8C692D] bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(184,145,82,0.12)] leading-[1.04] mb-3 select-none"
            >
              {PERSONAL_INFO.name}
            </motion.h1>

            {/* Subtitle: Data Analytics • Machine Learning • Software Development */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm sm:text-base md:text-lg font-medium text-[#161513] mb-5 font-sans"
            >
              Data Analytics &nbsp;•&nbsp; Machine Learning &nbsp;•&nbsp; Software Development
            </motion.p>

            {/* Hero Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-[#55524B] leading-relaxed max-w-xl mb-8 font-light"
            >
              “{PERSONAL_INFO.heroParagraph}”
            </motion.p>

            {/* Buttons Row (Matching the screenshot styling) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-3.5 mb-10"
            >
              {/* Explore My Work button */}
              <button
                type="button"
                onClick={scrollToProjects}
                className="inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 rounded-xl bg-[#161513] hover:bg-[#252420] text-[#F7F4EE] font-medium text-sm transition-all duration-300 shadow-md group cursor-pointer"
                data-cursor="button"
              >
                <span>Explore My Work</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              {/* Download Resume button */}
              <button
                type="button"
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 rounded-xl bg-[#F7F4EE] hover:bg-[#EFEAE1] border border-[#161513]/30 text-[#161513] font-medium text-sm transition-all duration-300 shadow-sm cursor-pointer group"
                data-cursor="button"
              >
                <span>Download Resume</span>
                <Download className="w-4 h-4 text-[#B89152] transition-transform group-hover:translate-y-0.5" />
              </button>

              {/* LinkedIn Button (Square rounded-xl with white 'in' logo) */}
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="Indujha LinkedIn Profile"
                className="w-12 h-12 rounded-xl bg-[#161513] hover:bg-[#252420] text-white flex items-center justify-center transition-all duration-300 shadow-md group cursor-pointer"
                data-cursor="link"
              >
                <span className="font-bold text-base font-sans leading-none tracking-tighter text-[#F7F4EE] group-hover:text-[#D3B679] transition-colors">
                  in
                </span>
              </a>
            </motion.div>

            {/* Bottom Hero Metadata Strip (Integrated below buttons) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center gap-y-2 gap-x-4 sm:gap-x-5 text-xs sm:text-sm text-[#706D67] font-mono border-t border-[#11110F]/10 pt-4"
            >
              <span className="text-[#161513] font-medium">B.Sc. CS + Data Analytics</span>
              <span className="text-[#11110F]/25">|</span>
              <span className="font-bold text-[#161513]">83%</span>
              <span className="text-[#11110F]/25">|</span>
              <span>Python</span>
              <span className="text-[#11110F]/25">|</span>
              <span>SQL</span>
              <span className="text-[#11110F]/25">|</span>
              <span>ML</span>
              <span className="text-[#11110F]/25">|</span>
              <span>Power BI</span>
            </motion.div>
          </motion.div>

          {/* RIGHT CONTENT: INDUJHA PORTRAIT & COMPOSITION MATCHING SCREENSHOT */}
          <div className="lg:col-span-6 xl:col-span-6 relative flex items-end justify-center lg:justify-end min-h-[480px] sm:min-h-[560px] lg:min-h-[640px] pt-4">
            {/* Background 3D Perspective Grid Wireframe */}
            <div className="absolute inset-0 pointer-events-none opacity-45 overflow-hidden flex items-center justify-end z-0">
              <svg
                className="w-full h-full max-w-[460px]"
                viewBox="0 0 500 500"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="heroGridGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#B89152" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#706D67" stopOpacity="0.05" />
                  </linearGradient>
                </defs>
                {/* Receding perspective lines */}
                <path d="M120 480 L320 180 M180 490 L360 200 M240 500 L400 220 M300 500 L440 240 M360 500 L480 260" stroke="url(#heroGridGrad)" strokeWidth="1" />
                <path d="M80 400 L460 300 M100 440 L480 340 M120 480 L500 380" stroke="url(#heroGridGrad)" strokeWidth="1" />
                <path d="M220 220 L480 220 M260 280 L500 280 M300 340 L500 340" stroke="url(#heroGridGrad)" strokeWidth="1" strokeDasharray="3 3" />
              </svg>
            </div>

            {/* Floating Card Right (Behind left shoulder): IDEAS / DATA / INSIGHTS / IMPACT */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute top-10 sm:top-14 right-0 sm:right-2 z-10 px-4 sm:px-5 py-4 rounded-2xl bg-white/60 backdrop-blur-md border border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.04)] select-none"
            >
              <div className="space-y-2 text-[11px] sm:text-xs font-mono tracking-widest text-[#706D67] uppercase font-semibold">
                <div className="flex items-center gap-2">
                  <span className="w-1 h-3.5 bg-[#B89152] rounded-full" />
                  <span>IDEAS</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1 h-3.5 bg-[#B89152] rounded-full" />
                  <span>DATA</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1 h-3.5 bg-[#B89152] rounded-full" />
                  <span>INSIGHTS</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1 h-3.5 bg-[#B89152] rounded-full" />
                  <span>IMPACT</span>
                </div>
              </div>
            </motion.div>

            {/* Floating Cursive Script Card Left (between body and text): Data Creates Better Opportunities */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute top-1/4 sm:top-1/3 left-0 sm:-left-4 lg:-left-8 z-20 px-4 sm:px-5 py-3.5 rounded-2xl bg-white/50 backdrop-blur-md border border-white/70 shadow-[0_10px_35px_rgba(0,0,0,0.05)] -rotate-3 select-none pointer-events-none"
            >
              <div className="font-['Caveat'] text-2xl sm:text-3xl text-[#5F5C56] leading-[1.12] text-left font-semibold">
                Data<br />
                Creates<br />
                Better<br />
                Opportunities
              </div>
            </motion.div>

            {/* Indujha's Standing Portrait Cutout (100% Transparent Background - Zero Wall/Background) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative z-10 w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[450px] h-[480px] sm:h-[560px] lg:h-[630px] flex items-end justify-center overflow-hidden"
              data-cursor="view"
            >
              <img
                src="/assets/indujha-portrait-cutout.png"
                alt="Indujha - Data Analytics &amp; Machine Learning Specialist"
                className="h-full w-auto max-w-none object-cover object-[center_top] select-none filter drop-shadow-[0_18px_35px_rgba(0,0,0,0.1)] transition-transform duration-500 hover:scale-[1.015]"
              />
            </motion.div>


            {/* Bottom Right Editorial Script: "A more data-driven tomorrow." */}
            <div className="absolute bottom-2 right-0 sm:right-2 z-20 text-right select-none pointer-events-none">
              <p className="font-editorial italic text-base sm:text-lg md:text-xl text-[#706D67] leading-tight">
                A more<br />
                data-driven<br />
                tomorrow.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
