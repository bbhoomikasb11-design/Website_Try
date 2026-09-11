'use client';

import React from 'react';
import { MagneticButton } from './MagneticButton';

export const Footer: React.FC = () => {
  return (
    <footer className="relative py-12 px-6 sm:px-8 border-t border-[#D98C4A]/15 bg-[#0B0E14]/90 z-10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-[#94A3B8]">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#D98C4A]" />
          <span className="font-bold text-[#F4F1EA] tracking-tight">mini websolutions</span>
        </div>

        {/* Verbatim Copyright */}
        <div className="text-xs font-numeral text-[#94A3B8]">
          © 2026 Mini Web Solutions
        </div>

        {/* Verbatim LinkedIn link */}
        <MagneticButton
          as="a"
          href="https://linkedin.com"
          cursorType="hover"
        >
          <span className="text-xs font-semibold text-[#E8A85C] hover:text-[#F4F1EA] transition-colors hover:underline">
            LinkedIn
          </span>
        </MagneticButton>
      </div>
    </footer>
  );
};
