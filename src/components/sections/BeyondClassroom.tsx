import React from 'react';
import { motion } from 'framer-motion';
import { Presentation, Terminal, Cpu, Database, Award } from 'lucide-react';

import { BEYOND_CLASSROOM_ITEMS } from '../../data/portfolioData';
import { SectionHeader } from '../ui/SectionHeader';

const CARD_ICONS = [
  <Terminal className="w-5 h-5 text-[#B89152]" key="terminal" />,
  <Presentation className="w-5 h-5 text-[#B89152]" key="presentation" />,
  <Database className="w-5 h-5 text-[#B89152]" key="database" />,
  <Cpu className="w-5 h-5 text-[#B89152]" key="cpu" />,
  <Award className="w-5 h-5 text-[#B89152]" key="award" />,
];

export const BeyondClassroom: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-[#F7F4EE] relative overflow-hidden border-t border-[#11110F]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <SectionHeader
          label="ACHIEVEMENTS &amp; ACTIVITIES"
          title="Beyond the Classroom"
          subtitle="“Continuously strengthening practical knowledge through technical activities, project presentations and hands-on development.”"
          align="left"
        />

        {/* Five activity cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mt-12">
          {BEYOND_CLASSROOM_ITEMS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              className="p-6 rounded-2xl bg-[#EFEAE1]/60 hover:bg-[#EFEAE1] border border-[#11110F]/8 hover:border-[#B89152]/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#F7F4EE] flex items-center justify-center border border-[#11110F]/6 shadow-sm">
                    {CARD_ICONS[idx]}
                  </div>
                  <span className="text-[10px] font-mono tracking-widest text-[#B89152] uppercase font-semibold">
                    0{idx + 1}
                  </span>
                </div>

                <span className="text-[10px] font-mono uppercase text-[#706D67] block mb-1">
                  {item.category}
                </span>

                <h4 className="font-serif text-lg font-semibold text-[#11110F] mb-3 leading-snug">
                  {item.title}
                </h4>

                <p className="text-xs text-[#55524B] leading-relaxed font-light">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-[#11110F]/6 flex items-center justify-between text-[10px] font-mono text-[#706D67]">
                <span>ENGAGEMENT</span>
                <span className="text-[#B89152] font-semibold">ACTIVE</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
