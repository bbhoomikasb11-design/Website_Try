'use client';

import React from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-6 sm:px-8 max-w-7xl mx-auto z-10"
    >
      <div className="text-center max-w-4xl mx-auto flex flex-col items-center">
        {/* Subtle Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#D98C4A]/25 bg-[#121620]/60 backdrop-blur-md text-xs font-mono tracking-widest text-[#E8A85C] uppercase mb-8 shadow-[0_0_15px_rgba(217,140,74,0.15)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D98C4A] animate-pulse" />
          PRODUCT DESIGN & ENGINEERING STUDIO
        </div>

        {/* Verbatim Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#F4F1EA] leading-[1.08] mb-8">
          Vision to product.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F4F1EA] via-[#E8A85C] to-[#D98C4A]">
            With precision.
          </span>
        </h1>

        {/* Verbatim Subhead */}
        <p className="text-lg sm:text-xl md:text-2xl text-[#94A3B8] max-w-2xl font-normal leading-relaxed mb-12">
          We partner with founders on product design and software engineering.
        </p>

        {/* Verbatim CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <button
            onClick={() => onNavigate('booking')}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#D98C4A] to-[#E8A85C] text-[#0B0E14] font-semibold text-base tracking-wide hover:shadow-[0_0_25px_rgba(217,140,74,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 group"
          >
            Discuss your project
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={() => onNavigate('work')}
            className="w-full sm:w-auto px-8 py-4 rounded-full glass-panel text-[#F4F1EA] font-medium text-base tracking-wide hover:border-[#D98C4A]/40 hover:bg-[#121620]/80 transition-all flex items-center justify-center gap-2.5 group"
          >
            Explore our work
            <ArrowDown className="w-4 h-4 text-[#E8A85C] transition-transform group-hover:translate-y-1" />
          </button>
        </div>

        {/* Scroll indicator prompt */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
          <span className="text-[11px] font-mono tracking-widest text-[#94A3B8] uppercase">Scroll to explore</span>
          <div className="w-5 h-9 rounded-full border border-[#D98C4A]/30 flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-[#E8A85C] animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};
