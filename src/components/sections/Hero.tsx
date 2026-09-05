import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { PERSONAL_INFO, FLOATING_HERO_LABELS } from '../../data/portfolioData';
import { HeroCanvas } from '../3d/HeroCanvas';
import { MagneticButton } from '../ui/MagneticButton';
import { LinkedInIcon } from '../ui/Icons';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  const { scrollY: framerScrollY } = useScroll();
  // Hero scroll transforms as specified in prompt section 12:
  // Title moves upward slightly, portrait moves up 30-40px, labels move outward and fade
  const titleY = useTransform(framerScrollY, [0, 400], [0, -35]);
  const titleOpacity = useTransform(framerScrollY, [0, 400], [1, 0.85]);
  const portraitScrollY = useTransform(framerScrollY, [0, 450], [0, -24]);
  const labelsOpacity = useTransform(framerScrollY, [0, 300], [1, 0.4]);

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
      className="relative min-h-screen pt-28 sm:pt-32 pb-12 sm:pb-16 flex flex-col justify-between overflow-hidden bg-[#080808]"
    >
      {/* Static Cinematic Film Grain Texture (Point 11: 1.8% static grain) */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-[0.018] mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Layer 2: Subtle Volumetric Radial Gold Glow */}
      <div
        className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full pointer-events-none filter blur-[140px]"
        style={{
          background: 'radial-gradient(circle, rgba(198,161,91,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Soft Ambient Data Curve (Point 12: single subtle spline, opacity 0.05, 24s slow offset) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M 150,520 Q 520,240 880,410 T 1480,310 T 2000,440"
          fill="none"
          stroke="#C6A15B"
          strokeWidth="1"
          strokeOpacity="0.05"
          strokeDasharray="4 8"
          animate={{ strokeDashoffset: [0, -60] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
        />
      </svg>

      {/* Layer 3: Desktop Ambient Pointer Spotlight */}
      <div
        className="hidden md:block absolute inset-0 pointer-events-none transition-opacity duration-300 z-0"
        style={{
          background: `radial-gradient(400px circle at ${(mousePos.x + 1) * 50}% ${(mousePos.y + 1) * 50}%, rgba(198,161,91,0.025), transparent 70%)`,
        }}
      />

      {/* 3D Sparse Data Constellation Layer (Right-side focused, zero lines on text) */}
      <HeroCanvas mousePosition={mousePos} scrollY={scrollY} />

      {/* Main Content Split: Left 55% / Right 45% */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full my-auto py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* LEFT CONTENT (55% -> col-span-7) */}
          <motion.div
            style={{ y: titleY, opacity: titleOpacity }}
            className="lg:col-span-7 flex flex-col justify-center text-left z-20"
          >
            {/* Small badge: ● AVAILABLE FOR OPPORTUNITIES (Section 07 & 70) */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-[#111111]/80 backdrop-blur-md shadow-sm w-fit mb-6 select-none"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C6A15B] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C6A15B]" />
              </span>
              <span className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase text-[#DFC786] font-semibold">
                AVAILABLE FOR OPPORTUNITIES
              </span>
            </motion.div>

            {/* HELLO, I'M */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-xl sm:text-2xl text-[#A9A59D] mb-1 tracking-wider uppercase"
            >
              HELLO, I'M
            </motion.p>

            {/* INDUJHA with subtle gold gradient highlight, mostly off-white */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight text-[#F4F1EA] leading-[1.04] mb-4 select-none"
            >
              INDU<span className="bg-gradient-to-r from-[#C6A15B] via-[#DFC786] to-[#C6A15B] bg-clip-text text-transparent">JHA</span>
            </motion.h1>

            {/* Professional positioning */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="text-xs sm:text-sm md:text-base font-mono tracking-wider text-[#C6A15B] uppercase mb-6"
            >
              {PERSONAL_INFO.rolePill}
            </motion.p>

            {/* Main statement revealed line-by-line (Section 46) */}
            <div className="mb-6">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#F4F1EA] font-normal leading-snug"
              >
                “{PERSONAL_INFO.heroStatement.line1}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.44, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#DFC786] font-normal leading-snug"
              >
                {PERSONAL_INFO.heroStatement.line2}”
              </motion.div>
            </div>

            {/* Secondary text */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm sm:text-base text-[#A9A59D] leading-relaxed max-w-xl mb-8 font-light"
            >
              {PERSONAL_INFO.heroSecondary}
            </motion.p>

            {/* Buttons Row (Section 41 & 70) */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4 mb-10"
            >
              <MagneticButton
                variant="primary"
                onClick={scrollToProjects}
              >
                <span>Explore My Work</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </MagneticButton>

              <MagneticButton
                variant="secondary"
                onClick={onOpenResume}
                dataCursor="resume"
              >
                <span>Download Resume</span>
                <Download className="w-4 h-4 text-[#C6A15B] transition-transform group-hover:translate-y-0.5" />
              </MagneticButton>

              <MagneticButton
                variant="icon"
                href={PERSONAL_INFO.linkedin}
                isExternal
                ariaLabel="Indujha LinkedIn Profile"
                dataCursor="linkedin"
              >
                <LinkedInIcon className="w-4 h-4" />
              </MagneticButton>
            </motion.div>

            {/* Bottom Hero Credibility Strip (Section 13) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="flex flex-wrap items-center gap-y-2 gap-x-3.5 sm:gap-x-5 text-xs text-[#77736C] font-mono border-t border-white/10 pt-4"
            >
              <span className="text-[#F4F1EA] hover:text-[#C6A15B] transition-colors cursor-default">
                {PERSONAL_INFO.heroHighlightStrip[0]}
              </span>
              <span className="text-white/20">|</span>
              <span className="font-bold text-[#DFC786] hover:text-[#C6A15B] transition-colors cursor-default">
                {PERSONAL_INFO.heroHighlightStrip[1]}
              </span>
              <span className="text-white/20">|</span>
              <span className="hover:text-[#F4F1EA] transition-colors cursor-default">
                {PERSONAL_INFO.heroHighlightStrip[2]}
              </span>
              <span className="text-white/20">|</span>
              <span className="hover:text-[#F4F1EA] transition-colors cursor-default">
                {PERSONAL_INFO.heroHighlightStrip[3]}
              </span>
              <span className="text-white/20">|</span>
              <span className="hover:text-[#F4F1EA] transition-colors cursor-default">
                {PERSONAL_INFO.heroHighlightStrip[4]}
              </span>
              <span className="text-white/20">|</span>
              <span className="hover:text-[#F4F1EA] transition-colors cursor-default">
                {PERSONAL_INFO.heroHighlightStrip[5]}
              </span>
            </motion.div>
          </motion.div>

          {/* RIGHT CONTENT: PORTRAIT & 3D CONSTELLATION COMPOSITION (45% -> col-span-5) */}
          <div className="lg:col-span-5 relative flex items-end justify-center min-h-[480px] sm:min-h-[560px] lg:min-h-[640px] pt-4 select-none">
            {/* 1. Large blurred abstract backdrop ellipse (Point 15: soft background depth) */}
            <div
              className="absolute top-[8%] w-[520px] sm:w-[620px] h-[600px] sm:h-[720px] rounded-full pointer-events-none filter blur-[50px] opacity-70"
              style={{
                background:
                  'radial-gradient(ellipse at center, rgba(198, 161, 91, 0.08) 0%, rgba(198, 161, 91, 0.03) 45%, transparent 70%)',
              }}
            />

            {/* 2. Soft portrait atmosphere glow (Point 10: subtle champagne glow behind portrait) */}
            <div
              className="absolute top-[15%] w-[420px] sm:w-[520px] h-[480px] sm:h-[580px] rounded-full pointer-events-none filter blur-[45px] opacity-75"
              style={{
                background:
                  'radial-gradient(ellipse at center, rgba(198, 161, 91, 0.14) 0%, rgba(198, 161, 91, 0.07) 35%, rgba(198, 161, 91, 0.02) 55%, transparent 72%)',
              }}
            />

            {/* 3. Floating Hero Glass Badges: DATA, PATTERNS, INSIGHTS, IMPACT (Points 13 & 14: calm, subtle) */}
            <motion.div
              style={{ opacity: labelsOpacity }}
              className="absolute inset-0 pointer-events-none z-20"
            >
              {FLOATING_HERO_LABELS.map((item, idx) => {
                const labelX = mousePos.x * (2.5 + idx * 0.8);
                const labelY = mousePos.y * (2.5 + idx * 0.8);

                return (
                  <motion.div
                    key={item.text}
                    style={{
                      top: item.top,
                      bottom: item.bottom,
                      left: item.left,
                      right: item.right,
                      transform: `translate3d(${labelX}px, ${labelY}px, 0)`,
                    }}
                    animate={{
                      y: [0, -3, 0],
                      x: [0, 2, 0],
                    }}
                    transition={{
                      duration: 8 + idx * 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="absolute hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0C0C0C]/75 backdrop-blur-md border border-[#C6A15B]/28 shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C6A15B]/80 shadow-[0_0_6px_rgba(198,161,91,0.5)]" />
                    <span className="text-[11px] sm:text-xs font-mono tracking-[0.16em] text-[#DFC786]/85 uppercase font-medium">
                      {item.text}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* 4. Indujha's Portrait with Studio Golden Rim Lighting & Layered Parallax */}
            <motion.div
              style={{
                y: portraitScrollY,
                x: mousePos.x * 2.5,
              }}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[440px] h-[500px] sm:h-[580px] lg:h-[640px] flex items-end justify-center overflow-hidden"
              data-cursor="view"
            >
              <img
                src="/assets/indujha-portrait-cutout.png"
                alt="Indujha - Data Analytics &amp; Machine Learning Specialist"
                className="h-full w-auto max-w-none object-cover object-[center_top] select-none transition-transform duration-500 hover:scale-[1.012]"
                style={{
                  filter:
                    'drop-shadow(0 0 16px rgba(198, 161, 91, 0.18)) drop-shadow(0 15px 35px rgba(0, 0, 0, 0.85))',
                }}
                loading="eager"
              />
            </motion.div>

            {/* 5. Bottom Right Editorial Script */}
            <div className="absolute bottom-2 right-0 sm:right-2 z-20 text-right select-none pointer-events-none">
              <p className="font-editorial italic text-sm sm:text-base text-[#A9A59D] leading-tight">
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
