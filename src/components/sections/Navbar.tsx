import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowDownRight, FileText } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

interface NavbarProps {
  onOpenResume: () => void;
}

const NAV_ITEMS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Section tracking
      const sections = NAV_ITEMS.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-out px-4 sm:px-8 py-4 sm:py-5 flex justify-center`}
      >
        <div
          className={`w-full max-w-6xl transition-all duration-500 rounded-full flex items-center justify-between px-5 sm:px-7 py-3 ${
            isScrolled
              ? 'glass-cream shadow-[0_10px_30px_rgba(17,17,15,0.06)] border border-[#11110F]/10 py-2.5 sm:py-3'
              : 'bg-transparent border-transparent'
          }`}
        >
          {/* Brand / Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-1.5 group select-none"
            data-cursor="link"
          >
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#11110F] transition-colors">
              {PERSONAL_INFO.name}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#B89152] group-hover:scale-125 transition-transform" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs tracking-wider uppercase font-medium">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative py-1 transition-colors duration-200 ${
                    isActive ? 'text-[#11110F] font-semibold' : 'text-[#706D67] hover:text-[#11110F]'
                  }`}
                  data-cursor="link"
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#B89152]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action: Resume Button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenResume}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#11110F]/20 hover:border-[#B89152] bg-[#F7F4EE]/90 hover:bg-[#B89152] text-[#11110F] text-xs font-semibold tracking-wide transition-all duration-300 shadow-sm group"
              data-cursor="button"
            >
              <FileText className="w-3.5 h-3.5 text-[#B89152] group-hover:text-[#11110F] transition-colors" />
              <span>Resume</span>
              <span className="text-[#B89152] group-hover:text-[#11110F] font-mono transition-transform group-hover:translate-y-0.5">
                ↓
              </span>
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={onOpenResume}
              className="px-3 py-1.5 rounded-full border border-[#11110F]/20 text-xs font-semibold text-[#11110F] bg-white/50"
            >
              Resume ↓
            </button>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full hover:bg-black/5 text-[#11110F] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 bg-[#F7F4EE] flex flex-col justify-between p-8 pt-28 md:hidden"
          >
            <nav className="flex flex-col space-y-6">
              {NAV_ITEMS.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.06 }}
                  className="font-serif text-3xl text-[#11110F] flex items-center justify-between border-b border-[#11110F]/10 pb-4"
                >
                  <span>{item.label}</span>
                  <ArrowDownRight className="w-5 h-5 text-[#B89152] -rotate-45" />
                </motion.a>
              ))}
            </nav>

            <div className="pt-8 border-t border-[#11110F]/10 space-y-3">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="w-full py-3 rounded-full bg-[#B89152] text-[#11110F] font-semibold text-sm flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4" /> Download Resume ↓
              </button>
              <p className="text-xs text-center text-[#706D67] font-mono">
                Tamil Nadu, India • {PERSONAL_INFO.email}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
