import React from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  Settings,
  Users,
  TrendingUp,
  BarChart3,
  Code2,
  Lightbulb,
  Layout,
  Quote,
} from 'lucide-react';
import { ABOUT_DATA } from '../../data/portfolioData';
import { AboutGlobe } from '../3d/AboutGlobe';

const INTEREST_ICONS: Record<string, React.ReactNode> = {
  'Data Analytics': <BarChart3 className="w-3.5 h-3.5 text-[#C9A253]" />,
  'Machine Learning': <Brain className="w-3.5 h-3.5 text-[#C9A253]" />,
  'Software Development': <Code2 className="w-3.5 h-3.5 text-[#C9A253]" />,
  'Problem Solving': <Lightbulb className="w-3.5 h-3.5 text-[#C9A253]" />,
  'Visualization': <Layout className="w-3.5 h-3.5 text-[#C9A253]" />,
};

const PROFILE_ICONS = [
  <Brain className="w-4 h-4 text-[#C9A253]" key="brain" />,
  <Settings className="w-4 h-4 text-[#C9A253]" key="settings" />,
  <Users className="w-4 h-4 text-[#C9A253]" key="users" />,
  <TrendingUp className="w-4 h-4 text-[#C9A253]" key="trending" />,
];

export const About: React.FC = () => {
  return (
    <section
      id="about"
      className="relative py-24 sm:py-32 bg-[#080808] text-[#F3EFE7] overflow-hidden border-t border-white/[0.07] scroll-mt-28"
    >
      {/* Background Soft Atmospheric Ambient Glows */}
      <div className="absolute top-1/4 left-[-10%] w-[500px] h-[500px] bg-[#C9A253]/[0.035] rounded-full filter blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-[-10%] w-[500px] h-[500px] bg-[#C9A253]/[0.03] rounded-full filter blur-[140px] pointer-events-none" />

      {/* Subtle Background Golden Spline Curve */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M -100,200 Q 400,100 800,260 T 1600,180 T 2200,320"
          fill="none"
          stroke="#C9A253"
          strokeWidth="1"
          strokeOpacity="0.04"
          strokeDasharray="4 8"
        />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Asymmetric 3-Column Desktop Grid matching reference mockup: Left 42% / Center 36% / Right 22% */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-10 items-center">
          {/* ============================================================ */}
          {/* LEFT CONTENT: HEADINGS, BIOGRAPHY, QUOTE & INTERESTS (42%)   */}
          {/* ============================================================ */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            {/* Section Tag with Left Vertical Gold Line */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-[2px] h-4 bg-[#C9A253]" />
              <span className="text-xs font-mono font-semibold tracking-[0.2em] text-[#C9A253] uppercase">
                {ABOUT_DATA.label}
              </span>
            </div>

            {/* Editorial Main Heading: Turning Data Into Decisions. */}
            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl sm:text-5xl lg:text-[62px] xl:text-[68px] leading-[1.0] text-[#F3EFE7] tracking-tight mb-6"
            >
              Turning Data
              <br />
              Into <span className="text-[#C9A253] italic">Decisions.</span>
            </motion.h2>

            {/* Editorial Biography Paragraphs */}
            <div className="space-y-4 text-[14px] sm:text-[15px] lg:text-[15.5px] text-[#A8A39A] font-light leading-[1.65]">
              {ABOUT_DATA.paragraphs.map((para, idx) => (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.6, delay: 0.1 * idx, ease: [0.16, 1, 0.3, 1] }}
                >
                  {idx === 0 ? (
                    <>
                      I’m <strong className="font-medium text-[#F3EFE7]">Indujha</strong>, a{' '}
                      <span className="text-[#F3EFE7]">Computer Science with Data Analytics</span>{' '}
                      student who enjoys transforming raw information into meaningful insights and
                      practical digital solutions.
                    </>
                  ) : (
                    para
                  )}
                </motion.p>
              ))}
            </div>

            {/* Premium Horizontal Quote Card */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-6 p-4 sm:p-5 rounded-2xl bg-[#111111]/85 backdrop-blur-md border border-white/[0.08] hover:border-[#C9A253]/35 transition-colors shadow-[0_12px_30px_rgba(0,0,0,0.5)] flex items-start gap-4 relative overflow-hidden group"
            >
              {/* Soft gold ambient highlight on top edge */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A253]/40 to-transparent" />

              <div className="w-8 h-8 rounded-full bg-[#161616] border border-[#C9A253]/30 flex items-center justify-center shrink-0 mt-0.5">
                <Quote className="w-3.5 h-3.5 text-[#C9A253]" />
              </div>

              <p className="font-serif italic text-sm sm:text-[15px] text-[#F3EFE7] leading-relaxed">
                “{ABOUT_DATA.quote}”
              </p>
            </motion.div>

            {/* Areas of Interest Pills */}
            <div className="mt-6">
              <span className="text-[10px] font-mono font-semibold tracking-[0.2em] text-[#77716A] uppercase block mb-2.5">
                AREAS OF INTEREST
              </span>
              <div className="flex flex-wrap gap-2 sm:gap-2.5">
                {ABOUT_DATA.areasOfInterest.map((interest) => (
                  <div
                    key={interest.name}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#111111] border border-white/[0.08] hover:border-[#C9A253]/40 text-[11px] sm:text-xs text-[#A8A39A] hover:text-[#F3EFE7] transition-all cursor-default group shadow-sm"
                  >
                    {INTEREST_ICONS[interest.name]}
                    <span>{interest.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* CENTER CONTENT: 3D DATA GLOBE ON PEDESTAL + 5 BADGES (36%)   */}
          {/* ============================================================ */}
          <div className="lg:col-span-4 flex items-center justify-center relative my-6 lg:my-0">
            <AboutGlobe />
          </div>

          {/* ============================================================ */}
          {/* RIGHT CONTENT: PRINCIPLE CARD & 4 PROFILE CARDS (22%)        */}
          {/* ============================================================ */}
          <div className="lg:col-span-3 flex flex-col gap-3.5 sm:gap-4">
            {/* Top Principle Quote Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.7 }}
              className="p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-[#151515] to-[#101010] border border-[#C9A253]/35 shadow-[0_15px_35px_rgba(0,0,0,0.6)] relative overflow-hidden"
            >
              <div className="flex items-center gap-2 mb-2 text-[#C9A253]">
                <Quote className="w-4 h-4" />
              </div>
              <h3 className="font-serif text-lg sm:text-xl text-[#F3EFE7] leading-snug tracking-wide">
                “{ABOUT_DATA.statement.line1}
                <br />
                {ABOUT_DATA.statement.line2}
                <br />
                <span className="text-[#C9A253] font-medium">
                  {ABOUT_DATA.statement.highlight}
                </span>
                ”
              </h3>
              <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center gap-2">
                <div className="w-4 h-[1px] bg-[#C9A253]" />
                <span className="text-[10px] font-mono tracking-widest text-[#77716A] uppercase font-medium">
                  {ABOUT_DATA.statement.caption}
                </span>
              </div>
            </motion.div>

            {/* Four Stacked Profile Cards */}
            {ABOUT_DATA.qualities.map((quality, idx) => (
              <motion.div
                key={quality.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.5, delay: 0.08 * idx }}
                className="p-3.5 sm:p-4 rounded-xl bg-[#111111] border border-white/[0.08] hover:border-[#C9A253]/40 hover:-translate-y-0.5 transition-all duration-300 group shadow-sm flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-[#151515] border border-white/[0.08] group-hover:border-[#C9A253]/50 flex items-center justify-center shrink-0 mt-0.5 transition-colors">
                  {PROFILE_ICONS[idx]}
                </div>
                <div className="flex flex-col">
                  <h4 className="text-xs font-semibold tracking-wider text-[#F3EFE7] font-sans uppercase">
                    {quality.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-[#77716A] group-hover:text-[#A8A39A] transition-colors font-light leading-snug mt-1">
                    {quality.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
