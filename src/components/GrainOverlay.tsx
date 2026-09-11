'use client';

import React from 'react';

export const GrainOverlay: React.FC = () => {
  return (
    <>
      {/* Soft Mesh Gradient Glow Backdrop */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Soft Copper Glow Spotlight */}
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] rounded-full bg-[#D98C4A]/12 blur-[140px] animate-drift" />
        {/* Soft Indigo Glow Spotlight */}
        <div
          className="absolute bottom-[-10%] right-[15%] w-[600px] h-[600px] rounded-full bg-[#1E293B]/40 blur-[160px] animate-drift"
          style={{ animationDelay: '-10s' }}
        />
      </div>

      {/* SVG Grain Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none z-40 opacity-[0.035] mix-blend-overlay">
        <svg className="w-full h-full">
          <filter id="noiseFilter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>
    </>
  );
};
