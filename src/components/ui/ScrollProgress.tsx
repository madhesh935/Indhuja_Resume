import React, { useEffect, useState } from 'react';

export const ScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(currentProgress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Desktop: Right-edge 2px vertical progress line */}
      <div
        className="hidden md:block fixed top-0 right-0 bottom-0 w-[2px] z-50 pointer-events-none bg-white/[0.06]"
        aria-hidden="true"
      >
        <div
          className="w-full bg-[#C6A15B] transition-all duration-75 ease-out shadow-[0_0_8px_rgba(198,161,91,0.6)]"
          style={{ height: `${scrollProgress}%` }}
        />
      </div>

      {/* Mobile: Top-edge 2px horizontal progress bar */}
      <div
        className="md:hidden fixed top-0 left-0 right-0 h-[2px] z-50 pointer-events-none bg-transparent"
        aria-hidden="true"
      >
        <div
          className="h-full bg-[#C6A15B] transition-all duration-75 ease-out shadow-[0_0_8px_rgba(198,161,91,0.6)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </>
  );
};
