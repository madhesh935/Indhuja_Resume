import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { APPROACH_STEPS } from '../../data/portfolioData';
import { SectionHeader } from '../ui/SectionHeader';

export const Approach: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(2); // default center or interactive

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Progress line width
  const lineWidth = useTransform(scrollYProgress, [0.15, 0.8], ['0%', '100%']);

  return (
    <section
      id="process"
      ref={containerRef}
      className="py-28 sm:py-36 bg-[#080808] relative overflow-hidden border-t border-white/[0.07] scroll-mt-28"
    >
      {/* Background ambient lighting and subtle spline data flow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[#C6A15B]/[0.025] rounded-full filter blur-[160px] pointer-events-none" />

      {/* SVG Background Data Spline */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.12]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M 0,180 Q 300,100 600,180 T 1200,180 T 1800,140"
          fill="none"
          stroke="#C6A15B"
          strokeWidth="1.5"
          strokeDasharray="6 8"
          animate={{ strokeDashoffset: [0, -100] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />
        <motion.path
          d="M 0,220 Q 350,280 700,220 T 1400,220 T 2000,260"
          fill="none"
          stroke="#DFC786"
          strokeWidth="1"
          strokeDasharray="4 6"
          animate={{ strokeDashoffset: [0, 80] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <SectionHeader
          label="04 / PROCESS"
          title="From Data To Impact."
          subtitle="“A structured way of thinking to solve real-world problems.”"
          align="left"
          theme="dark"
        />

        {/* 5-Step Process Container with Progressive 3D Line */}
        <div className="relative mt-16 perspective-[1000px]">
          {/* Base Background Track Line (Desktop) */}
          <div className="hidden lg:block absolute top-6 left-10 right-10 h-[2px] bg-white/[0.08] z-0" />

          {/* Animated Gold Fill Line (Desktop) */}
          <motion.div
            style={{ width: lineWidth }}
            className="hidden lg:block absolute top-6 left-10 h-[2px] bg-[#C6A15B] z-0 shadow-[0_0_12px_rgba(198,161,91,0.6)]"
          />

          {/* Grid of Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 relative z-10">
            {APPROACH_STEPS.map((step, idx) => {
              const isSelected = activeStep === idx;

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  onMouseEnter={() => setActiveStep(idx)}
                  className="group relative cursor-pointer"
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                  animate={{
                    z: isSelected ? 18 : 0,
                    scale: isSelected ? 1.02 : 1,
                  }}
                  transition={{ type: 'spring', damping: 22, stiffness: 240, delay: idx * 0.08 }}
                >
                  {/* Step Node Marker with subtle orbital ring */}
                  <div className="mb-6 flex items-center gap-3 lg:block">
                    <div
                      className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
                        isSelected
                          ? 'bg-[#C6A15B] border-2 border-[#DFC786] text-[#080808] shadow-[0_0_20px_rgba(198,161,91,0.5)]'
                          : 'bg-[#141414] border border-white/[0.12] text-[#DFC786] hover:border-[#C6A15B]'
                      }`}
                    >
                      {/* Rotating Gold Accent Ring on active/hovered step */}
                      {isSelected && (
                        <motion.div
                          className="absolute -inset-1.5 rounded-full border border-[#C6A15B]/70 pointer-events-none"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                        />
                      )}
                      <span className={`font-mono text-xs font-bold ${isSelected ? 'text-[#080808]' : 'text-[#F4F1EA]'}`}>
                        {step.number}
                      </span>
                    </div>

                    {/* Mobile connector line */}
                    <div className="h-[1px] flex-1 bg-white/[0.08] lg:hidden" />
                  </div>

                  {/* Step Card Content */}
                  <div
                    className={`p-6 rounded-2xl border transition-all duration-300 min-h-[170px] flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#151515] border-[#C6A15B]/60 shadow-[0_10px_30px_rgba(0,0,0,0.6)]'
                        : 'bg-[#111111] border-white/[0.08] hover:border-white/[0.16]'
                    }`}
                  >
                    <div>
                      <h4 className="font-serif text-lg font-bold tracking-tight text-[#F4F1EA] mb-2 group-hover:text-[#DFC786] transition-colors">
                        {step.title}
                      </h4>
                      <p className="text-xs text-[#A9A59D] leading-relaxed font-light">
                        {step.description}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center gap-1.5 text-[10px] font-mono text-[#C6A15B] font-semibold">
                      <span>PHASE</span>
                      <span>0{idx + 1}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

