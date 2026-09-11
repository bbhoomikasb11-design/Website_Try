'use client';

import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative py-12 px-6 sm:px-8 border-t border-[#D98C4A]/15 bg-[#0B0E14]/90 z-10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-[#94A3B8]">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#D98C4A]" />
          <span className="font-bold text-[#F4F1EA]">mini websolutions</span>
        </div>

        {/* Verbatim Copyright */}
        <div className="text-xs font-mono text-[#94A3B8]">
          © 2026 Mini Web Solutions
        </div>

        {/* Verbatim LinkedIn link */}
        <div>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-[#E8A85C] hover:text-[#F4F1EA] transition-colors hover:underline"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};
