import React from 'react';
import { motion } from 'framer-motion';
import { ABOUT_DATA } from '../../data/portfolioData';
import { SectionHeader } from '../ui/SectionHeader';
import { AboutSculpture } from '../3d/AboutSculpture';
import { Compass, Lightbulb, Users, Search } from 'lucide-react';





const ATTRIBUTE_ICONS = [
  <Search className="w-4 h-4 text-[#B89152]" key="search" />,
  <Lightbulb className="w-4 h-4 text-[#B89152]" key="lightbulb" />,
  <Users className="w-4 h-4 text-[#B89152]" key="users" />,
  <Compass className="w-4 h-4 text-[#B89152]" key="compass" />,
];

export const About: React.FC = () => {
  return (
    <section
      id="about"
      className="relative py-24 sm:py-32 bg-[#11110F] text-[#F7F4EE] overflow-hidden border-t border-white/8"
    >
      {/* Background ambient accents */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#B89152]/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-[#B89152]/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT 65% (col-span-7 or 8) */}
          <div className="lg:col-span-7">
            <SectionHeader
              label={ABOUT_DATA.label}
              title={ABOUT_DATA.title}
              theme="dark"
              className="mb-8"
            />

            {/* Editorial Biography Paragraphs */}
            <div className="space-y-6 text-base sm:text-lg text-[#A09D96] font-light leading-relaxed">
              {ABOUT_DATA.paragraphs.map((para, idx) => (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, delay: 0.1 * idx, ease: [0.16, 1, 0.3, 1] }}
                >
                  {para}
                </motion.p>
              ))}
            </div>

            {/* Four Core Attributes Grid */}
            <div className="mt-12 grid grid-cols-2 gap-4">
              {ABOUT_DATA.attributes.map((attr, idx) => (
                <motion.div
                  key={attr.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.5, delay: 0.1 * idx }}
                  className="p-4 rounded-xl bg-[#1A1916]/80 border border-white/8 hover:border-[#B89152]/40 transition-colors group"
                >
                  <div className="flex items-center gap-2.5 mb-1.5">
                    {ATTRIBUTE_ICONS[idx]}
                    <span className="text-xs sm:text-sm font-semibold tracking-wide text-[#F7F4EE] font-sans">
                      {attr.title}
                    </span>
                  </div>
                  <p className="text-xs text-[#706D67] font-light leading-snug">
                    {attr.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT 35% (col-span-5) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            {/* 3D Analytics Sculpture */}
            <div className="relative w-full flex items-center justify-center">
              <AboutSculpture />
            </div>

            {/* Editorial Quote Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative -mt-6 sm:-mt-8 p-6 sm:p-7 rounded-2xl bg-[#1A1916] border border-[#B89152]/30 max-w-sm w-full shadow-[0_20px_40px_rgba(0,0,0,0.5)] text-center"
            >
              <div className="w-6 h-[1px] bg-[#B89152] mx-auto mb-3" />
              <p className="font-serif text-lg sm:text-xl text-[#F7F4EE] leading-snug">
                “{ABOUT_DATA.quote.line1}
                <br />
                {ABOUT_DATA.quote.line2}
                <br />
                <span className="text-[#D3B679]">{ABOUT_DATA.quote.line3}</span>”
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
