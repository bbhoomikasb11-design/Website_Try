'use client';

import React, { useState } from 'react';
import { ExternalLink, Layers, Smartphone, Sparkles, Box } from 'lucide-react';

export const WorkSection: React.FC = () => {
  // Localized mouse spotlight coordinates for each card
  const [spotlights, setSpotlights] = useState<{ [key: string]: { x: number; y: number; opacity: number } }>({});

  const handleCardMouseMove = (id: string, e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setSpotlights((prev) => ({
      ...prev,
      [id]: { x, y, opacity: 1 },
    }));
  };

  const handleCardMouseLeave = (id: string) => {
    setSpotlights((prev) => ({
      ...prev,
      [id]: { ...prev[id], opacity: 0 },
    }));
  };

  const projects = [
    {
      id: 'relay',
      num: '01',
      title: 'Relay',
      category: 'RETAIL SOFTWARE',
      description: 'An offline retail platform for billing, inventory, and customer accounts.',
      status: 'active',
      icon: Box,
      tag: 'Full Product & Engineering',
    },
    {
      id: 'peerflow',
      num: '02',
      title: 'PeerFlow',
      category: 'PEER-TO-PEER TRANSFER',
      description: 'Direct file transfer between devices, with no account required.',
      status: 'active',
      icon: Smartphone,
      tag: 'Web & Desktop App',
    },
    {
      id: 'project-03',
      num: '03',
      title: 'Project 03',
      category: 'COMING SOON',
      description: 'Coming soon',
      status: 'coming-soon',
      icon: Layers,
      tag: 'In Development',
    },
    {
      id: 'project-04',
      num: '04',
      title: 'Project 04',
      category: 'COMING SOON',
      description: 'Coming soon',
      status: 'coming-soon',
      icon: Sparkles,
      tag: 'In Development',
    },
  ];

  return (
    <section id="work" className="relative py-28 px-6 sm:px-8 max-w-7xl mx-auto z-10">
      {/* Verbatim Section Header with Fraunces Display Font */}
      <div className="mb-16">
        <span className="text-xs font-numeral tracking-widest text-[#E8A85C] uppercase block mb-3">
          PORTFOLIO & CASE STUDIES
        </span>
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.03em] text-[#F4F1EA]">
          Selected work.
        </h2>
      </div>

      {/* Grid of Work Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {projects.map((project) => {
          const Icon = project.icon;
          const isActive = project.status === 'active';
          const spotlight = spotlights[project.id] || { x: 0, y: 0, opacity: 0 };

          return (
            <div
              key={project.id}
              onMouseMove={(e) => handleCardMouseMove(project.id, e)}
              onMouseLeave={() => handleCardMouseLeave(project.id)}
              data-cursor="view"
              data-cursor-text="View"
              className={`glass-panel glass-panel-hover rounded-2xl p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden group transition-all duration-300 ${
                !isActive ? 'opacity-70' : ''
              }`}
            >
              {/* Localized Glass Spotlight Following Cursor inside Card */}
              <div
                className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-2xl"
                style={{
                  opacity: spotlight.opacity,
                  background: `radial-gradient(400px circle at ${spotlight.x}px ${spotlight.y}px, rgba(217, 140, 74, 0.18), transparent 80%)`,
                }}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-numeral font-bold text-[#E8A85C] px-2.5 py-1 rounded-md border border-[#D98C4A]/20 bg-[#0B0E14]/40">
                      {project.num}
                    </span>
                    <span className="text-xs font-numeral tracking-widest text-[#E8A85C] uppercase">
                      {project.category}
                    </span>
                  </div>
                  <span className="text-xs font-numeral px-3 py-1 rounded-full border border-[#D98C4A]/20 bg-[#0B0E14]/40 text-[#94A3B8]">
                    {project.tag}
                  </span>
                </div>

                <h3 className="font-display text-3xl sm:text-4xl font-bold text-[#F4F1EA] mb-4 group-hover:text-[#E8A85C] transition-colors">
                  {project.title}
                </h3>

                <p className="font-body text-[#94A3B8] text-base sm:text-lg leading-relaxed font-light">
                  {project.description}
                </p>
              </div>

              <div className="relative z-10 mt-8 pt-6 border-t border-[#D98C4A]/10 flex items-center justify-between">
                <span className="text-xs font-numeral text-[#94A3B8]">
                  {isActive ? 'Product design & development' : 'Status: In stealth / refinement'}
                </span>
                {isActive && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E8A85C] group-hover:translate-x-1 transition-transform">
                    View project details
                    <ExternalLink className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Verbatim Item 5: Figma designs & prototypes */}
      <div
        data-cursor="view"
        data-cursor-text="View"
        className="glass-panel rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border border-[#D98C4A]/20 relative overflow-hidden group"
      >
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D98C4A]/10 text-xs font-numeral text-[#E8A85C] uppercase tracking-wider mb-3">
            05 · EXPLORATIONS
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#F4F1EA] mb-2 group-hover:text-[#E8A85C] transition-colors">
            Figma designs & prototypes
          </h3>
          <p className="font-body text-[#94A3B8] text-base font-light">Coming soon</p>
        </div>
        <div className="px-5 py-2.5 rounded-full border border-[#D98C4A]/30 text-xs font-numeral text-[#E8A85C] bg-[#0B0E14]/50 w-fit">
          Archive in production
        </div>
      </div>
    </section>
  );
};
