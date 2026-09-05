import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowRight, Copy, Check } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { ContactConstellation } from '../3d/ContactConstellation';
import { MagneticButton } from '../ui/MagneticButton';
import { LinkedInIcon } from '../ui/Icons';

export const Contact: React.FC = () => {
  const [isBtnHovered, setIsBtnHovered] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-28 sm:py-36 bg-[#080808] text-[#F4F1EA] overflow-hidden border-t border-white/[0.07] scroll-mt-28"
    >
      {/* Interactive 3D Constellation Background */}
      <ContactConstellation isButtonHovered={isBtnHovered} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 text-center">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 mb-6"
        >
          <span className="w-5 h-[1px] bg-[#C6A15B]" />
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#C6A15B]">
            07 / LET’S CONNECT
          </span>
          <span className="w-5 h-[1px] bg-[#C6A15B]" />
        </motion.div>

        {/* Editorial Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-[#F4F1EA] leading-[1.12] mb-6"
        >
          Have a Problem
          <br />
          <span className="text-[#DFC786]">Worth Solving?</span>
        </motion.h2>

        {/* Lead Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-[#A9A59D] font-light max-w-2xl mx-auto leading-relaxed mb-10"
        >
          “{PERSONAL_INFO.heroStatement.line1} {PERSONAL_INFO.heroStatement.line2}”
          <br />
          <span className="text-xs sm:text-sm text-[#77736C] mt-3 block">
            {PERSONAL_INFO.heroSecondary}
          </span>
        </motion.p>

        {/* Primary CTA Magnetic Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mb-16 inline-block"
          onMouseEnter={() => setIsBtnHovered(true)}
          onMouseLeave={() => setIsBtnHovered(false)}
        >
          <MagneticButton
            variant="primary"
            href={`mailto:${PERSONAL_INFO.email}`}
            className="text-base sm:text-lg px-10 py-4 font-semibold shadow-[0_0_30px_rgba(198,161,91,0.3)]"
          >
            <span>Let’s Connect</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1.5" />
          </MagneticButton>
        </motion.div>

        {/* Direct Contact Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          {/* Email */}
          <div className="p-4 rounded-xl bg-[#111111] border border-white/[0.08] hover:border-[#C6A15B]/40 transition-colors group">
            <div className="flex items-center justify-between text-[#77736C] text-xs mb-2">
              <span className="flex items-center gap-1.5 font-mono">
                <Mail className="w-3.5 h-3.5 text-[#C6A15B]" /> EMAIL
              </span>
              <button
                type="button"
                onClick={() => copyToClipboard(PERSONAL_INFO.email, 'email')}
                className="hover:text-[#F4F1EA] transition-colors cursor-pointer"
                title="Copy email"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-[#C6A15B]" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="text-xs font-mono text-[#F4F1EA] hover:text-[#DFC786] transition-colors break-all"
            >
              {PERSONAL_INFO.email}
            </a>
          </div>

          {/* LinkedIn */}
          <div className="p-4 rounded-xl bg-[#111111] border border-white/[0.08] hover:border-[#C6A15B]/40 transition-colors group">
            <div className="flex items-center justify-between text-[#77736C] text-xs mb-2">
              <span className="flex items-center gap-1.5 font-mono">
                <LinkedInIcon className="w-3.5 h-3.5 text-[#C6A15B]" /> LINKEDIN
              </span>
            </div>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-mono text-[#F4F1EA] hover:text-[#DFC786] transition-colors break-all inline-flex items-center gap-1"
            >
              {PERSONAL_INFO.linkedinDisplay}
            </a>
          </div>

          {/* Phone */}
          <div className="p-4 rounded-xl bg-[#111111] border border-white/[0.08] hover:border-[#C6A15B]/40 transition-colors group">
            <div className="flex items-center justify-between text-[#77736C] text-xs mb-2">
              <span className="flex items-center gap-1.5 font-mono">
                <Phone className="w-3.5 h-3.5 text-[#C6A15B]" /> PHONE
              </span>
              <button
                type="button"
                onClick={() => copyToClipboard(PERSONAL_INFO.phone, 'phone')}
                className="hover:text-[#F4F1EA] transition-colors cursor-pointer"
                title="Copy phone"
              >
                {copiedPhone ? <Check className="w-3.5 h-3.5 text-[#C6A15B]" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <a
              href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`}
              className="text-xs font-mono text-[#F4F1EA] hover:text-[#DFC786] transition-colors"
            >
              {PERSONAL_INFO.phoneFormatted}
            </a>
          </div>

          {/* Location */}
          <div className="p-4 rounded-xl bg-[#111111] border border-white/[0.08]">
            <div className="flex items-center gap-1.5 text-[#77736C] text-xs mb-2 font-mono">
              <MapPin className="w-3.5 h-3.5 text-[#C6A15B]" /> LOCATION
            </div>
            <p className="text-xs font-mono text-[#F4F1EA]">
              {PERSONAL_INFO.location}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

