import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  theme?: 'light' | 'dark';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  label,
  title,
  subtitle,
  align = 'left',
  theme = 'light',
  className = ''
}) => {
  const isDark = theme === 'dark';

  return (
    <div className={`mb-12 md:mb-16 ${align === 'center' ? 'text-center mx-auto max-w-3xl' : 'max-w-2xl'} ${className}`}>
      {/* Small uppercase label */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-3 mb-4"
        style={{ justifyContent: align === 'center' ? 'center' : 'flex-start' }}
      >
        <span className="w-6 h-[1px] bg-[#B89152]" />
        <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#B89152]">
          {label}
        </span>
      </motion.div>

      {/* Main serif editorial title */}
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className={`font-serif text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-medium tracking-tight leading-[1.18] ${
          isDark ? 'text-[#F7F4EE]' : 'text-[#161513]'
        }`}
      >
        {title}
      </motion.h2>

      {/* Optional subtitle */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className={`mt-4 text-base md:text-lg font-light leading-relaxed ${
            isDark ? 'text-[#A09D96]' : 'text-[#706D67]'
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};
