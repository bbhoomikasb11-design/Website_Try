'use client';

import React from 'react';
import { Users } from 'lucide-react';

export const StudioSection: React.FC = () => {
  return (
    <section id="studio" className="relative py-28 px-6 sm:px-8 max-w-7xl mx-auto z-10">
      <div className="glass-panel rounded-3xl p-10 sm:p-16 border border-[#D98C4A]/25 relative overflow-hidden text-center max-w-4xl mx-auto">
        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D98C4A]/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-14 h-14 rounded-2xl bg-[#D98C4A]/15 border border-[#D98C4A]/30 flex items-center justify-center text-[#E8A85C] mb-8 shadow-[0_0_20px_rgba(217,140,74,0.2)]">
            <Users className="w-7 h-7" />
          </div>

          <span className="text-xs font-mono tracking-widest text-[#E8A85C] uppercase block mb-4">
            STUDIO MODEL
          </span>

          {/* Verbatim Header */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#F4F1EA] mb-6">
            Three specialists. One studio.
          </h2>

          {/* Verbatim Copy */}
          <p className="text-lg sm:text-xl md:text-2xl text-[#94A3B8] max-w-2xl font-normal leading-relaxed mb-10">
            Work directly with the team responsible for your product, from its first decisions through delivery.
          </p>

          <div className="inline-flex items-center gap-6 px-6 py-3 rounded-full border border-[#D98C4A]/20 bg-[#0B0E14]/60 text-xs font-mono text-[#94A3B8]">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E8A85C]" />
              No Account Managers
            </span>
            <span className="w-1 h-1 rounded-full bg-[#64748B]" />
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E8A85C]" />
              Direct Engineering & Design
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
