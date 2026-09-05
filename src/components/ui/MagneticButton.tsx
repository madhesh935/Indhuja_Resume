import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'icon';
  onClick?: () => void;
  href?: string;
  className?: string;
  ariaLabel?: string;
  isExternal?: boolean;
  dataCursor?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  variant = 'primary',
  onClick,
  href,
  className = '',
  ariaLabel,
  isExternal = false,
  dataCursor = 'button'
}) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current || window.innerWidth < 768) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    // Constrain displacement to subtle 4-5px max
    const deltaX = (clientX - centerX) * 0.1;
    const deltaY = (clientY - centerY) * 0.1;
    setPosition({ x: Math.max(-5, Math.min(5, deltaX)), y: Math.max(-5, Math.min(5, deltaY)) });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-[#C6A15B] hover:bg-[#D4B06A] text-[#080808] font-semibold px-7 py-3.5 rounded-full shadow-[0_4px_20px_rgba(198,161,91,0.22)] hover:shadow-[0_6px_28px_rgba(198,161,91,0.35)] transition-all duration-300 hover:-translate-y-0.5';
      case 'secondary':
        return 'bg-[#111111] text-[#F4F1EA] border border-white/10 hover:border-[#C6A15B]/70 hover:text-[#C6A15B] font-medium px-7 py-3.5 rounded-full transition-all duration-300 hover:-translate-y-0.5';
      case 'icon':
        return 'w-11 h-11 rounded-full flex items-center justify-center bg-[#111111] border border-white/10 hover:border-[#C6A15B] hover:text-[#C6A15B] hover:bg-[#151515] transition-all duration-300 text-[#F4F1EA]';
      default:
        return '';
    }
  };

  const content = (
    <motion.div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 280, damping: 20, mass: 0.5 }}
      className={`inline-flex items-center justify-center gap-2 cursor-pointer select-none group text-xs sm:text-sm tracking-wide ${getVariantStyles()} ${className}`}
      data-cursor={dataCursor}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        aria-label={ariaLabel}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className="inline-block"
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="inline-block bg-transparent p-0 border-0 outline-none focus:outline-none"
    >
      {content}
    </button>
  );
};
