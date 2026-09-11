'use client';

import React from 'react';
import { Mail, Calendar } from 'lucide-react';
import { MagneticButton } from '../MagneticButton';

export const BookingSection: React.FC = () => {
  return (
    <section id="booking" className="relative py-28 px-6 sm:px-8 max-w-7xl mx-auto z-10">
      <div className="glass-panel rounded-3xl p-10 sm:p-16 border border-[#D98C4A]/30 relative overflow-hidden text-center max-w-4xl mx-auto copper-border-glow">
        {/* Glow effect */}
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#D98C4A]/20 blur-[90px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-14 h-14 rounded-2xl bg-[#D98C4A]/15 border border-[#D98C4A]/30 flex items-center justify-center text-[#E8A85C] mb-8">
            <Calendar className="w-7 h-7" />
          </div>

          <span className="text-xs font-numeral tracking-widest text-[#E8A85C] uppercase block mb-4">
            START A PROJECT
          </span>

          {/* Verbatim Header with Fraunces Display Font */}
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.035em] text-[#F4F1EA] mb-4">
            Discuss your next product.
          </h2>

          {/* Verbatim Subhead */}
          <p className="font-body text-lg sm:text-xl text-[#94A3B8] font-light leading-relaxed mb-6">
            A conversation about your next product.
          </p>

          {/* Verbatim Notice */}
          <div className="px-5 py-2.5 rounded-full border border-[#D98C4A]/20 bg-[#0B0E14]/60 text-xs font-numeral text-[#E8A85C] mb-10">
            Calendar coming soon. Email us to arrange a meeting.
          </div>

          {/* Verbatim CTA Button with Magnetic Pull & Send Cursor Morph */}
          <MagneticButton
            as="a"
            href="mailto:prajwalreddy.dev@gmail.com"
            cursorType="send"
            cursorText="Send"
            magneticRadius={90}
            magneticStrength={0.45}
          >
            <div className="px-10 py-5 rounded-full bg-gradient-to-r from-[#D98C4A] via-[#E8A85C] to-[#D98C4A] text-[#0B0E14] font-bold text-lg tracking-wide hover:shadow-[0_0_35px_rgba(217,140,74,0.5)] transition-all flex items-center gap-3 group">
              <Mail className="w-5 h-5 transition-transform group-hover:scale-110" />
              Arrange a time
            </div>
          </MagneticButton>

          <span className="mt-4 text-xs font-numeral text-[#64748B]">
            Direct email: prajwalreddy.dev@gmail.com
          </span>
        </div>
      </div>
    </section>
  );
};
