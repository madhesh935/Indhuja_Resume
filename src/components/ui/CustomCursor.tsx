import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorType, setCursorType] = useState<'default' | 'link' | 'view' | 'button'>('default');
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
      const buttonEl = target.closest('button, [data-cursor="button"]');
      const linkEl = target.closest('a, [role="button"], [data-cursor="link"]');

      if (projectEl) {
        setCursorType('view');
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
      {/* Trailing Outer Ring / Capsule */}
      <motion.div
        className="absolute top-0 left-0 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 transition-colors duration-200 pointer-events-none"
        style={{
          x: springX,
          y: springY,
        }}
        animate={{
          width: cursorType === 'view' ? 64 : cursorType === 'button' ? 44 : cursorType === 'link' ? 38 : 32,
          height: cursorType === 'view' ? 64 : cursorType === 'button' ? 44 : cursorType === 'link' ? 38 : 32,
          backgroundColor:
            cursorType === 'view'
              ? 'rgba(184, 145, 82, 0.92)'
              : cursorType === 'button'
              ? 'rgba(184, 145, 82, 0.2)'
              : cursorType === 'link'
              ? 'rgba(22, 21, 19, 0.12)'
              : 'rgba(184, 145, 82, 0.08)',
          borderColor:
            cursorType === 'view'
              ? '#B89152'
              : cursorType === 'button'
              ? '#B89152'
              : 'rgba(184, 145, 82, 0.5)',
          borderWidth: cursorType === 'view' ? '0px' : '1px',
          borderRadius: '9999px',
          backdropFilter: cursorType === 'view' ? 'blur(4px)' : 'none',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
      >
        {cursorType === 'view' && (
          <span className="text-[10px] font-semibold tracking-widest text-[#11110F] uppercase">
            VIEW
          </span>
        )}
        {cursorType === 'button' && (
          <span className="text-xs text-[#B89152] font-mono">↗</span>
        )}
      </motion.div>

      {/* Center Precise Dot */}
      <motion.div
        className="absolute top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#B89152] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          x: mouseX,
          y: mouseY,
        }}
        animate={{
          scale: cursorType === 'view' ? 0 : 1,
          opacity: cursorType === 'view' ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
    </div>
  );
};
