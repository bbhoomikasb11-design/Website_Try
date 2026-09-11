'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'py-4 bg-[#0B0E14]/80 backdrop-blur-xl border-b border-[#D98C4A]/15 shadow-lg'
          : 'py-6 bg-transparent'
      }`}
    >
      {/* Skip to Content button for accessibility */}
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-[#D98C4A] text-[#0B0E14] px-4 py-2 rounded-md font-semibold text-sm transition-all"
      >
        Skip to main content
      </a>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <MagneticButton onClick={() => onNavigate('hero')} cursorType="hover">
          <div className="text-lg sm:text-xl font-bold tracking-tight text-[#F4F1EA] hover:text-[#E8A85C] transition-colors flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D98C4A] inline-block shadow-[0_0_10px_#D98C4A]" />
            mini websolutions
          </div>
        </MagneticButton>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-[#94A3B8]">
          <MagneticButton onClick={() => onNavigate('work')} cursorType="hover">
            <span className="hover:text-[#F4F1EA] transition-colors px-2 py-1">
              Our work
            </span>
          </MagneticButton>

          <MagneticButton onClick={() => onNavigate('expertise')} cursorType="hover">
            <span className="hover:text-[#F4F1EA] transition-colors px-2 py-1">
              Expertise
            </span>
          </MagneticButton>

          <MagneticButton onClick={() => onNavigate('studio')} cursorType="hover">
            <span className="hover:text-[#F4F1EA] transition-colors px-2 py-1">
              Studio
            </span>
          </MagneticButton>

          <MagneticButton onClick={() => onNavigate('booking')} cursorType="send" cursorText="Send">
            <span className="text-[#E8A85C] hover:text-[#F4F1EA] flex items-center gap-1 font-semibold transition-colors px-2 py-1 group">
              Enquire
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </MagneticButton>
        </nav>

        {/* Mobile Enquire CTA */}
        <button
          onClick={() => onNavigate('booking')}
          className="md:hidden text-xs font-semibold px-4 py-2 rounded-full border border-[#D98C4A]/30 text-[#E8A85C] hover:bg-[#D98C4A]/10 transition-all"
        >
          Enquire
        </button>
      </div>
    </header>
  );
};
