import React from 'react';
import { motion } from 'framer-motion';
import { Presentation, Terminal, Cpu, Sparkles } from 'lucide-react';

import { GROWTH_CARDS } from '../../data/portfolioData';
import { SectionHeader } from '../ui/SectionHeader';

const CARD_ICONS = [
  <Terminal className="w-5 h-5 text-[#C6A15B]" key="terminal" />,
  <Presentation className="w-5 h-5 text-[#C6A15B]" key="presentation" />,
  <Cpu className="w-5 h-5 text-[#C6A15B]" key="cpu" />,
  <Sparkles className="w-5 h-5 text-[#C6A15B]" key="sparkles" />,
];

export const BeyondClassroom: React.FC = () => {
  return (
    <section
      id="journey"
      className="py-28 sm:py-36 bg-[#080808] relative overflow-hidden border-t border-white/[0.07] scroll-mt-28"
    >
      {/* Background ambient gold glows */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[400px] bg-[#C6A15B]/[0.025] rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <SectionHeader
          label="06 / GROWTH"
          title="Beyond the Classroom"
          subtitle="“Continuously strengthening practical knowledge through technical activities, project presentations and hands-on development.”"
          align="left"
          theme="dark"
        />

        {/* Four growth cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {GROWTH_CARDS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              className="p-6 sm:p-7 rounded-2xl bg-[#111111] hover:bg-[#151515] border border-white/[0.08] hover:border-[#C6A15B]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-xl bg-[#181818] flex items-center justify-center border border-white/[0.08] shadow-inner group-hover:border-[#C6A15B]/40 transition-colors">
                    {CARD_ICONS[idx]}
                  </div>
                  <span className="text-[10px] font-mono tracking-widest text-[#C6A15B] uppercase font-semibold">
                    0{idx + 1}
                  </span>
                </div>

                <span className="text-[10px] font-mono uppercase text-[#77736C] block mb-1">
                  {item.category}
                </span>

                <h4 className="font-serif text-lg sm:text-xl font-semibold text-[#F4F1EA] mb-3 leading-snug group-hover:text-[#DFC786] transition-colors">
                  {item.title}
                </h4>

                <p className="text-xs sm:text-sm text-[#A9A59D] leading-relaxed font-light">
                  {item.description}
                </p>
              </div>

              <div className="mt-8 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-[#77736C]">
                <span>ENGAGEMENT</span>
                <span className="text-[#C6A15B] font-semibold">ACTIVE</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
