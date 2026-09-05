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
  { label: 'Expertise', href: '#expertise' },
  { label: 'Projects', href: '#projects' },
  { label: 'Journey', href: '#journey' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

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
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-out px-4 sm:px-8 flex justify-center ${
          isScrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div
          className={`w-full max-w-6xl transition-all duration-300 rounded-full flex items-center justify-between px-6 sm:px-8 border ${
            isScrolled
              ? 'h-[60px] bg-[#0A0A0A]/85 backdrop-blur-[20px] border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.8)]'
              : 'h-[72px] bg-[#0A0A0A]/40 backdrop-blur-[12px] border-white/[0.06]'
          }`}
        >
          {/* Brand / Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-1.5 group select-none cursor-pointer"
            data-cursor="link"
          >
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#F4F1EA] transition-colors">
              {PERSONAL_INFO.name}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C6A15B] group-hover:scale-125 transition-transform shadow-[0_0_6px_rgba(198,161,91,0.6)]" />
          </a>

          {/* Desktop Navigation Links: Home, About, Expertise, Projects, Journey, Contact */}
          <nav className="hidden md:flex items-center gap-7 text-xs tracking-wider uppercase font-medium">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative py-1 transition-colors duration-200 cursor-pointer ${
                    isActive ? 'text-[#F4F1EA] font-semibold' : 'text-[#A9A59D] hover:text-[#F4F1EA]'
                  }`}
                  data-cursor="link"
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavDot"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#C6A15B] shadow-[0_0_6px_rgba(198,161,91,0.8)]"
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
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/15 hover:border-[#C6A15B] bg-[#111111]/80 hover:bg-[#151515] text-[#F4F1EA] text-xs font-semibold tracking-wide transition-all duration-300 shadow-sm group cursor-pointer"
              data-cursor="resume"
            >
              <FileText className="w-3.5 h-3.5 text-[#C6A15B]" />
              <span>Resume</span>
              <span className="text-[#C6A15B] font-mono transition-transform group-hover:translate-y-0.5">
                ↓
              </span>
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={onOpenResume}
              className="px-3 py-1.5 rounded-full border border-white/15 text-xs font-semibold text-[#F4F1EA] bg-[#111111]"
            >
              Resume ↓
            </button>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full hover:bg-white/10 text-[#F4F1EA] transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Dark Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 bg-[#080808] flex flex-col justify-between p-8 pt-28 md:hidden"
          >
            <nav className="flex flex-col space-y-6">
              {NAV_ITEMS.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="font-serif text-3xl text-[#F4F1EA] flex items-center justify-between border-b border-white/10 pb-4"
                >
                  <span>{item.label}</span>
                  <ArrowDownRight className="w-5 h-5 text-[#C6A15B] -rotate-45" />
                </motion.a>
              ))}
            </nav>

            <div className="pt-8 border-t border-white/10 space-y-3">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="w-full py-3.5 rounded-full bg-[#C6A15B] text-[#080808] font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <FileText className="w-4 h-4" /> Download Resume ↓
              </button>
              <p className="text-xs text-center text-[#77736C] font-mono">
                Tamil Nadu, India • {PERSONAL_INFO.email}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
