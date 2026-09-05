import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
  theme?: 'dark' | 'light';
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  label,
  title,
  subtitle,
  align = 'left',
  className = '',
  theme: _theme = 'dark',
}) => {
  return (
    <div className={`mb-12 md:mb-16 ${align === 'center' ? 'text-center mx-auto max-w-3xl' : 'max-w-2xl'} ${className}`}>
      {/* Numbered index label with animated gold line */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-3 mb-4"
        style={{ justifyContent: align === 'center' ? 'center' : 'flex-start' }}
      >
        <motion.span
          initial={{ width: 0 }}
          whileInView={{ width: 28 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="h-[1px] bg-[#C6A15B]"
        />
        <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#C6A15B] font-semibold">
          {label}
        </span>
      </motion.div>

      {/* Main serif editorial title with gold sweep light reveal */}
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.12] text-[#F4F1EA] gold-sweep-text"
      >
        {title}
      </motion.h2>

      {/* Supporting subtitle */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 text-base sm:text-lg font-light leading-relaxed text-[#A9A59D]"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};
