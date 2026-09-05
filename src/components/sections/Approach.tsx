import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { APPROACH_STEPS } from '../../data/portfolioData';
import { SectionHeader } from '../ui/SectionHeader';

export const Approach: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(2); // default center or dynamic

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Progress line width
  const lineWidth = useTransform(scrollYProgress, [0.1, 0.75], ['0%', '100%']);

  return (
    <section
      ref={containerRef}
      className="py-24 sm:py-32 bg-[#F7F4EE] relative overflow-hidden border-t border-[#11110F]/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <SectionHeader
          label="MY APPROACH"
          title="From Data to Impact"
          subtitle="“A structured way of thinking to solve real-world problems.”"
          align="left"
        />

        {/* 5-Step Process Container with Progressive 3D Line */}
        <div className="relative mt-16 perspective-[1000px]">
          {/* Base Background Track Line */}
          <div className="hidden lg:block absolute top-12 left-8 right-8 h-[2px] bg-[#11110F]/10 z-0" />

          {/* Animated Gold Fill Line */}
          <motion.div
            style={{ width: lineWidth }}
            className="hidden lg:block absolute top-12 left-8 h-[2px] bg-[#B89152] z-0 transition-all duration-100 ease-out shadow-[0_0_10px_rgba(184,145,82,0.5)]"
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
                    z: isSelected ? 25 : 0,
                    opacity: isSelected ? 1 : 0.85,
                  }}
                  transition={{ type: 'spring', damping: 20, stiffness: 220, delay: idx * 0.12 }}
                >
                  {/* Step Node Marker with subtle orbital ring */}
                  <div className="mb-6 flex items-center gap-3 lg:block">
                    <div className="relative w-12 h-12 rounded-full bg-[#EFEAE1] border border-[#11110F]/15 flex items-center justify-center group-hover:border-[#B89152] transition-colors shadow-sm">
                      {/* Rotating Gold Accent Ring on active/hovered step */}
                      {isSelected && (
                        <motion.div
                          className="absolute -inset-1 rounded-full border border-[#B89152]/60 pointer-events-none"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                        />
                      )}
                      <span className="font-mono text-xs font-bold text-[#11110F]">
                        {step.number}
                      </span>
                    </div>

                    {/* Mobile connector line */}
                    <div className="h-[1px] flex-1 bg-[#11110F]/10 lg:hidden" />
                  </div>

                  {/* Step Card Content */}
                  <div className="p-6 rounded-2xl bg-[#EFEAE1]/50 group-hover:bg-[#EFEAE1] border border-[#11110F]/8 group-hover:border-[#B89152]/40 transition-all duration-300 min-h-[160px] flex flex-col justify-between">
                    <div>
                      <h4 className="font-serif text-lg font-bold tracking-tight text-[#11110F] mb-2">
                        {step.title}
                      </h4>
                      <p className="text-xs text-[#55524B] leading-relaxed font-light">
                        {step.description}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center gap-1.5 text-[10px] font-mono text-[#B89152] font-semibold">
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
