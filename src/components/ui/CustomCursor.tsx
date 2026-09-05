import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorType, setCursorType] = useState<'default' | 'link' | 'view' | 'button' | 'linkedin' | 'resume'>('default');
  const [isTouchDevice] = useState(() => 
    typeof window !== 'undefined' && (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window)
  );

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth trailing spring physics
  const springX = useSpring(mouseX, { damping: 28, stiffness: 350 });
  const springY = useSpring(mouseY, { damping: 28, stiffness: 350 });

  useEffect(() => {
    if (isTouchDevice) return;

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const projectEl = target.closest('[data-cursor="view"]');
      const linkedinEl = target.closest('[data-cursor="linkedin"], a[href*="linkedin.com"]');
      const resumeEl = target.closest('[data-cursor="resume"], [data-action="resume"]');
      const buttonEl = target.closest('button, [data-cursor="button"]');
      const linkEl = target.closest('a, [role="button"], [data-cursor="link"]');

      if (projectEl) {
        setCursorType('view');
      } else if (linkedinEl) {
        setCursorType('linkedin');
      } else if (resumeEl) {
        setCursorType('resume');
      } else if (buttonEl) {
        setCursorType('button');
      } else if (linkEl) {
        setCursorType('link');
      } else {
        setCursorType('default');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleElementHover);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleElementHover);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isTouchDevice, isVisible, mouseX, mouseY]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Trailing Outer Ring (24-30px default, 60px on view) */}
      <motion.div
        className="absolute top-0 left-0 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 transition-colors duration-200 pointer-events-none"
        style={{
          x: springX,
          y: springY,
        }}
        animate={{
          width: cursorType === 'view' ? 62 : cursorType === 'button' || cursorType === 'linkedin' || cursorType === 'resume' ? 36 : cursorType === 'link' ? 32 : 26,
          height: cursorType === 'view' ? 62 : cursorType === 'button' || cursorType === 'linkedin' || cursorType === 'resume' ? 36 : cursorType === 'link' ? 32 : 26,
          backgroundColor:
            cursorType === 'view'
              ? 'rgba(198, 161, 91, 0.92)'
              : cursorType === 'button' || cursorType === 'linkedin' || cursorType === 'resume'
              ? 'rgba(198, 161, 91, 0.15)'
              : cursorType === 'link'
              ? 'rgba(255, 255, 255, 0.08)'
              : 'rgba(244, 241, 234, 0.04)',
          borderColor:
            cursorType === 'view'
              ? '#C6A15B'
              : cursorType === 'button' || cursorType === 'linkedin' || cursorType === 'resume'
              ? '#C6A15B'
              : 'rgba(244, 241, 234, 0.35)',
          borderWidth: cursorType === 'view' ? '0px' : '1px',
          borderRadius: '9999px',
          backdropFilter: cursorType === 'view' ? 'blur(4px)' : 'none',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
      >
        {cursorType === 'view' && (
          <span className="text-[10px] font-semibold tracking-widest text-[#080808] uppercase">
            VIEW
          </span>
        )}
        {cursorType === 'linkedin' && (
          <span className="text-xs text-[#C6A15B] font-mono">↗</span>
        )}
        {cursorType === 'resume' && (
          <span className="text-xs text-[#C6A15B] font-mono">↓</span>
        )}
        {cursorType === 'button' && (
          <span className="text-xs text-[#C6A15B] font-mono">→</span>
        )}
      </motion.div>

      {/* 8px Center Precise Dot */}
      <motion.div
        className="absolute top-0 left-0 w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          x: mouseX,
          y: mouseY,
          backgroundColor:
            cursorType === 'view'
              ? 'transparent'
              : cursorType === 'button' || cursorType === 'linkedin' || cursorType === 'resume'
              ? '#C6A15B'
              : '#F4F1EA',
        }}
        animate={{
          scale: cursorType === 'view' ? 0 : 1,
          opacity: cursorType === 'view' ? 0 : 0.9,
        }}
        transition={{ duration: 0.15 }}
      />
    </div>
  );
};
