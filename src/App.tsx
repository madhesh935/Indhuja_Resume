import React, { useState } from 'react';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { CustomCursor } from './components/ui/CustomCursor';
import { ResumeModal } from './components/ui/ResumeModal';
import { BackToTop } from './components/ui/BackToTop';
import { Navbar } from './components/sections/Navbar';
import { Hero } from './components/sections/Hero';
import { ExpertiseMarquee } from './components/sections/ExpertiseMarquee';
import { About } from './components/sections/About';
import { Capabilities } from './components/sections/Capabilities';
import { FeaturedProject } from './components/sections/FeaturedProject';
import { OtherProjects } from './components/sections/OtherProjects';
import { Approach } from './components/sections/Approach';
import { Education } from './components/sections/Education';
import { BeyondClassroom } from './components/sections/BeyondClassroom';
import { SoftSkillsMarquee } from './components/sections/SoftSkillsMarquee';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/sections/Footer';

export const App: React.FC = () => {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#080808] text-[#F4F1EA] selection:bg-[#C6A15B]/30 selection:text-[#DFC786]">
      {/* 2px Luxury Gold Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Desktop Context-Aware Custom Cursor */}
      <CustomCursor />

      {/* Floating Dark Glassmorphism Navbar */}
      <Navbar onOpenResume={() => setIsResumeModalOpen(true)} />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* 1. Split Hero Section with Indujha's Transparent Portrait & 3D Analytics Canvas */}
        <Hero onOpenResume={() => setIsResumeModalOpen(true)} />

        {/* 2. Dual Horizontal Expertise & Tech Marquee */}
        <ExpertiseMarquee />

        {/* 01 / ABOUT Section with 3D Data Sculpture */}
        <About />

        {/* 02 / EXPERTISE Section with 3D Tilt Cards */}
        <Capabilities />

        {/* 03 / SELECTED WORK - Featured Capstone with 3D Laptop Mockup */}
        <FeaturedProject />

        {/* Second Project - Gym Management System */}
        <OtherProjects />

        {/* 04 / PROCESS - 5-Stage Progressive 3D Process */}
        <Approach />

        {/* 05 / EDUCATION - KPR College, 83% with 3D Orbital Score Ring */}
        <Education />

        {/* 06 / GROWTH - Beyond the Classroom Activity Cards */}
        <BeyondClassroom />

        {/* Currently Exploring & Soft Skills Marquee */}
        <SoftSkillsMarquee />

        {/* 07 / LET'S CONNECT - 3D Constellation & Magnetic CTA */}
        <Contact />
      </main>

      {/* Editorial Footer */}
      <Footer />

      {/* Floating Minimal Back To Top Button (>65% scroll) */}
      <BackToTop />

      {/* Resume Profile & Download Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </div>
  );
};

export default App;

