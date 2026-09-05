import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'dark' | 'outline-dark' | 'icon';
  onClick?: () => void;
  href?: string;
  className?: string;
  ariaLabel?: string;
  isExternal?: boolean;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  variant = 'primary',
  onClick,
  href,
  className = '',
  ariaLabel,
  isExternal = false
}) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    // Limit magnetism to subtle 4-5px max
    const deltaX = (clientX - centerX) * 0.12;
    const deltaY = (clientY - centerY) * 0.12;
    setPosition({ x: Math.max(-5, Math.min(5, deltaX)), y: Math.max(-5, Math.min(5, deltaY)) });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-[#B89152] hover:bg-[#A68042] text-[#11110F] font-medium px-7 py-3.5 rounded-full shadow-[0_4px_16px_rgba(184,145,82,0.22)] hover:shadow-[0_6px_22px_rgba(184,145,82,0.35)] transition-all duration-300';
      case 'secondary':
        return 'bg-transparent text-[#161513] border border-[#161513]/25 hover:border-[#161513] hover:bg-[#161513] hover:text-[#F7F4EE] font-medium px-7 py-3.5 rounded-full transition-all duration-300';
      case 'dark':
        return 'bg-[#1A1916] hover:bg-[#252420] text-[#F7F4EE] border border-white/10 hover:border-[#B89152]/60 font-medium px-7 py-3.5 rounded-full transition-all duration-300';
      case 'outline-dark':
        return 'bg-transparent text-[#F7F4EE] border border-white/20 hover:border-[#B89152] hover:text-[#B89152] font-medium px-7 py-3.5 rounded-full transition-all duration-300';
      case 'icon':
        return 'w-11 h-11 rounded-full flex items-center justify-center border border-[#161513]/20 hover:border-[#B89152] hover:text-[#B89152] hover:bg-[#B89152]/10 transition-all duration-300 text-[#161513]';
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
      transition={{ type: 'spring', stiffness: 260, damping: 20, mass: 0.5 }}
      className={`inline-flex items-center justify-center gap-2 cursor-pointer select-none group text-sm tracking-wide ${getVariantStyles()} ${className}`}
      data-cursor="button"
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
