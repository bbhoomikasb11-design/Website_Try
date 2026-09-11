'use client';

import React, { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { CustomCursor } from '@/components/CustomCursor';
import { GrainOverlay } from '@/components/GrainOverlay';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { WorkSection } from '@/components/sections/WorkSection';
import { ExpertiseSection } from '@/components/sections/ExpertiseSection';
import { StudioSection } from '@/components/sections/StudioSection';
import { BookingSection } from '@/components/sections/BookingSection';
import { Footer } from '@/components/Footer';

// Dynamic import for 3D Scene to disable SSR
const Scene3D = dynamic(() => import('@/components/canvas/Scene3D'), {
  ssr: false,
});

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track window scroll progress between 0.0 and 1.0
  const handleScroll = useCallback(() => {
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (totalScroll > 0) {
      const currentScroll = window.scrollY;
      const progress = Math.min(1, Math.max(0, currentScroll / totalScroll));
      setScrollProgress(progress);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Smooth scroll handler for nav items
  const handleNavigate = (sectionId: string) => {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="relative bg-[#0B0E14] text-[#F4F1EA] min-h-screen overflow-x-hidden">
      {/* Custom Magnetic Cursor */}
      <CustomCursor />

      {/* Grain Texture & Soft Mesh Gradient Backdrop */}
      <GrainOverlay />

      {/* Fixed 3D Canvas Background */}
      <Scene3D scrollProgress={scrollProgress} />

      {/* Navigation Header */}
      <Navbar onNavigate={handleNavigate} />

      {/* Main Content Overlay Sections */}
      <div className="relative z-10 space-y-12 sm:space-y-24">
        <HeroSection onNavigate={handleNavigate} />
        <WorkSection />
        <ExpertiseSection />
        <StudioSection />
        <BookingSection />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
