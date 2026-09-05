import React from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  Building2,
  MapPin,
  Monitor,
  BarChart3,
  Code2,
  Database,
  Lightbulb,
  ArrowUpRight,
} from 'lucide-react';
import { EDUCATION_DATA } from '../../data/portfolioData';

const SNAPSHOT_ICONS: Record<string, React.ReactNode> = {
  'COMPUTER SCIENCE': <Monitor className="w-3 h-3 text-[#C9A253]" />,
  'DATA ANALYTICS': <BarChart3 className="w-3 h-3 text-[#C9A253]" />,
  PROGRAMMING: <Code2 className="w-3 h-3 text-[#C9A253]" />,
  DATABASES: <Database className="w-3 h-3 text-[#C9A253]" />,
};

const METRIC_ICONS = [
  <BarChart3 className="w-4 h-4 text-[#C9A253]" key="strength" />,
  <Lightbulb className="w-4 h-4 text-[#C9A253]" key="approach" />,
  <ArrowUpRight className="w-4 h-4 text-[#C9A253]" key="direction" />,
];

export const Education: React.FC = () => {
  return (
    <section
      id="education"
      className="relative py-24 sm:py-32 bg-[#080808] text-[#F3EFE7] overflow-hidden border-t border-white/[0.07] scroll-mt-28"
    >
      {/* Top Thin Gold Section Divider with Glowing Accent Point */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A253]/35 to-transparent">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#C9A253] shadow-[0_0_12px_rgba(201,162,83,0.9)]" />
      </div>

      {/* Background Soft Gold Ambient Glows */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[500px] bg-[#C9A253]/[0.025] rounded-full filter blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[600px] h-[500px] bg-[#C9A253]/[0.025] rounded-full filter blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* ============================================================ */}
        {/* SECTION HEADER: 05 / EDUCATION + ACADEMIC FOUNDATION         */}
        {/* ============================================================ */}
        <div className="mb-12">
          {/* Section Tag with Left Vertical Gold Line */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-[2px] h-4 bg-[#C9A253]" />
            <span className="text-xs font-mono font-semibold tracking-[0.2em] text-[#C9A253] uppercase">
              {EDUCATION_DATA.label}
            </span>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#F3EFE7] tracking-tight leading-tight"
          >
            Academic <span className="text-[#C9A253] italic">Foundation</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-3 text-sm sm:text-base lg:text-[17px] text-[#A8A39A] font-light max-w-2xl leading-relaxed"
          >
            {EDUCATION_DATA.subtitle}
          </motion.p>
        </div>

        {/* ============================================================ */}
        {/* 3-COLUMN DESKTOP GRID: Left 52% / Center 24% / Right 24%     */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-stretch">
          {/* ------------------------------------------------------------ */}
          {/* COLUMN 1: LARGE DEGREE PROGRAM CARD (52% -> col-span-6)      */}
          {/* ------------------------------------------------------------ */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 rounded-2xl sm:rounded-3xl bg-[#111111]/90 backdrop-blur-md border border-white/[0.08] hover:border-[#C9A253]/35 transition-colors p-6 sm:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.6)] flex flex-col justify-between relative overflow-hidden"
          >
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A253]/35 to-transparent" />

            <div>
              {/* Header with Circular Graduation Cap Icon */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-11 h-11 rounded-full bg-[#161616] border border-[#C9A253]/35 flex items-center justify-center shrink-0 mt-0.5 shadow-[0_0_15px_rgba(201,162,83,0.15)]">
                  <GraduationCap className="w-5 h-5 text-[#C9A253]" />
                </div>
                <div>
                  <span className="text-[11px] font-mono font-semibold tracking-wider text-[#C9A253] uppercase block mb-1">
                    DEGREE PROGRAM
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#F3EFE7] font-medium leading-tight">
                    {EDUCATION_DATA.degree}
                  </h3>
                </div>
              </div>

              {/* Institution and Location Sub-details */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-sm text-[#A8A39A] font-mono mt-3 ml-0 sm:ml-15">
                <span className="flex items-center gap-1.5 text-[#F3EFE7]">
                  <Building2 className="w-3.5 h-3.5 text-[#C9A253]" />
                  {EDUCATION_DATA.institution}
                </span>
                <span className="text-white/20">•</span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C9A253]" />
                  {EDUCATION_DATA.location}
                </span>
              </div>
            </div>

            {/* Middle Divider */}
            <div className="border-t border-white/[0.08] my-6" />

            {/* Bottom Split: Academic Focus + Feathered Building Architecture Artwork */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-end">
              {/* Left Details: Academic Focus & Tags */}
              <div className="sm:col-span-7 flex flex-col justify-end">
                <span className="text-[11px] font-mono font-semibold tracking-wider text-[#C9A253] uppercase mb-2 block">
                  {EDUCATION_DATA.academicFocus.label}
                </span>
                <p className="text-xs sm:text-[13px] text-[#A8A39A] leading-relaxed font-light mb-4">
                  {EDUCATION_DATA.academicFocus.text}
                </p>
                <div className="flex flex-wrap gap-2">
                  {EDUCATION_DATA.academicFocus.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-full bg-[#151515] border border-white/[0.08] text-[10px] sm:text-[11px] font-mono text-[#A8A39A] hover:text-[#F3EFE7] hover:border-[#C9A253]/40 transition-colors cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Details: College Architecture Artwork + Gold Serif Quote */}
              <div className="sm:col-span-5 flex flex-col items-center sm:items-end justify-end">
                <img
                  src="/assets/academic-building-card.png"
                  alt="KPR College Campus"
                  className="w-48 sm:w-full h-auto object-contain opacity-85 select-none pointer-events-none mb-3 filter contrast-110"
                />
                <p className="font-serif text-[11px] sm:text-xs text-[#C9A253] tracking-widest uppercase leading-snug text-center sm:text-right">
                  “A STRONG
                  <br />
                  FOUNDATION
                  <br />
                  FOR A BRIGHTER
                  <br />
                  TOMORROW.”
                </p>
              </div>
            </div>
          </motion.div>

          {/* ------------------------------------------------------------ */}
          {/* COLUMN 2: ACADEMIC SNAPSHOT SCORE MODULE (24% -> col-span-3) */}
          {/* ------------------------------------------------------------ */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3 rounded-2xl sm:rounded-3xl bg-[#111111]/90 backdrop-blur-md border border-white/[0.08] hover:border-[#C9A253]/35 transition-colors p-6 sm:p-7 shadow-[0_15px_40px_rgba(0,0,0,0.6)] flex flex-col items-center justify-between relative overflow-hidden"
          >
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A253]/35 to-transparent" />

            {/* Top Label Pill */}
            <div className="px-3.5 py-1 rounded-full bg-[#151515] border border-white/[0.08] text-[10px] font-mono tracking-[0.2em] text-[#77716A] uppercase font-semibold mb-3">
              {EDUCATION_DATA.scoreModule.label}
            </div>

            {/* Circular Progress Ring with Center 83% & 4 Surrounding Orbital Pills */}
            <div className="relative w-full max-w-[240px] aspect-square flex items-center justify-center my-2 select-none">
              {/* SVG Circular Progress Arc */}
              <svg
                className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-3"
                viewBox="0 0 100 100"
              >
                {/* Background Ring Track */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="3.5"
                  fill="none"
                />
                {/* Champagne Gold Animated Progress Stroke (83%) */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="38"
                  stroke="#C9A253"
                  strokeWidth="4.2"
                  strokeDasharray="238.76"
                  initial={{ strokeDashoffset: 238.76 }}
                  whileInView={{ strokeDashoffset: 238.76 * (1 - 0.83) }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>

              {/* Center 83% Score Display */}
              <div className="relative z-10 text-center flex flex-col items-center justify-center p-6 rounded-full bg-[#0D0D0D]/95 border border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="font-serif text-4xl sm:text-5xl font-medium text-[#F3EFE7] tracking-tight leading-none"
                >
                  {EDUCATION_DATA.scoreModule.score}
                </motion.span>
                <span className="text-[10px] font-mono tracking-wider text-[#A8A39A] uppercase mt-1.5 font-medium">
                  {EDUCATION_DATA.scoreModule.scoreLabel}
                </span>
              </div>

              {/* 4 Cardinal / Orbital Discipline Pills (Matching Reference Layout) */}
              {/* 1. Left: COMPUTER SCIENCE */}
              <div className="absolute left-[-6px] top-[24%] -translate-y-1/2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#151515] border border-white/[0.08] text-[9px] font-mono text-[#A8A39A] shadow-md z-20">
                {SNAPSHOT_ICONS['COMPUTER SCIENCE']}
                <span className="hidden sm:inline text-[8px] tracking-wider">COMP</span>
                <span className="sm:hidden text-[8px]">CS</span>
              </div>

              {/* 2. Right: DATA ANALYTICS */}
              <div className="absolute right-[-6px] top-[24%] -translate-y-1/2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#151515] border border-white/[0.08] text-[9px] font-mono text-[#A8A39A] shadow-md z-20">
                {SNAPSHOT_ICONS['DATA ANALYTICS']}
                <span className="hidden sm:inline text-[8px] tracking-wider">ANALYTICS</span>
                <span className="sm:hidden text-[8px]">DATA</span>
              </div>

              {/* 3. Bottom-Left: PROGRAMMING */}
              <div className="absolute left-[4px] bottom-[10%] flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#151515] border border-white/[0.08] text-[9px] font-mono text-[#A8A39A] shadow-md z-20">
                {SNAPSHOT_ICONS['PROGRAMMING']}
                <span className="text-[8px] tracking-wider">PROGRAM</span>
              </div>

              {/* 4. Bottom-Right: DATABASES */}
              <div className="absolute right-[4px] bottom-[10%] flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#151515] border border-white/[0.08] text-[9px] font-mono text-[#A8A39A] shadow-md z-20">
                {SNAPSHOT_ICONS['DATABASES']}
                <span className="text-[8px] tracking-wider">DATABASES</span>
              </div>
            </div>

            {/* Bottom Verified Score Outlined Pill Badge */}
            <div className="w-full pt-4 border-t border-white/[0.08] flex justify-center">
              <span className="px-3.5 py-1.5 rounded-full bg-[#C9A253]/10 border border-[#C9A253]/40 text-xs font-mono font-semibold text-[#E1C177] shadow-[0_0_15px_rgba(201,162,83,0.15)] text-center">
                {EDUCATION_DATA.scoreModule.verifiedBadge}
              </span>
            </div>
          </motion.div>

          {/* ------------------------------------------------------------ */}
          {/* COLUMN 3: STACKED SUPPORT & FEATURE CARDS (24% -> col-span-3)*/}
          {/* ------------------------------------------------------------ */}
          <div className="lg:col-span-3 flex flex-col gap-3.5 sm:gap-4 justify-between">
            {/* Top Feature Card: MORE THAN A DEGREE + Antique Books Artwork */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.7 }}
              className="p-4 sm:p-5 rounded-2xl bg-[#111111] border border-white/[0.08] hover:border-[#C9A253]/35 transition-all shadow-[0_12px_30px_rgba(0,0,0,0.5)] flex items-center justify-between gap-3 group relative overflow-hidden"
            >
              <div className="flex flex-col">
                <span className="text-[10px] font-mono font-semibold tracking-[0.2em] text-[#C9A253] uppercase mb-1.5 block">
                  {EDUCATION_DATA.featureCard.label}
                </span>
                <p className="text-xs text-[#A8A39A] font-light leading-relaxed">
                  {EDUCATION_DATA.featureCard.text}
                </p>
              </div>
              <img
                src="/assets/antique-books-card.png"
                alt="Academic Journey Books"
                className="w-18 sm:w-20 h-auto object-contain shrink-0 opacity-85 group-hover:scale-105 transition-transform duration-500 select-none pointer-events-none"
              />
            </motion.div>

            {/* Three Stacked Metric Cards: Strength, Approach, Direction */}
            {EDUCATION_DATA.metricCards.map((card, idx) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.5, delay: 0.08 * idx }}
                className="p-3.5 sm:p-4 rounded-xl bg-[#111111] border border-white/[0.08] hover:border-[#C9A253]/40 hover:-translate-y-0.5 transition-all duration-300 group shadow-sm flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-[#151515] border border-white/[0.08] group-hover:border-[#C9A253]/50 flex items-center justify-center shrink-0 mt-0.5 transition-colors">
                  {METRIC_ICONS[idx]}
                </div>
                <div className="flex flex-col">
                  <h4 className="text-xs font-semibold tracking-wider text-[#F3EFE7] font-sans uppercase">
                    {card.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-[#77716A] group-hover:text-[#A8A39A] transition-colors font-light leading-snug mt-1">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ============================================================ */}
        {/* SECTION FOOTER DETAILS: Bottom-Left & Bottom-Right Scripts   */}
        {/* ============================================================ */}
        <div className="mt-14 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono tracking-[0.25em] text-[#77716A] uppercase select-none">
          <div>{EDUCATION_DATA.footer.left}</div>
          <div className="text-right">{EDUCATION_DATA.footer.right}</div>
        </div>
      </div>
    </section>
  );
};
