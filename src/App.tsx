import React, { useState } from 'react';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { CustomCursor } from './components/ui/CustomCursor';
import { ResumeModal } from './components/ui/ResumeModal';
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
    <div className="relative min-h-screen bg-[#F7F4EE] text-[#161513] selection:bg-[#B89152]/25 selection:text-[#11110F]">
      {/* 2px Luxury Gold Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Desktop Context-Aware Custom Cursor */}
      <CustomCursor />

      {/* Floating Glassmorphism Navbar */}
      <Navbar onOpenResume={() => setIsResumeModalOpen(true)} />

      {/* Main Content Sections */}
      <main>
        {/* 1. Split Hero Section with Indujha's Portrait & 3D Analytics Canvas */}
        <Hero onOpenResume={() => setIsResumeModalOpen(true)} />

        {/* 2. Dual Horizontal Expertise & Tech Marquee */}
        <ExpertiseMarquee />

        {/* 3. About Section (Dark #11110F) with 3D Data Sculpture */}
        <About />

        {/* 4. Capabilities (Cream #F7F4EE) with 3D Tilt Cards */}
        <Capabilities />

        {/* 5. Featured Capstone Project (Dark #11110F) with 3D Laptop Mockup */}
        <FeaturedProject />

        {/* 6. Other Projects (Cream #F7F4EE) - Gym Management System */}
        <OtherProjects />

        {/* 7. My Approach (Cream #F7F4EE) - 5-Stage Progressive 3D Process */}
        <Approach />

        {/* 8. Education Section - KPR College, 83% with 3D Orbital Score Ring */}
        <Education />

        {/* 9. Beyond the Classroom - 5 Hands-on Activity Cards */}
        <BeyondClassroom />

        {/* 10. Soft Skills Marquee - Large Outlined Serif Typography */}
        <SoftSkillsMarquee />

        {/* 11. Contact Section (Dark #11110F) with 3D Constellation & Magnetic CTA */}
        <Contact />
      </main>

      {/* 12. Editorial Footer */}
      <Footer />

      {/* Resume Profile & Download Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </div>
  );
};

export default App;
